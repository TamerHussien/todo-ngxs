import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { TestHostComponent } from '..';
import { TodoUpdate } from '../../utils';

describe('TodoComponent', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let todoDebugElement: DebugElement;
    const template = `
     <app-todo
            [todo]="todo"
            (deleteTodo)="handleDeleteTodo($event)"
            (toggleTodo)="handleToggleTodo($event)"
            (updateTodo)="handleUpdateTodo($event)"
        >
        </app-todo>
    `;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TodoComponent, TestHostComponent],
            imports: [ReactiveFormsModule]
        })
            .overrideComponent(TodoComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .overrideComponent(TestHostComponent, {
                set: { template }
            });
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        todoDebugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    test('should create', () => {
        expect(component).toBeDefined();
    });

    test('should exit class completed when todo is completed', () => {
        component.todo.completed = true;
        fixture.detectChanges();
        const liDebugElement = todoDebugElement.query(By.css('li'));
        const liElement: HTMLElement = liDebugElement.nativeElement;
        expect(liDebugElement.classes.completed).toBeTruthy();
    });

    test('should not exit class completed when todo is uncompleted', () => {
        component.todo.completed = false;
        fixture.detectChanges();
        const liDebugElement = todoDebugElement.query(By.css('li'));
        expect(liDebugElement.classes.completed).toBeFalsy();
    });

    test('should emit delete event when click in button delete', () => {
        spyOn(component, 'handleDeleteTodo');
        const buttomDebugElement = todoDebugElement.query(By.css('.destroy'));
        buttomDebugElement.triggerEventHandler('click', null);
        expect(component.handleDeleteTodo).toHaveBeenCalledWith(1);
    });

    test('should exist class editing when dblclick is trigger', () => {
        const labelDebugElement = todoDebugElement.query(By.css('label'));
        labelDebugElement.triggerEventHandler('dblclick', null);
        fixture.detectChanges();
        const liDebugElement = todoDebugElement.query(By.css('li'));
        expect(liDebugElement.classes.editing).toBeTruthy();
    });

    test('should exist input when dblclick is trigger over todo', () => {
        const labelDebugElement = todoDebugElement.query(By.css('label'));
        labelDebugElement.triggerEventHandler('dblclick', null);
        const inputDebugElement = todoDebugElement.query(By.css('.edit'));
        expect(inputDebugElement).not.toBeNull();
    });

    test('should emit update event when enter key is trigger in editing mode', () => {
        spyOn(component, 'handleUpdateTodo');
        const labelDebugElement = todoDebugElement.query(By.css('label'));
        labelDebugElement.triggerEventHandler('dblclick', null);
        const inputDebugElement = todoDebugElement.query(By.css('.edit'));
        const textValue = 'some todo';
        inputDebugElement.nativeElement.value = textValue;
        inputDebugElement.triggerEventHandler('input', {
            target: inputDebugElement.nativeElement
        });
        const event = new KeyboardEvent('keyup', {
            key: 'Enter'
        });
        const expected: TodoUpdate = {
            id: component.todo.id,
            text: textValue
        };

        inputDebugElement.nativeElement.dispatchEvent(event);
        expect(component.handleUpdateTodo).toHaveBeenCalledWith(expected);
    });

    test('should emit update event blur is trigger in editing mode', () => {
        spyOn(component, 'handleUpdateTodo');
        const labelDebugElement = todoDebugElement.query(By.css('label'));
        labelDebugElement.triggerEventHandler('dblclick', null);
        const inputDebugElement = todoDebugElement.query(By.css('.edit'));
        const textValue = 'some todo';
        inputDebugElement.nativeElement.value = textValue;
        inputDebugElement.triggerEventHandler('input', {
            target: inputDebugElement.nativeElement
        });
        const expected: TodoUpdate = {
            id: component.todo.id,
            text: textValue
        };

        inputDebugElement.nativeElement.dispatchEvent(new Event('blur'));
        expect(component.handleUpdateTodo).toHaveBeenCalledWith(expected);
    });
});
