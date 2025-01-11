// lib/exceptions.ts

export class HttpException extends Error {
  public status: number;
  public message: string;
  public data?: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.message = message;
    this.data = data;

    // Set the prototype explicitly to maintain instanceof checks
    Object.setPrototypeOf(this, HttpException.prototype);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = "Bad Request", data?: any) {
    super(400, message, data);
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string = "Unauthorized", data?: any) {
    super(401, message, data);
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string = "Forbidden", data?: any) {
    super(403, message, data);
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = "Not Found", data?: any) {
    super(404, message, data);
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string = "Internal Server Error", data?: any) {
    super(500, message, data);
    Object.setPrototypeOf(this, InternalServerErrorException.prototype);
  }
}
