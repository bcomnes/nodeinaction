var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client) {
    this.clients[id] = client;
    this.subscriptions[id] = function(senderId, message) {
        if (id != senderId) {
            this.clients[id].write(message);
        }
    };
    this.on('broadcast', this.subscriptions[id]);
});

var server = net.createServer(function (client) {
    var id = client.remoteAddress + ':' + client.remotePort;
    channel.emit('join', id, client);
    console.log('join emitted');
    console.log(id);
    console.log(client);
    client.on('data', function(data) {
        data = data.toString();
        channel.emit('broadcast', id, data);
        console.log('broadcast emitted');
        console.log(id);
        console.log(data);
    });
});

server.listen(8888);