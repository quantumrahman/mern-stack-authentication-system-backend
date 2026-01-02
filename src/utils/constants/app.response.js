// class-constructor --------------------------------------->
class AppResponse {
    constructor(
        message,
        {
            success = true,
            status = 0,
            code = 'SUCCESS',
            data = {},
            details = null,
        } = {}
    ) {
        this.success = success;
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
        this.details = details;
        this.timestamp = new Date().toISOString();
    }
}

export default AppResponse;
