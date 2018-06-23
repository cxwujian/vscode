import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const BusTypGroupAudiPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect } = props;
  const bizMap = i18n.bizMap('cas/subject');
  const tableProps = {
    rowKey: record => record.groupId + record.busId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.groupId, dataIndex: 'groupId', width: 100 },
      { title: bizMap.groupDesc, dataIndex: 'groupDesc', width: 150 },
      { title: bizMap.busId, dataIndex: 'busId', width: 100 },
      { title: bizMap.busDesc, dataIndex: 'busDesc', width: 200 },
      { title: bizMap.remark, dataIndex: 'remark', width: 120 },
    ],
    scroll: { x: 900 },
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
  };

  return (<PageTable {...tableProps} />);
}

BusTypGroupAudiPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
};

BusTypGroupAudiPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
}

export default BusTypGroupAudiPageTable;
