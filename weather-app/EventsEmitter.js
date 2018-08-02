
const util = require('util');

var EventsEmitter = {
    events: {},
    on: function (type, listener) {
        if (!util.isFunction(listener)) {
            throw TypeError('Listener must be a function');
        }
        this.events[type] = this.events[type] || [];
        this.events[type].push(listener);
    },
    emit: function (type) {
        if (this.events[type]) {
            this.events[type].forEach((listener) => listener.call(this));
        }
    }
};

module.exports = EventsEmitter;

// module.exports = (function (g) {

//     var EventsEmitter = function () {
//         return new EventsEmitter.Init();
//     }

//     EventsEmitter.prototype.on = function (type, listener) {
//         if (!util.isFunction(listener)) {
//             throw TypeError('Listener must be a function');
//         }
//         this.events[type] = this.events[type] || [];
//         this.events[type].push(listener);
//     };

//     EventsEmitter.prototype.emit = function (type) {
//         if (this.events[type]) {
//             this.events[type].forEach((listener) => listener.call(this));
//         }
//     }

//     EventsEmitter.Init = function () {
//         var self = this;
//         self.events = {};
//     }

//     EventsEmitter.Init.prototype = EventsEmitter.prototype;

//     g.$Events = EventsEmitter;

// }(global));