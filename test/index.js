import { test } from 'tap';
import constants from '../src';

test('global action constants', (t) => {
    const result = constants(['ADD_TODO', 'REMOVE_TODO', 'TOGGLE_TODO']);
    const wanted = {
        'ADD_TODO': 'ADD_TODO',
        'REMOVE_TODO': 'REMOVE_TODO',
        'TOGGLE_TODO': 'TOGGLE_TODO'
    };
    t.same(result, wanted);
    t.end();
});

test('namespace action constants', (t) => {
    const result = constants('todos', ['ADD_TODO', 'REMOVE_TODO', 'TOGGLE_TODO']);
    const wanted = {
        'ADD_TODO': 'todos:ADD_TODO',
        'REMOVE_TODO': 'todos:REMOVE_TODO',
        'TOGGLE_TODO': 'todos:TOGGLE_TODO'
    };
    t.same(result, wanted);
    t.end();
});

test('namespace action constants with a custom separator', (t) => {
    const result = constants('todos', ['ADD_TODO', 'REMOVE_TODO', 'TOGGLE_TODO'], { separator: '/' });
    const wanted = {
        'ADD_TODO': 'todos/ADD_TODO',
        'REMOVE_TODO': 'todos/REMOVE_TODO',
        'TOGGLE_TODO': 'todos/TOGGLE_TODO'
    };
    t.same(result, wanted);
    t.end();
});

test('namespace action constants with a custom transform', (t) => {
    const result = constants('todos', [
        'add todo',
        'remove todo',
        'toggle todo'
    ], {
        separator: '/',
        transform: v => v.replace(/\ /g, '_').toUpperCase()
    })
    const wanted = {
        'ADD_TODO': 'todos/ADD_TODO',
        'REMOVE_TODO': 'todos/REMOVE_TODO',
        'TOGGLE_TODO': 'todos/TOGGLE_TODO'
    };
    t.same(result, wanted);
    t.end();
})

test('namespace action constants with a custom separator and custom transform', (t) => {
    const result = constants('todos', [
        'add todo',
        'remove todo',
        'toggle todo'
    ], {
        transform: v => v.replace(/\ /g, '_').toUpperCase()
    })
    const wanted = {
        'ADD_TODO': 'todos:ADD_TODO',
        'REMOVE_TODO': 'todos:REMOVE_TODO',
        'TOGGLE_TODO': 'todos:TOGGLE_TODO'
    };
    t.same(result, wanted);
    t.end();
})