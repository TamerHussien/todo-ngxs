import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalComponent } from './principal.component';
import { FooterComponent, NewTodoComponent } from '../../components';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { TodoState } from '../../store/todo.state';

describe('PrincipalComponent', () => {
    let component: PrincipalComponent;
    let fixture: ComponentFixture<PrincipalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PrincipalComponent, NewTodoComponent, FooterComponent],
            imports: [RouterModule, ReactiveFormsModule, NgxsModule.forRoot([TodoState])]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PrincipalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    test('should create', () => {
        expect(component).toBeTruthy();
    });
});
