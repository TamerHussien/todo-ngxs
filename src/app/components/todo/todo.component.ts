import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from '../../models';
import { FacadeService } from '../../services';
import { Destroy } from 'ngx-reactivetoolkit';
import { filter, map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit, OnDestroy {
    @Input() todo: Todo;
    @ViewChild('textInput') textInput: ElementRef;
    textField: FormControl;
    checkField: FormControl;
    editing: boolean;
    @Destroy() destroy$;

    constructor(public facadeService: FacadeService) {
        this.textField = new FormControl('', [Validators.required]);
        this.checkField = new FormControl(false);
        this.checkField.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.facadeService.toggleTodo(this.todo);
        });
    }

    extractTodo(todos: Todo[], todo: Todo): Todo | null {
        const result = todos.filter(td => td.id === todo.id)[0];
        return result ? result : null;
    }

    ngOnInit() {
        this.textField.setValue(this.todo.text);
        this.checkField.setValue(this.todo.completed, { emitEvent: false });
        this.facadeService.allTodos$
            .pipe(takeUntil(this.destroy$))
            .pipe(
                map((todos: Todo[]) => this.extractTodo(todos, this.todo)),
                filter((todo: Todo | null) => todo != null)
            )
            .subscribe(status => {
                this.checkField.setValue(status.completed, { emitEvent: false });
            });
    }

    updateText() {
        if (this.textField.valid && this.editing) {
            this.facadeService.updateTodo({ id: this.todo.id, text: this.textField.value.trim() });
            this.editing = false;
        }
    }

    activeEditMode() {
        this.editing = true;
        setTimeout(() => {
            this.textInput.nativeElement.focus();
        });
    }

    deleteTodo() {
        this.facadeService.deleteTodo(this.todo.id);
    }

    ngOnDestroy(): void {}
}
