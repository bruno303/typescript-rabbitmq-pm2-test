import { MyEvent } from "./myEvent";
import { sendToQueue } from "./rabbit-config";

const event: MyEvent = new MyEvent();
const maxLoop: number = 50;
const intervalTime: number = 5000;

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