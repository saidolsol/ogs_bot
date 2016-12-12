var fs = require('fs');


(function() {

    function messageSent(cb) {

        fs.writeFile('./checked.txt', (new Date()).toISOString(), function(err) {

            cb(err);

        });

    }

    module.exports.messageSent = messageSent;

    function isMessageSentToday(cb) {

        fs.readFile('./checked.txt', function(err, data) {

            if(err) {
                cb(err);
                return;
            }

            var lastSentMessageTimestamp;

            if(data) {
                lastSentMessageTimestamp = new Date(data);

                var now = new Date();
                var timeIntervalInMilliseconds = now - lastSentMessageTimestamp;

                if(timeIntervalInMilliseconds > 1000*60*60*24) {
                    console.log('Last message sent more than 24 hours ago');
                    cb(null, false);
                } else {
                    cb(null, true);
                }

            } else {
                // No data in the file. Assuming no message sent yet.
                console.log('No file or no data');
                cb(null, false);
            }

        });

    }

    module.exports.isMessageSentToday = isMessageSentToday;

})();