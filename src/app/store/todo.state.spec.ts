import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { TodoState } from './todo.state';
import { AddTodo } from './todo.actions';
import { Todo } from '../models';
import { activeTodos, completeTodos, FilterType, todosArray, todoState } from '../utils';

describe('Todo', () => {
    let store: Store;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([TodoState])]
        }).compileComponents();
        store = TestBed.get(Store);
    }));

    test(`Add Todo'`, async(() => {
        store.dispatch(new AddTodo('test'));
        store
            .selectOnce(state => state.store.todos)
            .subscribe((todos: Todo[]) => {
                expect(todos[0].text).toBe('test');
            });
    }));
});

describe('Selectors', () => {
    describe('getTodos', () => {
        test(`should return a array of Todo'`, async(() => {
            expect(TodoState.getTodos(todoState())).toEqual(todosArray());
        }));
    });

    describe('getFilter', () => {
        test(`should return SHOW_ALL'`, async(() => {
            expect(TodoState.getFilter(todoState())).toEqual(FilterType.SHOW_ALL);
        }));

        test(`should return SHOW_COMPLETED'`, async(() => {
            expect(TodoState.getFilter(todoState(null, FilterType.SHOW_COMPLETED))).toEqual(FilterType.SHOW_COMPLETED);
        }));

        test(`should return SHOW_ACTIVE'`, async(() => {
            expect(TodoState.getFilter(todoState(null, FilterType.SHOW_ACTIVE))).toEqual(FilterType.SHOW_ACTIVE);
        }));
    });
    describe('getVisibleTodos', () => {
        test(`should return all todos'`, async(() => {
            expect(TodoState.getVisibleTodos(todoState())).toEqual(todosArray());
        }));

        test(`should return complete todos'`, async(() => {
            expect(TodoState.getVisibleTodos(todoState(null, FilterType.SHOW_COMPLETED))).toEqual(completeTodos());
        }));

        test(`should return active todos'`, async(() => {
            expect(TodoState.getVisibleTodos(todoState(null, FilterType.SHOW_ACTIVE))).toEqual(activeTodos());
        }));
    });
});
