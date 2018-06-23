import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

const AccountFundsTransTable = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('cas/accFundsTrans');
  let dAccTyp = '';
  switch (data.dAccTyp) {
    case '1':
      dAccTyp = bizMap['accTyp-1'];
      break;
    case '2':
      dAccTyp = bizMap['accTyp-2'];
      break;
    case '3':
      dAccTyp = bizMap['accTyp-3'];
      break;
    case '4':
      dAccTyp = bizMap['accTyp-4'];
      break;
    default: dAccTyp = '';
      break;
  }
  let cAccTyp = '';
  switch (data.cAccTyp) {
    case '1':
      cAccTyp = bizMap['accTyp-1'];
      break;
    case '2':
      cAccTyp = bizMap['accTyp-2'];
      break;
    case '3':
      cAccTyp = bizMap['accTyp-3'];
      break;
    case '4':
      cAccTyp = bizMap['accTyp-4'];
      break;
    default: cAccTyp = '';
      break;
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>&nbsp;</td>
          <td colSpan="2"><div style={{ margin: '0 auto', color: '#5C5C5C', width: 200, height: 50, fontSize: 16, fontWeight: '600' }}>{bizMap.debit}</div></td>
          <td>&nbsp;</td>
          <td colSpan="2"><div style={{ margin: '0 auto', color: '#5C5C5C', width: 200, height: 50, fontSize: 16, fontWeight: '600' }}>{bizMap.credit}</div></td>
        </tr>
        <tr>
          <td>{bizMap.accTyp}:</td>
          <td>{dAccTyp}</td>
          <td>{bizMap.accTyp}:</td>
          <td>{cAccTyp}</td>
        </tr>
        <tr>
          <td>{bizMap.subject}:</td>
          <td>{data.dSubject}</td>
          <td>{bizMap.subject}:</td>
          <td>{data.cSubject}</td>
        </tr>
        <tr>
          <td>{bizMap.subjectNme}:</td>
          <td>{data.dSubjectNme}</td>
          <td>{bizMap.subjectNme}:</td>
          <td>{data.cSubjectNme}</td>
        </tr>
        <tr>
          <td>{bizMap.chnOrgCod}:</td>
          <td>{data.dChnOrgCod ? `${data.dChnOrgCod}-${data.dChnOrgName}` : ''}</td>
          <td>{bizMap.chnOrgCod}:</td>
          <td>{data.cChnOrgCod ? `${data.cChnOrgCod}-${data.cChnOrgName}` : ''}</td>
        </tr>
        <tr>
          <td>{bizMap.adjustDirection}:</td>
          <td>{data.dimprCd}</td>
          <td>{bizMap.adjustDirection}:</td>
          <td>{data.cimprCd}</td>
        </tr>
        <tr>
          <td>{bizMap.fundsTransAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.fundsTransAmt, data.ccy)}</td>
          <td>{bizMap.ccy}:</td>
          <td>{data.ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.remark}:</td>
          <td>{data.remark}</td>
        </tr>
      </tbody>
    </table>
  );
}

AccountFundsTransTable.propTypes = {
  data: PropTypes.object,
};

AccountFundsTransTable.defaultProps = {
  data: {},
}

export default AccountFundsTransTable;
