import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/rms/mcc';

// const objectId = 'mccNo';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}
