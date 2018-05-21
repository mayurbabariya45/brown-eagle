import RSAA from "./symbol";
import { isRSAA, validateRSAA } from "./validation";
import { InvalidRSAA, RequestError } from "./errors";
import { normalizeTypeDescriptors, actionWith } from "./util";
/**
 * A Redux middleware that processes RSAA actions.
 *
 * @type {ReduxMiddleware}
 * @access public
 */

const BASE_URL = "http://35.200.219.57:8000/v1/";

function apiMiddleware({ getState }) {
  return next => action => {
    // Do not process actions without an [RSAA] property
    if (!isRSAA(action)) {
      return next(action);
    }

    return (async () => {
      // Try to dispatch an error request FSA for invalid RSAAs
      const validationErrors = validateRSAA(action);
      if (validationErrors.length) {
        const callAPI = action[RSAA];
        if (callAPI.types && Array.isArray(callAPI.types)) {
          let requestType = callAPI.types[0];
          if (requestType && requestType.type) {
            requestType = requestType.type;
          }
          next({
            type: requestType,
            payload: new InvalidRSAA(validationErrors),
            error: true
          });
        }
        return;
      }

      // Parse the validated RSAA action
      const callAPI = action[RSAA];
      let {
        endpoint,
        body,
        headers,
        options = {},
        fetch: doFetch = fetch
      } = callAPI;

      const { method, credentials, bailout, types } = callAPI;
      const [requestType, successType, failureType] = normalizeTypeDescriptors(
        types
      );

      // Should we bail out?
      try {
        if (
          (typeof bailout === "boolean" && bailout) ||
          (typeof bailout === "function" && bailout(getState()))
        ) {
          return;
        }
      } catch (e) {
        return next(
          await actionWith(
            {
              ...requestType,
              payload: new RequestError("[RSAA].bailout function failed"),
              error: true
            },
            [action, getState()]
          )
        );
      }

      // Process [RSAA].endpoint function
      if (typeof endpoint === "function") {
        try {
          endpoint = endpoint(getState());
        } catch (e) {
          return next(
            await actionWith(
              {
                ...requestType,
                payload: new RequestError("[RSAA].endpoint function failed"),
                error: true
              },
              [action, getState()]
            )
          );
        }
      }

      // Process [RSAA].body function
      if (typeof body === "function") {
        try {
          body = body(getState());
        } catch (e) {
          return next(
            await actionWith(
              {
                ...requestType,
                payload: new RequestError("[RSAA].body function failed"),
                error: true
              },
              [action, getState()]
            )
          );
        }
      }

      // Process [RSAA].headers function
      if (typeof headers === "function") {
        try {
          headers = headers(getState());
        } catch (e) {
          return next(
            await actionWith(
              {
                ...requestType,
                payload: new RequestError("[RSAA].headers function failed"),
                error: true
              },
              [action, getState()]
            )
          );
        }
      }

      // Process [RSAA].options function
      if (typeof options === "function") {
        try {
          options = options(getState());
        } catch (e) {
          return next(
            await actionWith(
              {
                ...requestType,
                payload: new RequestError("[RSAA].options function failed"),
                error: true
              },
              [action, getState()]
            )
          );
        }
      }

      // We can now dispatch the request FSA
      if (
        typeof requestType.payload === "function" ||
        typeof requestType.meta === "function"
      ) {
        next(await actionWith(requestType, [action, getState()]));
      } else {
        next(requestType);
      }
      try {
        // Make the API call
        const endpointUrl = !/^(f|ht)tps?:\/\//i.test(endpoint)
          ? BASE_URL + endpoint
          : endpoint;
        var res = await doFetch(endpointUrl, {
          ...options,
          method,
          body: body || undefined,
          credentials,
          headers: headers || {}
        });
      } catch (e) {
        // The request was malformed, or there was a network error
        return next(
          await actionWith(
            {
              ...requestType,
              payload: new RequestError(e.message),
              error: true
            },
            [action, getState()]
          )
        );
      }

      // Process the server response
      if (res.ok) {
        return next(await actionWith(successType, [action, getState(), res]));
      }
      return next(
        await actionWith(
          {
            ...failureType,
            error: true
          },
          [action, getState(), res]
        )
      );
    })();
  };
}

export { apiMiddleware };
