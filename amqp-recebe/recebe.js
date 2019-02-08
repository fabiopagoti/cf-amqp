const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
const express = require('express');
const amqp = require('amqplib/callback_api');

const app = express();
const amqpService = process.env.AMQP_SERVICE;
// console.log(`Serviço: ${amqpService}`);
const connectionString = appEnv.getServiceURL(amqpService);
// console.log(`Conexão: ${connectionString}`);


app.get('/', function (req, res) {
    res.json({
        message: 'Esperando mensagens na fila...'
    });
});

app.listen(appEnv.port, function () {

    amqp.connect(connectionString, function (err, conn) {
        console.log(`App RECEBE iniciado em ${appEnv.url}. Esperando mensagens da fila...`);

        conn.createChannel(function (err, ch) {
            var q = 'faturamento';
            ch.assertQueue(q, { durable: false });
            ch.consume(q, function (msg) {
                console.log("Faturando compra %s", msg.content.id.toString());
            }, { noAck: true });

        });
    });
});
