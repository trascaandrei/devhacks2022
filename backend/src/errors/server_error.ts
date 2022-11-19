interface IError extends Error {
    statusCode: number;
};

export class ServerError implements IError {
    public message: string;
    public name: string;
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        this.message = message;
		this.name = this.constructor.name;
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
    }
};
