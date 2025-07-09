class ApiError extends Error {
  statusCode: number;
  data: null | Record<string, unknown>;
  success: boolean;
  errors: Array<Record<string, unknown>>;

  // Constructor accepts four parameters: statusCode, message, errors, stack
  constructor(
    statusCode: number,
    message: string = "Something went wrong", // Default message if not provided
    errors: Array<Record<string, unknown>> = [], // Default to empty array if no errors are passed
    stack: string = "" // Default to empty string if no stack is provided
  ) {
    super(message); // Call the parent Error constructor to set the message
    this.statusCode = statusCode; // Set the HTTP status code (e.g., 404, 500)
    this.data = null; // Set a data field to store additional error-related info
    this.message = message; // Set the error message
    this.success = false; // Set success to false to indicate failure
    this.errors = errors; // Store detailed errors (e.g., validation errors)

    // If a custom stack trace is provided, use it; otherwise, generate one
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor); // Generate stack trace
    }
  }
}

export { ApiError };
