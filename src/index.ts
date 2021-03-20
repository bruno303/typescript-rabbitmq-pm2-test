import { MyEvent } from "./MyEvent";
import { sendToQueue } from "./rabbit-config";

const event = new MyEvent();
const maxLoop = 50;
const intervalTime = 5000;

event.on('run', () => {
    for (let i: number = 0; i < maxLoop; i++) {
        sendToQueue(i.toString());
    }
});

event.on('run2', () => {
    for (let i: number = 0; i < maxLoop; i++) {
        sendToQueue(i.toString());
    }
});

setInterval(() => {
    event.emit('run');
    event.emit('run2');
}, intervalTime);