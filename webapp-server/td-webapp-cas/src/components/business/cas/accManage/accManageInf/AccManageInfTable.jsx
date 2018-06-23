import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { formatDateString } from '../../../../../utils/date';

const AccManageInfTable = (props) => {
  const bizMap = i18n.bizMap('cas/accManageInf');
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
          <td>{bizMap.subject}:</td>
          <td>{`${data.subject}-${data.subjectNme}`}</td>
          <td>{bizMap.cusNo}:</td>
          <td>{data.cusNo}</td>
        </tr>
        <tr>
          <td>{bizMap.subAccId}:</td>
          <td>{`${data.subAccId}-${data.subAccName}`}</td>
          <td>{bizMap.accMode}:</td>
          <td>{accMode}</td>
        </tr>
        <tr>
          {
            data.fixedTim ?
              <div>
                <td>{bizMap.fixedTim}:</td>
                <td>{data.fixedTim}</td>
              </div>
              :
              ''
          }
          {
            data.fixedAlterTim ?
              <div>
                <td>{bizMap.fixedAlterTim}:</td>
                <td>{formatDateString(data.fixedAlterTim)}</td>
              </div>
              :
              ''
          }
        </tr>
        <tr>
          <td>{bizMap.regTim}:</td>
          <td>{formatDateString(data.regTim)}</td>
          <td>{bizMap.remark}:</td>
          <td>{data.remark}</td>
        </tr>
      </tbody>
    </table>
  );
}

AccManageInfTable.propTypes = {
  data: PropTypes.object,
};

AccManageInfTable.defaultProps = {
  data: {},
}

export default AccManageInfTable;
