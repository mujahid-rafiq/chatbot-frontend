/**
 * Generic helper to extract a user-friendly error message from an Axios error response.
 */
export function getErrorMessage(error: any, defaultMessage: string = 'Something went wrong. Please try again.'): string {
    if (!error) return defaultMessage;

    // NestJS/Express standard error format: error.response.data.message
    const serverMessage = error.response?.data?.message;

    if (Array.isArray(serverMessage)) {
        return serverMessage[0]; // Return the first validation error if it's an array
    }

    if (typeof serverMessage === 'string') {
        return serverMessage;
    }

    return error.message || defaultMessage;
}
