import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { getProvLabel, getCityLabel } from '../../../../../utils/provCityAreaUtil';

const MerchantBankDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/merchant');
  const { data } = props;
  const stlPrv = getProvLabel(data.stlProv);
  const stlCity = getCityLabel(data.stlCity)
  const provCityDetail = `${stlPrv}/${stlCity}`;
  const ccy = (data.ccy === 'CNY') ? 'CNY' : 'USD';
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.stlName}:</td>
          <td>{data.stlName}</td>
          <td>{bizMap.stlAcc}:</td>
          <td>{data.stlAcc}</td>
        </tr>
        <tr>
          <td>{bizMap.ccy}:</td>
          <td>{ccy}</td>
          <td>{bizMap.stlProvCity}:</td>
          <td>{provCityDetail}</td>
        </tr>
        <tr>
          <td>{bizMap.stlBankName}:</td>
          <td>{data.stlBankName}</td>
          <td>{bizMap.stlBank}:</td>
          <td>{data.stlBank}</td>
        </tr>
        <tr>
          <td>{bizMap.stlCnapsName}:</td>
          <td>{data.stlCnapsName}</td>
          <td>{bizMap.stlCnaps}:</td>
          <td>{data.stlCnaps}</td>
        </tr>
      </tbody>
    </table>
  );
}

MerchantBankDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

MerchantBankDetailInfoForm.defaultProps = {
  data: {},
}

export default MerchantBankDetailInfoForm;
