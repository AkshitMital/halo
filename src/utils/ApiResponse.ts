class ApiResponse {
  statusCode: number;
  data: null | Record<string, unknown>;
  message: string;
  success: boolean;

  // Constructor accepts three parameters:
  // - statusCode: The HTTP status code (e.g., 200 for success, 404 for not found)
  // - data: The actual data you want to send in the response (e.g., user information, result of an operation)
  // - message: A message that describes the response (defaults to "Success" if not provided)
  constructor(
    statusCode: number,
    data: null | Record<string, unknown>,
    message: string = "Success" // Default value of "Success" for the message if not provided
  ) {
    // Initialize the properties of the ApiResponse instance with the values passed to the constructor
    this.statusCode = statusCode; // Set the statusCode property (e.g., 200, 404)
    this.data = data; // Set the data property (the actual data for the response)
    this.message = message; // Set the message property (defaults to "Success" if not passed)

    // Set the success property based on the statusCode:
    // - If the statusCode is less than 400 (e.g., 200, 201), it's a success (true)
    // - If the statusCode is 400 or above (e.g., 404, 500), it's a failure (false)
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
