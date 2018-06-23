import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

const AccountRechargeTable = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('cas/accRecharge');
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
          <td>{bizMap.rechargeType}:</td>
          <td>{data.extDesc}</td>
          <td>{bizMap.ccy}:</td>
          <td>{data.ccy}</td>
        </tr>
        <tr>
          <td>{bizMap.cusNo}:</td>
          <td>{data.cusNo}</td>
          <td>{bizMap.cusNme}:</td>
          <td>{data.cusNme}</td>
        </tr>
        <tr>
          <td>{bizMap.cateId1}:</td>
          <td>{data.cateId1 && data.cateId1 ? `${data.cateId1}-${data.subAccNo1}` : ''}</td>
        </tr>
        <tr>
          <td>{bizMap.cateId2}:</td>
          <td>{data.cateId2 && data.cateId2 ? `${data.cateId2}-${data.subAccNo2}` : ''}</td>
        </tr>
        <tr>
          <td>{bizMap.cateId3}:</td>
          <td>{data.cateId3 && data.cateId3 ? `${data.cateId3}-${data.subAccNo3}` : ''}</td>
        </tr>
        <tr>
          <td>{bizMap.chnOrgCod}:</td>
          <td>{data.chnOrgCod}</td>
          <td>{bizMap.chnOrgName}:</td>
          <td>{data.chnOrgName}</td>
        </tr>
        <tr>
          <td>{bizMap.rechargeAmt}:</td>
          <td>{amtMinUnitToStandUnit(data.rechargeAmt, data.ccy)}</td>
        </tr>
        <tr>
          <td>{bizMap.remark}:</td>
          <td>{data.remark}</td>
        </tr>
      </tbody>
    </table>
  );
}

AccountRechargeTable.propTypes = {
  data: PropTypes.object,
};

AccountRechargeTable.defaultProps = {
  data: {},
}

export default AccountRechargeTable;
