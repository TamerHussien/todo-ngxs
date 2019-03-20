import { State, Action, Selector, StateContext, StateOperator } from '@ngxs/store';
import { Todo } from '../models';
import { FilterType } from '../utils';
import {
    AddTodo,
    ClearCompleted,
    CompletedAll,
    DeleteTodo,
    PopulateTodos,
    SetFilter,
    ToggleTodo,
    UpdateTodo
} from './todo.actions';
import { append, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { removeManyItems, updateManyItems } from './operators';

export interface TodoStateModel {
    filter: string;
    todos: Todo[];
}

@State<TodoStateModel>({
    name: 'store',
    defaults: {
        filter: FilterType.SHOW_ALL,
        todos: []
    }
})
export class TodoState {
    @Selector()
    static getTodos(state: TodoStateModel) {
        return state.todos;
    }

    @Selector()
    static getFilter(state: TodoStateModel) {
        return state.filter;
    }

    @Selector()
    static getVisibleTodos(state: TodoStateModel) {
        if (state.filter === FilterType.SHOW_ALL) {
            return state.todos;
        } else if (state.filter === FilterType.SHOW_COMPLETED) {
            return state.todos.filter(t => t.completed);
        } else if (state.filter === FilterType.SHOW_ACTIVE) {
            return state.todos.filter(t => !t.completed);
        }
    }

    @Selector()
    static getStateCompleted(state: TodoStateModel) {
        return state.todos.every(todo => todo.completed);
    }

    @Selector()
    static getStateUnCompleted(state: TodoStateModel) {
        return state.todos.filter(t => !t.completed);
    }

    @Action(AddTodo)
    add(ctx: StateContext<TodoStateModel>, { payload }: AddTodo) {
        ctx.setState(patch({ todos: append([{ id: Math.random(), text: payload, completed: false }]) }));
    }

    @Action(ToggleTodo)
    toggle(ctx: StateContext<TodoStateModel>, { payload }: ToggleTodo) {
        ctx.setState(
            patch<TodoStateModel>({
                todos: updateItem<Todo>(todo => todo.id === payload.id, patch<Todo>({ completed: !payload.completed }))
            })
        );
    }

    @Action(DeleteTodo)
    delete({ setState }: StateContext<TodoStateModel>, { payload }: DeleteTodo) {
        setState(
            patch<TodoStateModel>({
                todos: removeItem(todo => todo.id === payload)
            })
        );
    }

    @Action(UpdateTodo)
    update({ setState }: StateContext<TodoStateModel>, { payload }: UpdateTodo) {
        setState(
            patch<TodoStateModel>({
                todos: updateItem<Todo>(todo => todo.id === payload.id, patch<Todo>({ text: payload.text }))
            })
        );
    }

    @Action(ClearCompleted)
    clear({ setState }: StateContext<TodoStateModel>) {
        setState(
            patch<TodoStateModel>({
                todos: removeManyItems<Todo>(todo => todo.completed)
            })
        );
    }

    @Action(CompletedAll)
    complete({ setState }: StateContext<TodoStateModel>) {
        setState(
            patch<TodoStateModel>({
                todos: updateManyItems<Todo>(() => true, patch<Todo>({ completed: true }))
            })
        );
    }

    @Action(SetFilter)
    filter({ setState }: StateContext<TodoStateModel>, { payload }: SetFilter) {
        setState(
            patch<TodoStateModel>({
                filter: payload
            })
        );
    }

    @Action(PopulateTodos)
    populate({ setState }: StateContext<TodoStateModel>, { payload }: PopulateTodos) {
        setState(
            patch<TodoStateModel>({
                todos: payload
            })
        );
    }
}
