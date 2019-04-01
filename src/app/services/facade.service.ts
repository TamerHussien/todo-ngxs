import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { TodoState } from '../store/todo.state';
import {
    AddTodo,
    ClearCompleted,
    CompletedAll,
    DeleteTodo,
    SetFilter,
    ToggleTodo,
    UpdateTodo
} from '../store/todo.actions';
import { Observable } from 'rxjs';
import { Todo } from '../models';
import { map } from 'rxjs/operators';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';

@Injectable({
    providedIn: 'root'
})
export class FacadeService {
    @Select(TodoState.getTodos) allTodos$: Observable<Todo[]>;
    @Select(TodoState.getVisibleTodos) todos$: Observable<Todo[]>;
    @Select(TodoState.getStateCompleted) stateCompleted$: Observable<Todo[]>;
    @Select(TodoState.getStateUnCompleted) stateUnCompleted$: Observable<Todo[]>;
    @Select(TodoState.getCompletedTodo) getCompletedTodo$: Observable<Todo[]>;
    @Select(TodoState.getFilter) currentFilter$: Observable<string>;

    countAllTodos$ = this.allTodos$.pipe(map((todos: Todo[]) => todos.length));
    countUnCompleteTodos$ = this.stateUnCompleted$.pipe(map((todos: Todo[]) => todos.length));
    shouldFooterShow$ = this.countAllTodos$.pipe(map((count: number) => !!count));
    existCompleteTodos$ = this.getCompletedTodo$.pipe(map((todos: Todo[]) => !!todos.length));

    @Dispatch()
    clearCompleted = () => new ClearCompleted();

    @Dispatch()
    completedAll = () => new CompletedAll();

    @Dispatch()
    addTodo = (todo: string) => new AddTodo(todo.trim());

    @Dispatch()
    toggleTodo = (todo: Todo) => new ToggleTodo(todo);

    @Dispatch()
    updateTodo = (update: { id: number; text: string }) => new UpdateTodo(update);

    @Dispatch()
    deleteTodo = (id: number) => new DeleteTodo(id);

    @Dispatch()
    setFilter = (filter: string) => new SetFilter(filter);

    constructor() {}
}
