import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

const noop = () => { };
const SubjectBalancePageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange } = props;
  const bizMap = i18n.bizMap('cas/subjectBalance');
  const tableProps = {
    rowKey: record => record.subject + record.actDat + record.ccy,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      {
        title: bizMap['subjectLev-1'], dataIndex: 'subjectLev1', width: 150, render(text, record) {
          let txt = '';
          if (record.subjectLev === '1') {
            txt = `${record.subject}-${record.subjectNme}`;
          }
          return txt;
        },
      },
      {
        title: bizMap['subjectLev-2'], dataIndex: 'subjectLev2', width: 150, render(text, record) {
          let txt = '';
          if (record.subjectLev === '2') {
            txt = `${record.subject}-${record.subjectNme}`;
          }
          return txt;
        },
      },
      {
        title: bizMap['subjectLev-3'], dataIndex: 'subjectLev3', width: 150, render(text, record) {
          let txt = '';
          if (record.subjectLev === '3') {
            txt = `${record.subject}-${record.subjectNme}`;
          }
          return txt;
        },
      },
      {
        title: bizMap.balance, dataIndex: 'balance', width: 100, render(text, record) {
          let txt = '';
          if ((record.accTyp === '1' || record.accTyp === '4')) {
            txt = record.debAccBal;
          } else if ((record.accTyp === '2' || record.accTyp === '3')) {
            txt = record.creAccBal;
          }
          return amtMinUnitToStandUnit(txt, record.ccy);
        },
      },
      {
        title: bizMap.levCount3, dataIndex: 'levCount3', width: 100, render(text, record) {
          let txt = 0;
          if (record.subjectLev === '2' && record.children && record.children.length > 0) {
            if (record.accTyp === '1' || record.accTyp === '4') {
              for (let i = 0; i < record.children.length; i++) {
                txt += Number(record.children[i].debAccBal);
              }
            } else if (record.accTyp === '2' || record.accTyp === '3') {
              for (let i = 0; i < record.children.length; i++) {
                txt += Number(record.children[i].creAccBal);
              }
            }
            txt = amtMinUnitToStandUnit(txt, record.ccy);
          }
          return txt === 0 ? '' : txt;
        },
      },
      {
        title: bizMap.levCount2, dataIndex: 'levCount2', width: 100, render(text, record) {
          let txt = 0;
          if (record.subjectLev === '1' && record.children && record.children.length > 0) {
            if (record.accTyp === '1' || record.accTyp === '4') {
              for (let i = 0; i < record.children.length; i++) {
                txt += Number(record.children[i].debAccBal);
              }
            } else if (record.accTyp === '2' || record.accTyp === '3') {
              for (let i = 0; i < record.children.length; i++) {
                txt += Number(record.children[i].creAccBal);
              }
            }
            txt = amtMinUnitToStandUnit(txt, record.ccy);
          }
          return txt === 0 ? '' : txt;
        },
      },
      { title: bizMap.ccy, dataIndex: 'ccy' },
    ],
    scroll: { x: 1000 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} />);
}

SubjectBalancePageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
};

SubjectBalancePageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
}

export default SubjectBalancePageTable;
