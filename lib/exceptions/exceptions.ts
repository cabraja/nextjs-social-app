export class BubbleNotFoundError extends Error {
  constructor(message = "Bubble was not found.") {
    super(message);
    this.name = "BubbleNotFoundError";
  }
}

export class BubbleAccessDeniedError extends Error {
  constructor(message = "You cannot access this bubble.") {
    super(message);
    this.name = "BubbleAccessDeniedError";
  }
}

export class ServerError extends Error {
  constructor(message = "Error occured on the server.") {
    super(message);
    this.name = "ServerError";
  }
}
