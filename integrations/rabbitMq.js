import amqp from "amqplib/callback_api.js";

const publisher = (queueName, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve();
            amqp.connect(process.env.RABBITMQ_URL, async (err, connection) => {
                connection.createChannel((err, channel) => {
                    channel.assertQueue(queueName, { durable: false });

                    const message = JSON.stringify(data);
                    channel.sendToQueue(queueName, Buffer.from(message));
                    console.log(`Event published: ${message}`);
                });
            });
        } catch (error) {
            console.log("=> rabbitMq.publisher :", error.toString());
        }
    });
};

export { publisher };
