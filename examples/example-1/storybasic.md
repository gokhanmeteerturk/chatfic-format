> format: chatficbasic
> version: 1
> title: Test Story - Look Up at the Sky
> description: This is a simple test story.
> author: /u/yourusername
> patreonusername: yourpatreonusername
> modified: 1694604568727
> episode: 1
> description: This is a simple test story.
> characters/player/name : John
> characters/app/name : app
> characters/alice/name : Alice
> characters/alice/color : black
> characters/bob/name : Bob
> characters/bob/color : red
> characters/mike/name : Mike
> characters/mike/color : purple
> characters/jes/name : Jessica
> characters/jes/color : blue
> variables/roommate/value: roommate
> variables/roommateShort/value: roomie

# initial
alice:  Hello, I'm Alice. How are you?

[Respond to Alice](#second)
[Text to Bob instead](#third)

# second
player(Alice):  Hi Alice, I'm doing well. How about you?
alice:  I'm good too.

[next](#mylastpage)

# third
player(Bob):  Hello Bob, are you available?
app:  Bob has muted you.

[next](#mylastpage)

# mylastpage
mike(The Squad):  Hey everyone, I've created a group chat with our classmates. Hi!
jes:  Hello, everyone!
app(Mike-Alice):  You'll now see a conversation between 2 other people.
mike:  Hey Alice, I'm Mike, your new $roommate. What are you up to?
alice(pov):  Just relaxing $roommateShort.
alice(pov):  ![IMAGE](media/alice1.jpg)
mike:  ![VIDEO](media/chilling.mp4) Here's a video from me then!
app:  Story ended, thanks for playing.

