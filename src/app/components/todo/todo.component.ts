import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from '../../models';
import { TodoUpdate } from '../../utils';
import { Destroy } from 'ngx-reactivetoolkit';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit, OnDestroy {
    @Input() todo: Todo;
    @ViewChild('textInput') textInput: ElementRef;
    textField: FormControl;
    checkField: FormControl;
    editing: boolean;
    @Output() updateTodo: EventEmitter<TodoUpdate>;
    @Output() deleteTodo: EventEmitter<number>;
    @Output() toogleTodo: EventEmitter<Todo>;
    @Destroy() destroy$;

    constructor() {
        this.textField = new FormControl('', [Validators.required]);
        this.checkField = new FormControl(false);
        this.updateTodo = new EventEmitter<TodoUpdate>();
        this.deleteTodo = new EventEmitter<number>();
        this.toogleTodo = new EventEmitter<Todo>();
    }

    ngOnInit() {
        this.textField.setValue(this.todo.text);
        this.checkField.setValue(this.todo.completed, { emitEvent: false });
        this.checkField.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.toogleTodo.emit(this.todo);
        });
    }

    handleUpdateText() {
        if (this.textField.valid && this.editing) {
            this.updateTodo.emit({ id: this.todo.id, text: this.textField.value.trim() });
            this.editing = false;
        }
    }

    activeEditMode() {
        this.editing = true;
        setTimeout(() => {
            this.textInput.nativeElement.focus();
        });
    }

    handleDeleteTodo() {
        this.deleteTodo.emit(this.todo.id);
    }

    ngOnDestroy(): void {}
}
