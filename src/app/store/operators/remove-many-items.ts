import { Predicate } from '@ngxs/store/operators/internals';
import { isPredicate, findIndices, isArrayNumber, invalidIndexs } from './utils';

/**
 * @param selector - indices or predicate to remove multiple items from an array by
 */
export function removeManyItems<T>(selector: number[] | Predicate<T>) {
    return function removeItemsOperator(existing: Readonly<T[]>): T[] {
        let indices = [];

        if (isPredicate(selector)) {
            indices = findIndices(selector, existing);
        } else if (isArrayNumber(selector)) {
            indices = selector;
        }

        if (invalidIndexs(indices, existing)) {
            return existing;
        }

        return existing.filter((_, index) => (indices.findIndex(i => i === index) >= 0 ? false : true));
    };
}
