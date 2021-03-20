import { readQueue } from '../rabbit-config';
import { fibonacci } from '../fibonacci';


run();

function run() : void {
    readQueue(msg => {
        console.log(fibonacci(parseInt(msg.content.toString())));
    })
}

