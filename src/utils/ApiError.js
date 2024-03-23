class ApiError extends Error {
    constructor(
        statusCode,
        message ="Something went wrong",
        errors = [],
        statck = ""
    ){
        super(message)
        this.statusCode=statusCode
        this.data = null
        this.message = message
        this.success= false;//bcoz we handle api error not the api responses
        this.errors=errors

        if(statck){
            this.stack=statck
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}