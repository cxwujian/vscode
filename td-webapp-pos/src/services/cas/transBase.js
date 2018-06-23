import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/cas/transaction';

const objectId = 'txnCode';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryAllList(params) {
  const p = filterParam(params);
  return request(`${url.queryAllList}?${qs.stringify(p)}`);
}

export async function querySubList(params) {
  const p = filterParam(params);
  return request(`${url.querySubList}?${qs.stringify(p)}`);
}

export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateOne}/${p[objectId]}`, {
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
export async function deleteOne(params) {
  const p = filterParam(params);
  return request(`${url.deleteOne}?${qs.stringify(p)}`, {
    method: 'delete',
  });
}

