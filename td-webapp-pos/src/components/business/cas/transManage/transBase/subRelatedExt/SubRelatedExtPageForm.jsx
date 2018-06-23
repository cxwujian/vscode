import React, { PropTypes } from 'react';
import PageTable from '../../../../../common/PageTable';
import * as i18n from '../../../../../../utils/i18n';

const noop = () => { };

const SubRelatedExtPageForm = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect,
    handleSelectedClick, codeTableRecord,
   } = props;
  const bizMap = i18n.bizMap('cas/transRelatedExt');
  const tableProps = {
    rowKey: record => record.extCod,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.extCod, dataIndex: 'extCod', width: 200 },
      { title: bizMap.extDesc, dataIndex: 'extDesc', width: 200 },
      {
        title: bizMap.extTyp, dataIndex: 'extTyp', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = bizMap['extTyp-01']; break;
            case '02': txt = bizMap['extTyp-02']; break;
            case '03': txt = bizMap['extTyp-03']; break;
            case '04': txt = bizMap['extTyp-04']; break;
            case '05': txt = bizMap['extTyp-05']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      { title: bizMap.remark, dataIndex: 'remark' },
    ],
    scroll: { x: 600 },
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

SubRelatedExtPageForm.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleSelectedClick: PropTypes.func,
  codeTableRecord: PropTypes.object,
};

SubRelatedExtPageForm.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleSelectedClick: noop,
  codeTableRecord: {},
}

export default SubRelatedExtPageForm;
