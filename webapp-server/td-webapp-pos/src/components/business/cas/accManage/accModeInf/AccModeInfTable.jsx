import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';

const AccModeInfTable = (props) => {
  const bizMap = i18n.bizMap('cas/accModeInf');
  const { data } = props;
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
          <td>{bizMap.accMode}:</td>
          <td>{accMode}</td>
        </tr>
        <tr>
          <td>{bizMap.modeNme}:</td>
          <td>{data.modeNme}</td>
        </tr>
        {
          data.accMode === '02' ?
            <tr>
              <td>{bizMap.fixedTim}:</td>
              <td>{data.fixedTim}</td>
            </tr>
            : null
        }
        {
          data.accMode === '03' ?
            <tr>
              <td>{bizMap.fixedAlterTim}:</td>
              <td>{data.fixedAlterTim}</td>
            </tr>
            : null
        }
        <tr>
          <td>{bizMap.remark}:</td>
          <td>{data.remark}</td>
        </tr>
      </tbody>
    </table>
  );
}

AccModeInfTable.propTypes = {
  data: PropTypes.object,
};

AccModeInfTable.defaultProps = {
  data: {},
}

export default AccModeInfTable;
