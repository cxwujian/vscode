import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const UserPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableCurrentPage, clickCallback } = props;
  const bizMap = i18n.bizMap('rms/warnUser');
  const tableProps = {
    rowKey: record => record.usrId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.staffId, dataIndex: 'staffId', width: 150 },
      { title: bizMap.staffName, dataIndex: 'staffName', width: 100 },
      { title: bizMap.staffPhone, dataIndex: 'staffPhone', width: 100 },
      { title: bizMap.staffEmail, dataIndex: 'staffEmail', width: 100 },
      
      // { title: bizMap.staffOrgType, dataIndex: 'staffOrgType', width: 100, render: (text) => {
      //   let txt = '';
      //   switch (text) {
      //     case '0': txt = bizMap['orgType-0']; break;
      //     case '1': txt = bizMap['orgType-1']; break;
      //     case '2': txt = bizMap['orgType-2']; break;
      //     default: break;
      //   }
      //   return <span title={txt}>{txt}</span>;
      // } },
      // { title: bizMap.organization, dataIndex: 'organization', width: 100 },
    ],
    scroll: { y: 240 },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tablePageChange(next) {
      tablePageChange(next);
    },
    onRowClick(record) {
      clickCallback(record);
    },
  };
  return (<PageTable {...tableProps} />);
};

UserPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  clickCallback: PropTypes.func,
};

UserPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  clickCallback: noop,
}

export default UserPageTable;
