import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/cas/accFrozDetail';

const objectId = 'pkId';
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryAllList(params) {
  const p = filterParam(params);
  return request(`${url.queryAllList}?${qs.stringify(p)}`);
}

export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateOne}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function queryHandleList(params) {
  const p = filterParam(params);
  return request(`${url.queryHandleList}?${qs.stringify(p)}`);
}

export async function updateHandleOne(params) {
  const p = filterParam(params);
  return request(`${url.updateHandleOne}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

