import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { formatDateString } from '../../../../../utils/date';
import { getProvLabel, getCityLabel, getAreaLabel } from '../../../../../utils/provCityAreaUtil';

const AgentBaseDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/agent');
  const { data } = props;
  const provLabel = getProvLabel(data.agtProv);
  const cityLabel = getCityLabel(data.agtCity);
  const areaLabel = getAreaLabel(data.agtArea);
  const provCityDetail = `${provLabel}/${cityLabel}/${areaLabel}`;
  const agtProxyProv = getProvLabel(data.agtProxyProv);
  const agtProxyCity = getCityLabel(data.agtProxyCity);
  const agtProxyArea = getAreaLabel(data.agtProxyArea);
  const agtProxyDetail = `${agtProxyProv}/${agtProxyCity}/${agtProxyArea}`;
  const idType = (type) => {
    let idType = '';
    switch (type) {
      case '01' :
        idType = bizMap['certType-01'];
        break;
      case '02' :
        idType = bizMap['certType-02'];
        break;
      case '99' :
        idType = bizMap['certType-99'];
        break;
      default: idType = '';
        break;
    }
    return idType;
  };
  const agtScope = (value) => {
    let agtScope = '';
    switch (value) {
      case '01' :
        agtScope = bizMap['agtScope-01'];
        break;
      case '02' :
        agtScope = bizMap['agtScope-02'];
        break;
      case '03' :
        agtScope = bizMap['agtScope-03'];
        break;
      case '04' :
        agtScope = bizMap['agtScope-04'];
        break;
      default: agtScope = '';
        break;
    }
    return agtScope;
  };
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.agtId}:</td>
          <td>{data.agtId}</td>
          <td>{bizMap.agtName}:</td>
          <td>{data.agtName}</td>
        </tr>
        <tr>
          <td>{bizMap.agtLv}:</td>
          <td>{data.agtLv}</td>
        </tr>
        <tr>
          <td>{bizMap.agtScope}:</td>
          <td>{agtScope(data.agtScope)}</td>
        </tr>
        <tr>
          <td>{bizMap.provCityArea}:</td>
          <td>{agtProxyDetail}</td>
          <td>{bizMap.agtInProvCityArea}:</td>
          <td>{provCityDetail}</td>
        </tr>
        <tr>
          <td>{bizMap.agtStatus}:</td>
          <td>{data.agtStatus === '0' ? bizMap['agtStatus-02'] : bizMap['agtStatus-01']}</td>
          <td>{bizMap.bizSale}:</td>
          <td>{data.bizSale}</td>
        </tr>
        <tr>
          <td>{bizMap.agtType}:</td>
          <td>{data.agtType}</td>
          <td>{bizMap.agtAddr}:</td>
          <td>{data.agtAddr}</td>
        </tr>
        <tr>
          <td>{bizMap.agtPost}:</td>
          <td>{data.agtPost}</td>
          <td>{bizMap.agtEmail}:</td>
          <td>{data.agtEmail}</td>
        </tr>
        <tr>
          <td>{bizMap.agtMobile}:</td>
          <td>{data.agtMobile}</td>
          <td>{bizMap.agtFax}:</td>
          <td>{data.agtFax}</td>
        </tr>
        <tr>
          <td>{bizMap.agtPhone}:</td>
          <td>{data.agtPhone}</td>
          <td>{bizMap.agtAp}:</td>
          <td>{data.agtAp}</td>
        </tr>
        <tr>
          <td>{bizMap.idType}:</td>
          <td>{idType(data.idType)}</td>
          <td>{bizMap.apId}:</td>
          <td>{data.apId}</td>
        </tr>
        <tr>
          <td>{bizMap.idDat}:</td>
          <td>{formatDateString(data.idEffDat)}~{formatDateString(data.idExpDat)}</td>
          <td>{bizMap.licDat}:</td>
          <td>{formatDateString(data.licEffDat)}~{formatDateString(data.licExpDat)}</td>
        </tr>
        <tr>
          <td>{bizMap.bizLic}:</td>
          <td>{data.bizLic}</td>
          <td>{bizMap.regFound}:</td>
          <td>{data.regFound}</td>
        </tr>
        <tr>
          <td>{bizMap.taxNo}:</td>
          <td>{data.taxNo}</td>
          <td>{bizMap.orgCod}:</td>
          <td>{data.orgCod}</td>
        </tr>
        <tr>
          <td>{bizMap.orgEffDat}:</td>
          <td>{data.orgEffDat}</td>
          <td>{bizMap.orgExpDat}:</td>
          <td>{data.orgExpDat}</td>
        </tr>
      </tbody>
    </table>
  );
}

AgentBaseDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

AgentBaseDetailInfoForm.defaultProps = {
  data: {},
}

export default AgentBaseDetailInfoForm;
