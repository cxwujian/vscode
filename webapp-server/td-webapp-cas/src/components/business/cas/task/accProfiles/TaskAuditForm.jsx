import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col } from 'antd';
import AccProfilesTable from '../../accManage/accProfiles/AccProfilesTable';
import AccUnfrozDetailTable from '../../accFrozManage/accFrozDetail/AccUnfrozDetailTable';
import AccountRechargeTable from '../../accTreatment/accountRecharge/AccountRechargeTable';
import AccountAdjustmentTable from '../../accTreatment/accountAdjustment/AccountAdjustmentTable';
import AccFrozDetailTable from '../../accFrozManage/accFrozDetail/AccFrozDetailTable';
import AccountFundsTransTable from '../../accTreatment/accountFundsTrans/AccountFundsTransTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const TaskAuditForm = (props) => {
  const bizMap = i18n.bizMap('cas/task');
  const { form, data, loading, submiting, formSubmitReject, formSubmitAgree } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const handleSubmitAgree = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        formSubmitAgree(dat);
      }
    });
  };
  const handleSubmitReject = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        formSubmitReject(dat);
      }
    });
  };

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal">
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.flowstatusno} {...formItemLayout}>
              {
                getFieldDecorator('flowstatusno', {
                  initialValue: data.flowstatusno,
                })(
                  <Input />,
                )
              }
              {
                getFieldDecorator('flowbusinesstoken', {
                  initialValue: data.flowbusinesstoken,
                })(
                  <Input />,
                )
              }
              {
                getFieldDecorator('modeltype', {
                  initialValue: data.modeltype,
                })(
                  <Input />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.approvedescription} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('remark')(
                  <Input placeholder={bizMap.approvedescription} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {
              data.modeltype === '1004' || data.modeltype === '1104' ?
                <AccProfilesTable data={data.queryMap} />
                :
                null
            }
            {
              data.modeltype === '1204' ?
                <AccUnfrozDetailTable data={data.queryMap} />
                :
                null
            }
            {
              data.modeltype === '1304' ?
                <AccountRechargeTable data={data.queryMap} />
                :
                null
            }
            {
              data.modeltype === '1404' ?
                <AccountAdjustmentTable data={data.queryMap} />
                :
                null
            }
            {
              data.modeltype === '1504' ?
                <AccFrozDetailTable data={data.queryMap} />
                :
                null
            }
            {
              data.modeltype === '1604' ?
                <AccountFundsTransTable data={data.queryMap} />
                :
                null
            }
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" onClick={handleSubmitAgree} loading={submiting}>{bizMap.agree}</Button>
            <Button htmlType="submit" onClick={handleSubmitReject}>{bizMap.reject}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

TaskAuditForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmitAgree: PropTypes.func,
  formSubmitReject: PropTypes.func,
};

TaskAuditForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmitAgree: noop,
  formSubmitReject: noop,
}

export default Form.create()(TaskAuditForm);
