import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { formatDateString } from '../../../../../utils/date';
import { cent2Yuan } from '../../../../../utils/currency';

const CasAccVoucherInfoTable = (props) => {
  const bizMap = i18n.bizMap('cas/casJnlQry');
  const { data } = props;
  let txnTyp = '';
  switch (data.txnTyp) {
    case 'N': txnTyp = bizMap['txnTyp-N']; break;
    case 'R': txnTyp = bizMap['txnTyp-R']; break;
    case 'C': txnTyp = bizMap['txnTyp-C']; break;
    case 'H': txnTyp = bizMap['txnTyp-H']; break;
    case 'T': txnTyp = bizMap['txnTyp-T']; break;
    default: txnTyp = ''; break;
  }
  let cdFlg = '';
  switch (data.cdFlg) {
    case 'D': cdFlg = bizMap['cdFlg-D']; break;
    case 'C': cdFlg = bizMap['cdFlg-C']; break;
    default: cdFlg = ''; break;
  }
  let ccy = '';
  switch (data.ccy) {
    case 'CNY': ccy = bizMap['ccy-CNY']; break;
    case 'USD': ccy = bizMap['ccy-USD']; break;
    case 'EUR': ccy = bizMap['ccy-EUR']; break;
    case 'HKD': ccy = bizMap['ccy-HKD']; break;
    case 'GBP': ccy = bizMap['ccy-GBP']; break;
    default: ccy = ''; break;
  }

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.txnLog}:</td>
          <td>{data.txnLog}</td>
          <td>{bizMap.voucherId}:</td>
          <td>{data.voucherId}</td>
        </tr>
        <tr>
          <td>{bizMap.subject}:</td>
          <td>{data.subject}</td>
          <td>{bizMap.cdFlg}:</td>
          <td>{cdFlg}</td>
        </tr>
        <tr>
          <td>{bizMap.debitAmt}:</td>
          <td>{cent2Yuan(data.debitAmt)}</td>
          <td>{bizMap.creditAmt}:</td>
          <td>{cent2Yuan(data.creditAmt)}</td>
        </tr>
        <tr>
          <td>{bizMap.regTim}:</td>
          <td>{formatDateString(data.regTim)}</td>
          <td>{bizMap.summary}:</td>
          <td>{data.summary}</td>
        </tr>
        <tr>
          <td>{bizMap.remark}:</td>
          <td>{data.remark}</td>
        </tr>
      </tbody>
    </table>
  );
}

CasAccVoucherInfoTable.propTypes = {
  data: PropTypes.object,
};

CasAccVoucherInfoTable.defaultProps = {
  data: {},
}

export default CasAccVoucherInfoTable;
