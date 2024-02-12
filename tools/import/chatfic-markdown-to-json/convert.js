let chatficConversionResult = {
    format: "chatficbasicjson",
};

let chatficToAdd = {
    pages: [],
    characters: {},
    variables:{}
};

function convertChatficFromMdToJSON(chatficbasicCode) {
    chatficConversionResult = {
        format: "chatficbasicjson",
    };
    chatficToAdd = {
        pages: [],
        characters: {},
        variables: {}
    };
    const metadataKeys = [
        "title",
        "description",
        "author",
        "patreonusername",
        "modified",
        "episode",
    ];
    let currentPageId = 0;
    let currentPageName = null;
    let currentLines = [];

    const lines = chatficbasicCode.split("\n");

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) {
            continue;
        }
        if (trimmedLine.startsWith("> ")) {
            if (trimmedLine.startsWith("> variables/")) {
                const parts = trimmedLine
                    .slice(12)
                    .replace(" : ", "/")
                    .replace(" :", "/")
                    .replace(": ", "/")
                    .split("/");
                if (parts.length >= 3) {
                    const character = parts[0].trim();
                    const attribute = parts[1].trim();
                    const value = parts[2].trim();
                    if (!chatficToAdd.characters[character]) {
                        chatficToAdd.characters[character] = {};
                    }
                    chatficToAdd.characters[character][attribute] = value;
                }
            }
            if (trimmedLine.startsWith("> characters/")) {
                const parts = trimmedLine
                    .slice(13)
                    .replace(" : ", "/")
                    .replace(" :", "/")
                    .replace(": ", "/")
                    .split("/");
                if (parts.length >= 3) {
                    const character = parts[0].trim();
                    const attribute = parts[1].trim();
                    const value = parts[2].trim();
                    if (!chatficToAdd.characters[character]) {
                        chatficToAdd.characters[character] = {};
                    }
                    chatficToAdd.characters[character][attribute] = value;
                }
            }
            for (const metadataKey of metadataKeys) {
                if (trimmedLine.startsWith(`> ${metadataKey}: `)) {
                    const value = trimmedLine.slice(`> ${metadataKey}: `.length);
                    if (metadataKey in chatficConversionResult) {
                        break;
                    }
                    chatficConversionResult[metadataKey] = value;
                    break;
                }
            }
        } else if (trimmedLine.startsWith("#")) {
            if (currentPageName) {
                chatficToAdd.pages.push(
                    parsePage(currentPageId, currentPageName, currentLines)
                );
            }
            currentPageId++;
            currentPageName = trimmedLine.slice(1).trim();
            currentLines = [];
        } else {
            currentLines.push(trimmedLine);
        }
    }

    if (currentPageName) {
        chatficToAdd.pages.push(
            parsePage(currentPageId, currentPageName, currentLines)
        );
    }

    for (const page of chatficToAdd.pages) {
        for (const option of page.options) {
            const pageFound = chatficToAdd.pages.find((p) => p.name === option.to);
            option.to = pageFound ? pageFound.id : page.id;
        }
    }

    chatficConversionResult.characters = chatficToAdd.characters;
    chatficConversionResult.variables = chatficToAdd.variables;
    chatficConversionResult.pages = chatficToAdd.pages;

    return chatficConversionResult;
}

function extractMultimedia(text) {
    let multimedia = null;
    let message = text;
    const multimediaRegex = /!\[(?:IMAGE|VIDEO)\]\(([^\)]*)\)/;
    const matchMultimedia = text.match(multimediaRegex);
    if (matchMultimedia) {
        multimedia = matchMultimedia[1];
        message = text.replace(matchMultimedia[0], "");
    }
    return [message.trim(), multimedia];
}

function parsePage(pageId, pageName, pageLines) {
    const page = {
        id: pageId,
        name: pageName,
        messages: [],
        options: [],
    };

    const textWithChatroomAndPov = /^\s*([^\[: ]*)\(([^\(:]*)\)\(pov\):( .+)$/;
    const textWithPov = /^\s*([^\[: ]*)\(pov\):( .+)$/;
    const textWithChatroom = /^\s*([^\[: ]*)\(([^\(:]*)\):( .+)$/;
    const textWithNothing = /^\s*([^\[: ]*):( .+)$/;
    const optionSingle = /^\s*\[next\]\(\s*#\s*([^\)]*)\s*\)\s*$/;
    const optionRegular = /^\s*\[([^\]]*)\]\(\s*#\s*([^\)]*)\s*\)\s*$/;
    let previousChatroom = null;

    for (const lineUntrimmed of pageLines) {
        const line = lineUntrimmed.trim();
        if (line.startsWith("//")) {
            continue;
        } else {
            const result = {};
            const matchWithChatroomAndPov = line.match(textWithChatroomAndPov);
            if (matchWithChatroomAndPov) {
                result.from = matchWithChatroomAndPov[1];
                result.side = 2;
                const [message, multimedia] = extractMultimedia(
                    matchWithChatroomAndPov[3]
                );
                result.message = message;
                result.multimedia = multimedia;
                result.chatroom = matchWithChatroomAndPov[2];
                page.messages.push(result);
                continue;
            }
            const matchWithPov = line.match(textWithPov);
            if (matchWithPov) {
                result.from = matchWithPov[1];
                result.side = 2;
                const [message, multimedia] = extractMultimedia(matchWithPov[2]);
                result.message = message;
                result.multimedia = multimedia;
                if (previousChatroom) {
                    result.chatroom = previousChatroom;
                } else if (
                    result.from !== "player" &&
                    chatficToAdd.characters[result.from]
                ) {
                    previousChatroom = chatficToAdd.characters[result.from].name;
                    result.chatroom = previousChatroom;
                } else {
                    result.chatroom = "Unknown";
                }
                page.messages.push(result);
                continue;
            }
            const matchWithChatroom = line.match(textWithChatroom);
            if (matchWithChatroom) {
                result.from = matchWithChatroom[1];
                const [message, multimedia] = extractMultimedia(matchWithChatroom[3]);
                result.message = message;
                result.multimedia = multimedia;
                result.side =
                    result.from === "player" ? 2 : result.from === "app" ? 1 : 0;
                previousChatroom = matchWithChatroom[2];
                result.chatroom = previousChatroom;
                page.messages.push(result);
                continue;
            }
            const matchWithNothing = line.match(textWithNothing);
            if (matchWithNothing) {
                result.from = matchWithNothing[1];
                const [message, multimedia] = extractMultimedia(matchWithNothing[2]);
                result.message = message;
                result.multimedia = multimedia;
                result.side =
                    result.from === "player" ? 2 : result.from === "app" ? 1 : 0;
                if (previousChatroom) {
                    result.chatroom = previousChatroom;
                } else if (
                    result.from !== "player" &&
                    chatficToAdd.characters[result.from]
                ) {
                    previousChatroom = chatficToAdd.characters[result.from].name;
                    result.chatroom = previousChatroom;
                } else {
                    result.chatroom = "Unknown";
                }
                page.messages.push(result);
                continue;
            }
            const matchOptionSingle = line.match(optionSingle);
            if (matchOptionSingle) {
                page.options.push({ to: matchOptionSingle[1] });
                continue;
            }
            const matchOptionRegular = line.match(optionRegular);
            if (matchOptionRegular) {
                page.options.push({
                    to: matchOptionRegular[2],
                    message: matchOptionRegular[1],
                });
                continue;
            }
        }
    }

    return page;
}

