import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

const AcctDayEndBalPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, amtCountInfo } = props;
  const bizMap = i18n.bizMap('cas/accDayEndBal');
  const renderDataInfo = () => {
    return (
      <div>
        {bizMap.count}&nbsp;&nbsp;
        {
          amtCountInfo.map((amtCount, idx) => {
            return (<div key={idx}>
              {`${bizMap.ccy}: ${amtCount.ccy},`}&nbsp;&nbsp;
              {`${bizMap.initBal}${bizMap.debit}: ${amtMinUnitToStandUnit(amtCount.sumDebLstBal)}`},&nbsp;&nbsp; {`${bizMap.initBal}${bizMap.credit}: ${amtMinUnitToStandUnit(amtCount.sumCreLstBal)}`},&nbsp;&nbsp;
              {`${bizMap.currentAmt}${bizMap.debit}: ${amtMinUnitToStandUnit(amtCount.sumDebCurAmt)}`}, &nbsp;&nbsp;{`${bizMap.currentAmt}${bizMap.credit}: ${amtMinUnitToStandUnit(amtCount.sumCreCurAmt)}`},&nbsp;&nbsp;
              {`${bizMap.currentNum}${bizMap.debit}: ${amtCount.sumDebCurNum}`},&nbsp;&nbsp; {`${bizMap.currentNum}${bizMap.credit}: ${amtCount.sumCreCurNum}`},&nbsp;&nbsp;
              {`${bizMap.endingBal}${bizMap.debit}: ${amtMinUnitToStandUnit(amtCount.sumDebNowBal)}`},&nbsp;&nbsp; {`${bizMap.endingBal}${bizMap.credit}: ${amtMinUnitToStandUnit(amtCount.sumCreNowBal)}`}
            </div>);
          })
        }
      </div>
    );
  }
  const tableProps = {
    rowKey: record => record.actNo + record.actDat + record.ccy,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.actNo, dataIndex: 'actNo', width: 100 },
      { title: bizMap.actNme, dataIndex: 'actNme', width: 100 },
      {
        title: bizMap.blgSubject, dataIndex: 'blgSubject', width: 100, render(text, record) {
          return `${text}-${record.subjectNme}`;
        },
      },
      {
        title: bizMap.initBal, children: [
          { title: bizMap.debit, dataIndex: 'debLstBal', key: 'debLstBal', width: 100, render(text, record) { return amtMinUnitToStandUnit(text, record.ccy); } },
          { title: bizMap.credit, dataIndex: 'creLstBal', key: 'creLstBal', width: 100, render(text, record) { return amtMinUnitToStandUnit(text, record.ccy); } }],
      },
      {
        title: bizMap.currentAmt, children: [
          { title: bizMap.debit, dataIndex: 'debCurAmt', key: 'debCurAmt', width: 100, render(text, record) { return amtMinUnitToStandUnit(text, record.ccy); } },
          { title: bizMap.credit, dataIndex: 'creCurAmt', key: 'creCurAmt', width: 100, render(text, record) { return amtMinUnitToStandUnit(text, record.ccy); } }],
      },
      {
        title: bizMap.currentNum, children: [
          { title: bizMap.debit, dataIndex: 'debCurNum', key: 'debCurNum', width: 100 },
          { title: bizMap.credit, dataIndex: 'creCurNum', key: 'creCurNum', width: 100 }],
      },
      {
        title: bizMap.endingBal, children: [
          { title: bizMap.debit, dataIndex: 'debNowBal', key: 'debNowBal', width: 100, render(text, record) { return amtMinUnitToStandUnit(text, record.ccy); } },
          { title: bizMap.credit, dataIndex: 'creNowBal', key: 'creNowBal', width: 100, render(text, record) { return amtMinUnitToStandUnit(text, record.ccy); } }],
      },
      { title: bizMap.ccy, dataIndex: 'ccy', width: 100 },
    ],
    scroll: { x: 1400 },
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

AcctDayEndBalPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  amtCountInfo: PropTypes.object,
};

AcctDayEndBalPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  amtCountInfo: {},
}

export default AcctDayEndBalPageTable;
