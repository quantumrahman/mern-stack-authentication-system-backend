// class-constructor --------------------------------------->
class AppError extends Error {
    constructor(
        message,
        {
            success = false,
            status = 500,
            code = 'INTERNAL_SERVER_ERROR',
            details = null,
        } = {}
    ) {
        super(message);

        this.success = success;
        this.status = status;
        this.code = code;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);
    }
}

// export module ------------------------------------------->
export default AppError;
