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
          <td>{bizMap.txnDesc}:</td>
          <td>{data.txnDesc}</td>
        </tr>
        <tr>
          <td>{bizMap.subCod}:</td>
          <td>{data.subCod}</td>
          <td>{bizMap.subCodDesc}:</td>
          <td>{data.subCodDesc}</td>
        </tr>
        <tr>
          <td>{bizMap.entryDesc}:</td>
          {
            data.entryId ?
              <td>{`${data.entryId}-${data.entryDesc}`}</td>
              :
              <td>&nbsp;</td>
          }
          <td>{bizMap.extDesc}:</td>
          {
            data.extCod ?
              <td>{`${data.extCod}-${data.extDesc}`}</td>
              :
              <td>&nbsp;</td>
          }
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
