import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const PayChnInfPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('cas/payChnInf');
  const tableProps = {
    rowKey: record => record.chnOrgCod,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.chnOrgCod, dataIndex: 'chnOrgCod', width: 200 },
      { title: bizMap.chnOrgName, dataIndex: 'chnOrgName', width: 250 },
      { title: bizMap.payChnCde, dataIndex: 'payChnCde', width: 200 },
      { title: bizMap.payChnNme, dataIndex: 'payChnNme', width: 250 },
      {
        title: bizMap.isSystem, dataIndex: 'isSystem', width: 150, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['isSystem-0']; break;
            case '1': txt = bizMap['isSystem-1']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.isFund, dataIndex: 'isFund', width: 150, render(text) {
          let txt = '';
          switch (text) {
            case '00': txt = bizMap['isFund-00']; break;
            case '01': txt = bizMap['isFund-01']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.remark, dataIndex: 'remark' },
    ],
    scroll: { x: 1550 },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    rowSelection: null,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };
  return (<PageTable {...tableProps} />);
};

PayChnInfPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
};

PayChnInfPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
}

export default PayChnInfPageTable;
