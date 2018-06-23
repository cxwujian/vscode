import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';

const SubAccCategoryTable = (props) => {
  const { data } = props;
  const bizMap = i18n.bizMap('cas/subAccCategory');

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.subAccId}:</td>
          <td>{data.subAccId}</td>
        </tr>
        <tr>
          <td>{bizMap.subAccName}:</td>
          <td>{data.subAccName}</td>
        </tr>
        <tr>
          <td>{bizMap.remark}:</td>
          <td>{data.remark}</td>
        </tr>
      </tbody>
    </table>
  );
}

SubAccCategoryTable.propTypes = {
  data: PropTypes.object,
};

SubAccCategoryTable.defaultProps = {
  data: {},
}

export default SubAccCategoryTable;
