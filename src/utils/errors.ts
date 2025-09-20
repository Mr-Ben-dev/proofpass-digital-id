export const getErrorMessage = (error: any): string => {
    if (error?.shortMessage) {
        return error.shortMessage;
    }
    if (error?.message) {
        return error.message;
    }
    return "An unknown error occurred.";
};
