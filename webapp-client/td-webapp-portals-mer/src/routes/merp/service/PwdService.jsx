import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import * as i18n from '../../../utils/i18n';
import PwdUpdForm from '../../../components/business/merp/servicePwd/PwdUpdForm'

const bizMap = i18n.bizMap('merp/service');
const PwdService = ({ dispatch, pwdService }) => {
  const { submiting, checkInvalid } = pwdService;
  const cardProps = {
    title: bizMap.pwdModify,
    style: { width: '100%' },
  };
  const formProps = {
    loading: submiting,
    confirmDirty: checkInvalid,
    confirmBlur(val) {
      dispatch({
        type: 'pwdService/updateState',
        payload: { checkInvalid: val },
      });
    },
    formSubmit(dat) {
      dispatch({
        type: 'pwdService/updatePwd',
        payload: { dat: dat },
      });
    },
  }
  return (
    <Card {...cardProps} >
      <PwdUpdForm {...formProps} />
    </Card>
  );
};

function mapStateToProps({ pwdService }) {
  return { pwdService };
}

export default connect(mapStateToProps)(PwdService);
