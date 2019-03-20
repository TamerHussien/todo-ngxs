import { updateManyItems } from './update-many-items';
import {
    stateTodoArrayBooleans,
    stateTodoArrayString,
    todoState,
    todoStateNull,
    todoStateUndefined
} from '../../utils';
import { patch } from '@ngxs/store/operators';
import { Todo } from '../../models';

describe('update items', () => {
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
            const original = stateTodoArrayBooleans();
            const newValue = patch({
                todos: updateManyItems([0, 50], false)
            })(original);

            expect(newValue.todos).toEqual(original.todos);
        });
    });
    describe('when source is a primitive array', () => {
        test('should return a new root with changed items if operatorOrValue provided is a value', () => {
            const original = stateTodoArrayString();
            const newValue = patch({
                todos: updateManyItems(item => item === 'C', 'H')
            })(original);

            expect(newValue.todos).toEqual(['A', 'B', 'H', 'D']);
        });
    });

    describe('when source is a object array', () => {
        test('should return a new root with the items changed', () => {
            const original = todoState();
            const newValue = patch({
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
            const newValue = patch({
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
