import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FacadeService } from '../../services';

@Component({
    selector: 'app-new-todo',
    templateUrl: './new-todo.component.html'
})
export class NewTodoComponent {
    textField: FormControl;

    constructor(public facadeService: FacadeService) {
        this.textField = new FormControl('', [Validators.required]);
    }

    saveTodo() {
        if (this.textField.valid) {
            this.facadeService.addTodo(this.textField.value);
            this.textField.setValue('', { emitEvent: false });
        }
    }
}
