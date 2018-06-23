import React, { PropTypes } from 'react';
import { Form } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const BusTypGroupInfoTable = (props) => {
  const bizMap = i18n.bizMap('cas/subject');
  const commonMap = i18n.commonMap();
  const { data } = props;

  const busSts = (type) => {
    let busSts = '';
    switch (type) {
      case '00':
        busSts = commonMap['status-00'];
        break;
      case '01':
        busSts = commonMap['status-01'];
        break;
      default: busSts = '';
        break;
    }
    return busSts;
  };

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.groupId}:</td>
          <td>{data.groupId}</td>
          <td>{bizMap.groupDesc}:</td>
          <td>{data.groupDesc}</td>
        </tr>
        <tr>
          <td>{bizMap.busId}:</td>
          <td>{data.busId}</td>
          <td>{bizMap.busDesc}:</td>
          <td>{data.busDesc}</td>
        </tr>
        <tr>
          <td>{bizMap.busSts}:</td>
          <td>{busSts(data.busSts)}</td>
          <td>{bizMap.remark}:</td>
          <td>{data.remark}</td>
        </tr>
      </tbody>
    </table>
  );
}

BusTypGroupInfoTable.propTypes = {
  data: PropTypes.object,
};

BusTypGroupInfoTable.defaultProps = {
  data: {},
}

export default Form.create()(BusTypGroupInfoTable);
