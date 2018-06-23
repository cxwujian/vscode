import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';

const OpenAccSceneInfoTable = (props) => {
  const bizMap = i18n.bizMap('cas/openAcc');
  const { data } = props;
  let accLevel = '';
  switch (data.accLevel) {
    case '0': accLevel = bizMap['accLevel-0']; break;
    case '1': accLevel = bizMap['accLevel-1']; break;
    case '2': accLevel = bizMap['accLevel-2']; break;
    case '3': accLevel = bizMap['accLevel-3']; break;
    default: accLevel = ''; break;
  }
  let sceSts = '';
  switch (data.sceSts) {
    case '00': sceSts = bizMap['sceSts-00']; break;
    case '01': sceSts = bizMap['sceSts-01']; break;
    default: sceSts = ''; break;
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.sceneId}:</td>
          <td>{data.sceneId}</td>
        </tr>
        {/*<tr>
          <td>{bizMap.preSceid}:</td>
          <td>{data.preSceid}</td>
        </tr>*/}
        <tr>
          <td>{bizMap.sceneDesc}:</td>
          <td>{data.sceneDesc}</td>
        </tr>
        <tr>
          <td>{bizMap.accLevel}:</td>
          <td>{accLevel}</td>
        </tr>
        <tr>
          <td>{bizMap.cateId}:</td>
          <td>{data.cateId}</td>
        </tr>
        <tr>
          <td>{bizMap.subjects}:</td>
          <td>{data.subjects}</td>
        </tr>
        <tr>
          <td>{bizMap.sceSts}:</td>
          <td>{sceSts}</td>
        </tr>
        <tr>
          <td>{bizMap.remark}:</td>
          <td>{data.remark}</td>
        </tr>
      </tbody>
    </table>
  );
}

OpenAccSceneInfoTable.propTypes = {
  data: PropTypes.object,
};

OpenAccSceneInfoTable.defaultProps = {
  data: {},
}

export default OpenAccSceneInfoTable;
