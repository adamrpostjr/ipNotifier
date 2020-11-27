const axios = require('axios');
const Datastore = require('nedb');
const tools = require('./tools.js');
const notifer = require('./notifer.js')
const ip = new Datastore({ filename: 'ip.db', autoload: true });

require('dotenv').config()
var methods = process.env.METHODS

// we check the ip every hour after the applicaion has started. 
function checkIp() {
    axios.get('https://myexternalip.com/raw').then(function (resp) {
        addToDb(resp.data)
    })
    setTimeout(() => {
        checkIp()
    }, 60000 * 60); // this is one hour
}
checkIp()


function addToDb(ipAddr) {
    var time = tools.getDateTime() 
    ip.find({ip: ipAddr}, function(err, docs){
        if (docs.length == 0) {
            console.log('Added '+ipAddr+' to database at '+time);
            newIp = {ip: ipAddr, date: time}
            ip.insert(newIp)
            notify(ipAddr, methods)
        } else {
            console.log('Checked at '+time+',  IP address has not changed, will check again in one hour')
        }
    })
}
function notify(ip) {
    // methods could come in an array
    // Notify Method 1 -- Slack
    notifier.slack(ip)
    // Notify Method 2 -- Telegram

    // Notify Method 3 -- text

}