// error middleware ---------------------------------------->
const errorMiddleware = (err, req, res, next) => {
    const success = err.success ?? false;
    const status = err.status ?? 500;
    const code = err.code ?? 'INTERNAL_SERVER_ERROR';
    const message = err.message ?? 'Internal server error.';
    const details = err.details ?? null;

    return res.status(status).json({
        success: success,
        status: status,
        code: code,
        message: message,
        details: details,
    });
};

// export module ------------------------------------------->
export default errorMiddleware;
