import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { formatDateString } from '../../../../utils/date';

const noop = () => { };

const ChannelTransferPageTable = (props) => {
  const { tableList, tableTotal, tableCurrentPage, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleUpdateClick, handleSetDefaultClick, handleBankClick } = props;
  const bizMap = i18n.bizMap('pms/channelTransfer');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.chnId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      // { title: bizMap.chnId, dataIndex: 'chnId', width: 150 },
      { title: bizMap.chnName, dataIndex: 'chnName', width: 150 },
      { title: bizMap.chnAlias, dataIndex: 'chnAlias', width: 150 },
      {
        title: bizMap.chnType, dataIndex: 'chnType', render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['chnType-0']; break;
            case '1': txt = bizMap['chnType-1']; break;
            case '2': txt = bizMap['chnType-2']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.chnStatus, dataIndex: 'chnStatus', render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = commonMap['status-0']; break;
            case '1': txt = commonMap['status-1']; break;
            default: break;
          }
          return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
      { title: bizMap.chnConter, dataIndex: 'chnConter', width: 120 },
      { title: bizMap.chnMobile, dataIndex: 'chnMobile', width: 120 },
      {
        title: bizMap.creTim, dataIndex: 'creTim', width: 120, render(text) {
          return formatDateString(text);
        },
      },
      {
        title: bizMap.isDefault, dataIndex: 'isDefault', render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['isDefault-0']; break;
            case '1': txt = bizMap['isDefault-1']; break;
            default: break;
          }
          return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
      {
        title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleSetDefaultClick(record); }}>{bizMap.setDefault}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleBankClick(record); }}>{bizMap.bankInfo}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 1280 },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} />);
}

ChannelTransferPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  handleSetDefaultClick: PropTypes.func,
  handleBankClick: PropTypes.func,
};

ChannelTransferPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
  handleSetDefaultClick: noop,
  handleBankClick: noop,
}

export default ChannelTransferPageTable;
