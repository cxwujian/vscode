import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/cas/cusInf';

const objectId = 'cusNo';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${p.merId}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateBase}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function updateList(params) {
  const p = filterParam(params);
  return request(url.updateList, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function addOne(params) {
  const p = filterParam(params);
  return request(url.addOne, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function queryCusCateList(params) {
  const p = filterParam(params);
  return request(`${url.queryCusCateList}?${qs.stringify(p)}`);
}


export async function queryCusAdjustCateList(params) {
  const p = filterParam(params);
  return request(`${url.queryCusAdjustCateList}?${qs.stringify(p)}`);
}
