import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import * as i18n from '../../../utils/i18n';
import ChannelScancodeApplyInfoForm from '../../../components/business/pms/scancode/ChannelScancodeInfoForm';

const ChannelScancodeApply = ({ dispatch, channelScancodeApply }) => {
  const bizMap = i18n.bizMap('pms/channelScancode');
  const { formData, advExpand, submiting, bankList, bankNo } = channelScancodeApply;

  const cardProps = {
    title: bizMap.channelScancodeApply,
    style: { width: '100%' },
  };

  const scancodeApplyInfoProps = {
    style: { width: 848, margin: 'auto', marginTop: 24 },
    data: formData,
    bankList: bankList,
    bankNo: bankNo,
    advExpand: advExpand,
    submiting: submiting,
    optType: '1',
    formSubmit: (dat) => {
      dispatch({
        type: 'channelScancodeApply/addOne',
        payload: { formData: dat },
      });
    },
    advLinkClick: () => {
      dispatch({
        type: 'channelScancodeApply/toggleAdvExpand',
        payload: {},
      });
    },
    getChnInfo: (dat) => {
      dispatch({
        type: 'channelScancodeApply/updateState',
        payload: { bankNo: dat.bankNo },
      });
    },
  };

  return (
    <Card {...cardProps}>
      <ChannelScancodeApplyInfoForm {...scancodeApplyInfoProps} />
    </Card>
  );
};

function mapStateToProps({ channelScancodeApply }) {
  return { channelScancodeApply };
}

export default connect(mapStateToProps)(ChannelScancodeApply);
