import { NewTodoComponent, TestHostComponent } from '..';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('NewTodoComponent', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let newTodoDebugElement: DebugElement;
    const template = `
      <app-new-todo (addTodo)="handleAddTodo($event)"></app-new-todo>
    `;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NewTodoComponent, TestHostComponent],
            imports: [ReactiveFormsModule]
        })
            .overrideComponent(NewTodoComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .overrideComponent(TestHostComponent, {
                set: { template }
            });
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        newTodoDebugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    test('should create', () => {
        expect(component).toBeDefined();
    });

    test('should exist a input', () => {
        const inputDebugElement: DebugElement = newTodoDebugElement.query(By.css('input'));
        expect(inputDebugElement).not.toBeNull();
    });
    test('should emit add todo when key press Enter and text inside is valid', () => {
        spyOn(component, 'handleAddTodo');
        const textValue = 'some todo';
        const inputDebugElement: DebugElement = newTodoDebugElement.query(By.css('input'));
        inputDebugElement.nativeElement.value = textValue;
        inputDebugElement.triggerEventHandler('input', {
            target: inputDebugElement.nativeElement
        });
        const event = new KeyboardEvent('keyup', {
            key: 'Enter'
        });
        inputDebugElement.nativeElement.dispatchEvent(event);
        expect(component.handleAddTodo).toHaveBeenCalledWith(textValue);
    });

    test('should not emit add todo when text is invalid when keyup enter', () => {
        spyOn(component, 'handleAddTodo');
        const inputDebugElement: DebugElement = newTodoDebugElement.query(By.css('input'));
        const event = new KeyboardEvent('keyup', {
            key: 'Enter'
        });
        inputDebugElement.nativeElement.dispatchEvent(event);
        expect(component.handleAddTodo).not.toHaveBeenCalled();
    });
});
