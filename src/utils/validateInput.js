export const validateInput = (input) => {
    if (!input[0]) {
        this.throwError();
    }

    return {
        input: input[0],
        args: input.slice(1),
    };
}