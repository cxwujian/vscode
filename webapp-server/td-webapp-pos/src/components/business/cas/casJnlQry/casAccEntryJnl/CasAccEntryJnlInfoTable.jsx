import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { formatDateString } from '../../../../../utils/date';
import { cent2Yuan } from '../../../../../utils/currency';

const CasAccEntryJnlInfoTable = (props) => {
  const bizMap = i18n.bizMap('cas/casJnlQry');
  const { data } = props;
  let ccy = '';
  switch (data.ccy) {
    case 'CNY': ccy = bizMap['ccy-CNY']; break;
    case 'USD': ccy = bizMap['ccy-USD']; break;
    case 'EUR': ccy = bizMap['ccy-EUR']; break;
    case 'HKD': ccy = bizMap['ccy-HKD']; break;
    case 'GBP': ccy = bizMap['ccy-GBP']; break;
    default: ccy = ''; break;
  }
  let subjectLev = '';
  switch (data.subjectLev) {
    case '1': subjectLev = bizMap['subjectLev-1']; break;
    case '2': subjectLev = bizMap['subjectLev-2']; break;
    case '3': subjectLev = bizMap['subjectLev-3']; break;
    default: subjectLev = ''; break;
  }
  let isLastLev = '';
  switch (data.isLastLev) {
    case '0': isLastLev = bizMap['isLastLev-0']; break;
    case '1': isLastLev = bizMap['isLastLev-1']; break;
    default: isLastLev = ''; break;
  }
  let cdFlg = '';
  switch (data.cdFlg) {
    case 'D': cdFlg = bizMap['cdFlg-D']; break;
    case 'C': cdFlg = bizMap['cdFlg-C']; break;
    default: cdFlg = ''; break;
  }
  let accTyp = '';
  switch (data.subjectLev) {
    case '1': accTyp = bizMap['accTyp-1']; break;
    case '2': accTyp = bizMap['accTyp-2']; break;
    case '3': accTyp = bizMap['accTyp-3']; break;
    default: accTyp = ''; break;
  }

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.txnLog}:</td>
          <td>{data.txnLog}</td>
          <td>{bizMap.actDat}:</td>
          <td>{formatDateString(data.actDat)}</td>
        </tr>
        <tr>
          <td>{bizMap.actNo}:</td>
          <td>{data.actNo}</td>
          <td>{bizMap.actNme}:</td>
          <td>{data.actNme}</td>
        </tr>
        <tr>
          <td>{bizMap.txnAmt}:</td>
          <td>{cent2Yuan(data.txnAmt)}</td>
          <td>{bizMap.voucherId}:</td>
          <td>{data.voucherId}</td>
        </tr>
        <tr>
          <td>{bizMap.subject}:</td>
          <td>{data.subject}</td>
          <td>{bizMap.subjectNme}:</td>
          <td>{data.subjectNme}</td>
        </tr>
        <tr>
          <td>{bizMap.subjectLev}:</td>
          <td>{subjectLev}</td>
          <td>{bizMap.isLastLev}:</td>
          <td>{isLastLev}</td>
        </tr>
        <tr>
          <td>{bizMap.supSubject}:</td>
          <td>{data.supSubject}</td>
          <td>{bizMap.accTyp}:</td>
          <td>{accTyp}</td>
        </tr>
        <tr>
          <td>{bizMap.ccy}:</td>
          <td>{ccy}</td>
          <td>{bizMap.cdFlg}:</td>
          <td>{cdFlg}</td>
        </tr>
        <tr>
          <td>{bizMap.regTim}:</td>
          <td>{formatDateString(data.regTim)}</td>
          <td>{bizMap.lstUpdTim}:</td>
          <td>{formatDateString(data.lstUpdTim)}</td>
        </tr>
        <tr>
          <td>{bizMap.remark}:</td>
          <td>{data.remark}</td>
        </tr>
      </tbody>
    </table>
  );
}

CasAccEntryJnlInfoTable.propTypes = {
  data: PropTypes.object,
};

CasAccEntryJnlInfoTable.defaultProps = {
  data: {},
}

export default CasAccEntryJnlInfoTable;
