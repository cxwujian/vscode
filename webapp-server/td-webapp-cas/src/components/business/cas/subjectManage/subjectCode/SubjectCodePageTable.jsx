import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const SubjectCodePageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick,
    handleUpdateClick, handleSubCancelClick, handleEnableClick } = props;
  const bizMap = i18n.bizMap('cas/subject');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.subject,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      {
        title: bizMap.subjectLev, dataIndex: 'subjectLev', width: 200, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = bizMap['subjectLev-1']; break;
            case '2': txt = bizMap['subjectLev-2']; break;
            case '3': txt = bizMap['subjectLev-3']; break;
            default: txt = '';
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.accTyp, dataIndex: 'accTyp', width: 200, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = bizMap['accTyp-1']; break;
            case '2': txt = bizMap['accTyp-2']; break;
            case '3': txt = bizMap['accTyp-3']; break;
            case '4': txt = bizMap['accTyp-4']; break;
            default: txt = '';
          }
          return <span title={txt} >{txt}</span>;
        },
      },
      { title: bizMap.subject, dataIndex: 'subject', width: 200 },
      { title: bizMap.subjectNme, dataIndex: 'subjectNme', width: 200 },

      {
        title: bizMap.isLastLev, dataIndex: 'isLastLev', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['isLastLev-0']; break;
            case '1': txt = bizMap['isLastLev-1']; break;
            default: txt = '';
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.subSts, dataIndex: 'subSts', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '00': txt = commonMap['status-00']; break;
            case '01': txt = commonMap['status-01']; break;
            default: txt = '';
          }
          return <span title={txt} className={text === '00' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
      {
        title: bizMap.cdFlg, dataIndex: 'cdFlg', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case 'D': txt = bizMap['cdFlg-D']; break;
            case 'C': txt = bizMap['cdFlg-C']; break;
            default: txt = '';
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.ccy, dataIndex: 'ccy', width: 100 },
      { title: bizMap.groupId, dataIndex: 'groupId', width: 100 },
      {
        title: bizMap.subTyp, dataIndex: 'subTyp', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case 'CUS': txt = bizMap['subTyp-CUS']; break;
            case 'PLAT': txt = bizMap['subTyp-PLAT']; break;
            case 'CHN': txt = bizMap['subTyp-CHN']; break;
            case 'BANK': txt = bizMap['subTyp-BANK']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      { title: bizMap.remark, dataIndex: 'remark' },
      {
        title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              {
                record.subSts === '00' ? <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a> : ''
              }
              {record.subSts === '00' ? <span className="ant-divider" /> : ''}
              {
                record.subSts === '01' ?
                  <a onClick={() => { handleEnableClick(record); }}>{commonMap.enable}</a>
                  :
                  <a onClick={() => { handleSubCancelClick(record); }}>{bizMap.cancel}</a>
              }
            </span>
          );
        },
      },
    ],
    scroll: { x: 1680, y: 500 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} />);
}

SubjectCodePageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  handleSubCancelClick: PropTypes.func,
  handleEnableClick: PropTypes.func,
};

SubjectCodePageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
  handleSubCancelClick: noop,
  handleEnableClick: noop,
}

export default SubjectCodePageTable;
