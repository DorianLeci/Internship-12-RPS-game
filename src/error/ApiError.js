export class ApiError extends Error{

    constructor(message,status){
            super(message);
            this.name="ApiError";
            this.status=status;
    }

    static createRoundError(status){
        return new ApiError("CREATE_ROUND_FAILED",status);
    }

    static getRoundError(status,roundId){
        return new ApiError(`GET_ROUND_FAILED, id: ${roundId} `,status);
    }

    static getAllRoundsError(status){
        return new ApiError('GET_ALL_ROUNDS_FAILED',status);
    }

    static updateRoundError(status,roundId){
        return new ApiError(`UPDATE_ROUND_FAILED, id: ${roundId}`,status);
    }

    static networkError(status){
        return new ApiError("NETWORK_ERROR",0);
    }

}