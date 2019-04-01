import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrincipalComponent } from './principal.component';
import { FooterComponent, NewTodoComponent } from '../../components';
import { FacadeService } from '../../services';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PrincipalComponent', () => {
    let component: PrincipalComponent;
    let fixture: ComponentFixture<PrincipalComponent>;

    const facadeServiceStub = {
        addTodo: (todo: string): any => {},
        clearCompleted: (): void => {}
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PrincipalComponent, NewTodoComponent, FooterComponent],
            providers: [
                {
                    provide: FacadeService,
                    useValue: facadeServiceStub
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PrincipalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    test('should create', () => {
        expect(component).toBeTruthy();
    });
});
