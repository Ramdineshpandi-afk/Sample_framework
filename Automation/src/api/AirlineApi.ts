import http from "./HttpMethods";
import { AIRLINE_ENDPOINTS } from "./endPoints/airline";


class AirlineAPI {
  /**
   * @description creates Airline Data
   *
   * @async
   * @param {*} client
   * @param {string} apiBaseUrl
   * @param {*} data
   */
  async createAirline(client: any, apiBaseUrl: string, data: any) {
    return await http.post(client, apiBaseUrl.concat(AIRLINE_ENDPOINTS.airlinesData), data);
  }

  /**
   * @description retrives airline data
   *
   * @async
   * @param {*} client
   * @param {string} endpoint
   * @returns {Promise}
   */
  async getAirline(client: any, endpoint: string): Promise<any> {
    return await http.get(client, endpoint);
  }

}

export default new AirlineAPI();

export interface AirlineInfo {
  _id?: string;
  name: string;  // mandatory field
  country?: string;
  logo?: string;
  slogan?: string;
  head_quaters?: string;
  website?: string;
  established?: string;
}
