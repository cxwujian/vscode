import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const SubBusIdCallBackPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, rowClickCallback, expandedRowKeys } = props;
  const bizMap = i18n.bizMap('cas/subject');
  const tableProps = {
    rowKey: record => record.groupId + record.busId + record.busDesc,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.groupId, dataIndex: 'groupId', width: 150 },
      { title: bizMap.groupDesc, dataIndex: 'groupDesc', width: 200 },
      { title: bizMap.busId, dataIndex: 'busId', width: 150 },
      { title: bizMap.busDesc, dataIndex: 'busDesc' },
    ],
    scroll: { x: 600 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    expandedRowKeys,
    onRowClick(record) {
      rowClickCallback(record);
    },
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} />);
}

SubBusIdCallBackPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  rowClickCallback: PropTypes.func,
  expandedRowKeys: PropTypes.array,
};

SubBusIdCallBackPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  rowClickCallback: noop,
  expandedRowKeys: [],
}

export default SubBusIdCallBackPageTable;
