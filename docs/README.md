# Chatfic Format
Chatfic Format with docs, examples and tools for conversion.

## Chatfic Archives
Since most chatfics consist both a story and a collection of media files, chatfic format is not only about how to format your story. To make an entire chatfic story easy to distribute and easy to work with, one should create an archive file, with below structure:
``` bash
wip


```

## Specification

The "chatficbasic" format is a simple and structured way to create interactive chat-based stories. It allows authors to write stories using a conversational format, with multiple characters, non-linear story choices and multimedia elements.

> Chatficbasic can be seen as a strict subset of markdown. Recommended file extension is .md, which helps it to be viewed/navigated seamlessly using markdown editors too.

### Format Metadata
- **Format Name:** chatficbasic
- **Version:** 1

### Story Metadata
- **Title:** [Your Story Title]
- **Description:** [A brief description of your story, one line.]
- **Author:** [Your username. ex: /u/me420 or @me420]
- **Patreon Username**: [Your Patreon username, without the domain.]

#### Metadata Example
```chatficbasic
> format: chatficbasic
> version: 1
> title: Test Story - Look Up at the Sky
> description: This is a simple test story.
> author: /u/yourusername
> patreon-username: yourpatreonusername
> episode: 1
```
### Characters
Characters are defined within the "characters" section and can have attributes. Currently supported attributes are name, color, and avatar. Additional attributes may be included with v1.x minor updates, so parsers and renderers should expect to encounter unknown additional attributes.

"player" and "app" character slugs are reserved. "app" slug should never appear in the characters section of your story metadata. While "player" should definitely appear:

**Example:**

```chatficbasic
characters/player/name: John
characters/alice/name: Alice
characters/alice/color: #0000FF
characters/bob/name: Bob
characters/bob/avatar: bob.jpg
characters/mike/name: Mike
characters/jes/name: Jessica
```

### Story Content
The story is divided into pages, each identified by a unique, **one word** label. Pages contain character dialogue.

Each page ends with either a redirect to another page, multiple choices for the player to make, or nothing(which means the story ends after the page).

For editors, default first page is called "initial". This can be changed by the author.

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
### App / Narrator Messages
Messages from the app or the narrator should be prepended by "app:".

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

## Tutorial
We currently don't have any tutorials. Please check the examples below or play with [https://editor.chatficlab.com](the editor) to understand how things work.

## See Examples


## Tools and 3rd party projects

Currently tools for editing a chatfic is limited to an online editor and several converters. If you publish a tool for anything chatfic format related, you can request to be listed here by opening a new issue.

### Online Editor
A proof-of-work online editor project is published on GitHub under the name [https://github.com/gokhanmeteerturk/chatficbasic-html-editor](@gokhanmeteerturk/chatficbasic-html-editor).

### Converters
Work in progress

### Other Tools
Work in progress
