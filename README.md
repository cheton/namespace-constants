# namespace-constants [![build status](https://travis-ci.org/cheton/namespace-constants.svg?branch=master)](https://travis-ci.org/cheton/namespace-constants) [![Coverage Status](https://coveralls.io/repos/github/cheton/namespace-constants/badge.svg?branch=master)](https://coveralls.io/github/cheton/namespace-constants?branch=master)

[![NPM](https://nodei.co/npm/namespace-constants.png?downloads=true&stars=true)](https://www.npmjs.com/package/namespace-constants)

Add namespace to Redux action type constants without name conflicts.

## Installation

```bash
npm install --save namespace-constants
```

## Examples

### Global Constants

```js
import constants from 'namespace-constants';

export const {
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO
} = constants([
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

### Namespace Constants

```js
import constants from 'namespace-constants';

export const {
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO
} = constants('ns', [
    'ADD_TODO',
    'REMOVE_TODO',
    'TOGGLE_TODO'
]);
// {
//   'ADD_TODO': 'ns:ADD_TODO',
//   'REMOVE_TODO': 'ns:REMOVE_TODO'
//   'TOGGLE_TODO': 'ns:TOGGLE_TODO'
// }
```

#### Mixing with string and object types

```js
const result = constants('ns', [
    'ADD_TODO',
    'REMOVE_TODO',
    'TOGGLE_TODO',
    {
	FETCH: ['REQUEST', 'SUCCESS', 'FAILURE'],
	EXPORT: 'REQUEST'
    }
]);
// {
//   'ADD_TODO': 'ns:ADD_TODO',
//   'REMOVE_TODO': 'ns:REMOVE_TODO',
//   'TOGGLE_TODO': 'ns:TOGGLE_TODO',
//   'FETCH': {
//     'REQUEST': 'ns:FETCH.REQUEST',
//     'SUCCESS': 'ns:FETCH.SUCCESS',
//     'FAILURE': 'ns:FETCH.FAILURE'
//   },
//   'EXPORT': 'ns:EXPORT.REQUEST'
// }
```

#### Use a custom separator

```js
export const {
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO
} = constants('ns', [
    'ADD_TODO',
    'REMOVE_TODO',
    'TOGGLE_TODO'
], { separator: '/' });
// {
//   'ADD_TODO': 'ns/ADD_TODO',
//   'REMOVE_TODO': 'ns/REMOVE_TODO'
//   'TOGGLE_TODO': 'ns/TOGGLE_TODO'
// }
```

## License

MIT
