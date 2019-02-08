var amqp = require('amqplib/callback_api');

amqp.connect('amqp://ctzqehdt:fnfbrAlufTpbOiLA6W7Z5Su5rXzCkIz1@salamander.rmq.cloudamqp.com/ctzqehd?connection_timeout=30&heartbeat=60', function(err, conn) {

	if(err){
		console.log(err);
		return;
	}
	console.log('connected');
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});