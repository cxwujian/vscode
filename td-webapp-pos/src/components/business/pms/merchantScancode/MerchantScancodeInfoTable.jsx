import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { cent2Yuan } from '../../../../utils/currency';

const TerminalCompanyInfoTable = (props) => {
  const bizMap = i18n.bizMap('pms/merchantScancode');
  const wechatMap = i18n.bizMap('pms/wechat');
  const baiduMap = i18n.bizMap('pms/baidu');
  const alipayMap = i18n.bizMap('pms/alipay')
  const commonMap = i18n.commonMap();
  const { data } = props;
  let chnType = '';
  switch (data.chnType) {
    case '1': chnType = bizMap['chnType-1']; break;
    case '2': chnType = bizMap['chnType-2']; break;
    case '0': chnType = bizMap['chnType-0']; break;
    default: chnType = ''; break;
  }
  let chnStatus = '';
  switch (data.chnStatus) {
    case '0': chnStatus = bizMap['chnStatus-0']; break;
    case '1': chnStatus = bizMap['chnStatus-1']; break;
    default: chnStatus = ''; break;
  }
  let chnTxnType = '';
  switch (data.chnTxnType) {
    case '2': chnTxnType = bizMap['chnTxnType-2']; break;
    case '1': chnTxnType = bizMap['chnTxnType-1']; break;
    default: chnTxnType = ''; break;
  }
  let needCheck = '';
  switch (data.needCheck) {
    case '0': needCheck = commonMap['check-0']; break;
    case '1': needCheck = commonMap['check-1']; break;
    default: needCheck = ''; break;
  }
  let chnMerType = '';
  switch (data.chnMerType) {
    case '1': chnMerType = bizMap['chnMerType-1']; break;
    case '2': chnMerType = bizMap['chnMerType-2']; break;
    default: chnMerType = ''; break;
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.chnName}:</td>
          <td>{data.chnName}</td>
          <td>{bizMap.chnType}:</td>
          <td>{chnType}</td>
        </tr>
        <tr>
          <td>{bizMap.chnMerName}:</td>
          <td>{data.chnMerName}</td>
        </tr>
        <tr>
          <td>{bizMap.chnMerType}:</td>
          <td colSpan={3}>{chnMerType}</td>
          {/*<td>{bizMap.chnMerStatus}:</td>
          <td>{chnMerStatus}</td>*/}
        </tr>
        <tr>
          <td style={{ display: data.linkType === '0' && data.scanType === '1' ? '' : 'none' }}>{alipayMap.alipayPid}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '1' ? '' : 'none' }}>{data.alipayPid}</td>
           <td style={{ display: data.linkType === '0' && data.scanType === '1' ? '' : 'none' }}>{alipayMap.alipayTk}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '1' ? '' : 'none' }}>{data.alipayTk}</td>
        </tr>
         <tr>
          <td style={{ display: data.linkType === '0' && data.scanType === '1' ? '' : 'none' }}>{alipayMap.alipayRefreshTk}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '1' ? '' : 'none' }}>{data.alipayRefreshTk}</td>
           <td style={{ display: data.linkType === '0' && data.scanType === '1' ? '' : 'none' }}>{alipayMap.alipayMd5Key}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '1' ? '' : 'none' }}>{data.alipayMd5Key}</td>
        </tr>
         <tr>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{wechatMap.wechatAppId}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{data.wechatAppId}</td>
        </tr>
        <tr>
         <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{wechatMap.wechatMerNo}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{data.wechatMerNo}</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{wechatMap.wechatMerSubNo}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{data.wechatMerSubNo}</td>
        </tr>
         <tr>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{wechatMap.wechatTxnKey}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{data.wechatTxnKey}</td>
           <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{wechatMap.wechatTxnCert}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '0' ? '' : 'none' }}>{data.wechatTxnCert}</td>
        </tr>
         <tr>
          <td style={{ display: data.linkType === '0' && data.scanType === '2' ? '' : 'none' }}>{baiduMap.baiduMerNo}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '2' ? '' : 'none' }}>{data.baiduMerNo}</td>
           <td style={{ display: data.linkType === '0' && data.scanType === '2' ? '' : 'none' }}>{baiduMap.baiduTxnKey}:</td>
          <td style={{ display: data.linkType === '0' && data.scanType === '2' ? '' : 'none' }}>{data.baiduTxnKey}</td>
        </tr>
        <tr>
          <td style={{ display: data.linkType === '1' ? '' : 'none' }}>{bizMap.txnMerNo}:</td>
          <td style={{ display: data.linkType === '1' ? '' : 'none' }}>{data.txnMerNo}</td>
           <td style={{ display: data.linkType === '1' ? '' : 'none' }}>{bizMap.txnKey}:</td>
          <td style={{ display: data.linkType === '1' ? '' : 'none' }}>{data.txnKey}</td>
        </tr>
         <tr>
          <td style={{ display: data.linkType === '1' ? '' : 'none' }}>{bizMap.txnAppid}:</td>
          <td style={{ display: data.linkType === '1' ? '' : 'none' }}>{data.txnAppid}</td>
           <td style={{ display: data.linkType === '1' ? '' : 'none' }}>{bizMap.txnMerType}:</td>
          <td style={{ display: data.linkType === '1' ? '' : 'none' }}>{data.txnMerType}</td>
        </tr>
        <tr>
          <td>{bizMap.singleDayLimit}:</td>
          <td>{cent2Yuan(data.singleDayLimit)}</td>
          <td>{bizMap.singleMonthLimit}:</td>
          <td>{cent2Yuan(data.singleMonthLimit)}</td>
        </tr>
        <tr>
          <td>{bizMap.singleDayCount}:</td>
          <td>{data.singleDayCount ? data.singleDayCount : '0'}</td>
          <td>{bizMap.singleMonthCount}:</td>
          <td>{data.singleMonthCount ? data.singleMonthCount : '0'}</td>
        </tr>
        <tr>
          <td>{bizMap.singleMinAmt}:</td>
          <td>{cent2Yuan(data.singleMinAmt)}</td>
          <td>{bizMap.singleMaxAmt}:</td>
          <td>{cent2Yuan(data.singleMaxAmt)}</td>
        </tr>
        <tr>
          <td>{bizMap.txnRate}:</td>
          <td>{data.txnRate ? data.txnRate : '0'}</td>
        </tr>
      </tbody>
    </table>
  );
}

TerminalCompanyInfoTable.propTypes = {
  data: PropTypes.object,
};

TerminalCompanyInfoTable.defaultProps = {
  data: {},
}

export default TerminalCompanyInfoTable;
