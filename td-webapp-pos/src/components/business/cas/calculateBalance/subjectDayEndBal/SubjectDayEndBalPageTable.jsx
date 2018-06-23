import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import { cent2Yuan } from '../../../../../utils/currency';

const SubjectDayEndBalPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, amtCountInfo } = props;
  const bizMap = i18n.bizMap('cas/subjectDayEndBal');
  const renderDataInfo = () => {
    return (
      <div>
        {bizMap.count}&nbsp;&nbsp;
        {`${bizMap.initBal}${bizMap.debit}: ${cent2Yuan(amtCountInfo.sumDebLstBal)}`},&nbsp;&nbsp; {`${bizMap.initBal}${bizMap.credit}: ${cent2Yuan(amtCountInfo.sumCreLstBal)}`},&nbsp;&nbsp;
        {`${bizMap.currentAmt}${bizMap.debit}: ${cent2Yuan(amtCountInfo.sumDebCurAmt)}`}, &nbsp;&nbsp;{`${bizMap.currentAmt}${bizMap.credit}: ${cent2Yuan(amtCountInfo.sumCreCurAmt)}`},&nbsp;&nbsp;
        {`${bizMap.currentNum}${bizMap.debit}: ${amtCountInfo.sumDebCurNum}`},&nbsp;&nbsp; {`${bizMap.currentNum}${bizMap.credit}: ${amtCountInfo.sumCreCurNum}`},&nbsp;&nbsp;
        {`${bizMap.endingBal}${bizMap.debit}: ${cent2Yuan(amtCountInfo.sumDebNowBal)}`},&nbsp;&nbsp; {`${bizMap.endingBal}${bizMap.credit}: ${cent2Yuan(amtCountInfo.sumCreNowBal)}`}
      </div>
    );
  }
  const tableProps = {
    rowKey: record => record.subject + record.actDat,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      {
        title: bizMap.accTyp, dataIndex: 'accTyp', width: 100, render(text) {
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
      { title: bizMap.subjectNme, dataIndex: 'subjectNme', width: 100 },
      { title: bizMap.actDat, dataIndex: 'actDat', width: 100 },
      {
        title: bizMap.initBal, children: [
          { title: bizMap.debit, dataIndex: 'debLstBal', key: 'debLstBal', width: 100, render(text) { return cent2Yuan(text); } },
          { title: bizMap.credit, dataIndex: 'creLstBal', key: 'creLstBal', width: 100, render(text) { return cent2Yuan(text); } }],
      },
      {
        title: bizMap.currentAmt, children: [
          { title: bizMap.debit, dataIndex: 'debCurAmt', key: 'debCurAmt', width: 100, render(text) { return cent2Yuan(text); } },
          { title: bizMap.credit, dataIndex: 'creCurAmt', key: 'creCurAmt', width: 100, render(text) { return cent2Yuan(text); } }],
      },
      {
        title: bizMap.currentNum, children: [
          { title: bizMap.debit, dataIndex: 'debCurNum', key: 'debCurNum', width: 100 },
          { title: bizMap.credit, dataIndex: 'creCurNum', key: 'creCurNum', width: 100 }],
      },
      {
        title: bizMap.endingBal, children: [
          { title: bizMap.debit, dataIndex: 'debNowBal', key: 'debNowBal', width: 100, render(text) { return cent2Yuan(text); } },
          { title: bizMap.credit, dataIndex: 'creNowBal', key: 'creNowBal', width: 100, render(text) { return cent2Yuan(text); } }],
      },
    ],
    scroll: { x: 1300 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    footer: renderDataInfo,
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} />);
}

SubjectDayEndBalPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  amtCountInfo: PropTypes.object,
};

SubjectDayEndBalPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  amtCountInfo: {},
}

export default SubjectDayEndBalPageTable;
