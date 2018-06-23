import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
// import { getProvLabel, getCityLabel } from '../../../../../utils/provCityAreaUtil';

const AgentAccDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/agent');
  const { data } = props;
//  const provCityDetail = getProvLabel(data.stlProv) + '/' + getCityLabel(data.stlCity);
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
          <td>{bizMap.stlBank}:</td>
          <td>{data.stlBank}</td>
          <td>{bizMap.stlBankName}:</td>
          <td>{data.stlBankName}</td>
        </tr>
        <tr>
          <td>{bizMap.stlCnaps}:</td>
          <td>{data.stlCnaps}</td>
          <td>{bizMap.lstTxnTim}:</td>
          <td>{data.lstTxnTim}</td>
        </tr>
        <tr>
          <td>{bizMap.ccy}:</td>
          <td>{data.ccy}</td>
        </tr>
      </tbody>
    </table>
  );
}

AgentAccDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

AgentAccDetailInfoForm.defaultProps = {
  data: {},
}

export default AgentAccDetailInfoForm;
