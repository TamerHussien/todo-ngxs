import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterType } from '../../utils';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
    @Input() shouldFooterShow: boolean;
    @Input() existCompleteTodos: boolean;
    @Input() countUnCompleteTodos: number;
    @Input() currentFilter: string;
    @Output() clearCompleted: EventEmitter<void>;
    FilterType = FilterType;

    constructor() {
        this.clearCompleted = new EventEmitter();
    }

    handleClick(): void {
        this.clearCompleted.emit();
    }
}
