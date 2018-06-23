import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/cas/busTypGroup';

const groupId = 'groupId';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateOne}/${p[groupId]}`, {
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

export async function queryBusIdList(params) {
  const p = filterParam(params);
  return request(`${url.queryBusIdList}?${qs.stringify(p)}`);
}

export async function queryBusIdSubList(params) {
  const p = filterParam(params);
  return request(`${url.queryBusIdSubList}?${qs.stringify(p)}`);
}

export async function disableOne(params) {
  const p = filterParam(params);
  return request(`${url.disableOne}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function cancelBusId(params) {
  const p = filterParam(params);
  return request(`${url.cancelBusId}`, {
    method: 'put',
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

