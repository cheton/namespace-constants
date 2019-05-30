# namespace-constants [![build status](https://travis-ci.org/cheton/namespace-constants.svg?branch=master)](https://travis-ci.org/cheton/namespace-constants) [![Coverage Status](https://coveralls.io/repos/github/cheton/namespace-constants/badge.svg?branch=master)](https://coveralls.io/github/cheton/namespace-constants?branch=master)

[![NPM](https://nodei.co/npm/namespace-constants.png?downloads=true&stars=true)](https://www.npmjs.com/package/namespace-constants)

Namespacing Redux action type constant values.

![image](https://user-images.githubusercontent.com/447801/58611444-acced780-82e1-11e9-9772-69cfaebcd679.png)

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

#### Pass constant values as an array of mixed types

```js
export const {
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO,
    SHOW_ALL,
    SHOW_COMPLETED,
    SHOW_ACTIVE,
    FETCH,
    EXPORT
} = constants('ns', [
    'ADD_TODO',
    'REMOVE_TODO',
    'TOGGLE_TODO',
    ['SHOW_ALL', 'SHOW_COMPLETED', 'SHOW_ACTIVE'],
    {
      'FETCH': ['REQUEST', 'SUCCESS', 'FAILURE'],
      'EXPORT': 'EXPORT'
    }
]);
// {
//   'ADD_TODO': 'ns:ADD_TODO',
//   'REMOVE_TODO': 'ns:REMOVE_TODO',
//   'TOGGLE_TODO': 'ns:TOGGLE_TODO',
//   'SHOW_ALL': 'ns:SHOW_ALL',
//   'SHOW_COMPLETED': 'ns:SHOW_COMPLETED',
//   'SHOW_ACTIVE': 'ns:SHOW_ACTIVE',
//   'FETCH': {
//     'REQUEST': 'ns:FETCH.REQUEST',
//     'SUCCESS': 'ns:FETCH.SUCCESS',
//     'FAILURE': 'ns:FETCH.FAILURE'
//   },
//   'EXPORT': 'ns:EXPORT'
// }
```

#### Pass constant values as an object of mixed types

```js
export const {
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO,
    SHOW_ALL,
    SHOW_COMPLETED,
    SHOW_ACTIVE,
    FETCH,
    EXPORT
} = constants('ns', {
    'ADD_TODO': 'ADD_TODO',
    'REMOVE_TODO': 'REMOVE_TODO',
    'TOGGLE_TODO': 'TOGGLE_TODO',
    'SHOW_ALL': 'SHOW_ALL',
    'SHOW_COMPLETED': 'SHOW_COMPLETED',
    'SHOW_ACTIVE': 'SHOW_ACTIVE',
    'FETCH': ['REQUEST', 'SUCCESS', 'FAILURE'],
    'EXPORT': 'EXPORT'
});
// {
//   'ADD_TODO': 'ns:ADD_TODO',
//   'REMOVE_TODO': 'ns:REMOVE_TODO',
//   'TOGGLE_TODO': 'ns:TOGGLE_TODO',
//   'SHOW_ALL': 'ns:SHOW_ALL',
//   'SHOW_COMPLETED': 'ns:SHOW_COMPLETED',
//   'SHOW_ACTIVE': 'ns:SHOW_ACTIVE',
//   'FETCH': {
//     'REQUEST': 'ns:FETCH.REQUEST',
//     'SUCCESS': 'ns:FETCH.SUCCESS',
//     'FAILURE': 'ns:FETCH.FAILURE'
//   },
//   'EXPORT': 'ns:EXPORT'
// }
```

## License

MIT
