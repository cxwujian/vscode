import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import { cent2Yuan } from '../../../../../utils/currency';
import { formatDateString } from '../../../../../utils/date';

const noop = () => { };

const AccProfilesHandleForm = (props) => {
  const { tableCurrentPage, tablePageChange, tableList, tableTotal, tableLoading, handleType,
    cancelAccountClick, selectRecord,
    onExpandedRowsChange, expandedRowKeys,
   } = props;
  const bizMap = i18n.bizMap('cas/accProfiles');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.actNo,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.actNme, dataIndex: 'actNme', width: 100 },
      { title: bizMap.accBal, dataIndex: 'accBal', width: 100, render(text) { return cent2Yuan(text); } },
      { title: bizMap.avlAccBal, dataIndex: 'avlAccBal', width: 100, render(text) { return cent2Yuan(text); } },
      { title: bizMap.frozAccAmt, dataIndex: 'frozAccAmt', width: 100, render(text) { return cent2Yuan(text); } },
      {
        title: bizMap.ccy, dataIndex: 'ccy', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case 'CNY': txt = bizMap['ccy-CNY']; break;
            case 'USD': txt = bizMap['ccy-USD']; break;
            case 'EUR': txt = bizMap['ccy-EUR']; break;
            case 'HKD': txt = bizMap['ccy-HKD']; break;
            case 'GBP': txt = bizMap['ccy-GBP']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      {
        title: bizMap.accTyp, dataIndex: 'accTyp', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = bizMap['accTyp-1']; break;
            case '2': txt = bizMap['accTyp-2']; break;
            case '3': txt = bizMap['accTyp-3']; break;
            case '4': txt = bizMap['accTyp-4']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      {
        title: bizMap.accSts, dataIndex: 'accSts', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '00': txt = bizMap['accSts-00']; break;
            case '01': txt = bizMap['accSts-01']; break;
            case '02': txt = bizMap['accSts-02']; break;
            case '03': txt = bizMap['accSts-03']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      { title: bizMap.blgSubject, dataIndex: 'blgSubject', width: 100 },
      { title: bizMap.actNo, dataIndex: 'actNo', width: 100 },
      {
        title: bizMap.cusNo, dataIndex: 'cusNo', width: 100, render(text) {
          return text && text.indexOf('CHN') >= 0 ? '' : text;
        },
      },
      {
        title: bizMap.chnOrgCod, width: 100, render(record) {
          return record.cusNo && record.cusNo.indexOf('CHN') >= 0 ? record.cusNo : '';
        },
      },
      { title: bizMap.regTim, dataIndex: 'regTim', width: 100, render(text) { return formatDateString(text); } },
      { title: bizMap.lstTxnDat, dataIndex: 'lstTxnDat', width: 100, render(text) { return formatDateString(text); } },
      { title: bizMap.lstTxnTim, dataIndex: 'lstTxnTim', width: 100, render(text) { return formatDateString(text); } },
      { title: bizMap.remark, dataIndex: 'remark' },
      {
        title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
          return (
            <span>
              {handleType === 'cancelAccount' ? <a onClick={() => { cancelAccountClick(record); }}>{bizMap.cancelAccount}</a> : ''}
            </span>
          );
        },
      },
    ],
    scroll: { x: 1800 },
    expandedRowKeys,
    onExpandedRowsChange(rowKeys) {
      onExpandedRowsChange(rowKeys);
    },
    tableCurrentPage,
    tablePageChange(next) {
      tablePageChange(selectRecord, handleType, next);
    },
    rowSelection: null,
    tableList,
    tableTotal,
    tableLoading,
  };

  return (<PageTable {...tableProps} />);
}

AccProfilesHandleForm.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  cancelAccountClick: PropTypes.func,
  tablePageChange: PropTypes.func,
  onExpandedRowsChange: PropTypes.func,
  expandedRowKeys: PropTypes.array,
};

AccProfilesHandleForm.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  cancelAccountClick: noop,
  onExpandedRowsChange: noop,
  expandedRowKeys: [],
}

export default AccProfilesHandleForm;
