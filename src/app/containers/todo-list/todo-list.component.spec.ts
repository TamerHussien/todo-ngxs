import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacadeService } from '../../services';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TodoListComponent } from './todo-list.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { FilterType, TodoUpdate } from '../../utils';
import { Todo } from '../../models';

describe('PrincipalComponent', () => {
    let component: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    const facadeServiceStub = {
        todos$: of([
            { id: 1, text: 'A', completed: false },
            { id: 2, text: 'B', completed: true },
            { id: 3, text: 'C', completed: true }
        ]),

        setFilter: (filter: string): void => {},
        stateCompleted$: of([{ id: 2, text: 'B', completed: true }, { id: 3, text: 'C', completed: true }]),
        completedAll: () => {},
        updateTodo: (todoPartial: TodoUpdate) => {},
        deleteTodo: (id: number) => {},
        toggleTodo: (todo: Todo) => {}
    };

    const activeRouteStub = {
        params: of({ filter: '' })
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TodoListComponent],
            providers: [
                {
                    provide: FacadeService,
                    useValue: facadeServiceStub
                },
                {
                    provide: ActivatedRoute,
                    useValue: activeRouteStub
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    test('should create', () => {
        expect(component).toBeTruthy();
    });

    test('should call set Filter with filter active', () => {
        const filter$ = of({ filter: FilterType.SHOW_ACTIVE });
        spyOn(component, 'setFilter');
        component.params$ = filter$;
        component.ngOnInit();
        expect(component.setFilter).toHaveBeenCalledWith(FilterType.SHOW_ACTIVE);
    });

    test('should call set Filter with filter completed', () => {
        const filter$ = of({ filter: FilterType.SHOW_COMPLETED });
        spyOn(component, 'setFilter');
        component.params$ = filter$;
        component.ngOnInit();
        expect(component.setFilter).toHaveBeenCalledWith(FilterType.SHOW_COMPLETED);
    });

    test('should call set Filter with filter all', () => {
        const filter$ = of({ filter: FilterType.SHOW_ALL });
        spyOn(component, 'setFilter');
        component.params$ = filter$;
        component.ngOnInit();
        expect(component.setFilter).toHaveBeenCalledWith(FilterType.SHOW_ALL);
    });
});
