import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FacadeService } from '../../services';
import { FilterType } from '../../utils';
import { Destroy } from 'ngx-reactivetoolkit';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit, OnDestroy {
    checkField: FormControl;
    @Destroy() destroy$;

    constructor(public facadeService: FacadeService, private route: ActivatedRoute) {
        this.checkField = new FormControl();
        this.readParams();
    }

    ngOnInit() {
        this.facadeService.stateCompleted$.pipe(takeUntil(this.destroy$)).subscribe(status => {
            this.checkField.setValue(status);
        });
    }

    toggleAll() {
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

    ngOnDestroy(): void {}
}
