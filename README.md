# namespace-constants [![build status](https://travis-ci.org/cheton/namespace-constants.svg?branch=master)](https://travis-ci.org/cheton/namespace-constants) [![Coverage Status](https://coveralls.io/repos/github/cheton/namespace-constants/badge.svg?branch=master)](https://coveralls.io/github/cheton/namespace-constants?branch=master)

[![NPM](https://nodei.co/npm/namespace-constants.png?downloads=true&stars=true)](https://www.npmjs.com/package/namespace-constants)

Add namespace to Redux action type constants without name conflicts.

## Installation

```bash
npm install --save namespace-constants
```

## Examples

#### Global Constants
```js
import constants from 'namespace-constants';

module.exports = constants([
    'ADD_TODO',
    'REMOVE_TODO',
    'TOGGLE_TODO'
]);
// {
//   'ADD_TODO': 'ADD_TODO',
//   'REMOVE_TODO': 'REMOVE_TODO'
//   'TOGGLE_TODO': 'TOGGLE_TODO'
// }
```

#### Namespace Constants
```js
import constants from 'namespace-constants';

module.exports = constants('todos', [
    'ADD_TODO',
    'REMOVE_TODO',
    'TOGGLE_TODO'
]);
// {
//   'ADD_TODO': 'todos:ADD_TODO',
//   'REMOVE_TODO': 'todos:REMOVE_TODO'
//   'TOGGLE_TODO': 'todos:TOGGLE_TODO'
// }
```

You can pass custom separator as below:
```js
module.exports = constants('todos', [
    'ADD_TODO',
    'REMOVE_TODO',
    'TOGGLE_TODO'
], { separator: '/' });
// {
//   'ADD_TODO': 'todos/ADD_TODO',
//   'REMOVE_TODO': 'todos/REMOVE_TODO'
//   'TOGGLE_TODO': 'todos/TOGGLE_TODO'
// }
```

## License

Copyright (c) 2016 Cheton Wu

Licensed under the [MIT License](LICENSE).
