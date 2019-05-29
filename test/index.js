import { test } from 'tap';
import constants from '../src';

test('global constants', (t) => {
    test('an array of strings', (t) => {
        const result = constants(['ADD_TODO', 'REMOVE_TODO', 'TOGGLE_TODO']);
        const wanted = {
            'ADD_TODO': 'ADD_TODO',
            'REMOVE_TODO': 'REMOVE_TODO',
            'TOGGLE_TODO': 'TOGGLE_TODO'
        };
        t.same(result, wanted);
        t.end();
    });

    test('an array of arrays of strings', (t) => { 
        const result = constants([
            ['ADD_TODO', 'REMOVE_TODO', 'TOGGLE_TODO'],
            ['SHOW_ALL', 'SHOW_COMPLETED', 'SHOW_ACTIVE'],
        ]);
        const wanted = {
            'ADD_TODO': 'ADD_TODO',
            'REMOVE_TODO': 'REMOVE_TODO',
            'TOGGLE_TODO': 'TOGGLE_TODO',
            'SHOW_ALL': 'SHOW_ALL',
            'SHOW_COMPLETED': 'SHOW_COMPLETED',
            'SHOW_ACTIVE': 'SHOW_ACTIVE',
        };
        t.same(result, wanted);
        t.end();
    });

    test('an array of functions returning an array of strings', (t) => { 
        const f = (name) => () => ([`ADD_${name}`, `REMOVE_${name}`, `TOGGLE_${name}`]);
        const result = constants([
            f('TODO'),
            () => ['SHOW_ALL', 'SHOW_COMPLETED', 'SHOW_ACTIVE'],
        ]);
        const wanted = {
            'ADD_TODO': 'ADD_TODO',
            'REMOVE_TODO': 'REMOVE_TODO',
            'TOGGLE_TODO': 'TOGGLE_TODO',
            'SHOW_ALL': 'SHOW_ALL',
            'SHOW_COMPLETED': 'SHOW_COMPLETED',
            'SHOW_ACTIVE': 'SHOW_ACTIVE',
        };
        t.same(result, wanted);
        t.end();
    });

    test('an array of strings or objects', (t) => { 
        const result = constants([
            'ADD_TODO',
            'REMOVE_TODO',
            'TOGGLE_TODO',
            {
                FETCH: ['REQUEST', 'SUCCESS', 'FAILURE'],
                EXPORT: 'REQUEST'
            }
        ]);
        const wanted = {
            'ADD_TODO': 'ADD_TODO',
            'REMOVE_TODO': 'REMOVE_TODO',
            'TOGGLE_TODO': 'TOGGLE_TODO',
            'FETCH': {
                REQUEST: 'FETCH.REQUEST',
                SUCCESS: 'FETCH.SUCCESS',
                FAILURE: 'FETCH.FAILURE'
            },
            'EXPORT': 'EXPORT.REQUEST'
        };
        t.same(result, wanted);
        t.end();
    });

    test('custom separator', (t) => {
        const result = constants(['ADD_TODO', 'REMOVE_TODO', 'TOGGLE_TODO'], { separator: '/' });
        const wanted = {
            'ADD_TODO': 'ADD_TODO',
            'REMOVE_TODO': 'REMOVE_TODO',
            'TOGGLE_TODO': 'TOGGLE_TODO'
        };
        t.same(result, wanted);
        t.end();
    });

    t.end();
});

test('namespace constants', (t) => {
    test('an array of strings', (t) => {
        const result = constants('ns', ['ADD_TODO', 'REMOVE_TODO', 'TOGGLE_TODO']);
        const wanted = {
            'ADD_TODO': 'ns:ADD_TODO',
            'REMOVE_TODO': 'ns:REMOVE_TODO',
            'TOGGLE_TODO': 'ns:TOGGLE_TODO'
        };
        t.same(result, wanted);
        t.end();
    });

    test('an array of arrays of strings', (t) => { 
        const result = constants('ns', [
            ['ADD_TODO', 'REMOVE_TODO', 'TOGGLE_TODO'],
            ['SHOW_ALL', 'SHOW_COMPLETED', 'SHOW_ACTIVE'],
        ]);
        const wanted = {
            'ADD_TODO': 'ns:ADD_TODO',
            'REMOVE_TODO': 'ns:REMOVE_TODO',
            'TOGGLE_TODO': 'ns:TOGGLE_TODO',
            'SHOW_ALL': 'ns:SHOW_ALL',
            'SHOW_COMPLETED': 'ns:SHOW_COMPLETED',
            'SHOW_ACTIVE': 'ns:SHOW_ACTIVE',
        };
        t.same(result, wanted);
        t.end();
    });

    test('an array of functions returning an array of strings', (t) => { 
        const f = (name) => () => ([`ADD_${name}`, `REMOVE_${name}`, `TOGGLE_${name}`]);
        const result = constants('ns', [
            f('TODO'),
            () => ['SHOW_ALL', 'SHOW_COMPLETED', 'SHOW_ACTIVE'],
        ]);
        const wanted = {
            'ADD_TODO': 'ns:ADD_TODO',
            'REMOVE_TODO': 'ns:REMOVE_TODO',
            'TOGGLE_TODO': 'ns:TOGGLE_TODO',
            'SHOW_ALL': 'ns:SHOW_ALL',
            'SHOW_COMPLETED': 'ns:SHOW_COMPLETED',
            'SHOW_ACTIVE': 'ns:SHOW_ACTIVE',
        };
        t.same(result, wanted);
        t.end();
    });

    test('an array of strings or objects', (t) => { 
        const result = constants('ns', [
            'ADD_TODO',
            'REMOVE_TODO',
            'TOGGLE_TODO',
            {
                FETCH: ['REQUEST', 'SUCCESS', 'FAILURE'],
                EXPORT: 'REQUEST'
            }
        ]);
        const wanted = {
            'ADD_TODO': 'ns:ADD_TODO',
            'REMOVE_TODO': 'ns:REMOVE_TODO',
            'TOGGLE_TODO': 'ns:TOGGLE_TODO',
            'FETCH': {
                REQUEST: 'ns:FETCH.REQUEST',
                SUCCESS: 'ns:FETCH.SUCCESS',
                FAILURE: 'ns:FETCH.FAILURE'
            },
            'EXPORT': 'ns:EXPORT.REQUEST'
        };
        t.same(result, wanted);
        t.end();
    });

    test('custom separator', (t) => {
        const result = constants('ns', ['ADD_TODO', 'REMOVE_TODO', 'TOGGLE_TODO'], { separator: '/' });
        const wanted = {
            'ADD_TODO': 'ns/ADD_TODO',
            'REMOVE_TODO': 'ns/REMOVE_TODO',
            'TOGGLE_TODO': 'ns/TOGGLE_TODO'
        };
        t.same(result, wanted);
        t.end();
    });

    t.end();
});
