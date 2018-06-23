import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/cas/accAdjustment';

export async function accountAdjustment(params) {
  const p = filterParam(params);
  return request(url.accountAdjustment, {
    method: 'post',
    body: qs.stringify(p),
  });
}

