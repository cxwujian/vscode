import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';
import { formatDateString } from '../../../../../utils/date';
import { cent2Yuan } from '../../../../../utils/currency';

const AccProfilesTable = (props) => {
  const bizMap = i18n.bizMap('cas/accProfiles');
  const { data } = props;

  let accLevel = '';
  switch (data.accLevel) {
    case '0': accLevel = bizMap['accLevel-0']; break;
    case '1': accLevel = bizMap['accLevel-1']; break;
    case '2': accLevel = bizMap['accLevel-2']; break;
    case '3': accLevel = bizMap['accLevel-3']; break;
    default: accLevel = ''; break;
  }
  let accTyp = '';
  switch (data.accTyp) {
    case '1': accTyp = bizMap['accTyp-1']; break;
    case '2': accTyp = bizMap['accTyp-2']; break;
    case '3': accTyp = bizMap['accTyp-3']; break;
    case '4': accTyp = bizMap['accTyp-4']; break;
    default: accTyp = ''; break;
  }
  let accSts = '';
  switch (data.accSts) {
    case '00': accSts = bizMap['accSts-00']; break;
    case '01': accSts = bizMap['accSts-01']; break;
    case '02': accSts = bizMap['accSts-02']; break;
    case '03': accSts = bizMap['accSts-03']; break;
    default: accSts = ''; break;
  }
  let ccy = '';
  switch (data.ccy) {
    case 'CNY': ccy = bizMap['ccy-CNY']; break;
    case 'USD': ccy = bizMap['ccy-USD']; break;
    case 'EUR': ccy = bizMap['ccy-EUR']; break;
    case 'HKD': ccy = bizMap['ccy-HKD']; break;
    case 'GBP': ccy = bizMap['ccy-GBP']; break;
    default: ccy = ''; break;
  }

  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.actNo}:</td>
          <td>{data.actNo}</td>
          <td>{bizMap.actNme}:</td>
          <td>{data.actNme}</td>
        </tr>
        <tr>
          <td>{bizMap.accLevel}:</td>
          <td>{accLevel}</td>
          <td>{bizMap.accTyp}:</td>
          <td>{accTyp}</td>
        </tr>
        <tr>
          <td>{bizMap.blgSubject}:</td>
          <td>{data.blgSubject}</td>
          <td>{bizMap.subjectNme}:</td>
          <td>{data.subjectNme}</td>
        </tr>
        <tr>
          {
            data.cusNo && data.cusNo.indexOf('CHN') >= 0 ?
              <td>{bizMap.chnOrgCod}:</td>
              :
              <td>{bizMap.cusNo}:</td>
          }
          <td>{data.cusNo}</td>
          <td>{bizMap.accSts}:</td>
          <td>{accSts}</td>
        </tr>
        <tr>
          <td>{bizMap.ccy}:</td>
          <td>{ccy}</td>
          <td>{bizMap.accBal}:</td>
          <td>{cent2Yuan(data.accBal)}</td>
        </tr>
        <tr>
          <td>{bizMap.avlAccBal}:</td>
          <td>{cent2Yuan(data.avlAccBal)}</td>
          <td>{bizMap.frozAccAmt}:</td>
          <td>{cent2Yuan(data.frozAccAmt)}</td>
        </tr>
        <tr>
          {
            data.cateId1 ?
              <div>
                <td>{bizMap.cateId1}:</td>
                <td>{data.cateId1}</td>
                <td>{bizMap.subAccNo1}:</td>
                <td>{data.subAccNo1}</td>
              </div>
              :
              ''
          }
        </tr>
        <tr>
          {
            data.cateId2 ?
              <div>
                <td>{bizMap.cateId2}:</td>
                <td>{data.cateId2}</td>
                <td>{bizMap.subAccNo2}:</td>
                <td>{data.subAccNo2}</td>
              </div>
              :
              ''
          }
        </tr>
        <tr>
          {
            data.cateId3 ?
              <div>
                <td>{bizMap.cateId3}:</td>
                <td>{data.cateId3}</td>
                <td>{bizMap.subAccNo3}:</td>
                <td>{data.subAccNo3}</td>
              </div>
              :
              ''
          }
        </tr>
        <tr>
          <td>{bizMap.lstTxnDat}:</td>
          <td>{formatDateString(data.lstTxnDat)}</td>
          <td>{bizMap.lstTxnTim}:</td>
          <td>{formatDateString(data.lstTxnTim)}</td>
        </tr>
        <tr>
          <td>{bizMap.regTim}:</td>
          <td>{formatDateString(data.regTim)}</td>
          <td>{bizMap.remark}:</td>
          <td>{data.remark}</td>
        </tr>
      </tbody>
    </table>
  );
}

AccProfilesTable.propTypes = {
  data: PropTypes.object,
};

AccProfilesTable.defaultProps = {
  data: {},
}

export default AccProfilesTable;
