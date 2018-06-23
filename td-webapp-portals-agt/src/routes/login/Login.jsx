import React from 'react';
import { connect } from 'dva';
import LoginForm from '../../components/business/Login/LoginForm';
import LoginFooter from '../../components/business/Login/LoginFooter';
import LoginHeader from '../../components/business/Login/LoginHeader';
import styles from './Login.less';
import * as i18n from '../../utils/i18n';

class Login extends React.Component {
  render() {
    const bizMap = i18n.bizMap('login');
    const { dispatch, login } = this.props;
    const queryFormProps = {
      loading: login.loginLoading,
      formSubmit: (dat) => {
        dispatch({
          type: 'login/login',
          payload: { username: dat.usrName, password: dat.usrPsw },
        });
      },
    }
    return (
      <div className={styles['td-mer-login']}>
        <div className={styles['td-mer-log']} />
        <div className={styles['td-mer-login-left']}>
          <div className={styles['td-mer-login-left-row']}>
            <div className={styles['td-mer-login-left-col']}>
              <div className={`${styles['td-mer-login-left-item']} ${styles['td-mer-login-left-item-rb']}`} />
            </div>
            <div className={styles['td-mer-login-left-col']}>
              <div className={`${styles['td-mer-login-left-item']} ${styles['td-mer-login-left-item-lb']}`} />
            </div>
          </div>
          <div className={styles['td-mer-login-left-row']}>
            <div className={styles['td-mer-login-left-col']}>
              <div className={`${styles['td-mer-login-left-item']} ${styles['td-mer-login-left-item-rt']}`} />
            </div>
            <div className={styles['td-mer-login-left-col']}>
              <div className={`${styles['td-mer-login-left-item']} ${styles['td-mer-login-left-item-lt']}`} />
              <span className={styles['td-mer-login-center-btn']}>{bizMap.more}</span>
            </div>
          </div>
        </div>
        <div className={`${styles['td-mer-login-center']} ${styles['td-mer-login-center-top']}`} />
        <div className={`${styles['td-mer-login-center']} ${styles['td-mer-login-center-bottom']}`} />
        <div className={styles['td-mer-login-right']} >
          <div className={styles['td-mer-login-form']} >
            <LoginForm {...queryFormProps} />
          </div>
        </div>
        <LoginHeader />
        <LoginFooter />
      </div>
    );
  }
}

function mapStateToProps({ login }) {
  return { login };
}

export default connect(mapStateToProps)(Login);
