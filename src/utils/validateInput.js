export const validateInput = (input) => {
    return {
        input: input[0],
        args: input.slice(1),
    };
}