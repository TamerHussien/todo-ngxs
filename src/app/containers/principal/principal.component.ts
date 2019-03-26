import { Component } from '@angular/core';
import { FacadeService } from '../../services';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-principal',
    templateUrl: './principal.component.html'
})
export class PrincipalComponent {
    shouldFooterShow$: Observable<boolean>;
    existCompleteTodos$: Observable<boolean>;
    countUnCompleteTodos$: Observable<number>;
    currentFilter$: Observable<string>;
    constructor(private facadeService: FacadeService) {
        this.shouldFooterShow$ = this.facadeService.shouldFooterShow$;
        this.countUnCompleteTodos$ = this.facadeService.countUnCompleteTodos$;
        this.currentFilter$ = this.facadeService.currentFilter$;
        this.existCompleteTodos$ = this.facadeService.existCompleteTodos$;
    }

    handleAddTodo(todo: string) {
        this.facadeService.addTodo(todo);
    }

    handleClearCompleted() {
        this.facadeService.clearCompleted();
    }
}
