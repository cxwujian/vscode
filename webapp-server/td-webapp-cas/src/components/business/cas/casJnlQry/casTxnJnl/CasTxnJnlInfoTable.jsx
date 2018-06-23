import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { formatDateString } from '../../../../../utils/date';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

const CasTxnJnlInfoTable = (props) => {
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
  let accTxnSts = '';
  switch (data.accTxnSts) {
    case 'U': accTxnSts = bizMap['accTxnSts-U']; break;
    case 'S': accTxnSts = bizMap['accTxnSts-S']; break;
    case 'F': accTxnSts = bizMap['accTxnSts-F']; break;
    case 'C': accTxnSts = bizMap['accTxnSts-C']; break;
    case 'R': accTxnSts = bizMap['accTxnSts-R']; break;
    default: accTxnSts = ''; break;
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.txnLog}:</td>
          <td>{data.txnLog}</td>
          <td>{bizMap.logNo}:</td>
          <td>{data.logNo}</td>
        </tr>
        <tr>
          <td>{bizMap.tckNo}:</td>
          <td>{data.tckNo}</td>
          <td>{bizMap.oTckNo}:</td>
          <td>{data.oTckNo}</td>
        </tr>
        <tr>
          <td>{bizMap.actDat}:</td>
          <td>{formatDateString(data.actDat)}</td>
          <td>{bizMap.regTim}:</td>
          <td>{formatDateString(data.regTim)}</td>
        </tr>
        <tr>
          <td>{bizMap.ccy}:</td>
          <td>{data.ccy}</td>
          <td>{bizMap.txnAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.txnAmt, data.ccy)}</td>
        </tr>
        <tr>
          <td>{bizMap.batchNo}:</td>
          <td>{data.batchNo}</td>
          <td>{bizMap.txnTyp}:</td>
          <td>{txnTyp}</td>
        </tr>
        <tr>
          <td>{bizMap.txnCode}:</td>
          <td>{data.txnCode}</td>
          <td>{bizMap.subCod}:</td>
          <td>{data.subCod}</td>
        </tr>
        <tr>
          <td>{bizMap.voucherId}:</td>
          <td>{data.voucherId}</td>
          <td>{bizMap.feeAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.feeAmt, data.ccy)}</td>
        </tr>
        <tr>
          <td>{bizMap.feeAmt2}:</td>
          <td>{amtMinUnitToStandUnit(data.feeAmt2, data.ccy)}</td>
          <td>{bizMap.feeAmt3}:</td>
          <td>{amtMinUnitToStandUnit(data.feeAmt3, data.ccy)}</td>
        </tr>
        <tr>
          <td>{bizMap.shrAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.shrAmt, data.ccy)}</td>
          <td>{bizMap.incAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.incAmt, data.ccy)}</td>
        </tr>
        <tr>
          <td>{bizMap.payChnCde}:</td>
          <td>{data.payChnCde}</td>
          <td>{bizMap.pyeChnCde}:</td>
          <td>{data.pyeChnCde}</td>
        </tr>
        <tr>
          <td>{bizMap.payCusId}:</td>
          <td>{data.payCusId}</td>
          <td>{bizMap.pyeCusId}:</td>
          <td>{data.pyeCusId}</td>
        </tr>
        <tr>
          <td>{bizMap.accRspCde}:</td>
          <td>{data.accRspCde}</td>
          <td>{bizMap.accRspMsg}:</td>
          <td>{data.accRspMsg}</td>
        </tr>
        <tr>
          <td>{bizMap.accTxnSts}:</td>
          <td>{accTxnSts}</td>
          <td>{bizMap.remark}:</td>
          <td>{data.remark}</td>
        </tr>
      </tbody>
    </table>
  );
}

CasTxnJnlInfoTable.propTypes = {
  data: PropTypes.object,
};

CasTxnJnlInfoTable.defaultProps = {
  data: {},
}

export default CasTxnJnlInfoTable;
