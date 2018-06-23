import React, { PropTypes } from 'react';
import { Popover } from 'antd';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import { formatDateString } from '../../../../../utils/date';
import AccManageInfForm from './AccManageInfForm';
import MiniFormTitle from '../../../../common/MiniFormTitle';

const noop = () => { };

const AccManageInfPageForm = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange,
    handleEditModeClick, miniFormVisible, manageInfRecord, manageInfFormSubmit, popoverOncancel,
   } = props;
  const bizMap = i18n.bizMap('cas/accManageInf');
  const commonMap = i18n.commonMap();
  const formProps = {
    data: manageInfRecord,
    formSubmit(record) {
      manageInfFormSubmit(record);
    },
  };
  const miniFormContent = [
    <AccManageInfForm key="form" {...formProps} />,
  ];
  const miniFormTitleProps = {
    title: bizMap.popTitle,
    popoverOncancel() {
      popoverOncancel();
    },
  };
  const miniFormTitle = (
    <MiniFormTitle {...miniFormTitleProps} />
  );
  const tableProps = {
    rowKey: record => record.pkId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.subject, dataIndex: 'subject', width: 150 },
      { title: bizMap.cusNo, dataIndex: 'cusNo', width: 150 },
      { title: bizMap.cateId, dataIndex: 'cateId', width: 150 },
      { title: bizMap.regTim, dataIndex: 'regTim', render: (text) => { return formatDateString(text); } },
      {
        title: commonMap.action, fixed: 'right', width: 100, render(text, record) {
          return (
            <span>
              <Popover title={miniFormTitle} content={miniFormContent} visible={miniFormVisible && manageInfRecord.pkId === record.pkId}>
                <a onClick={() => { handleEditModeClick(record); }}>{bizMap.editMode}</a>
              </Popover>
            </span>
          );
        },
      },
    ],
    scroll: { x: 650 },
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

AccManageInfPageForm.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  miniFormVisible: PropTypes.bool,
  manageInfRecord: PropTypes.object,
  handleEditModeClick: PropTypes.func,
  manageInfFormSubmit: PropTypes.func,
  popoverOncancel: PropTypes.func,
};

AccManageInfPageForm.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  miniFormVisible: false,
  manageInfRecord: {},
  manageInfFormSubmit: noop,
  handleEditModeClick: noop,
  popoverOncancel: noop,
}

export default AccManageInfPageForm;
