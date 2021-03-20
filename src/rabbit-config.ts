import * as amqp from 'amqplib/callback_api';
const queue: string = "rabbit-mq-test";
const url_rabbit: string = 'amqp://localhost';

let channel: amqp.Channel = null;
loadChannel();

async function sendToQueue(msg: string): Promise<void> {

    if (!channel) {
        await loadChannel();
    }

    channel.sendToQueue(queue, Buffer.from(msg));
}

function loadChannel(): Promise<void> {

    return new Promise((resolve, reject) => {

        amqp.connect(url_rabbit, function (error0, connection) {

            if (error0) {
                reject(error0);
            }

            connection.createChannel(function (error1, ch) {
                if (error1) {
                    reject(error1);
                }

                ch.assertQueue(queue, { durable: false });
                ch.prefetch(1);

                channel = ch;
                resolve();
            });

        });

    });
}

async function readQueue(onMessage: (msg: amqp.Message) => void): Promise<void> {

    if (!channel) {
        await loadChannel();
    }

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, function (msg) {

        console.log(" [x] Received %s", msg.content.toString());
        onMessage(msg);

    }, {
        noAck: true
    });

}

export { readQueue, sendToQueue };