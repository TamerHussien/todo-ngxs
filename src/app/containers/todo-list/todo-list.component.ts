import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { mapUndefinedValue, TodoUpdate } from '../../utils';
import { Destroy } from 'ngx-reactivetoolkit';
import { pluck, takeUntil } from 'rxjs/operators';
import { Todo } from '../../models';
import { FacadeService } from '../../services';
import { NextObserver, Observable } from 'rxjs';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit, OnDestroy {
    todos$: Observable<Todo[]>;
    params$: Observable<Params>;
    checkField: FormControl;
    @Destroy() destroy$;
    routeObserver: NextObserver<string>;

    constructor(private route: ActivatedRoute, public facadeService: FacadeService) {
        this.checkField = new FormControl();
        this.todos$ = this.facadeService.todos$;
        this.params$ = this.route.params;
        this.routeObserver = {
            next: filter => this.setFilter(filter)
        };
    }

    ngOnInit() {
        this.facadeService.stateCompleted$.pipe(takeUntil(this.destroy$)).subscribe(status => {
            this.checkField.setValue(status);
        });
        this.params$
            .pipe(
                takeUntil(this.destroy$),
                pluck('filter'),
                mapUndefinedValue('')
            )
            .subscribe(this.routeObserver);
    }

    handleToggleAll() {
        this.facadeService.completedAll();
    }

    handleUpdateTodo(todoPartial: TodoUpdate) {
        this.facadeService.updateTodo(todoPartial);
    }

    handleDeleteTodo(id: number) {
        this.facadeService.deleteTodo(id);
    }

    handleToggleTodo(todo: Todo) {
        this.facadeService.toggleTodo(todo);
    }

    setFilter(filter: string): void {
        this.facadeService.setFilter(filter);
    }

    ngOnDestroy(): void {}
}
