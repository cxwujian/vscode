import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const OpenAccScenePageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleUpdateClick, tableCurrentPage, handleDeleteClick } = props;
  const bizMap = i18n.bizMap('cas/openAcc');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.sceneId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.sceneId, dataIndex: 'sceneId', width: 150 },
  /*    { title: bizMap.preSceid, dataIndex: 'preSceid', width: 150 },*/
      { title: bizMap.sceneDesc, dataIndex: 'sceneDesc', width: 200 },
      {
        title: bizMap.accLevel, dataIndex: 'accLevel', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['accLevel-0']; break;
            case '1': txt = bizMap['accLevel-1']; break;
            case '2': txt = bizMap['accLevel-2']; break;
            case '3': txt = bizMap['accLevel-3']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.cateId, dataIndex: 'cateId', width: 200 },
      { title: bizMap.subjects, dataIndex: 'subjects', width: 300 },
      {
        title: bizMap.sceSts, dataIndex: 'sceSts', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '00': txt = bizMap['sceSts-00']; break;
            case '01': txt = bizMap['sceSts-01']; break;
            default: break;
          }
          return <span title={txt} className={text === '00' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
      { title: bizMap.remark, dataIndex: 'remark' },
      {
        title: commonMap.action, fixed: 'right', width: 120, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleDeleteClick(record); }}>{commonMap.delete}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: true },
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
};

OpenAccScenePageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
};

OpenAccScenePageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
  handleDeleteClick: noop,
}

export default OpenAccScenePageTable;
