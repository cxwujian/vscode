import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { formatDateString } from '../../../../../utils/date';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

const CasAccVoucherInfoTable = (props) => {
  const bizMap = i18n.bizMap('cas/casJnlQry');
  const { data } = props;
  let cdFlg = '';
  switch (data.cdFlg) {
    case 'D': cdFlg = bizMap['cdFlg-D']; break;
    case 'C': cdFlg = bizMap['cdFlg-C']; break;
    default: cdFlg = ''; break;
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
          <td>{amtMinUnitToStandUnit(data.debitAmt, data.ccy)}</td>
          <td>{bizMap.creditAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.creditAmt, data.ccy)}</td>
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
