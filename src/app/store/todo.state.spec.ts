import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { TodoState, TodoStateModel } from './todo.state';
import { AddTodo } from './todo.actions';
import { Todo } from '../models';
import { FilterType } from '../utils';

describe('Todo State', () => {
    let store: Store;
    let todoState: (todos?: Todo[], filter?: string) => TodoStateModel;
    let todosArray: Todo[];
    let activeTodos: Todo[];
    let completeTodos: Todo[];
    beforeEach(() => {
        completeTodos = [{ id: 2, text: 'B', completed: true }, { id: 3, text: 'C', completed: true }];
        activeTodos = [{ id: 1, text: 'A', completed: false }];
        todosArray = [...activeTodos, ...completeTodos];
        todoState = (todos?: Todo[], filter?: string): TodoStateModel => ({
            todos: todos ? todos : todosArray,
            filter: filter ? filter : FilterType.SHOW_ALL
        });
    });

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

    describe('Selectors', () => {
        describe('getTodos', () => {
            test(`should return a array of Todo'`, async(() => {
                expect(TodoState.getTodos(todoState())).toEqual(todosArray);
            }));
        });

        describe('getFilter', () => {
            test(`should return SHOW_ALL'`, async(() => {
                expect(TodoState.getFilter(todoState())).toEqual(FilterType.SHOW_ALL);
            }));

            test(`should return SHOW_COMPLETED'`, async(() => {
                expect(TodoState.getFilter(todoState(null, FilterType.SHOW_COMPLETED))).toEqual(
                    FilterType.SHOW_COMPLETED
                );
            }));

            test(`should return SHOW_ACTIVE'`, async(() => {
                expect(TodoState.getFilter(todoState(null, FilterType.SHOW_ACTIVE))).toEqual(FilterType.SHOW_ACTIVE);
            }));
        });
        describe('getVisibleTodos', () => {
            test(`should return all todos'`, async(() => {
                expect(TodoState.getVisibleTodos(todoState())).toEqual(todosArray);
            }));

            test(`should return complete todos'`, async(() => {
                expect(TodoState.getVisibleTodos(todoState(null, FilterType.SHOW_COMPLETED))).toEqual(completeTodos);
            }));

            test(`should return active todos'`, async(() => {
                expect(TodoState.getVisibleTodos(todoState(null, FilterType.SHOW_ACTIVE))).toEqual(activeTodos);
            }));
        });

        describe('getStateCompleted', () => {
            test(`should return false'`, async(() => {
                expect(TodoState.getStateCompleted(todoState(todosArray))).toEqual(false);
            }));

            test(`should return true'`, async(() => {
                expect(TodoState.getVisibleTodos(todoState(completeTodos))).toEqual(completeTodos);
            }));
        });

        describe('getStateUnCompleted', () => {
            test(`should retrun empty array'`, async(() => {
                expect(TodoState.getStateUnCompleted(todoState(completeTodos))).toEqual([]);
            }));

            test(`should return active todos'`, async(() => {
                expect(TodoState.getVisibleTodos(todoState(activeTodos))).toEqual(activeTodos);
            }));
        });

        describe('getCompletedTodo', () => {
            test(`should return complete todos'`, async(() => {
                expect(TodoState.getCompletedTodo(todoState(todosArray))).toEqual(completeTodos);
            }));

            test(`should return empty array'`, async(() => {
                expect(TodoState.getCompletedTodo(todoState(activeTodos))).toEqual([]);
            }));
        });
    });
});
