import { test, expect } from '@playwright/test';
import AirlineApi, { AirlineInfo } from '../../api/AirlineApi';
import AirlineData from '../../testData/airlineApi.json'
import { validateResponseProperty, validateResponseStatus } from '../../testUtils';

const API_BASE_URL = process.env.PROD_API_URL;

test.describe('Airline API Tests', () => {

  test('Create Airline with only mandatory field (name)', async ({ request }) => {

    const validAirlineData: AirlineInfo = AirlineData['validAirlineWithOnlyName'];

    const response = await AirlineApi.createAirline(request, API_BASE_URL, validAirlineData);

    await validateResponseStatus(response, 200);

    const responseBody = await response.json();

    validateResponseProperty(responseBody, 'name', validAirlineData['name']);

    validateResponseProperty(responseBody, '_id');
  });

  test('Create Airline without mandatory field (name)', async ({ request }) => {
    const invalidAirlineData: any = AirlineData['invalidAirlineData'];

    const response = await AirlineApi.createAirline(request, API_BASE_URL, invalidAirlineData);

    await validateResponseStatus(response, 400);

    const responseBody = await response.json();

    validateResponseProperty(responseBody, 'message', 'valid airline data must submit.');
  });

  test('Create Airline with missing airline name', async ({ request }) => {

    const airlineName = undefined;

    const response = await AirlineApi.createAirline(request, API_BASE_URL + '/airlines', { name: airlineName });

    await validateResponseStatus(response, 404);

    expect(response.headers()).toBeDefined(); 
    
  });

  test('Create Airline with all valid fields', async ({ request }) => {
    const validAirlineData: AirlineInfo = AirlineData['validAirlineWithAllFields'];

    const response = await AirlineApi.createAirline(request, API_BASE_URL, validAirlineData);

    await validateResponseStatus(response, 200);

    const responseBody = await response.json();

    validateResponseProperty(responseBody, 'name', validAirlineData.name);

    validateResponseProperty(responseBody, 'country', validAirlineData.country);

    validateResponseProperty(responseBody, 'logo', validAirlineData.logo);

    validateResponseProperty(responseBody, 'slogan', validAirlineData.slogan);

    validateResponseProperty(responseBody, 'head_quaters', validAirlineData.head_quaters);

    validateResponseProperty(responseBody, 'website', validAirlineData.website);

    validateResponseProperty(responseBody, 'established', validAirlineData.established);

    validateResponseProperty(responseBody, '_id');
  });

  test('Create Airline with invalid name format', async ({ request }) => {
    const invalidAirlineData: AirlineInfo = AirlineData['emptyAirlineName'];

    const response = await AirlineApi.createAirline(request, API_BASE_URL, invalidAirlineData);

    await validateResponseStatus(response, 400);

    const responseBody = await response.json();

    validateResponseProperty(responseBody, 'message', 'error in saving data');
  });

  test('Create Airline with extremely long name', async ({ request }) => {
    const validAirlineData: AirlineInfo = AirlineData['longAirlineName'];

    const response = await AirlineApi.createAirline(request, API_BASE_URL, validAirlineData);

    await validateResponseStatus(response, 200);

    const responseBody = await response.json();

    validateResponseProperty(responseBody, 'name', validAirlineData['name']);
  });

  test('Create Airline with valid name and optional fields as null', async ({ request }) => {
    const airlineDataWithNullFields: AirlineInfo = AirlineData['nullOptionals'];

    const response = await AirlineApi.createAirline(request, API_BASE_URL, airlineDataWithNullFields);

    await validateResponseStatus(response, 200);

    const responseBody = await response.json();

    validateResponseProperty(responseBody, 'name', airlineDataWithNullFields.name);

    validateResponseProperty(responseBody, 'country', null);

    validateResponseProperty(responseBody, 'logo', null);

    validateResponseProperty(responseBody, 'slogan', null);

    validateResponseProperty(responseBody, 'head_quaters', null);

    validateResponseProperty(responseBody, 'website', null);

    validateResponseProperty(responseBody, 'established', null);

    validateResponseProperty(responseBody, '_id');
  });

  test('Create Airline with name as special characters', async ({ request }) => {
    const validAirlineData: AirlineInfo = AirlineData['nameWithSpecialChar'];

    const response = await AirlineApi.createAirline(request, API_BASE_URL, validAirlineData);

    await validateResponseStatus(response, 200);

    const responseBody = await response.json();

    validateResponseProperty(responseBody, 'name', validAirlineData.name);
  });

  test('Create Airline with name containing only whitespace', async ({ request }) => {
    const validAirlineData: AirlineInfo = AirlineData['nameWithOnlyWhiteSpaces'];

    const response = await AirlineApi.createAirline(request, API_BASE_URL, validAirlineData);

    await validateResponseStatus(response, 200);

    const responseBody = await response.json();

    validateResponseProperty(responseBody, 'name', validAirlineData.name);
  });

  test('Create Airline with valid name and future established year', async ({ request }) => {
    const validAirlineData: AirlineInfo = AirlineData['nameWithFutureEstYear'];

    const response = await AirlineApi.createAirline(request, API_BASE_URL, validAirlineData);

    await validateResponseStatus(response, 200);

    const responseBody = await response.json();

    validateResponseProperty(responseBody, 'name', validAirlineData.name);
  });

  test('Create Airline and check all response headers', async ({ request }) => {
    const validAirlineData: AirlineInfo =AirlineData['validAirlineWithAllFields'];

    const response = await AirlineApi.createAirline(request, API_BASE_URL, validAirlineData);

    await validateResponseStatus(response, 200);

    const headers = response.headers();

    expect(headers['content-type']).toContain('application/json');

    expect(headers['connection']).toBeDefined();
    
    expect(headers['etag']).toBeDefined();
    
    expect(headers['date']).toBeDefined();
    
    expect(headers['server']).toBeDefined();

    const responseBody = await response.json();

    validateResponseProperty(responseBody, 'name', validAirlineData.name);

    validateResponseProperty(responseBody, '_id');
  })

});
