
var amqp = require('amqplib/callback_api');


console.log('*** SEND.JS ***');
amqp.connect('amqp://ctzqehdt:fnfbrAlufTpbOiLA6W7Z5Su5rXzCkIz1@salamander.rmq.cloudamqp.com/ctzqehd?connection_timeout=30&heartbeat=60', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';
    var msg = 'Hello World!';

    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});