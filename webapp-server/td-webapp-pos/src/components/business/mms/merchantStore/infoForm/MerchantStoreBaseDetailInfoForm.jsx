import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { getProvLabel, getCityLabel, getAreaLabel } from '../../../../../utils/provCityAreaUtil';
import { formatDateString } from '../../../../../utils/date';

const MerchantStoreBaseDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/merchantStore');
  const commMap = i18n.commonMap();
  const { data } = props;
  const provLabel = getProvLabel(data.braProv);
  const cityLabel = getCityLabel(data.braCity);
  const areaLabel = getAreaLabel(data.braArea);
  const provCityDetail = `${provLabel}/${cityLabel}/${areaLabel}`;
  const status = (type) => {
    let status = '';
    switch (type) {
      case '0' :
        status = bizMap['braStatus-01'];
        break;
      case '1' :
        status = bizMap['braStatus-02'];
        break;
      default: status = '';
        break;
    }
    return status;
  };
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.braId}:</td>
          <td>{data.braId}</td>
          <td>{bizMap.braName}:</td>
          <td>{data.braName}</td>
        </tr>
        <tr>
          <td>{bizMap.merId}:</td>
          <td>{data.merId}</td>
        </tr>
        <tr>
          <td>{bizMap.braConter}:</td>
          <td>{data.braConter}</td>
          <td>{bizMap.braMobile}:</td>
          <td>{data.braMobile}</td>
        </tr>
        <tr>
          <td>{bizMap.braAddress}:</td>
          <td>{provCityDetail}</td>
          <td>{bizMap.braAddr}</td>
          <td>{data.braAddr}</td>
        </tr>
        <tr>
          <td>{bizMap.braStatus}</td>
          <td>{status(data.braStatus)}</td>
          <td>{commMap.createTime}</td>
          <td>{formatDateString(data.braAddTim)}</td>
        </tr>
      </tbody>
    </table>
  );
}

MerchantStoreBaseDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

MerchantStoreBaseDetailInfoForm.defaultProps = {
  data: {},
}

export default MerchantStoreBaseDetailInfoForm;
