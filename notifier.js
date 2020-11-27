const slackBot = require('slackbots');
const tele = require('telegram-bot-api')
require('dotenv').config()

// Method Checks
var methods = process.env.METHODS
var slackMethod = methods.includes("slak")
var teleMethod = methods.includes("tele")
var txtMethod = methods.includes("txt")
if (slackMethod == true && (process.env.SLACKTOKEN != null && process.env.SLACKTOKEN != '')) {
    var slackBotName;
    var slackChannel;
    process.env.SLACKBOTNAME != null && process.env.SLACKBOTNAME != '' ? slackBotName = process.env.SLACKBOTNAME : slackBotName = 'ip-notifier'
    process.env.SLACKCHANNEL != null && process.env.SLACKCHANNEL != '' ? slackChannel = process.env.SLACKCHANNEL : slackChannel = 'general'
    const slackToken = process.env.SLACKTOKEN
    const bot = new slackBot({
        token: slackToken,
        name: slackBotName
    })
    const slackParams = {
        icon_emoji: ':robot_face:'
    }
    bot.on('start', () => {  
        bot.postMessageToChannel(
            slackChannel,
            'IP Notification Bot is Active, currenly watching for IP changes',
            slackParams
        );
    })
} else {
    console.log('Something is wrong, please check your .env file')
}





// if (teleMethod == true && (process.env.TELEGRAMTOKEN != null && process.env.TELEGRAMTOKEN != '')) {
//     const teleAPI = new tele({
//         token: process.env.TELEGRAMTOKEN
//     })

// } else {
//     console.log('Something is wrong, please check your .env file')
// }



if (teleMethod == true) {
    console.log('not working please turn off for now');
}
if (txtMethod == true) {
    console.log('not working please turn off for now');
}




// Slack Here
  function slack(ipaddress) {
    if (slackMethod == false || slackToken == null) {
        console.log('we cannot proceede without either a slack method or token')
    } else {
        var parsed = "You IP Address is: "+ipaddress
        bot.postMessageToChannel(
            slackChannel,
            parsed,
            slackParams
        );
    }
  }  
// tele here
// -- not working
// text here
// -- not working


module.exports = { slack }