import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { formatDateString } from '../../../../../utils/date';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

const CasBokAccJnlInfoTable = (props) => {
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
  let bokSts = '';
  switch (data.bokSts) {
    case 'U': bokSts = bizMap['bokSts-U']; break;
    case 'S': bokSts = bizMap['bokSts-S']; break;
    case 'F': bokSts = bizMap['bokSts-F']; break;
    case 'C': bokSts = bizMap['bokSts-C']; break;
    case 'R': bokSts = bizMap['bokSts-R']; break;
    default: bokSts = ''; break;
  }
  let accTyp = '';
  switch (data.accTyp) {
    case '1': accTyp = bizMap['accTyp-1']; break;
    case '2': accTyp = bizMap['accTyp-2']; break;
    case '3': accTyp = bizMap['accTyp-3']; break;
    case '4': accTyp = bizMap['accTyp-4']; break;
    default: accTyp = ''; break;
  }
  let cdFlg = '';
  switch (data.cdFlg) {
    case 'D': cdFlg = bizMap['cdFlg-D']; break;
    case 'C': cdFlg = bizMap['cdFlg-C']; break;
    default: cdFlg = ''; break;
  }
  let accMode = '';
  switch (data.accMode) {
    case '01': accMode = bizMap['accMode-01']; break;
    case '02': accMode = bizMap['accMode-02']; break;
    case '03': accMode = bizMap['accMode-03']; break;
    default: accMode = ''; break;
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
          <td>{bizMap.voucherId}:</td>
          <td>{data.voucherId}</td>
          <td>{bizMap.txnTyp}:</td>
          <td>{txnTyp}</td>
        </tr>
        <tr>
          <td>{bizMap.txnCode}:</td>
          <td>{data.txnCode}</td>
          <td>{bizMap.blgSubject}:</td>
          <td>{data.blgSubject}</td>
        </tr>
        <tr>
          <td>{bizMap.ccy}:</td>
          <td>{data.ccy}</td>
          <td>{bizMap.txnAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.txnAmt, data.ccy)}</td>
        </tr>
        <tr>
          <td>{bizMap.accTyp}:</td>
          <td>{accTyp}</td>
          <td>{bizMap.cdFlg}:</td>
          <td>{cdFlg}</td>
        </tr>
        <tr>
          <td>{bizMap.bokSts}:</td>
          <td>{bokSts}</td>
          <td>{bizMap.oTckNo}:</td>
          <td>{data.oTckNo}</td>
        </tr>
        <tr>
          <td>{bizMap.accMode}:</td>
          <td>{accMode}</td>
        </tr>
        <tr>
          <td>{bizMap.regTim}:</td>
          <td>{formatDateString(data.regTim)}</td>
          <td>{bizMap.lstUpdTim}:</td>
          <td>{formatDateString(data.lstUpdTim)}</td>
        </tr>
      </tbody>
    </table>
  );
}

CasBokAccJnlInfoTable.propTypes = {
  data: PropTypes.object,
};

CasBokAccJnlInfoTable.defaultProps = {
  data: {},
}

export default CasBokAccJnlInfoTable;
