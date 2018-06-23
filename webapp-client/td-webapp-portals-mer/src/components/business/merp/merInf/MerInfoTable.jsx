import React, { PropTypes } from 'react';
import { formatDateString } from '../../../../utils/date';
import { buildAreaCode } from '../../../../utils/continentCountryProvCityUtil';
import * as i18n from '../../../../utils/i18n';

const MerInfoTable = (props) => {
  const bizMap = i18n.bizMap('merp/merchant');
  const { data } = props;
  const provCityDetail = data.merArea ? buildAreaCode(data.merArea) : '';
  const idType = (type) => {
    let idType = '';
    switch (type) {
      case '01':
        idType = bizMap['idType-01'];
        break;
      case '02':
        idType = bizMap['idType-02'];
        break;
      case '03':
        idType = bizMap['idType-03'];
        break;
      case '04':
        idType = bizMap['idType-99'];
        break;
      default: idType = '';
        break;
    }
    return idType;
  };

  const merCate = (cate) => {
    let merCate = '';
    switch (cate) {
      case '1':
        merCate = bizMap['merCate-0'];
        break;
      case '2':
        merCate = bizMap['merCate-1'];
        break;
      default: merCate = '';
        break;
    }
    return merCate;
  };

  const merType = (type) => {
    let merType = '';
    switch (type) {
      case '0':
        merType = bizMap['merType-0'];
        break;
      case '1':
        merType = bizMap['merType-1'];
        break;
      case '2':
        merType = bizMap['merType-2'];
        break;
      case '3':
        merType = bizMap['merType-3'];
        break;
      default: merType = '';
        break;
    }
    return merType;
  };

  return (
    <table className="detail_table" style={{ maxWidth: 640 }}>
      <tbody>
        <tr>
          <td>{bizMap.merId}:</td>
          <td colSpan={3}>{data.merId}</td>
        </tr>
        <tr>
          <td style={{ width: 120 }}>{bizMap.merName}:</td>
          <td style={{ width: 200 }}>{data.merName}</td>
          <td style={{ width: 120 }}>{bizMap.merCate}:</td>
          <td style={{ width: 200 }}>{merCate(data.merCate)}</td>
        </tr>
        <tr>
          <td>{bizMap.merSname}:</td>
          <td>{data.merSname}</td>
          <td>{bizMap.bizScope}:</td>
          <td>{data.bizScope}</td>
        </tr>
        <tr>
          <td>{bizMap.merMobile}:</td>
          <td>{data.braMobileAreaCode}-{data.merMobile}</td>
          <td>{bizMap.merPhone}:</td>
          <td>{data.merPhone}</td>
        </tr>
        <tr>
          <td>{bizMap.merFax}:</td>
          <td>{data.merFax}</td>
          <td>{bizMap.merEmail}:</td>
          <td>{data.merEmail}</td>
        </tr>
        <tr>
          <td>{bizMap.merAddress}</td>
          <td>{provCityDetail}</td>
          <td>{bizMap.merPost}:</td>
          <td>{data.merPost}</td>
        </tr>
        <tr>
          <td>{bizMap.merAddr}:</td>
          <td colSpan={3}>{data.merAddr}</td>
        </tr>
        <tr>
          <td>{bizMap.contName}:</td>
          <td>{data.contName}</td>
          <td>{bizMap.contMobile}:</td>
          <td>{data.contMobile}</td>
        </tr>
        <tr>
          <td>{bizMap.merAp}:</td>
          <td>{data.merAp}</td>
          <td>{bizMap.idType}:</td>
          <td>{idType(data.idType)}</td>
        </tr>
        <tr>
          <td>{bizMap.apId}:</td>
          <td>{data.apId}</td>
          <td>{bizMap.idValidDat}:</td>
          <td>{formatDateString(data.idEffDat)}~{formatDateString(data.idExpDat)}</td>
        </tr>
        <tr>
          <td>{bizMap.merType}:</td>
          <td>{merType(data.merType)}</td>
          <td>{bizMap.regFund}:</td>
          <td>{data.regFund}</td>
        </tr>
        <tr>
          <td>
            {!data.merType || data.merType === '0' || data.merType === '1' ? bizMap.bizLic : ''}
            {data.merType === '2' ? bizMap.instCert : ''}
            {data.merType === '3' ? bizMap.lawCert : ''}
          </td>
          <td>
            {data.merType === '0' || data.merType === '1' ? data.bizLic : ''}
            {data.merType === '2' ? data.instCert : ''}
            {data.merType === '3' ? data.lawCert : ''}
          </td>
          <td>{bizMap.validDat}:</td>
          <td>
            {!data.merType || data.merType === '0' || data.merType === '1' ? formatDateString(data.licEffDat) : ''}
            {data.merType === '2' ? formatDateString(data.certEffDat) : ''}
            {data.merType === '3' ? formatDateString(data.lawEffDat) : ''}
            ~
            {data.merType === '0' || data.merType === '1' ? formatDateString(data.licExpDat) : ''}
            {data.merType === '2' ? formatDateString(data.certExpDat) : ''}
            {data.merType === '3' ? formatDateString(data.lawExpDat) : ''}
          </td>
        </tr>
        <tr>
          <td>{bizMap.orgCod}:</td>
          <td>{data.orgCod}</td>
          <td>{bizMap.validDat}:</td>
          <td>{formatDateString(data.orgEffDat)}~{formatDateString(data.orgExpDat)}</td>
        </tr>
        <tr>
          <td>{bizMap.taxNo}:</td>
          <td colSpan={3}>{data.taxNo}</td>
        </tr>
      </tbody>
    </table>
  );
}

MerInfoTable.propTypes = {
  data: PropTypes.object,
  // loading: PropTypes.bool,
};

MerInfoTable.defaultProps = {
  data: {},
  // loading: false,
}

export default MerInfoTable;
