const { DateTime } = require('luxon');

function getDateTime() {
    let now = DateTime.fromObject({zone: 'America/New_York'});
    let rawTime = {
        hour: now.toFormat('hh'),
        minute: now.toFormat('mm'),
        meridiem: now.toFormat('a'),
        month: now.toFormat('LL'),
        day: now.toFormat('d'),
        year: now.toFormat('yyyy')
    }
    time = rawTime.hour+":"+rawTime.minute+" "+rawTime.meridiem+"  "+rawTime.month+"/"+rawTime.day+"/"+rawTime.year
    return time;
}
    
module.exports = { getDateTime }