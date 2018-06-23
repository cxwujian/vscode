import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';

const TransSubCodeTable = (props) => {
  const bizMap = i18n.bizMap('cas/transaction');
  const { data } = props;
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.txnCode}:</td>
          <td>{data.txnCode}</td>
        </tr>
        <tr>
          <td>{bizMap.txnDesc}:</td>
          <td>{data.txnDesc}</td>
        </tr>
      </tbody>
    </table>
  );
}

TransSubCodeTable.propTypes = {
  data: PropTypes.object,
};

TransSubCodeTable.defaultProps = {
  data: {},
}

export default TransSubCodeTable;
