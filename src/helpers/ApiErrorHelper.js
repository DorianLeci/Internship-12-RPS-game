import { ApiError } from "../error/ApiError.js";
import { Toast } from "../components/Toast/Toast.js";

export class ApiErrorHelper{
    static async handleApiError(error,onErrorCallback){

        if (error instanceof ApiError)
            await onErrorCallback(error.message)

        else await onErrorCallback("Unexpected error occurred");
        console.error(error);          
        }
}