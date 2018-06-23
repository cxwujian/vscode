import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/cas/accFundsTransfer';

export async function qryFundsTransInfo(params) {
  const p = filterParam(params);
  return request(`${url.qryFundsTransInfo}?${qs.stringify(p)}`);
}

export async function accountFundsTrans(params) {
  const p = filterParam(params);
  return request(url.accountFundsTrans, {
    method: 'post',
    body: qs.stringify(p),
  });
}

