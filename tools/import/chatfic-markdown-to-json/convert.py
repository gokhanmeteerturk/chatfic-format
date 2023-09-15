import json
import re
chatfic = {
    "format": "chatficbasicjson"
    }
chatfic_to_add = {
    "pages":[],
    "characters":{

    }
}
def convert_to_json(input_file):
    metadata_keys = ["title","description","author",
                 "patreonusername","modified","episode",]
    current_page_id = 0
    current_page_name = None
    current_lines = []

    with open(input_file, "r") as f:
        lines = f.readlines()

    for line in lines:
        line = line.strip()
        if not line:
            continue
        if line.startswith('> '):
            if line.startswith('> characters/'):
                parts = line[13:].replace(" : ","/").replace(" :","/").replace(": ","/").split("/")
                if len(parts) >= 3:
                    character = parts[0]
                    attribute = parts[1]
                    value = parts[2]
                    if character not in chatfic_to_add["characters"]:
                        chatfic_to_add["characters"][character] = {}
                    chatfic_to_add["characters"][character][attribute] = value
            for metadata_key in metadata_keys:
                if line.startswith('> '+ metadata_key + ": "):
                    value = line[len('> '+ metadata_key + ": "):]
                    if metadata_key in chatfic:
                        break
                    chatfic[metadata_key] = value
                    break
        elif line.startswith("#"):
            if current_page_name:
                chatfic_to_add["pages"].append(parse_page(current_page_id, current_page_name, current_lines))
            current_page_id = current_page_id + 1
            current_page_name = line[1:].strip()
            current_lines = []
        else:
            current_lines.append(line)

    if current_page_name:
        chatfic_to_add["pages"].append(parse_page(current_page_id, current_page_name, current_lines))
    for page in chatfic_to_add["pages"]:
        for option in page["options"]:
            page_found = next((page for page in chatfic_to_add["pages"] if page["name"] == option["to"]))
            option["to"] = page_found["id"] if page_found else page["id"]
    chatfic["characters"]=chatfic_to_add["characters"]
    chatfic["pages"]=chatfic_to_add["pages"]
    return chatfic

def extract_multimedia(text):
    multimedia = None
    message = text
    multimedia_regex = r"!\[(?:IMAGE|VIDEO)\]\(([^\)]*)\)"
    match_multimedia = re.search(multimedia_regex, text)
    if match_multimedia:
        multimedia = match_multimedia.group(1)
        message = text.replace(match_multimedia[0],"")
    return message.strip(), multimedia

def parse_page(page_id, page_name, page_lines):
    page = {
        "id": page_id,
        "name": page_name,
        "messages": [],
        "options": []
    }
    text_w_chatroom_n_pov = r'^\s*([^\[: ]*)\s*\(([^\(:]*)\)\s*\(pov\)\s*:(.+)$'
    text_w_pov = r'^\s*([^\[: ]*)\s*\(pov\)\s*:(.+)$'
    text_w_chatroom = r'^\s*([^\[: ]*)\s*\(([^\(:]*)\)\s*:(.+)$'
    text_w_nothing = r'^\s*([^\[: ]*)\s*:(.+)$'
    option_single = r'^\s*\[next\]\s*\(\s*#\s*([^\)]*)\s*\)\s*$'
    option_regular = r'^\s*\[([^\]]*)\]\s*\(\s*#\s*([^\)]*)\s*\)\s*$'
    previous_chatroom = None

    for line_untrimmed in page_lines:
        line = line_untrimmed.strip()
        if line.startswith("//"):
            continue
        else:
            result = {}
            match_w_chatroom_n_pov = re.match(text_w_chatroom_n_pov, line)
            if match_w_chatroom_n_pov:
                result["from"] = match_w_chatroom_n_pov.group(1)
                result["side"] = 2
                message, multimedia = extract_multimedia(match_w_chatroom_n_pov.group(3))
                result["message"] = message
                result["multimedia"] = multimedia
                result["chatroom"] = match_w_chatroom_n_pov.group(2)
                #TODO: multimedia and save result
                page["messages"].append(result)
                continue
            match_w_pov = re.match(text_w_pov, line)
            if match_w_pov:
                result["from"] = match_w_pov.group(1)
                result["side"] = 2
                message, multimedia = extract_multimedia(match_w_pov.group(2))
                result["message"] = message
                result["multimedia"] = multimedia
                if previous_chatroom:
                    result["chatroom"] = previous_chatroom
                elif(result["from"] != "player" and result["from"] in chatfic_to_add["characters"]):
                    previous_chatroom = chatfic_to_add["characters"][result["from"]]["name"]
                    result["chatroom"] = previous_chatroom
                else:
                    result["chatroom"] = "Unknown"
                page["messages"].append(result)
                #TODO: multimedia and save result
                continue
            match_w_chatroom = re.match(text_w_chatroom, line)
            if match_w_chatroom:
                result["from"] = match_w_chatroom.group(1)
                message, multimedia = extract_multimedia(match_w_chatroom.group(3))
                result["message"] = message
                result["multimedia"] = multimedia
                result["side"] = 2 if result["from"]=="player" else 1 if result["from"]=="app" else 0
                previous_chatroom = match_w_chatroom.group(2)
                result["chatroom"] = previous_chatroom
                page["messages"].append(result)
                #TODO: multimedia and save result
                continue
            match_w_nothing = re.match(text_w_nothing, line)
            if match_w_nothing:
                result["from"] = match_w_nothing.group(1)
                message, multimedia = extract_multimedia(match_w_nothing.group(2))
                result["message"] = message
                result["multimedia"] = multimedia
                result["side"] = 2 if result["from"]=="player" else 1 if result["from"]=="app" else 0
                if previous_chatroom:
                    result["chatroom"] = previous_chatroom
                elif(result["from"] != "player" and result["from"] in chatfic_to_add["characters"]):
                    previous_chatroom = chatfic_to_add["characters"][result["from"]]["name"]
                    result["chatroom"] = previous_chatroom
                else:
                    result["chatroom"] = "Unknown"
                page["messages"].append(result)
                #TODO: multimedia and save result
                continue
            match_option_single = re.match(option_single, line)
            
            if match_option_single:
                page["options"].append({"to":match_option_single.group(1)})
                continue
            match_option_regular = re.match(option_regular, line)
            if match_option_regular:
                page["options"].append({"to":match_option_regular.group(2), "message":match_option_regular.group(1)})
                continue

    return page

if __name__ == "__main__":
    input_file = "storybasic.md"  # Change this to your input file name
    output_file = "storybasic.json"  # Change this to your desired output file name
    data = convert_to_json(input_file)

    with open(output_file, "w") as f:
        json.dump(data, f, indent=2)
