import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const CusCateInfCallBackPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, rowClickCallback, expandedRowKeys } = props;
  const commonMap = i18n.commonMap();
  const bizMap = i18n.bizMap('cas/cusInf');
  const tableProps = {
    rowKey: record => record.key,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      {
        title: bizMap.cusNo, dataIndex: 'cusNo', width: 150, render(text, record) {
          return record.cateId ? '' : text;
        },
      },
      {
        title: bizMap.cusNme, dataIndex: 'cusNme', width: 150, render(text, record) {
          return record.cateId ? '' : text;
        },
      },
      { title: bizMap.cateId1, dataIndex: 'cateId1', width: 100 },
      { title: bizMap.subAccNo1, dataIndex: 'subAccNo1', width: 100 },
      { title: bizMap.cateId2, dataIndex: 'cateId2', width: 100 },
      { title: bizMap.subAccNo2, dataIndex: 'subAccNo2', width: 100 },
      { title: bizMap.cateId3, dataIndex: 'cateId3', width: 100 },
      { title: bizMap.subAccNo3, dataIndex: 'subAccNo3', width: 100 },
      {
        title: bizMap.cusCredTyp, dataIndex: 'cusCredTyp', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0102': txt = bizMap['credTyp-1']; break;
            case '0200': txt = bizMap['credTyp-2']; break;
            default: txt = '';
          }
          return <span title={txt} >{txt}</span>;
        },
      },
      { title: bizMap.cusCredNo, dataIndex: 'cusCredNo', width: 100 },
      {
        title: commonMap.action, fixed: 'right', width: 100, render(text, record) {
          return (
            record.hasChildren ?
              ''
              :
              <span>
                <a onClick={() => { rowClickCallback(record); }}>{bizMap.selected}</a>
              </span>
          );
        },
      },
    ],
    scroll: { x: 1400 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    expandedRowKeys,
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} />);
}

CusCateInfCallBackPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  rowClickCallback: PropTypes.func,
  expandedRowKeys: PropTypes.array,
};

CusCateInfCallBackPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  rowClickCallback: noop,
  expandedRowKeys: [],
}

export default CusCateInfCallBackPageTable;
