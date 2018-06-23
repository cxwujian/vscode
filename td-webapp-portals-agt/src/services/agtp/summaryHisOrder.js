import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/agtp/summaryHisOrder';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function exportList(params) {
  const p = filterParam(params);
  return request(`${url.exportList}?${qs.stringify(p)}`);
}
