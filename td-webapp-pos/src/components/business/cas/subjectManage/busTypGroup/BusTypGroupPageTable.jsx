import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const BusTypGroupPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick,
    handleUpdateClick, handleCancelClick, handleEnableClick, handleAddBusIdClick,
    handleUpdateBusIdClick } = props;
  const bizMap = i18n.bizMap('cas/subject');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.groupId + record.busId + record.busDesc,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      {
        title: bizMap.groupId, dataIndex: 'groupId', width: 200, render(text, record) {
          let txt = '';
          if (!record.busId) {
            txt = text;
          }
          return txt;
        },
      },
      {
        title: bizMap.groupDesc, dataIndex: 'groupDesc', width: 180, render(text, record) {
          let txt = '';
          if (!record.busId) {
            txt = text;
          }
          return txt;
        },
      },
      { title: bizMap.busId, dataIndex: 'busId', width: 120 },
      { title: bizMap.busDesc, dataIndex: 'busDesc', width: 200 },
      {
        title: bizMap.busSts, dataIndex: 'busSts', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case '00': txt = commonMap['status-00']; break;
            case '01': txt = commonMap['status-01']; break;
            default: txt = '';
          }
          return <span title={txt} className={text === '00' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
      { title: bizMap.remark, dataIndex: 'remark' },
      {
        title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
          if (record.busId !== '' && record.busId !== null) {
            return (
              <span>
                <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
                <span className="ant-divider" />
                {
                  record.busSts === '00' ? <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a> : ''
                }
                {record.busSts === '00' ? <span className="ant-divider" /> : ''}
                {
                  record.busSts === '01' ?
                    <a onClick={() => { handleEnableClick(record); }}>{commonMap.enable}</a>
                    :
                    <a onClick={() => { handleCancelClick(record); }}>{bizMap.cancel}</a>
                }
              </span>
            );
          } else {
            return (
              <span>
                <a onClick={() => { handleAddBusIdClick(record); }}>{bizMap.addBusId}</a>
                <span className="ant-divider" />
                <a onClick={() => { handleUpdateBusIdClick(record); }}>{commonMap.update}</a>
              </span>
            );
          }
        },
      },
    ],
    scroll: { x: 1280 },
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

BusTypGroupPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  handleUpdateBusIdClick: PropTypes.func,
  handleCancelClick: PropTypes.func,
  handleAddBusIdClick: PropTypes.func,
  handleEnableClick: PropTypes.func,
};

BusTypGroupPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
  handleUpdateBusIdClick: noop,
  handleCancelClick: noop,
  handleAddBusIdClick: noop,
  handleEnableClick: noop,
}

export default BusTypGroupPageTable;
