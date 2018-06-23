import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/cas/transactionSubCode';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}
export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateOne}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
export async function updateListStatus(params) {
  const p = filterParam(params);
  return request(url.updateListStatus, {
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
export async function updateSubEntryId(params) {
  const p = filterParam(params);
  return request(`${url.updateSubEntryId}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
export async function updateSubExtCod(params) {
  const p = filterParam(params);
  return request(`${url.updateSubExtCod}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
