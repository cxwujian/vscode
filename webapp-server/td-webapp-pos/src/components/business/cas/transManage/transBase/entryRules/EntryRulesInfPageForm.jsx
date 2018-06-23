import React, { PropTypes } from 'react';
import PageTable from '../../../../../common/PageTable';
import * as i18n from '../../../../../../utils/i18n';

const noop = () => { };

const EntryRulesInfPageForm = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect,
    handleSelectedClick, codeTableRecord,
   } = props;
  const bizMap = i18n.bizMap('cas/accEntryRulesInf');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.entryId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.entryId, dataIndex: 'entryId', width: 100 },
      { title: bizMap.entryDesc, dataIndex: 'entryDesc', width: 100 },
      { title: bizMap.ccy, dataIndex: 'ccy', width: 100 },
      {
        title: bizMap.isSystem, dataIndex: 'isSystem', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['isSystem-0']; break;
            case '1': txt = bizMap['isSystem-1']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      {
        title: bizMap.entSts, dataIndex: 'entSts', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '00': txt = bizMap['entSts-00']; break;
            case '01': txt = bizMap['entSts-01']; break;
            default: txt = '';
          }
          return <span title={txt} className={text === '00' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
      { title: bizMap.remark, dataIndex: 'remark' },
      { title: bizMap.dSubjectA, dataIndex: 'dSubjectA', width: 100 },
      { title: bizMap.dAmtRulA, dataIndex: 'dAmtRulA', width: 100 },
      { title: bizMap.dSubjectB, dataIndex: 'dSubjectB', width: 100 },
      { title: bizMap.dAmtRulB, dataIndex: 'dAmtRulB', width: 100 },
      { title: bizMap.dSubjectC, dataIndex: 'dSubjectC', width: 100 },
      { title: bizMap.dAmtRulC, dataIndex: 'dAmtRulC', width: 100 },
      { title: bizMap.dSubjectD, dataIndex: 'dSubjectD', width: 100 },
      { title: bizMap.dAmtRulD, dataIndex: 'dAmtRulD', width: 100 },
      { title: bizMap.dSubjectE, dataIndex: 'dSubjectE', width: 100 },
      { title: bizMap.dAmtRulE, dataIndex: 'dAmtRulE', width: 100 },
      { title: bizMap.cSubjectA, dataIndex: 'cSubjectA', width: 100 },
      { title: bizMap.cAmtRulA, dataIndex: 'cAmtRulA', width: 100 },
      { title: bizMap.cSubjectB, dataIndex: 'cSubjectB', width: 100 },
      { title: bizMap.cAmtRulB, dataIndex: 'cAmtRulB', width: 100 },
      { title: bizMap.cSubjectC, dataIndex: 'cSubjectC', width: 100 },
      { title: bizMap.cAmtRulC, dataIndex: 'cAmtRulC', width: 100 },
      { title: bizMap.cSubjectD, dataIndex: 'cSubjectD', width: 100 },
      { title: bizMap.cAmtRulD, dataIndex: 'cAmtRulD', width: 100 },
      { title: bizMap.cSubjectE, dataIndex: 'cSubjectE', width: 100 },
      { title: bizMap.cAmtRulE, dataIndex: 'cAmtRulE', width: 100 },
    ],
    scroll: { x: 3000 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
    onRowClick(record) {
      handleSelectedClick(codeTableRecord, record);
    },
  };

  return (<PageTable {...tableProps} />);
}

EntryRulesInfPageForm.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleSelectedClick: PropTypes.func,
  codeTableRecord: PropTypes.object,
};

EntryRulesInfPageForm.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleSelectedClick: noop,
  codeTableRecord: {},
}

export default EntryRulesInfPageForm;
