import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';

const CcyFlgInfTable = (props) => {
  const bizMap = i18n.bizMap('cas/ccyFlgInf');
  const { data } = props;
  let isCurrency = '';
  switch (data.isCurrency) {
    case 'Y': isCurrency = bizMap['isCurrency-Y']; break;
    case 'N': isCurrency = bizMap['isCurrency-N']; break;
    default: isCurrency = ''; break;
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.ccy}:</td>
          <td>{data.ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.ccyExplain}:</td>
          <td>{data.ccyExplain}</td>
        </tr>
        <tr>
          <td>{bizMap.isCurrency}:</td>
          <td>{isCurrency}</td>
        </tr>
        <tr>
          <td>{bizMap.remark}:</td>
          <td>{data.remark}</td>
        </tr>
      </tbody>
    </table>
  );
}

CcyFlgInfTable.propTypes = {
  data: PropTypes.object,
};

CcyFlgInfTable.defaultProps = {
  data: {},
}

export default CcyFlgInfTable;
