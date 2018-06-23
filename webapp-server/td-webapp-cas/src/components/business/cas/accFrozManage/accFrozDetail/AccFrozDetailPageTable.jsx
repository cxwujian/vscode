import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';
import { formatDateString } from '../../../../../utils/date';

const noop = () => { };

const AccFrozDetailPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange,
    handleUpdateClick, handleDetailClick, handleHandleInfListClick } = props;
  const bizMap = i18n.bizMap('cas/accFrozDetail');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.pkId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.actNo, dataIndex: 'actNo', width: 100 },
      { title: bizMap.actNme, dataIndex: 'actNme', width: 100 },
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
      { title: bizMap.subjectNme, dataIndex: 'subjectNme', width: 100 },
      {
        title: bizMap.frozSts, dataIndex: 'frozSts', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['frozSts-0']; break;
            case '1': txt = bizMap['frozSts-1']; break;
            case '2': txt = bizMap['frozSts-2']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      { title: bizMap.frozAmt, dataIndex: 'frozAmt', width: 100, render(text, record) { return amtMinUnitToStandUnit(text, record.ccy); } },
      { title: bizMap.thawAmt, dataIndex: 'thawAmt', width: 100, render(text, record) { return amtMinUnitToStandUnit(text, record.ccy); } },
      { title: bizMap.ccy, dataIndex: 'ccy', width: 100 },
      { title: bizMap.frozRsn, dataIndex: 'frozRsn', width: 100 },
      { title: bizMap.creTim, dataIndex: 'creTim', width: 100, render(text, record) { return record.creTim ? formatDateString(record.creTim) : ''; } },
      { title: bizMap.uptTim, dataIndex: 'uptTim', width: 100, render(text, record) { return record.uptTim ? formatDateString(record.uptTim) : ''; } },
      { title: bizMap.remark, dataIndex: 'remark' },
      {
        title: commonMap.action, width: 150, fixed: 'right', render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              {record.frozSts !== '1' ? <a onClick={() => { handleUpdateClick(record); }}>{bizMap.unfreeze}</a> : null}
              {record.frozSts !== '1' ? <span className="ant-divider" /> : null}
              <a onClick={() => { handleHandleInfListClick(record); }}>{bizMap.handleleInf}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 1350 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} />);
}

AccFrozDetailPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleHandleInfListClick: PropTypes.func,
};

AccFrozDetailPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  handleUpdateClick: noop,
  handleDetailClick: PropTypes.func,
  handleHandleInfListClick: PropTypes.func,
}

export default AccFrozDetailPageTable;
