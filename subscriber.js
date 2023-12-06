import amqp from "amqplib/callback_api.js";
import fs from "fs";
amqp.connect("amqp://localhost", (err, connection) => {
    if (err) {
        console.log(err);
    }
    connection.createChannel((err, channel) => {
        if (err) {
            console.log(err);
        }
        const queueName = "user_registered";
        channel.assertQueue(queueName, { durable: false });
        channel.consume(
            queueName,
            (message) => {
                const data = JSON.parse(message.content.toString());
                fs.writeFileSync("server.log", `${JSON.stringify({ queue: queueName, data, timeStamp: new Date() })}\n`, { flag: "a" });
                console.log(queueName, "Event Log Added");
            },
            { noAck: true }
        );
    });
});
