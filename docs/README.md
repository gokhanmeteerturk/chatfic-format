# Chatfic Format


## 1. QUICK START
You can start creating your chatfic stories in the "chatficbasic" format by simply following these steps:

> If you already have your chatfic in another format, you can take a look at the [Converters](#converters) section of this documentation.

### Option 1: Using a Chatfic Editor (Easy and Quick)
You can use [The Chatfic Editor](https://editor.chatficlab.com) to create chatfics easily. The steps are pretty straightforward:
1. Fill out the Story Info form.
2. (If the story is Non-linear) Create pages and page links.
4. Add messages. (Create or modify characters if needed.)
5. Download the zip file and submit it to a chatfic server.

### Option 2: Manually (Advanced)

1. **Create a new chatfic:** Open a text editor and create a new file named **storybasic.md**.

    Begin your chatfic file by specifying story info at the beginning of the file. Add your #pages and user: messages after that.
    #### show/hide Example +
    ```chatficbasic
    > format: chatficbasic
    > version: 1.1
    > title: Your Story Title
    > description: A brief description of your story.
    > author: /u/yourusername
    > episode: 1
    > characters/player/name: John
    > characters/alice/name: Alice
    > variables/roommate/value: roommate
    > variables/roommateShort/value: roomie
    > apps/chat/name: Messages
    > apps/photofeed/name: PhotoFeed
    > apps/homecam/name: Home Camera
    > apps/office/name: Office
    > apps/office/background: media/office_bg.jpg

    
    # initial
    alice:  Hi! how are you?
    player:  Thank you Alice, I'm fine. you?
    alice:  Me too! Here is a photo from yesterday:
    alice:  ![IMAGE](media/myphoto.jpg)

    [like it](#nicepath)
    [say eww](#badpath)

    # nicepath
    player(Alice):  nice photo $roommateShort!

    [next](#ending)

    # badpath
    player(Alice):  eww.
    alice:  ??!

    [next](#ending)

    # ending
    app(Alice):  thanks for playing, the story is finished!
    ```
2. Create a folder named **media** and put all your media files in it.
3. Create a storybasic.json counterpart of your storybasic.md. You can do this by:
    - Importing your chatfic to [The Chatfic Editor](https://editor.chatficlab.com) and clicking the "Show JSON (v1.1)" button
    - Using a [converter](#converters)
    - Or creating it manually (not recommended). Here is what it should look like:
    #### show/hide json code +
    ```json
    {
    "format": "chatficbasicjson",
    "version": "1.1",
    "title": "Your Story Title",
    "description": "A brief description of your story.",
    "author": "/u/yourusername",
    "episode": 1,
    "characters": {
        "player": {"name": "John"},
        "app": {"name": "app"},
        "alice": {"name": "Alice"}
    },
    "variables": {
        "roommate": {"value": "roommate"},
        "roommateShort": {"value": "roomie"}
    },
    "apps": {
      "chat": { "name": "Messages" },
      "photofeed": { "name": "PhotoFeed" },
      "homecam": { "name": "Home Camera" },
      "office": { "name": "Office", "background": "media/office_bg.jpg" }
    },
    "pages": [
        {
        "id": 1,
        "name": "initial",
        "messages": [
            {
            "message": "Hi! how are you?",
            "from": "alice",
            "side": "0",
            "multimedia": null,
            "chatroom": "Alice"
            },
            {
            "message": "Thank you Alice, I'm fine. you?",
            "from": "player",
            "side": "2",
            "multimedia": null,
            "chatroom": "Alice"
            },
            {
            "message": "Me too! Here is a photo from yesterday:",
            "from": "alice",
            "side": "0",
            "multimedia": null,
            "chatroom": "Alice"
            },
            {
            "message": "",
            "from": "alice",
            "side": "0",
            "multimedia": "media/media/myphoto.jpg",
            "chatroom": "Alice"
            }
        ],
        "options": [ { "to": 2, "message": "like it" }, { "to": 3, "message": "say eww" } ]
        },
        {
        "id": 2,
        "name": "nicepath",
        "messages": [
            {
            "message": "nice!",
            "from": "player",
            "side": "2",
            "multimedia": null,
            "chatroom": "Alice"
            }
        ],
        "options": [ { "to": 4 } ]
        },
        {
        "id": 3,
        "name": "badpath",
        "messages": [
            {
            "message": "eww.",
            "from": "player",
            "side": "2",
            "multimedia": null,
            "chatroom": "Alice"
            },
            {
            "message": "??!",
            "from": "alice",
            "side": "0",
            "multimedia": null,
            "chatroom": "Alice"
            }
        ],
        "options": [ { "to": 4 } ]
        },
        {
        "id": 4,
        "name": "ending",
        "messages": [
            {
            "message": "thanks for playing, the story is finished!",
            "from": "app",
            "side": "1",
            "multimedia": null,
            "chatroom": "Alice"
            }
        ],
        "options": []
        }
    ]
    }
    ```
4. Create a zip archive with storybasic.md, storybasic.json and your media folder. You can include a LICENSE file too.


### Chatfic Archives
Since most chatfics consist of both a story and a collection of media files, chatfic format is not only about how to format your story. To make an entire chatfic story easy to distribute and easy to work with, one should create an archive file, with the below structure:

![tree view](media/tree.png)

**storybasic.md:** This is the file for storing the default(markdown-based) chatficbasic code.

**storybasic.json:** This is the JSON based version of the chatficbasic code. This will usually get generated by a chatfic editor like [The Chatficlab Editor](https://editor.chatficlab.com).
The reason we have both the .md version and the .json version together is to make it easier for authors to import or edit the story using any editor available to them. This decision may change with future major versions of the chatfic format.

**media/**: This folder contains all the media files used in the story. Accepted formats for chatfic v1.1: `jpeg, jpg, png, gif, webm, mp4` (for messages and app backgrounds).

**LICENSE**: Optional but strongly recommended text file with license information. This file may or may not have a .txt or .md extension.

**story.json:** This file will get generated automatically by the chatfic servers and **the author shouldn't include this file in the archive**. The difference between this and storybasic.json can be found under the section "[Publish](#publish)". But basically, storybasic is the source code, used by the editors, and story.json is the compiled and extended version of it, only used by the chatfic players like [chatficlab.com](https://chatficlab.com)


### Tutorial
We currently don't have any tutorials. Please check the examples below or play with [the editor](https://editor.chatficlab.com) to understand how things work.

## 2. SEE EXAMPLES
You can find a complete chatfic archive in the /examples folder of our github repo:
https://github.com/gokhanmeteerturk/chatfic-format/tree/main/examples/example-1

Or directly download the archive: [example-1.zip](https://github.com/gokhanmeteerturk/chatfic-format/raw/main/examples/example-1.zip)

## 3. SPECIFICATION

The "chatficbasic" format is a simple and structured way to create interactive chat-based stories. It allows authors to write stories using a conversational format, with multiple characters, non-linear story choices and multimedia elements.

> Chatficbasic can be seen as a strict subset of markdown. The recommended file extension is .md, which helps it to be viewed/navigated seamlessly using markdown editors too.

### Format Metadata
- **Format Name:** chatficbasic
- **Version:** 1.1

### Story Metadata
- **Title:** [Your Story Title]
- **Description:** [A brief description of your story, one line.]
- **Author:** [Your username. ex: /u/me420 or @me420]

#### Metadata Example
```chatficbasic
> format: chatficbasic
> version: 1.1
> title: Test Story - Look Up at the Sky
> description: This is a simple test story.
> author: /u/yourusername
> episode: 1
```

> **Note about use of blank spaces:**  
> The metadata keys(part before colon) should never include any uppercase letters or blank spaces.  
> Values (part after colon) can be any valid text.  
>   
> Valid:   "storyauthor: Bob Marley"  
> Invalid:  "story author: Bob Marley"
>   
> Valid: handles/subscribestar: helloworld  
> Invalid: handles/subscribe star: helloworld


### Handles
Author social media and platform handles are defined in the "handles" section. Each handle should be unique. Handles are always case sensitive. Handle names are recommended to be in lowercase.

```chatficbasic
> handles/patreon: yourpatreonusername
> handles/subscribestar: yoursubscribestarusername
```
Even though you can use any valid text for handle name and value (such as handles/mywebsite or handles/tiktok), most chatfic viewers will only recognize well-known crowdfunding platforms such as patreon, subscribestar and ko-fi.

> **Note on Privacy:**  
> Handles, similar to all other chatfic metadata, should be treated as public information.  
> When publishing a chatfic, authors should never include the handles or any personal information they do not want others to know.

Handles section of a chatfic's metadata is reserved for author's handles only.  
To see how to include model handles, see [Model Information](#model-information) under Characters.

### Characters
Characters are defined within the "characters" section and can have attributes. Currently supported attributes are name, color, and avatar. Additional attributes may be included with v1.x minor updates, so parsers and renderers should expect to encounter unknown additional attributes.

"player" and "app" character slugs are reserved. The "app" slug should never appear in the characters section of your story metadata. While "player" should definitely appear:

**Example:**

```chatficbasic
> characters/player/name: John
> characters/alice/name: Alice
> characters/alice/gender: female
> characters/bob/name: Bob
> characters/bob/avatar: bob.jpg
> characters/mike/name: Mike
> characters/jes/name: Jessica
```
### Apps

While a chatfic primarily takes place on a chat-like app interface, stories can simulate multiple other apps, allowing the reader to experience transitions between different interfaces like messaging, social media feeds, or other custom UIs.

Apps are defined in the story metadata. Each app has an internal ID (e.g., `chat`, `photofeed`) and can have a display name and an optional background image.

**Default Apps:**

  * **`chat`**: This is the default app for all messages unless specified otherwise. If you only use the "chat" app, you do not need to explicitly define it in the metadata, though you can to set a custom display name (e.g., "Messages").
  * **`home`**: A default `home` app is always available and does not need to be defined. It's useful for thoughts, internal monologues, or messages outside a specific app context.

**Custom Apps & Visual Novel Scenes:**
You can define custom app names. If an app definition includes a `background` image, messages within this app is expected to be presented (by a chatfic viewer like chatficlab) as full-screen visual novel scenes, using the image as the backdrop. This allows chatfic-format to be used for creating visual novel experiences.

**Metadata Example for Apps:**

```chatficbasic
> apps/chat/name: Messages
> apps/photofeed/name: Instagram
> apps/homecam/name: Home Camera
> apps/school/name: School
> apps/school/background: media/school_background.jpg
```

In the `storybasic.json` file, this would look like:

```json
"apps": {
  "chat":      { "name": "Messages" },
  "photofeed": { "name": "Instagram" },
  "homecam":   { "name": "Home Camera" },
  "school":    { "name": "School", "background": "media/school_background.jpg" }
}
```

#### Model Information

Authors can include model information in the metadata section of a chatfic. This is a great way to provide proper attribution to any models whose multimedia is used in the story.

```chatficbasic
> characters/jes/name: Jessica
> characters/jes/model/name: Iggy Azalea
> characters/jes/model/handles/instagram: thenewclassic
> characters/jes/model/handles/onlyfans: iggyazalea
```

As responsible usage of a model's name and multimedia requires their permission, authors should also ask for each model's permission to include handles in their story.  
  
As can be seen above, model information consists of a name, and handles. It is not recommended to include handles without including the model name, as this may cause visual issues in chatfic viewers and editors.



### Variables
To give the readers some control over the story, authors may want to make some words "changeable" or in other terms, "variable".
Variables in Chatfic Lab are similar to the ones in programming. They are containers which hold a value.

> In future versions of chatfic-format, variables may be able to dynamically change based on user choices. Such an update would also introduce hidden variables. 

**Example:**
Below is an example of how to let user choose an occupation for the player, with the default occupation being 'teacher' create a variable called $playerOccupation.

1. Define variable:
```chatficbasic
> variables/playerOccupation/value: Teacher
```
2. Use variable:
```chatficbasic
alice: Hello! what do you do for a living?
player: Hi Alice! I am a $playerOccupation
```
This last message will be shown as "Hi Alice! I am a Teacher" to the reader by default.
If the reader changes the value of the variable $playerOccupation, messages will be rendered with the new value instead.

### Story Content
The story is divided into pages, each identified by a unique, **one word** label. Pages contain character dialogue.

Each page ends with either a redirect to another page, multiple choices for the player to make, or nothing(which means the story ends after the page).

For editors, the default first page is called "initial". This can be changed by the author.

**Example:**
```chatficbasic
# initial
alice: Hello, I'm Alice.
player: Hi Alice!
alice:  How are you?

[Respond to Alice](#second)
[Text to Bob instead](#third)

# second
...
```
Each page begins with a label (e.g., # initial) followed by character dialogue.

Choices are presented in square brackets with a label linking to the next page.

>If a page ends with a single option, it will be considered a redirect. A redirect doesn't wait for the player to make a choice, and won't show the text inside the square brackets to the player either.

### Messages

Messages form the core of the narrative. They can be simple text, include multimedia, be styled as thoughts, or belong to different simulated apps.

#### App Association for Messages

Each message belongs to an app. If you skip this section and do not define an app for your messages, it defaults to the "chat" app.

  * **In Markdown (`storybasic.md`):**
      * The default app for all messages at the start of a page is `chat`.
      * To switch to a different app, use the `*app: <app_id>` declaration on its own line. All subsequent messages on that page will belong to this app until another `*app:` declaration is encountered or the page ends.

    ```chatficbasic
    # pagename
    player: This is in the default 'chat' app.

    *app: photofeed
    alice: This message is in the 'photofeed' app.
    bob: So is this one.

    *app: chat
    player: Back to the 'chat' app.
    ```
  * **In JSON (`storybasic.json`):**
      * Each message object can have an optional `"app": "<app_id>"` field. This should match with an app key from the apps metadata ("chat","photofeed", a custom app name or "home")
      * If the `app` field is omitted, the message defaults to the `chat` app.

    ```json
    { "message": "Thanks! Also… check your homecam 😳", "from": "alice", "app": "chat" }
    { "message": "", "from": "player", "app": "homecam", "multimedia": "media/frontdoor.jpg" }
    ```

#### Thought-Type Messages

Messages can be marked as thoughts or internal monologues. These are typically rendered differently (e.g., in italics).

  * **In Markdown (`storybasic.md`):**
      * Prepend and append the message content (excluding the character prefix) with an underscore `_`.

  * ```chatficbasic
    player: This is a normal message.
    _player: This is an inner thought._
    *app: homecam
    _alice: I wonder what's happening there._
    ```
  * **In JSON (`storybasic.json`):**
      * Add a `"type": "thought"` field to the message object.

  * ```json
    {
      "message": "Whoa. Is that… Bob?",
      "from": "player",
      "app": "homecam",
      "type": "thought"
    }
    ```
    Thought messages can belong to any app, but are often naturally used with the `chat` or `home` app or within a specific app context.

### Chatroom Names
In chatfic format, each message belongs in a chatroom. If the player is having a 1-on-1 conversation with a character, the chatroom name will be the character's name.

If the player is in a group conversation, the chatroom name should be specified manually.

The chatroom can be specified by appending the chatroom name in parentheses after the author's name.

If the chatroom is not specified, the chatroom will be determined by the author of the previous message:
```chatficbasic
mike: hi!
player: hello!
```
> "pov" is a reserved word and should never be used as a chatroom name.


> If any message's chatroom is ambiguous and can't be determined correctly based on the author of the **previous** messages, chatroom **must be** specified using the chatroom name in parentheses. For example, if the first message belongs to the player, chatroom must be specified at least once:
```chatficbasic
player(Bob): Hello Bob!
Bob: Hi!
player: How are you?
Bob: Good. you?
```

### Group and Non-player chats
For group chats, the chatroom name should be specified manually. For example:
```chatficbasic
mike(The Boyz): Hello guys, did you watch "foo"?
george: Nope!
player: I watched "bar". Does that count?
```

Chatfics are default to the "player"s point-of-view(aka POV). This means the player's messages are shown on the right side of the chatroom. If you want any other character's messages to be seen on the right side, you can use "(pov)" after the chatroom name.

Below is an example chat between non-player characters "Alice" and "Mike". We will name this chatroom "Alice-Mike". It is not a strict convention but it's recommended to use the chatroom name "character1-character2" for non-player chats to avoid any confusion.

```chatficbasic
alice(Alice-Mike)(pov): Hello Mike!
mike: Hi Alice!
alice(pov): Did you go to the party last night?
mike: nope :(
```

### Multimedia
Multimedia elements can be embedded using the [IMAGE] and [VIDEO] tags.

The file name should be specified within the parentheses. A multimedia can be sent along with a text message, by adding text **after** the multimedia element:

**Example:**
```chatficbasic
alice: ![IMAGE](alice1.jpg)
mike: ![VIDEO](chilling.mp4) Here's a video from me!
```

To enrich messages with app-specific data (e.g., likes for a social media post, camera room name for a surveillance feed), an `extra` field can be used.

  * **In Markdown (`storybasic.md`):**
      * Extra data is added as a "title" string within the multimedia tag, formatted as key-value pairs. Multiple pairs are comma-separated. For complex values like lists of comments, use a pipe `|` to separate items within the value.

**Example of Multimedia with Text and Extra Data:**

```chatficbasic
*app: photofeed
alice: ![IMAGE](media/post.png "likes:102,caption:My day at the beach!") Feeling the sun!
```

Corresponding JSON:

```json
{
  "message": "Feeling the sun!",
  "from": "alice",
  "app": "photofeed",
  "multimedia": "media/post.png",
  "extra": {
    "likes": 102,
    "caption": "My day at the beach!"
  }
}
```
### Narrator Messages
Messages from the app or the narrator should be prepended by "app:". These messages typically belong to the `chat` app.

**Example:**
```chatficbasic
jessica: Hi!
player: hi jessica!
app: Missed voice call
jessica: Ah sorry, that was an accidental call.
player: no worries!
```
### End of Story
If the player ends up in a page with no options at the end, the story will end. It is usually a good practice to end the story with a message from the narrator:

```chatficbasic
app: Story ended, thanks for playing.
```

## 4. TOOLS AND 3RD PARTY PROJECTS

Currently tools for editing a chatfic are limited to an online editor and several converters. If you publish a tool for anything chatfic format related, you can request to be listed here by opening a new issue.

### Editors
A proof-of-work online editor project is published on GitHub under the name [@gokhanmeteerturk/chatficbasic-html-editor](https://github.com/gokhanmeteerturk/chatficbasic-html-editor).

### Converters
Work in progress.
- Import
    - chatfic md to json
        - [python coverter](https://github.com/gokhanmeteerturk/chatfic-format/blob/main/tools/import/chatfic-markdown-to-json/convert.py)
        - [javascript coverter](https://github.com/gokhanmeteerturk/chatfic-format/blob/main/tools/import/chatfic-markdown-to-json/convert.js)

### Other Tools
Work in progress
