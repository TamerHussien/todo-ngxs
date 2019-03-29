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
import { delay, map, startWith, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { NextObserver } from 'rxjs/src/internal/types';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit, OnDestroy {
    @Input() todo: Todo;
    @ViewChild('updateInput') updateInput: ElementRef;
    updateInputControl: FormControl;
    toggleInputControl: FormControl;
    editing: boolean;
    toggleTodo$: Observable<void>;
    updateTodo$: Subject<void>;
    activeEditMode$: Subject<void>;
    editInputValues$: Observable<string>;
    toggleTodoObserver: NextObserver<void>;
    updateTodoObserver: NextObserver<string>;
    @Output() updateTodo: EventEmitter<TodoUpdate>;
    @Output() deleteTodo: EventEmitter<number>;
    @Output() toggleTodo: EventEmitter<Todo>;
    @Destroy() destroy$;
    isValidUpdate = value => (value ? true : false);

    constructor() {
        this.updateInputControl = new FormControl('', [Validators.required]);
        this.toggleInputControl = new FormControl(false);
        this.toggleTodo$ = this.toggleInputControl.valueChanges;
        this.editInputValues$ = this.updateInputControl.valueChanges.pipe(startWith(null));
        this.updateTodo$ = new Subject<void>();
        this.activeEditMode$ = new Subject<void>();
        this.updateTodo = new EventEmitter<TodoUpdate>();
        this.deleteTodo = new EventEmitter<number>();
        this.toggleTodo = new EventEmitter<Todo>();
        this.toggleTodoObserver = {
            next: () => this.toggleTodo.emit(this.todo)
        };
        this.updateTodoObserver = {
            next: value => this.updateTodo.emit({ id: this.todo.id, text: value.trim() })
        };
    }

    ngOnInit() {
        this.updateInputControl.setValue(this.todo.text);
        this.toggleInputControl.setValue(this.todo.completed, { emitEvent: false });
        this.toggleTodo$.pipe(takeUntil(this.destroy$)).subscribe(this.toggleTodoObserver);
        this.updateTodo$
            .pipe(
                takeUntil(this.destroy$),
                filter(() => this.shouldEditTodo()),
                withLatestFrom(this.editInputValues$),
                tap(() => this.disableEditingMode()),
                filter(([_, value]) => this.isValidUpdate(value)),
                map(([_, value]) => value)
            )
            .subscribe(this.updateTodoObserver);
        this.activeEditMode$
            .pipe(
                takeUntil(this.destroy$),
                tap(() => this.enableEditingMode()),
                delay(50),
                tap(() => this.focusUpdateInput())
            )
            .subscribe();
    }

    shouldEditTodo(): boolean {
        return this.updateInputControl.valid && this.editing;
    }

    focusUpdateInput(): void {
        this.updateInput.nativeElement.focus();
    }

    enableEditingMode(): void {
        this.editing = true;
    }

    disableEditingMode(): void {
        this.editing = false;
    }

    ngOnDestroy(): void {}
}
