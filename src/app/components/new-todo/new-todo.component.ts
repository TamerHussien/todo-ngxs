import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-todo',
    templateUrl: './new-todo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTodoComponent {
    textField: FormControl;
    @Output() addTodo: EventEmitter<string>;

    constructor() {
        this.textField = new FormControl('', [Validators.required]);
        this.addTodo = new EventEmitter<string>();
    }

    handleSaveTodo() {
        if (this.textField.valid) {
            this.addTodo.emit(this.textField.value);
            this.textField.setValue('', { emitEvent: false });
        }
    }
}
