import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export * from './filter-type.enum';
export * from './types';

export const log = (label?: string) =>
    tap(value => {
        if (label) {
            console.log(`[${label}]`, value);
        } else {
            console.log(value);
        }
    });

export const mapPosition = (position: number) => (src: Observable<any>) =>
    src.pipe(map(element => (element && Array.isArray(element) && element.length ? element[position] : element)));

export const mapUndefinedValue = (defaultValue: any) => (src: Observable<any>) =>
    src.pipe(map(element => (element ? element : defaultValue)));
