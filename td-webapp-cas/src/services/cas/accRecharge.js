import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/cas/accRecharge';

export async function accountRecharge(params) {
  const p = filterParam(params);
  return request(url.accountRecharge, {
    method: 'post',
    body: qs.stringify(p),
  });
}

