import { Predicate } from '@ngxs/store/operators/internals';
import { StateOperator } from '@ngxs/store';

export function isPredicate<T>(value: Predicate<T> | boolean | number | number[]): value is Predicate<T> {
    return typeof value === 'function';
}

export function findIndices<T>(predicate: Predicate<T>, existing: Readonly<T[]>): number[] {
    return existing.reduce((acc, it, i) => {
        const index = predicate(it) ? i : -1;
        return invalidIndex(index) ? acc : [...acc, index];
    }, []);
}

export function isArrayNumber(value: number[]): boolean {
    for (const i in value) {
        if (!isNumber(value[i])) {
            return false;
        }
    }
    return true;
}

export function invalidIndexs<T>(indices: number[], existing: Readonly<T[]>): boolean {
    for (const i in indices) {
        if (!existing[indices[i]] || !isNumber(indices[i]) || invalidIndex(indices[i])) {
            return true;
        }
    }
    return false;
}

export function isStateOperator<T>(value: Partial<T> | StateOperator<T>): value is StateOperator<T> {
    return typeof value === 'function';
}

export function isNumber(value: any): value is number {
    return typeof value === 'number';
}

export function invalidIndex(index: number): boolean {
    return Number.isNaN(index) || index === -1;
}

export function isObject(value: any): boolean {
    return typeof value === 'object';
}
