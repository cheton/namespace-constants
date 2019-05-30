/* eslint import/no-commonjs: 0 */
const defaultOptions = {
    separator: ':',
};

// Checks if `value` is object-like. A value is object-like if it's not `null` and has a `typeof` result of "object".
const isObjectLike = (value) => (typeof value === 'object' && value !== null);

// Checks if `value` is a plain object, that is, an object created by the `Object` constructor or one with a `[[Prototype]]` of `null`.
const isPlainObject = (value) => {
    if (!isObjectLike(value) || ({}).toString.call(value) !== '[object Object]') {
        return false;
    }

    if (Object.getPrototypeOf(value) === null) {
        return true;
    }

    let proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(value) === proto;
};

const constants = (namespace = '', values = [], options = defaultOptions) => {
    if (isObjectLike(namespace)) {
        values = namespace;
        namespace = '';
    }

    options.separator = options.separator || defaultOptions.separator;

    const withNamespace = (value) => {
        if (namespace) {
            return `${namespace}${options.separator}${value}`;
        }
        return value;
    };

    // If the `values` is not object-like, pass an empty array to the `values`.
    if (!isObjectLike(values)) {
        values = [];
    }

    // If the `values` is object-like but not an array, it will be wrapped with an array.
    //
    // ```js
    // {
    //   FETCH: ['REQUEST', 'SUCCESS', 'FAILURE']
    // }
    // ```
    //
    // will be converted to:
    //
    // ```js
    // [{
    //   FETCH: ['REQUEST', 'SUCCESS', 'FAILURE']
    // }]
    // ```
    if (!Array.isArray(values)) {
        values = [values];
    }

    values = values.reduce((memo, value) => {
        if (typeof value === 'function') {
            value = value();
        }
        return memo.concat(value);
    }, []);

    // Prevent new properties from being added to it
    return Object.freeze(values.reduce((memo, value) => {
        if (isPlainObject(value)) {
            // ```js
            // constants('ns', [
            //   'ADD_TODO',
            //   'REMOVE_TODO',
            //   'TOGGLE_TODO',
            //   {
            //     FETCH: ['REQUEST', 'SUCCESS', 'FAILURE'],
            //     EXPORT: ['REQUEST', 'SUCCESS', 'FAILURE'],
            //   }
            // ], { separator: ':' });
            // ```
            //
            // will produce the following output:
            //
            // ```js
            // { 
            //   ADD_TODO: 'ns:ADD_TODO',
            //   REMOVE_TODO: 'ns:REMOVE_TODO',
            //   TOGGLE_TODO: 'ns:TOGGLE_TODO',
            //   FETCH: {
            //     REQUEST: 'ns:FETCH.REQUEST',
            //     SUCCESS: 'ns:FETCH.SUCCESS',
            //     FAILURE: 'ns:FETCH.FAILURE',
            //   },
            //   EXPORT: {
            //     REQUEST: 'ns:EXPORT.REQUEST',
            //     SUCCESS: 'ns:EXPORT.SUCCESS',
            //     FAILURE: 'ns:EXPORT.FAILURE',
            //   }
            // }
            // ```
            Object.keys(value).forEach(objectKey => {
                const objectValue = value[objectKey];

                if (Array.isArray(objectValue)) {
                    memo[objectKey] = { ...memo[objectKey] };
                    objectValue.forEach(v => {
                        memo[objectKey][v] = withNamespace(`${objectKey}.${v}`);
                    });
                } else {
                    memo[objectKey] = withNamespace(objectKey);
                }
            });
        } else {
            memo[value] = withNamespace(value);
        }

        return memo;
    }, {}));
};

module.exports = constants;
