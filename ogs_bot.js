var TelegramBot = require('node-telegram-bot-api'); 
var botManager = require('./botManager.js');
var variables = require('./variables');
var token = variables['token'];
var ogs_lib = require('./ogs_lib');

// Setup polling way
var bot = new TelegramBot(token, {polling: true});

//Asking grandma (if not already done) and making a note of that

ogs_lib.isMessageSentToday(function(err, isSent) {

    if(isSent) {

    } else {

    }

});

  function check(data, width, X, Y) {

      var date = new Date();
date.setHours(0,0,0,0);
date = JSON.stringify(date);
var checked = fs.readFile('checked.txt',function (err, data) {
   if (err) {
      return console.error(err);
   }
   if (data === date){
      bot.sendMessage(variables['family_chatID'][0], "Oma hat noch nicht geantwortet.");	
   }else{
      bot.sendMessage(variables['og_chatID'], "Hallo Oma, ist alles in Ordnung?");
      fs.writeFile('checked.txt', date,  function(err) {
         if (err) {
            return console.error(err);
         }
      });
   }

});


//Das hier passiert sobald der Bot eine Nachricht bekommt:
bot.onText(/\/(.+)/, function (msg, match) {

    console.log('onText: ');
    var messageToSend = botManager.processOnText(msg, match);
    
    console.log(messageToSend);
    
    for(var i=0;i<messageToSend.length;i++) {
        
        var message = messageToSend[i];

        
        console.log(message);
        
        bot.sendMessage(message.chatId, message.message, message.options).then(function(message) {
            console.log('Message sent');
            i++;
        }, function(error) {
            console.log('Error: ' + error);
            bot.sendMessage(message.chatId, message.message).then(function(message) {
                console.log('Message sent without markdown');
            }, function(error) {
                console.log('Failed even without markdown. Error: ' + error);
            });
            i++;
        });
    }
});

