import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';

const TransRelatedExtTable = (props) => {
  const bizMap = i18n.bizMap('cas/transRelatedExt');
  const { data } = props;
  let extTyp = '';
  switch (data.extTyp) {
    case '01': extTyp = bizMap['extTyp-01']; break;
    case '02': extTyp = bizMap['extTyp-02']; break;
    case '03': extTyp = bizMap['extTyp-03']; break;
    case '04': extTyp = bizMap['extTyp-04']; break;
    case '05': extTyp = bizMap['extTyp-05']; break;
    default: extTyp = ''; break;
  }
  let extSts = '';
  switch (data.extSts) {
    case '00': extSts = bizMap['extSts-00']; break;
    case '01': extSts = bizMap['extSts-01']; break;
    default: extSts = ''; break;
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.extCod}:</td>
          <td>{data.extCod}</td>
        </tr>
        <tr>
          <td>{bizMap.extDesc}:</td>
          <td>{data.extDesc}</td>
        </tr>
        <tr>
          <td>{bizMap.extTyp}:</td>
          <td>{extTyp}</td>
        </tr>
        <tr>
          <td>{bizMap.extSts}:</td>
          <td>{extSts}</td>
        </tr>
        <tr>
          <td>{bizMap.remark}:</td>
          <td>{data.remark}</td>
        </tr>
      </tbody>
    </table>
  );
}

TransRelatedExtTable.propTypes = {
  data: PropTypes.object,
};

TransRelatedExtTable.defaultProps = {
  data: {},
}

export default TransRelatedExtTable;
