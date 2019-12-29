import { HTTPCache, RESTDataSource } from 'apollo-datasource-rest';
import { getEnv } from '../utils';

export default class EngagesAPI extends RESTDataSource {
  constructor() {
    super();

    const ENGAGES_API_DOMAIN = getEnv({ name: 'ENGAGES_API_DOMAIN' });

    this.baseURL = ENGAGES_API_DOMAIN;
    this.httpCache = new HTTPCache();
  }

  public didEncounterError(e) {
    const error = e.extensions || {};
    const { response } = error;
    const { body } = response || { body: e.message };

    if (e.code === 'ECONNREFUSED' || e.code === 'ENOTFOUND') {
      throw new Error('Engages api is not running');
    }

    throw new Error(body);
  }

  public async engagesConfigDetail() {
    return this.get(`/configs/detail`);
  }

  public async engagesConfigSave(params) {
    return this.post(`/configs/save`, params);
  }

  public engagesGetVerifiedEmails() {
    return this.get(`/configs/get-verified-emails`);
  }

  public async engagesStats(engageMessageId) {
    return this.get(`/deliveryReports/statsList/${engageMessageId}`);
  }

  public engagesLogs(engageMessageId) {
    return this.get(`/deliveryReports/logs/${engageMessageId}`);
  }
}
