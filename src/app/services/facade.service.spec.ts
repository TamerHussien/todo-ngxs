import { TestBed } from '@angular/core/testing';
import { FacadeService } from './facade.service';
import { NgxsModule } from '@ngxs/store';
import { TodoState } from '../store/todo.state';
import { environment } from '../../environments/environment';

describe('FacadeService', () => {
    let service: FacadeService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([TodoState], { developmentMode: !environment.production })],
            providers: [FacadeService]
        });
    });

    beforeEach(() => {
        service = TestBed.get(FacadeService);
    });

    test('should create', () => {
        expect(service).toBeTruthy();
    });
});
