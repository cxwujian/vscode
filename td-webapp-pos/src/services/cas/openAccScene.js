import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/cas/openAccScene';

const objectId = 'sceneId';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${p[objectId]}?${qs.stringify(p)}`);
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

export async function updateListStatus(params) {
  const p = filterParam(params);
  return request(url.updateListStatus, {
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

// export async function querySubjectList(params) {
//   const p = filterParam(params);
//   return request(`${url.querySubjectList}?${qs.stringify(p)}`);
// }

export async function querySceneIdList(params) {
  const p = filterParam(params);
  return request(`${url.querySceneIdList}?${qs.stringify(p)}`);
}

export async function queryCateIdList(params) {
  const p = filterParam(params);
  return request(`${url.queryCateIdList}?${qs.stringify(p)}`);
}
