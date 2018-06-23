import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';
import { formatDateString } from '../../../../../utils/date';

const AccUnfrozDetailTable = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('cas/accFrozDetail');
  let frozSts = '';
  switch (data.frozSts) {
    case '0': frozSts = bizMap['frozSts-0']; break;
    case '1': frozSts = bizMap['frozSts-1']; break;
    case '2': frozSts = bizMap['frozSts-2']; break;
    default: frozSts = ''; break;
  }
  let accTyp = '';
  switch (data.accTyp) {
    case '1':
      accTyp = bizMap['accTyp-1'];
      break;
    case '2':
      accTyp = bizMap['accTyp-2'];
      break;
    case '3':
      accTyp = bizMap['accTyp-3'];
      break;
    case '4':
      accTyp = bizMap['accTyp-4'];
      break;
    default: accTyp = '';
      break;
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.actNo}:</td>
          <td>{data.actNo}</td>
          <td>{bizMap.actNme}:</td>
          <td>{data.actNme}</td>
        </tr>
        <tr>
          <td>{bizMap.accTyp}:</td>
          <td>{accTyp}</td>
          <td>{bizMap.subjectNme}:</td>
          <td>{data.subjectNme}</td>
        </tr>
        <tr>
          <td>{bizMap.frozSts}:</td>
          <td>{frozSts}</td>
          <td>{bizMap.ccy}:</td>
          <td>{data.ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.frozAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.frozAmt, data.ccy)}</td>
          <td>{bizMap.thawAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.thawAmt, data.ccy)}</td>
        </tr>
        <tr>
          <td>{bizMap.frozRsn}:</td>
          <td>{data.frozRsn}</td>
          <td>{bizMap.creTim}:</td>
          <td>{data.creDat && data.creTim ? formatDateString(data.creDat + data.creTim) : ''} </td>
        </tr>
        <tr>
          <td>{bizMap.creOpr}:</td>
          <td>{data.creOpr}</td>
        </tr>
        <tr>
          <td>{bizMap.thawAmt1}:</td>
          <td>{amtMinUnitToStandUnit(data.thawAmt1, data.ccy)}</td>
        </tr>
        <tr>
          <td>{bizMap.thawRsn}:</td>
          <td>{data.thawRsn}</td>
        </tr>
      </tbody>
    </table>
  );
}

AccUnfrozDetailTable.propTypes = {
  data: PropTypes.object,
};

AccUnfrozDetailTable.defaultProps = {
  data: {},
}

export default AccUnfrozDetailTable;
