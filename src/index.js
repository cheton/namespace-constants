const defaultOptions = {
    separator: ':'
};

const constants = (namespace = '', constants = [], options = defaultOptions) => {
    if (Array.isArray(namespace)) {
        constants = namespace;
        namespace = '';
    }

    options.separator = options.separator || defaultOptions.separator;

    // Prevent new properties from being added to it
    return Object.freeze(constants.reduce((memo, constant) => {
        return {
            ...memo,
            [constant]: namespace ? `${namespace}${options.separator}${constant}` : constant
        };
    }, {}));
};

module.exports = constants;
