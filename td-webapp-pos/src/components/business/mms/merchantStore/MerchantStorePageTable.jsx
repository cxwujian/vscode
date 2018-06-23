import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';
import { getProvLabel, getCityLabel, getAreaLabel } from '../../../../utils/provCityAreaUtil';

const noop = () => { };

const MerchantStorePageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, handleQueryAttachClick,
     tableRowSelect, handleDetailClick, handleUpdateClick } = props;
  const bizMap = i18n.bizMap('mms/merchantStore');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.braId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.braId, dataIndex: 'braId', width: 100 },
      { title: bizMap.braName, dataIndex: 'braName', width: 100 },
      { title: bizMap.merId, dataIndex: 'merName', width: 100 },
      { title: bizMap.braConter, dataIndex: 'braConter', width: 100 },
      { title: bizMap.braTel, dataIndex: 'braTel', width: 120 },
      { title: bizMap.braMobile, dataIndex: 'braMobile', width: 100 },
      { title: bizMap.braAddress, dataIndex: 'braAddress', width: 100,
        render(record, text) {
          let txt = '';
          if (text.braProv) {
            const provLabel = getProvLabel(text.braProv);
            const cityLabel = getCityLabel(text.braCity);
            const areaLabel = getAreaLabel(text.braArea);
            txt = `${provLabel}/${cityLabel}/${areaLabel}`;
          }
          return txt;
        },
      },
      { title: bizMap.braStatus, dataIndex: 'braStatus', render(text) {
        let txt = '';
        switch (text) {
          case '0': txt = commonMap['status-0']; break;
          case '1': txt = commonMap['status-1']; break;
          default: txt = '';
        }
        return <span title={txt} className={text === '1' ? 'enable' : 'disable'}>{txt}</span>;
      } },
      { title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
        return (
          <span>
            <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleQueryAttachClick(record); }}>{bizMap.attachDetail}</a>
            <span className="ant-divider" />
            <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
          </span>
        );
      } },
    ],
    scroll: { x: 1280 },
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

MerchantStorePageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  handleQueryAttachClick: PropTypes.func,
};

MerchantStorePageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
  handleQueryAttachClick: noop,
}

export default MerchantStorePageTable;
