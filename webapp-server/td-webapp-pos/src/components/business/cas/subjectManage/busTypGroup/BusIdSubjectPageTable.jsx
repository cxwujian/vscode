import React, { PropTypes } from 'react';
import { Form, Alert } from 'antd';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const BusIdSubjectPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, rowClickCallback, handleSubCancelClick } = props;
  const bizMap = i18n.bizMap('cas/subject');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.subject,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      {
        title: bizMap.accTyp, dataIndex: 'accTyp', width: 120, render(text) {
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
      { title: bizMap.subject, dataIndex: 'subject', width: 100 },
      { title: bizMap.subjectNme, dataIndex: 'subjectNme', width: 200 },
      {
        title: bizMap.subjectLev, dataIndex: 'subjectLev', width: 120, render(text) {
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
        title: bizMap.subSts, dataIndex: 'subSts', render(text) {
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
        title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleSubCancelClick(record); }}>{bizMap.cancel}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 600 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    onRowClick(record) {
      rowClickCallback(record);
    },
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (
    <Form layout="horizontal">
      &nbsp;
      <Alert message={bizMap.subjectInfo} type="success" />
      <PageTable {...tableProps} />
    </Form>
  );
}

BusIdSubjectPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  rowClickCallback: PropTypes.func,
  handleSubCancelClick: PropTypes.func,
};

BusIdSubjectPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  rowClickCallback: noop,
  handleSubCancelClick: noop,
}

export default BusIdSubjectPageTable;
