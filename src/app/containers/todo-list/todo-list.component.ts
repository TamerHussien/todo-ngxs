import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FilterType, TodoUpdate } from '../../utils';
import { Destroy } from 'ngx-reactivetoolkit';
import { takeUntil } from 'rxjs/operators';
import { Todo } from '../../models';
import { FacadeService } from '../../services';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit, OnDestroy {
    todos$: Observable<Todo[]>;
    checkField: FormControl;
    @Destroy() destroy$;

    constructor(private route: ActivatedRoute, public facadeService: FacadeService) {
        this.checkField = new FormControl();
        this.readParams();
        this.todos$ = this.facadeService.todos$;
    }

    ngOnInit() {
        this.facadeService.stateCompleted$.pipe(takeUntil(this.destroy$)).subscribe(status => {
            this.checkField.setValue(status);
        });
    }

    handleToggleAll() {
        this.facadeService.completedAll();
    }

    private setFilter(value: string) {
        switch (value) {
            case 'active': {
                this.facadeService.setFilter(FilterType.SHOW_ACTIVE);
                break;
            }
            case 'completed': {
                this.facadeService.setFilter(FilterType.SHOW_COMPLETED);
                break;
            }
            default: {
                this.facadeService.setFilter(FilterType.SHOW_ALL);
                break;
            }
        }
    }
    private readParams() {
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
            this.setFilter(params.filter);
        });
    }

    handleUpdateTodo(todoPartial: TodoUpdate) {
        this.facadeService.updateTodo(todoPartial);
    }

    handleDeleteTodo(id: number) {
        this.facadeService.deleteTodo(id);
    }

    handleToogleTodo(todo: Todo) {
        this.facadeService.toggleTodo(todo);
    }

    ngOnDestroy(): void {}
}
