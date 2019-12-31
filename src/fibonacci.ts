function fibonacci(num: number) : number {
    if (num < 2) {
        return num;
    }

    return fibonacci(num - 1) + fibonacci(num - 2);
}

export { fibonacci };