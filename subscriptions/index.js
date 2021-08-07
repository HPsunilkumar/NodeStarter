var EventEmitter = require('events');
const mailSubscriptions = require('./mailSubscriptions');
class Events {
  static eventEmitter = new EventEmitter();
}
Events.eventEmitter.on('sendMail', (data) => {
  mailSubscriptions.sendMail(data);
});
module.exports = Events;