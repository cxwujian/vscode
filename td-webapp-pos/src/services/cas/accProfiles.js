import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/cas/accProfiles';

const objectId = 'actNo';
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
  return request(`${url.updateOne}/${p[objectId]}`, {
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

export async function frozenOne(params) {
  const p = filterParam(params);
  return request(`${url.frozenOne}/frozen`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function subAccProfiles(params) {
  const p = filterParam(params);
  return request(`${url.subAccProfiles}?${qs.stringify(p)}`);
}

export async function updateOneState(params) {
  const p = filterParam(params);
  return request(`${url.updateOneState}/updateOneState`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function deleteOne(params) {
  const p = filterParam(params);
  return request(`${url.deleteOne}?${qs.stringify(p)}`, {
    method: 'delete',
  });
}

export async function queryCateOfAcc(params) {
  const p = filterParam(params);
  return request(`${url.queryCateOfAcc}?${qs.stringify(p)}`);
}

