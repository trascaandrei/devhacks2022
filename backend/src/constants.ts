export class Constants {

    public static STATUS_CODE = {
        BAD_REQUEST: 400,
        UNAUTHORIZED: 403,
        NOT_FOUND: 404,
        SERVER_ERROR: 500,
        OK: 200,
        CREATED: 201
    };

    public static ERR_MESSAGES = {
        SERVER_ERROR: 'server error',
        INVALID_DATA: 'invalid data',
        USER_NOT_FOUND: 'user not found',
        NOT_FOUND: 'not found',
        ACTION_CREATED: 'action created successfully',
        REQUEST_CREATED: 'request created successfully',
        UNAUTHORIZED: 'unauthorized',
        REQUEST_UPDATED: 'request updated successfully'
    };
};
