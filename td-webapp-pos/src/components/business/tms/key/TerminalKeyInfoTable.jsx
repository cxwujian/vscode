import React, { PropTypes } from 'react';
import * as i18n from '../../../../utils/i18n';

const TerminalCompanyInfoTable = (props) => {
  const bizMap = i18n.bizMap('tms/terminalKey');
  const { data } = props;
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.terPhyno}:</td>
          <td>{data.terPhyno}</td>
          <td>{bizMap.terNo}:</td>
          <td>{data.terNo}</td>
        </tr>
        <tr>
          <td>{bizMap.lmkkey}:</td>
          <td>{data.lmkkey}</td>
          <td>{bizMap.zmkkey}:</td>
          <td>{data.zmkkey}</td>
        </tr>
        <tr>
          <td>{bizMap.tmkChk}:</td>
          <td>{data.tmkChk}</td>
          <td>{bizMap.zmkkeyUpdateTime}:</td>
          <td>{data.zmkkeyUpdateTime}</td>
        </tr>
        <tr>
          <td>{bizMap.lpinkey}:</td>
          <td>{data.lpinkey}</td>
          <td>{bizMap.lmackey}:</td>
          <td>{data.lmackey}</td>
        </tr>
        <tr>
          <td>{bizMap.ltdkey}:</td>
          <td>{data.ltdkey}</td>
          <td>{bizMap.wkKeyUpdateTime}:</td>
          <td>{data.wkKeyUpdateTime}</td>
        </tr>
      </tbody>
    </table>
  );
}

TerminalCompanyInfoTable.propTypes = {
  data: PropTypes.object,
};

TerminalCompanyInfoTable.defaultProps = {
  data: {},
}

export default TerminalCompanyInfoTable;
