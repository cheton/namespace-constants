const defaultOptions = {
    separator: ':',
    transform: v => v
};

const constants = (namespace = '', constants = [], options = defaultOptions) => {
    if (Array.isArray(namespace)) {
        constants = namespace;
        namespace = '';
    }

    options.separator = options.separator || defaultOptions.separator;
    options.transform = options.transform || defaultOptions.transform;

    // Prevent new properties from being added to it
    return Object.freeze(constants.reduce((memo, constant) => {
        const transformedConstant = options.transform(constant)
        return {
            ...memo,
            [transformedConstant]: namespace ? `${namespace}${options.separator}${transformedConstant}` : transformedConstant
        };
    }, {}));
};

module.exports = constants;
