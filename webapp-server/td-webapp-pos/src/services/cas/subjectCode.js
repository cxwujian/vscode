import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/cas/subjectCode';

const subject = 'subject';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}?${qs.stringify(p)}`);
}

export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateOne}/${p[subject]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function disableOne(params) {
  const p = filterParam(params);
  return request(`${url.disableOne}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function queryBusIdList(params) {
  const p = filterParam(params);
  return request(`${url.queryBusIdList}?${qs.stringify(p)}`);
}

export async function addOne(params) {
  const p = filterParam(params);
  return request(url.addOne, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function enableOne(params) {
  const p = filterParam(params);
  return request(url.enableOne, {
    method: 'put',
    body: qs.stringify(p),
  });
}
