/**
 * @description
 *
 * @export
 * @async
 * @param {string} locator
 * @param {string} placeholderToReplace
 * @param {string} replacement
 * @returns {Promise<string>}
 */
export async function generateDynamicLocator(locator: string, placeholderToReplace: string, replacement: string): Promise<string> {
    const generatedLocator: string = locator.replace(placeholderToReplace, replacement);
    return generatedLocator;
}

/**
 * @description
 *
 * @export
 * @param {any[]} expected
 * @param {any[]} actual
 * @returns {boolean}
 */
export function areArraysIdentical(expected: any[], actual: any[]): boolean {

    if (expected.length !== actual.length) {
        throw new Error(
            `Arrays have different lengths: expectedLength=${expected.length}, actualLength=${actual.length}`
        );
    }

    for (let index = 0; index < expected.length; index++) {
        const expectedValue = expected[index];
        const actualValue = actual[index];
        if (expectedValue !== actualValue) {
            throw new Error(
                `Arrays have different lengths: expectedLength=${expectedValue}, actualLength=${actualValue}`
            );
        }
    }

    console.log('Arrays are identical.');
    return true;
}

/**
 * @description
 *
 * @export
 * @param {number[]} prices
 * @param {string} order
 * @returns {boolean}
 */
export function checkPriceOrder(prices: number[], order: string): boolean {
    for (let i = 1; i < prices.length; i++) {
        if (order === 'ascending' && prices[i] < prices[i - 1]) {
            throw new Error('Array is not in ascending order');
        }
        if (order === 'descending' && prices[i] > prices[i - 1]) {
            throw new Error('Array is not in descending order');
        }
    }
    return true;
}


