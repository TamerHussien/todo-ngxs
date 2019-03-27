import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Todo } from '../../models';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('TodoComponent', () => {
    let component: TodoComponent;
    let fixture: ComponentFixture<TodoComponent>;
    let footerDebugElement: DebugElement;
    const todo: Todo = {
        completed: false,
        id: 1,
        text: 'Task'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TodoComponent],
            imports: [ReactiveFormsModule]
        });
        fixture = TestBed.createComponent(TodoComponent);
        component = fixture.componentInstance;
        footerDebugElement = fixture.debugElement;
        component.todo = todo;
    });

    test('should create', () => {
        expect(component).toBeDefined();
    });

    test('should exit class completed when todo is completed', () => {
        component.todo.completed = true;
        fixture.detectChanges();
        const liDebugElement: DebugElement = footerDebugElement.query(By.css('.completed'));
        const liElement: HTMLElement = liDebugElement.nativeElement;
        expect(liElement).toBeTruthy();
    });

    test('should not exit class completed when todo is uncompleted', () => {
        component.todo.completed = false;
        fixture.detectChanges();
        const liDebugElement = footerDebugElement.query(By.css('li'));
        expect(liDebugElement.classes.completed).toBeFalsy();
    });

    test('should emit delete event when click in button delete', () => {
        let emitDeleteButtom = false;
        component.deleteTodo.subscribe(() => {
            emitDeleteButtom = true;
        });
        const buttomDebugElement = footerDebugElement.query(By.css('.destroy'));
        buttomDebugElement.triggerEventHandler('click', null);
        expect(emitDeleteButtom).toBeTruthy();
    });

    test('should exit class editing when dblclick is trigger', () => {
        const labelDebugElement = footerDebugElement.query(By.css('label'));
        labelDebugElement.triggerEventHandler('dblclick', null);
        fixture.detectChanges();
        const liDebugElement = footerDebugElement.query(By.css('li'));
        expect(liDebugElement.classes.editing).toBeTruthy();
    });
});
