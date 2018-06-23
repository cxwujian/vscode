import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const ChnInfCallBackPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, rowClickCallback } = props;
  const bizMap = i18n.bizMap('cas/payChnInf');
  const tableProps = {
    rowKey: record => record.cusNo,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.chnOrgCod, dataIndex: 'chnOrgCod', width: 200 },
      { title: bizMap.chnOrgName, dataIndex: 'chnOrgName', width: 200 },
      { title: bizMap.payChnCde, dataIndex: 'payChnCde', width: 200 },
      { title: bizMap.payChnNme, dataIndex: 'payChnNme', width: 200 },
      { title: bizMap.remark, dataIndex: 'remark', width: 200 },
    ],
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    onRowClick(record) {
      rowClickCallback(record);
    },
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} />);
}

ChnInfCallBackPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  rowClickCallback: PropTypes.func,
};

ChnInfCallBackPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  rowClickCallback: noop,
}

export default ChnInfCallBackPageTable;
