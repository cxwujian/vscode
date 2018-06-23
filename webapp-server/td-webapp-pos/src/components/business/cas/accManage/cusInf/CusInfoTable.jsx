import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { formatDateString } from '../../../../../utils/date';

const CusInfoTable = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('cas/cusInf');
  const cusTyp = (type) => {
    let cusTyp = '';
    switch (type) {
      case 'usr':
        cusTyp = bizMap['usr-typ'];
        break;
      case 'mer':
        cusTyp = bizMap['mer-typ'];
        break;
      case 'agt':
        cusTyp = bizMap['agt-typ1'];
        break;
      default: cusTyp = '';
        break;
    }
    return cusTyp;
  };

  const cusSts = (type) => {
    let cusSts = '';
    switch (type) {
      case '00':
        cusSts = bizMap['cusTyp-00'];
        break;
      case '01':
        cusSts = bizMap['cusTyp-01'];
        break;
      default: cusSts = '';
        break;
    }
    return cusSts;
  };


  const cusCredTyp = (type) => {
    let cusCredTyp = '';
    switch (type) {
      case '0101':
        cusCredTyp = bizMap['cusCredTyp-0101'];
        break;
      case '0102':
        cusCredTyp = bizMap['cusCredTyp-0102'];
        break;
      case '0200':
        cusCredTyp = bizMap['cusCredTyp-0200'];
        break;
      case '0300':
        cusCredTyp = bizMap['cusCredTyp-0300'];
        break;
      case '0601':
        cusCredTyp = bizMap['cusCredTyp-0601'];
        break;
      case '0604':
        cusCredTyp = bizMap['cusCredTyp-0604'];
        break;
      case '0700':
        cusCredTyp = bizMap['cusCredTyp-0700'];
        break;
      case '0800':
        cusCredTyp = bizMap['cusCredTyp-0800'];
        break;
      case '1100':
        cusCredTyp = bizMap['cusCredTyp-1100'];
        break;
      case '1200':
        cusCredTyp = bizMap['cusCredTyp-1200'];
        break;
      case '2100':
        cusCredTyp = bizMap['cusCredTyp-2100'];
        break;
      case '0900':
        cusCredTyp = bizMap['cusCredTyp-0900'];
        break;
      case '2010':
        cusCredTyp = bizMap['cusCredTyp-2010'];
        break;
      case '2020':
        cusCredTyp = bizMap['cusCredTyp-2020'];
        break;
      case '2021':
        cusCredTyp = bizMap['cusCredTyp-2021'];
        break;
      default: cusCredTyp = '';
        break;
    }
    return cusCredTyp;
  };

  const cusGender = (type) => {
    let cusGender = '';
    switch (type) {
      case '1':
        cusGender = bizMap['cusGender-1'];
        break;
      case '0200':
        cusGender = bizMap['cusGender-2'];
        break;
      default: cusGender = '';
        break;
    }
    return cusGender;
  };
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.cusNo}:</td>
          <td>{data.cusNo}</td>
        </tr>
        <tr>
          <td>{bizMap.cusTyp}:</td>
          <td>{cusTyp(data.cusTyp)}</td>
          <td>{bizMap.cusNme}:</td>
          <td>{data.cusNme}</td>
        </tr>
        <tr>
          <td>{bizMap.cusSts}:</td>
          <td>{cusSts(data.cusSts)}</td>
          <td>{bizMap.cusGender}:</td>
          <td>{cusGender(data.cusGender)}</td>
        </tr>
        <tr>
          <td>{bizMap.cusCredTyp}:</td>
          <td>{cusCredTyp(data.cusCredTyp)}</td>
          <td>{bizMap.cusCredNo}:</td>
          <td>{data.cusCredNo}</td>
        </tr>
        <tr>
          <td>{bizMap.cmuTel}:</td>
          <td>{data.cmuTel}</td>
          <td>{bizMap.email}:</td>
          <td>{data.email}</td>
        </tr>
        <tr>
          <td>{bizMap.cmuFixTel}:</td>
          <td>{data.cmuFixTel}</td>
          <td>{bizMap.cmuFax}:</td>
          <td>{data.cmuFax}</td>
        </tr>
        <tr>
          <td>{bizMap.cusAddr}:</td>
          <td>{data.cusAddr}</td>
        </tr>
        <tr>
          <td>{bizMap.regTim}:</td>
          <td>{formatDateString(data.regTim)}</td>
          <td>{bizMap.updTim}:</td>
          <td>{formatDateString(data.updTim)}</td>
        </tr>
        <tr>
          <td>{bizMap.remark}:</td>
          <td>{data.remark}</td>
        </tr>

      </tbody>
    </table>
  );
}

CusInfoTable.propTypes = {
  data: PropTypes.object,
};

CusInfoTable.defaultProps = {
  data: {},
}

export default CusInfoTable;
