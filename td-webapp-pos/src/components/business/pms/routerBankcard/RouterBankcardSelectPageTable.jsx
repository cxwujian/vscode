import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const RouterBankcardSelectPageTable = (props) => {
  const { addModalTableList, addModalTableTotal, addModalTableCurrentPage, addModalTableFooter, addModalTableLoading, tablePageChange, tableRowSelect, handleAddClick, routerPayloadMerInfo, routerPayloadAddSelectCurrency } = props;
  const bizMap = i18n.bizMap('pms/routerMerBankcard');
  const commonMap = i18n.commonMap();
  const tableProps = {
    tableCheckbox: false,
    rowKey: record => record.chnMerNo,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      // { title: bizMap.merId, dataIndex: 'merId', width: 150 },
      //{ title: bizMap.merName, dataIndex: 'merName', width: 150 },
      { title: bizMap.chnName, dataIndex: 'chnName', width: 150 },
      { title: bizMap.chnMerNo, dataIndex: 'chnMerNo', width: 150 },
      { title: bizMap.chnMerName, dataIndex: 'chnMerName', width: 150 },
      // { title: bizMap.chnTermNo, dataIndex: 'chnTermNo', width: 150 },
      //{ title: bizMap.isDefault, dataIndex: 'isDefault', width: 150 },
      {
        title: bizMap.chnMerType, dataIndex: 'chnMerType', render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = bizMap['chnMerType-1']; break;
            case '2': txt = bizMap['chnMerType-2']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: commonMap.action, fixed: 'right', width: 50, render(text, record) {
          let data = Object.assign(record, { merId: routerPayloadMerInfo.merId });
          data = Object.assign(record, { currency: routerPayloadAddSelectCurrency.currency })
          return (
            <span>
              <a onClick={() => { handleAddClick(data); }}>{commonMap.add}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: true },
    tableList: addModalTableList,
    tableTotal: addModalTableTotal,
    tableCurrentPage: addModalTableCurrentPage,
    tableLoading: addModalTableLoading,
    footer: addModalTableFooter,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} />);
}

RouterBankcardSelectPageTable.propTypes = {
  addModalTableList: PropTypes.array,
  addModalTableTotal: PropTypes.number,
  addModalTableCurrentPage: PropTypes.number,
  addModalTableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleAddClick: PropTypes.func,
  addModalTableFooter: PropTypes.func,
};

RouterBankcardSelectPageTable.defaultProps = {
  addModalTableList: [],
  addModalTableTotal: 0,
  addModalTableCurrentPage: 1,
  addModalTableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleAddClick: noop,
  addModalTableFooter: noop,
}

export default RouterBankcardSelectPageTable;
