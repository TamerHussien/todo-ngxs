import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { withLatestFrom } from 'rxjs/internal/operators/withLatestFrom';
import { Destroy } from 'ngx-reactivetoolkit';
import { takeUntil } from 'rxjs/operators';
import { NextObserver } from 'rxjs/src/internal/types';
import { mapPosition } from '../../utils';

@Component({
    selector: 'app-new-todo',
    templateUrl: './new-todo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTodoComponent implements OnInit, OnDestroy {
    textField: FormControl;
    newTodos$: Observable<string>;
    keyUpEnter$: Subject<void>;
    addTodoObserver: NextObserver<string>;
    @Output() addTodo: EventEmitter<string>;
    @Destroy() destroy$;

    constructor() {
        this.textField = new FormControl('', [Validators.required]);
        this.newTodos$ = this.textField.valueChanges;
        this.keyUpEnter$ = new Subject<void>();
        this.addTodo = new EventEmitter<string>();
        this.addTodoObserver = {
            next: value => {
                this.addTodo.emit(value);
                this.textField.reset();
            }
        };
    }
    ngOnInit(): void {
        this.keyUpEnter$
            .pipe(
                takeUntil(this.destroy$),
                filter(() => this.shouldAddTodo()),
                withLatestFrom(this.newTodos$),
                mapPosition(1)
            )
            .subscribe(this.addTodoObserver);
    }

    shouldAddTodo(): boolean {
        return this.textField.valid;
    }

    ngOnDestroy(): void {}
}
