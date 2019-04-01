import { updateManyItems } from './update-many-items';
import { FilterType } from '../../utils';
import { patch } from '@ngxs/store/operators';
import { Todo } from '../../models';
import { TodoStateModel } from '../todo.state';

describe('update items', () => {
    let todoStateNull: (todos?: Todo[], filter?: string) => TodoStateModel;
    let todoStateUndefined: (todos?: Todo[], filter?: string) => TodoStateModel;
    let stateTodoArrayString;
    let stateTodoArrayNumbers;
    let stateTodoArrayBooleans;
    let todoState: (todos?: Todo[], filter?: string) => TodoStateModel;
    let todosArray: Todo[];
    let activeTodos: Todo[];
    let completeTodos: Todo[];
    beforeEach(() => {
        todoStateNull = (todos?: Todo[], filter?: string): TodoStateModel => ({
            todos: null,
            filter: filter ? filter : FilterType.SHOW_ALL
        });
        todoStateUndefined = (todos?: Todo[], filter?: string): TodoStateModel => ({
            todos: undefined,
            filter: filter ? filter : FilterType.SHOW_ALL
        });
        stateTodoArrayString = {
            todos: ['A', 'B', 'C', 'D']
        };
        stateTodoArrayNumbers = {
            todos: [1, 2, 3, 4]
        };

        stateTodoArrayBooleans = {
            todos: [true, true, true, false]
        };
        todoState = (todos?: Todo[], filter?: string): TodoStateModel => ({
            todos: todos ? todos : todosArray,
            filter: filter ? filter : FilterType.SHOW_ALL
        });
        completeTodos = [{ id: 2, text: 'B', completed: true }, { id: 3, text: 'C', completed: true }];
        activeTodos = [{ id: 1, text: 'A', completed: false }];
        todosArray = [...activeTodos, ...completeTodos];
    });
    describe('when null provided', () => {
        test('should return the same root if selector is null', () => {
            const original = todoState();
            const newValue = patch({
                todos: updateManyItems(null, {})
            })(original);
            expect(newValue).toBe(original);
        });

        test('should return the same root if operatorOrValue is null', () => {
            const original = todoState();
            const newValue = patch({
                todos: updateManyItems(() => true, null)
            })(original);
            expect(newValue).toBe(original);
        });

        test('should return the same root if source is null', () => {
            const original = todoStateNull();
            const newValue = patch({
                todos: updateManyItems(() => true, {})
            })(original);
            expect(newValue).toBe(original);
        });
    });

    describe('when undefined provided', () => {
        test('should return the same root if selector is undefined', () => {
            const original = todoState();
            const newValue = patch({
                todos: updateManyItems(undefined, {})
            })(original);
            expect(newValue).toBe(original);
        });
        test('should return the same root if operatorOrValue is undefined', () => {
            const original = todoState();
            const newValue = patch({
                todos: updateManyItems(() => true, undefined)
            })(original);
            expect(newValue).toBe(original);
        });

        test('should return the same root if source is undefined', () => {
            const original = todoStateUndefined();
            const newValue = patch<any>({
                a: updateManyItems(() => true, {})
            })(original);
            expect(newValue).toBe(original);
        });
    });

    describe('when exist any index that are invalid', () => {
        test('should return the same root if exist any indices invalid', () => {
            const original = stateTodoArrayBooleans;
            const newValue: {
                todos: boolean[];
            } = patch({
                todos: updateManyItems<boolean>([0, 50], false)
            })(original);

            expect(newValue.todos).toEqual(original.todos);
        });
    });
    describe('when source is a primitive array', () => {
        test('should return a new root with changed items if operatorOrValue provided is a value', () => {
            const newValue: {
                todos: string[];
            } = patch({
                todos: updateManyItems<string>(item => item === 'C', 'H')
            })(stateTodoArrayString);

            expect(newValue.todos).toEqual(['A', 'B', 'H', 'D']);
        });
    });

    describe('when source is a object array', () => {
        test('should return a new root with the items changed', () => {
            const original = todoState();
            const newValue = patch<TodoStateModel>({
                todos: updateManyItems<Todo>(item => item.completed === true, patch<Todo>({ text: 'completed!' }))
            })(original);

            expect(newValue.todos).toEqual([
                { id: 1, text: 'A', completed: false },
                { id: 2, text: 'completed!', completed: true },
                { id: 3, text: 'completed!', completed: true }
            ]);
        });

        test('should return a new root with the items changed if operatorOrValue provide is a partial', () => {
            const original = todoState();
            const newValue = patch<TodoStateModel>({
                todos: updateManyItems<Todo>(item => item.completed === true, { text: 'completed!' })
            })(original);

            expect(newValue.todos).toEqual([
                { id: 1, text: 'A', completed: false },
                { id: 2, text: 'completed!', completed: true },
                { id: 3, text: 'completed!', completed: true }
            ]);
        });
    });
});
