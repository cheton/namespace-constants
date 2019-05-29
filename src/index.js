/* eslint import/no-commonjs: 0 */
const defaultOptions = {
    separator: ':',
};

const isPlainObject = (value) => {
    if (!value || typeof value !== 'object' || ({}).toString.call(value) !== '[object Object]') {
        return false;
    }
    const proto = Object.getPrototypeOf(value);
    if (proto === null) {
        return true;
    }
    const Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor === 'function' && Ctor instanceof Ctor && Function.prototype.toString.call(Ctor) === Function.prototype.toString.call(Object);
};

const constants = (namespace = '', values = [], options = defaultOptions) => {
    if (Array.isArray(namespace)) {
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

    values = values.reduce((memo, v) => {
        if (typeof v === 'function') {
            v = v();
        }

        return memo.concat(v);
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
            //     fetch: ['REQUEST', 'SUCCESS', 'FAILURE'],
            //     export: ['REQUEST', 'SUCCESS', 'FAILURE'],
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
            //   fetch: {
            //     REQUEST: 'ns:fetch.REQUEST',
            //     SUCCESS: 'ns:fetch.SUCCESS',
            //     FAILURE: 'ns:fetch.FAILURE',
            //   },
            //   export: {
            //     REQUEST: 'ns:export.REQUEST',
            //     SUCCESS: 'ns:export.SUCCESS',
            //     FAILURE: 'ns:export.FAILURE',
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
                    memo[objectKey] = withNamespace(`${objectKey}.${objectValue}`);
                }
            });
        } else {
            memo[value] = withNamespace(value);
        }

        return memo;
    }, {}));
};

module.exports = constants;
