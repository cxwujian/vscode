import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';
import { cent2Yuan } from '../../../../utils/currency';

const MerchantBankcardInfoTable = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('pms/merchantBankcard');
  let chnType = '';
  switch (data.chnType) {
    case '0': chnType = bizMap['chnType-0']; break;
    case '1': chnType = bizMap['chnType-1']; break;
    case '2': chnType = bizMap['chnType-2']; break;
    default: chnType = ''; break;
  }
  let chnMerType = '';
  switch (data.chnMerType) {
    case '1': chnMerType = bizMap['chnMerType-1']; break;
    case '2': chnMerType = bizMap['chnMerType-2']; break;
    default: chnMerType = ''; break;
  }
  let feeMode = '';
  switch (data.feeMode) {
    case '1': feeMode = bizMap['feeMode-1']; break;
    case '2': feeMode = bizMap['feeMode-2']; break;
    case '3': feeMode = bizMap['feeMode-3']; break;
    default: feeMode = ''; break;
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.chnName}:</td>
          <td>{data.chnName}</td>
          <td>{bizMap.chnType}:</td>
          <td>{chnType}</td>
        </tr>
        <tr>
          <td>{bizMap.chnMerNo}:</td>
          <td>{data.chnMerNo}</td>
          <td>{bizMap.chnMerName}:</td>
          <td>{data.chnMerName}</td>
        </tr>
        <tr>
          <td>{bizMap.chnMerType}:</td>
          <td colSpan={3}>{chnMerType}</td>
        </tr>
        <tr>
          <td>{bizMap.feeMode}:</td>
          <td>{feeMode}</td>
          <td>{bizMap.minBill}:</td>
          <td>{cent2Yuan(data.minBill)}</td>
        </tr>
        <tr>
          <td>{bizMap.debitCardRate}:</td>
          <td>{data.debitCardRate ? data.debitCardRate : '0'}</td>
          <td>{bizMap.debitCardTop}:</td>
          <td>{cent2Yuan(data.debitCardTop)}</td>
        </tr>
        <tr>
          <td>{bizMap.creditCardRate}:</td>
          <td>{data.creditCardRate ? data.creditCardRate : '0'}</td>
          <td>{bizMap.creditCardTop}:</td>
          <td>{cent2Yuan(data.creditCardTop)}</td>
        </tr>
        <tr>
          <td>{bizMap.singleDayLimit}:</td>
          <td>{cent2Yuan(data.singleDayLimit)}</td>
          <td>{bizMap.singleMonthLimit}:</td>
          <td>{cent2Yuan(data.singleMonthLimit)}</td>
        </tr>
        <tr>
          <td>{bizMap.singleDayCount}:</td>
          <td>{data.singleDayCount ? data.singleDayCount : '0'}</td>
          <td>{bizMap.singleMonthCount}:</td>
          <td>{data.singleMonthCount ? data.singleMonthCount : '0'}</td>
        </tr>
        <tr>
          <td>{bizMap.singleMinAmt}:</td>
          <td>{cent2Yuan(data.singleMinAmt)}</td>
          <td>{bizMap.singleMaxAmt}:</td>
          <td>{cent2Yuan(data.singleMaxAmt)}</td>
        </tr>
      </tbody>
    </table>
  );
};

MerchantBankcardInfoTable.propTypes = {
  data: PropTypes.object,
};

MerchantBankcardInfoTable.defaultProps = {
  data: {},
};

export default MerchantBankcardInfoTable;
