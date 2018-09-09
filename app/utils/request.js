export function isJsonContent(response) {
    const contentType = response.headers.get('content-type');
    return typeof contentType === 'string'
        && !!contentType.match(/^application\/json\b/);
}

/**
 * Parses the response body returned by a network request
 *
 * @param  {object} response A response from a network request
 * @returns {string|object} The parsed body from the request
 */
export async function getBody(response) {
    if (response.status === 204) {
        return null;
    }

    return isJsonContent(response)
        ? response.json()
        : response.text();
}

export function buildApiUrl(url, params) {
    let [
        path,
        query,
    ] = url.split('?');

    path = path.replace(/{(\w+)}/g, (match, key) => {
        return params[key] == null
            ? String(params[key])
            : encodeURIComponent(params[key]);
    });

    query = (query || '').split('&')
        .map((part) => {
            const match = part.match(/^([\w_]+)={(\w+)}$/);

            // Keep the part as-is if it doesn't contain a param to replace.
            if (!match) {
                return part;
            }

            const value = params[match[2]];

            // Skip the part if the param value is undefined.
            if (value === undefined) {
                return null;
            }

            return `${match[1]}=${encodeURIComponent(value)}`;
        })
        .filter((v) => v !== null)
        .join('&');

    return `${path}${query ? `?${query}` : ''}`;
}

/**
 *
 * @param {string} url
 * @param {object} [options]
 * @returns {Promise.<object>}
 */
export async function requestJson(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        mode: 'cors',
        credentials: 'same-origin',
    });

    if (!isJsonContent(response)) {
        const error = new Error(`Expected JSON response (${response.status} ${response.statusText}): ${response.headers.get('content-type')}`);
        error.status = response.status;
        error.isJson = false;
        error.contentType = response.headers.get('content-type');

        Object.defineProperty(error, 'getResponse', {
            enumerable: false,
            value: () => response,
        });

        throw error;
    }

    if (response.ok) {
        try {
            return await response.json();
        }
        catch (err) {
            err.message = `Invalid JSON: ${err.message}`;
            throw err;
        }
    }

    const error = new Error(response.statusText);
    error.status = response.status;
    error.isJson = true;

    try {
        error.body = await response.json();
    }
    catch (err) {
        error.message = `Invalid JSON: ${err.message}`;
    }

    Object.defineProperty(error, 'getResponse', {
        enumerable: false,
        value: () => response,
    });

    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url - The URL we want to request.
 * @param  {object} [options] - The options we want to pass to "fetch".
 * @returns {Promise.<object|string>} The response data.
 */
export async function request(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        mode: 'cors',
    });

    if (response.ok) {
        return getBody(response);
    }

    const error = new Error(response.statusText);
    error.status = response.status;
    error.isJson = isJsonContent(response);

    if (error.isJson) {
        error.body = await response.json();
    }

    Object.defineProperty(error, 'getResponse', {
        enumerableiterable: false,
        value: () => response,
    });

    throw error;
}
