import { Todo } from '../models';
import { TodoUpdate } from '../utils';

export enum ActionsType {
    ADD_TODO = '[TODO] add',
    POPULATE_TODO = '[TODO] populate',
    DELETE_TODO = '[TODO] delete',
    TOGGLE_TODO = '[TODO] toggle',
    UPDATE_TODO = '[TODO] update',
    CLEAR_TODO = '[TODO] clear completed',
    COMPLETE_TODO = '[TODO] completed all',
    SET_FILTER = '[FILTER] set filter'
}

export class AddTodo {
    public static readonly type = ActionsType.ADD_TODO;
    constructor(public payload: string) {}
}

export class PopulateTodos {
    public static readonly type = ActionsType.POPULATE_TODO;
    constructor(public payload: Todo[]) {}
}

export class DeleteTodo {
    public static readonly type = ActionsType.DELETE_TODO;
    constructor(public payload: number) {}
}

export class ToggleTodo {
    public static readonly type = ActionsType.TOGGLE_TODO;
    constructor(public payload: Todo) {}
}

export class UpdateTodo {
    public static readonly type = ActionsType.UPDATE_TODO;
    constructor(public payload: TodoUpdate) {}
}

export class ClearCompleted {
    public static readonly type = ActionsType.CLEAR_TODO;
}

export class CompletedAll {
    public static readonly type = ActionsType.COMPLETE_TODO;
}

export class SetFilter {
    public static readonly type = ActionsType.SET_FILTER;
    constructor(public payload: string) {}
}
