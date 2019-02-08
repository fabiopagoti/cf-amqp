const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
const express = require('express');
const amqp = require('amqplib/callback_api');

const app = express();
const amqpService = process.env.AMQP_SERVICE;
const connectionString = appEnv.getServiceURL(amqpService);

var amqpConnection;

app.get('/comprar', function (req, res) {

    amqpConnection.createChannel(function (err, ch) {
        var q = 'faturamento';
        var msg = req.query.id || "DUMMY";

        ch.assertQueue(q, { durable: false });
        ch.sendToQueue(q, Buffer.from(msg));
        console.log("Mensagem enviada a fila de faturamento", {
            id: msg
        });
        res.json({
            message: `Compra ${msg} concluída. Aguarde processar o pagamento.`
        });
        ch.close();
    });

});

app.listen(appEnv.port, function () {

    amqp.connect(connectionString, function (err, conn) {
        console.log(`App ENVIA iniciado em ${appEnv.url}`);
        amqpConnection = conn;
    });
});