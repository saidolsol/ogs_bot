# ogs_bot - Checking for your granny!

This is a german speaking chat bot for the messenger app [Telegram](https://telegram.org). It sends a message to my great grandmother, asking whether she's alright. If she doesnt reply within a couple of hours, several members of the family are notified.

## How it Works

The bot is restarted twice a day - a first time in the afternoon and a second time in the evening.

Everytime it starts, it first checks whether it already has sent a message to granny on that day. It does so by comparing the current date with a date saved in a file (checked.json). This file is updated each time the bot sends that message.

If the dates dont match, the bot sends a message to granny. He then writes a note in another file (status.js), which keeps track of whether grandma has replied or not. He writes down a 0, meaning grandma hasn't replied yet.

When grandma replies, that value is set to 1.

If the dates do match, the bot checks the status.js file. If no message has been received yet (the bot reads a 0), the family is notified. If the bot reads a one, nothing happens.

### Libraries
The bot makes use of these libraries:
* [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
* [fs](https://nodejs.org/api/fs.html)
