import qs from 'qs';
import { request, filterParam } from '../utils/request';
import * as url from '../../config/url/homeUrl';

export async function queryExpOrdInfo(params) {
  const p = filterParam(params);
  return request(`${url.queryExpOrdInfo}?${qs.stringify(p)}`);
}
export async function queryFaultTerInfo(params) {
  const p = filterParam(params);
  return request(`${url.queryFaultTerInfo}?${qs.stringify(p)}`);
}
export async function queryLackTerInfo(params) {
  const p = filterParam(params);
  return request(`${url.queryLackTerInfo}?${qs.stringify(p)}`);
}


export async function other() {
  return {};
}

// get home graphic data start
export async function queryCheckCount(params) {
  const p = filterParam(params);
  return request(`${url.queryCheckCount}?${qs.stringify(p)}`);
}

export async function querySettleCount(params) {
  const p = filterParam(params);
  return request(`${url.querySettleCount}?${qs.stringify(p)}`);
}

export async function queryShareCount(params) {
  const p = filterParam(params);
  return request(`${url.queryShareCount}?${qs.stringify(p)}`);
}
