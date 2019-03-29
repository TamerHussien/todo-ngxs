import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { ChangeDetectionStrategy, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FilterType } from '../../utils';
import { TestHostComponent } from '..';

describe('FooterComponent', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let footerDebugElement: DebugElement;
    const template = `
     <app-footer
            [countUnCompleteTodos]="countUnCompleteTodos"
            [currentFilter]="currentFilter"
            [existCompleteTodos]="existCompleteTodos"
            [shouldFooterShow]="shouldFooterShow"
            (clearCompleted)="handleClearComplete()"
        ></app-footer>
    `;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FooterComponent, TestHostComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .overrideComponent(FooterComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .overrideComponent(TestHostComponent, {
                set: { template }
            });
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        footerDebugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    test('should create', () => {
        expect(component).toBeTruthy();
    });

    test('should exist footer tag if shouldFooterShow is true', () => {
        component.shouldFooterShow = true;
        fixture.detectChanges();
        const de = footerDebugElement.query(By.css('footer'));
        expect(de).not.toBeNull();
    });

    test('should not exist footer tag if shouldFooterShow is false', () => {
        component.shouldFooterShow = false;
        fixture.detectChanges();
        const de = footerDebugElement.query(By.css('footer'));
        expect(de).toBeNull();
    });

    test('should display un completed todo', () => {
        component.shouldFooterShow = true;
        component.countUnCompleteTodos = 5;
        fixture.detectChanges();
        const el: HTMLElement = fixture.nativeElement;
        const span = el.querySelector('span');
        expect(span.textContent).toEqual('5 items left');
    });

    test('button Clear completed should be hidden when there are not todo completed', () => {
        component.shouldFooterShow = true;
        component.existCompleteTodos = false;
        fixture.detectChanges();
        const el: HTMLElement = fixture.nativeElement;
        const button = el.querySelector('button');
        expect(button.hasAttribute('hidden')).toBeTruthy();
    });

    test('button Clear completed should be showing when there are not todo completed', () => {
        component.shouldFooterShow = true;
        component.existCompleteTodos = true;
        fixture.detectChanges();
        const el: HTMLElement = fixture.nativeElement;
        const button = el.querySelector('button');
        expect(button.hasAttribute('hidden')).toBeFalsy();
    });

    test('should emit clearCompleted when click in button  Clear completed', () => {
        spyOn(component, 'handleClearComplete');
        component.shouldFooterShow = true;
        component.existCompleteTodos = true;
        fixture.detectChanges();
        const button: DebugElement = footerDebugElement.query(By.css('button'));
        button.triggerEventHandler('click', null);
        expect(component.handleClearComplete).toHaveBeenCalled();
    });

    test('should contains class selected if current filter is show all', () => {
        component.shouldFooterShow = true;
        component.currentFilter = FilterType.SHOW_ALL;
        fixture.detectChanges();
        const de: DebugElement[] = footerDebugElement.queryAll(By.css('a'));
        expect(de[0].classes.selected).toBeTruthy();
    });

    test('should contains class selected if current filter is show active', () => {
        component.shouldFooterShow = true;
        component.currentFilter = FilterType.SHOW_ACTIVE;
        fixture.detectChanges();
        const de: DebugElement[] = footerDebugElement.queryAll(By.css('a'));
        expect(de[1].classes.selected).toBeTruthy();
    });

    test('should contains class selected if current filter is show complete', () => {
        component.shouldFooterShow = true;
        component.currentFilter = FilterType.SHOW_COMPLETED;
        fixture.detectChanges();
        const de: DebugElement[] = footerDebugElement.queryAll(By.css('a'));
        expect(de[2].classes.selected).toBeTruthy();
    });
});
