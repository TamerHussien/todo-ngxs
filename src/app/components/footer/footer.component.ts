import { Component } from '@angular/core';
import { FacadeService } from '../../services';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    constructor(public facadeService: FacadeService) {}
}
