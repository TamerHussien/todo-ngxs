import { Todo } from '../models';
import { TodoStateModel } from '../store/todo.state';
import { FilterType } from './filter-type.enum';

export const completeTodos = (): Todo[] => [
    { id: 2, text: 'B', completed: true },
    { id: 3, text: 'C', completed: true }
];

export const activeTodos = (): Todo[] => [{ id: 1, text: 'A', completed: false }];

export const todosArray = (): Todo[] => [...activeTodos(), ...completeTodos()];
export const todoState = (todos?: Todo[], filter?: string): TodoStateModel => ({
    todos: todos ? todos : todosArray(),
    filter: filter ? filter : FilterType.SHOW_ALL
});
export const todoStateNull = (todos?: Todo[], filter?: string): TodoStateModel => ({
    todos: null,
    filter: filter ? filter : FilterType.SHOW_ALL
});
export const todoStateUndefined = (todos?: Todo[], filter?: string): TodoStateModel => ({
    todos: undefined,
    filter: filter ? filter : FilterType.SHOW_ALL
});
export const stateTodoArrayString = () => ({
    todos: ['A', 'B', 'C', 'D']
});
export const stateTodoArrayNumbers = () => ({
    todos: [1, 2, 3, 4]
});

export const stateTodoArrayBooleans = () => ({
    todos: [true, true, true, false]
});
