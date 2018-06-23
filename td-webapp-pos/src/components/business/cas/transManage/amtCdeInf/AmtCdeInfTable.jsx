import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';

const AmtCdeInfTable = (props) => {
  const bizMap = i18n.bizMap('cas/amtCdeInf');
  const { data } = props;
  let isSystem = '';
  switch (data.isSystem) {
    case '0': isSystem = bizMap['isSystem-0']; break;
    case '1': isSystem = bizMap['isSystem-1']; break;
    default: isSystem = ''; break;
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.amtCde}:</td>
          <td>{data.amtCde}</td>
        </tr>
        <tr>
          <td>{bizMap.amtCdeDes}:</td>
          <td>{data.amtCdeDes}</td>
        </tr>
        <tr>
          <td>{bizMap.isSystem}:</td>
          <td>{isSystem}</td>
        </tr>
        <tr>
          <td>{bizMap.remark}:</td>
          <td>{data.remark}</td>
        </tr>
      </tbody>
    </table>
  );
}

AmtCdeInfTable.propTypes = {
  data: PropTypes.object,
};

AmtCdeInfTable.defaultProps = {
  data: {},
}

export default AmtCdeInfTable;
