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

/**
 * @description asserts the reponse property
 *
 * @export
 * @param {*} response
 * @param {string} fieldName
 * @param {?string} [fieldValue]
 */
export function validateResponseProperty(response: any, fieldName: string, fieldValue?: string) {
  if (!response.hasOwnProperty(fieldName)) {
    throw new Error(`Response does not contain field: ${fieldName}`);
  }
  else if (fieldValue && response[fieldName] !== fieldValue) {
    throw new Error(`Response contains the fields. but values are different, expected value is ${fieldValue} but got ${response[fieldName]}`);
  }
}

/**
 * @description validates Response Status
 *
 * @export
 * @async
 * @param {*} response
 * @param {number} expectedStatus
 * @returns {Promise<void>}
 */
export async function validateResponseStatus(response: any, expectedStatus: number): Promise<void> {
  if (response.status() !== expectedStatus) {
    throw new Error(`Expected status ${expectedStatus}, but got ${response.status()}`);
  }
}





