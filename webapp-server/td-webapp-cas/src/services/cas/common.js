import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/cas/common';

/**
 * 查询银行信息
 * 2017-03-20
 */
export async function queryBanklist(params) {
  const p = filterParam(params);
  return request(`${url.queryBanklist}?${qs.stringify(p)}`);
}

/**
 * 查询业务员信息
 * 2017-03-21
 */
export async function queryBizSaleList(params) {
  const p = filterParam(params);
  return request(`${url.queryBizSaleList}?${qs.stringify(p)}`);
}
/**
 * 查询代理商用户角色所属系统信息
 * 2017-03-27
 */
export async function querySysList(params) {
  const p = filterParam(params);
  return request(`${url.querySysList}?${qs.stringify(p)}`);
}
/**
 * 查询附件详情
 * 2017-03-21
 */
export async function queryAttach(params) {
  const p = filterParam(params);
  return request(`${url.queryAttach}?${qs.stringify(p)}`);
}
