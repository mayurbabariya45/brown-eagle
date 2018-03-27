import RSAA from './symbol';
import {isRSAA, validateRSAA, isValidRSAA} from './validation';
import {InvalidRSAA, InternalError, RequestError, ApiError} from './errors';
import {getJSON} from './util';
import {apiMiddleware} from './middleware';

export {
    // Alias RSAA to CALL_API to smooth v1 - v2 migration
    // TODO: Deprecate in v3
    RSAA as CALL_API,
    RSAA,
    isRSAA,
    validateRSAA,
    isValidRSAA,
    InvalidRSAA,
    InternalError,
    RequestError,
    ApiError,
    getJSON,
    apiMiddleware
};