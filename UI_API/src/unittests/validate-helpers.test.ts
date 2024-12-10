import { generateDynamicLocator, areArraysIdentical, checkPriceOrder } from '../helper.ts';

describe('generateDynamicLocator', () => {
    it('should replace the placeholder with the replacement value', async () => {
        const locator = '/user/{id}/profile';
        const placeholderToReplace = '{id}';
        const replacement = '123';
        const result = await generateDynamicLocator(locator, placeholderToReplace, replacement);
        expect(result).toBe('/user/123/profile');
    });

    it('should return the original string if placeholder is not found', async () => {
        const locator = '/user/{id}/profile';
        const placeholderToReplace = '{name}';
        const replacement = '123';
        const result = await generateDynamicLocator(locator, placeholderToReplace, replacement);
        expect(result).toBe('/user/{id}/profile');
    });

    it('should work with empty strings', async () => {
        const locator = '';
        const placeholderToReplace = '{id}';
        const replacement = '123';
        const result = await generateDynamicLocator(locator, placeholderToReplace, replacement);
        expect(result).toBe('');
    });
});

describe('areArraysIdentical', () => {
    it('should return true for identical arrays', () => {
        const expected = [1, 2, 3];
        const actual = [1, 2, 3];
        const result = areArraysIdentical(expected, actual);
        expect(result).toBe(true);
    });

    it('should throw an error if arrays have different lengths', () => {
        const expected = [1, 2, 3];
        const actual = [1, 2];
        expect(() => areArraysIdentical(expected, actual)).toThrow(
            'Arrays have different lengths: expectedLength=3, actualLength=2'
        );
    });

    it('should throw an error if arrays have different values', () => {
        const expected = [1, 2, 3];
        const actual = [1, 2, 4];
        expect(() => areArraysIdentical(expected, actual)).toThrow(
            'Arrays have different lengths: expectedLength=3, actualLength=4'
        );
    });
});

describe('checkPriceOrder', () => {
    it('should return true for ascending order', () => {
        const prices = [1, 2, 3, 4, 5];
        const result = checkPriceOrder(prices, 'ascending');
        expect(result).toBe(true);
    });

    it('should throw an error for incorrect ascending order', () => {
        const prices = [1, 3, 2, 4, 5];
        expect(() => checkPriceOrder(prices, 'ascending')).toThrow(
            'Array is not in ascending order'
        );
    });

    it('should return true for descending order', () => {
        const prices = [5, 4, 3, 2, 1];
        const result = checkPriceOrder(prices, 'descending');
        expect(result).toBe(true);
    });

    it('should throw an error for incorrect descending order', () => {
        const prices = [5, 3, 4, 2, 1];
        expect(() => checkPriceOrder(prices, 'descending')).toThrow(
            'Array is not in descending order'
        );
    });

    it('should handle an empty array', () => {
        const prices = [];
        const result = checkPriceOrder(prices, 'ascending');
        expect(result).toBe(true);
    });
});
