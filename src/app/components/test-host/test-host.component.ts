import { Component } from '@angular/core';
import { Todo } from '../../models';
import { TodoUpdate } from '../../utils';

@Component({
    selector: 'app-test-host',
    template: ''
})
export class TestHostComponent {
    todo: Todo = {
        completed: false,
        id: 1,
        text: 'Task'
    };

    shouldFooterShow: boolean;
    existCompleteTodos: boolean;
    countUnCompleteTodos: number;
    currentFilter: string;
    handleClearComplete() {}

    handleDeleteTodo(id: number) {}

    handleToggleTodo(todo: Todo) {}

    handleUpdateTodo(todoUpdate: TodoUpdate) {}

    handleAddTodo(text: string) {}
}
