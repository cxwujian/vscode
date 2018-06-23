import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, InputNumber, Select } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import { Yuan2Fen, cent2Yuan } from '../../../../../utils/currency';
import { formatDateString } from '../../../../../utils/date';
import { callNotice } from '../../../../../utils/alert';

const noop = () => { };
const Option = Select.Option;
const FormItem = Form.Item;
const AccFrozDetailForm = (props) => {
  const bizMap = i18n.bizMap('cas/accFrozDetail');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
  let ableThawAmt = 0;
  if (data.thawAmt) {
    ableThawAmt = cent2Yuan(data.frozAmt - data.thawAmt);
  } else {
    ableThawAmt = cent2Yuan(data.frozAmt);
  }
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.thawAmt1 > ableThawAmt) {
          callNotice(commonMap.warning, bizMap.thawAmtNotice, 'warning');
          return;
        }
        if (dat.frozAmt) {
          dat.frozAmt = Yuan2Fen(dat.frozAmt);
        }
        if (dat.thawAmt) {
          dat.thawAmt = Yuan2Fen(dat.thawAmt);
        }
        dat.thawAmt1 = Yuan2Fen(dat.thawAmt1);
        if (dat.creTime) {
          const times = dat.creTime.split(' ');
          dat.creDat = times[0].replace(/-/g, '');
          dat.creTim = times[1].replace(/:/g, '');
        }
        console.log('dat==', dat)
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const thawAmtValidate = (rule, value, callback) => {
    if (value) {
      if (value < 0) {
        callback(commonMap.amtL0);
        return;
      }
      if (value) {
        if (value.length > 10) {
          callback(commonMap.amtLengthG10);
          return;
        }
        const num = value.split('.');
        if (num && num.length === 2 && num[1].length > 2) {
          callback(commonMap.amtDecimalLengthG2);
          return;
        }
      }
      if (ableThawAmt) {
        if (Number(ableThawAmt) < Number(value)) {
          callback(bizMap.thawAmtNotice);
          return;
        }
      }
    } else {
      callback(bizMap.validThawAmt1);
      return;
    }
    callback();
  }

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.pkId} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('pkId', {
                  initialValue: data.pkId,
                })(
                  <Input placeholder={bizMap.pkId} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label={bizMap.busCod} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('busCod', {
                  initialValue: data.busCod,
                })(
                  <Input placeholder={bizMap.busCod} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.actNo} {...formItemLayout} >
              {
                getFieldDecorator('actNo', {
                  initialValue: data.actNo,
                })(
                  <Input placeholder={bizMap.actNo} disabled />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.actNme} {...formItemLayout} >
              {
                getFieldDecorator('actNme', {
                  initialValue: data.actNme,
                })(
                  <Input placeholder={bizMap.actNme} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.accTyp} {...formItemLayout} required>
              {
                getFieldDecorator('accTyp', {
                  initialValue: data.accTyp,
                })(
                  <Select disabled >
                    <Option value="">&nbsp;</Option>
                    <Option value="1">{bizMap['accTyp-1']}</Option>
                    <Option value="2">{bizMap['accTyp-2']}</Option>
                    <Option value="3">{bizMap['accTyp-3']}</Option>
                    <Option value="4">{bizMap['accTyp-4']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.subjectNme} {...formItemLayout} >
              {
                getFieldDecorator('subjectNme', {
                  initialValue: data.subjectNme,
                })(
                  <Input placeholder={bizMap.subjectNme} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.frozSts} {...formItemLayout} >
              {
                getFieldDecorator('frozSts', {
                  initialValue: data.frozSts,
                })(
                  <Select disabled >
                    <Option value="">&nbsp;</Option>
                    <Option value="0">{bizMap['frozSts-0']}</Option>
                    <Option value="1">{bizMap['frozSts-1']}</Option>
                    <Option value="2">{bizMap['frozSts-2']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.ccy} {...formItemLayout} >
              {
                getFieldDecorator('ccy', {
                  initialValue: data.ccy,
                })(
                  <Input placeholder={bizMap.ccy} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.frozAmt} {...formItemLayout} >
              {
                getFieldDecorator('frozAmt', {
                  initialValue: cent2Yuan(data.frozAmt),
                })(
                  <Input placeholder={bizMap.frozAmt} disabled />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.thawAmt} {...formItemLayout} >
              {
                getFieldDecorator('thawAmt', {
                  initialValue: cent2Yuan(data.thawAmt),
                })(
                  <Input placeholder={bizMap.thawAmt} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.frozRsn} {...formItemLayout} >
              {
                getFieldDecorator('frozRsn', {
                  initialValue: data.frozRsn,
                })(
                  <Input placeholder={bizMap.frozRsn} disabled />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.creTim} {...formItemLayout} >
              {
                getFieldDecorator('creTime', {
                  initialValue: formatDateString(data.creDat + data.creTim),
                })(
                  <Input placeholder={bizMap.creTim} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.creOpr} {...formItemLayout} >
              {
                getFieldDecorator('creOpr', {
                  initialValue: data.creOpr,
                })(
                  <Input placeholder={bizMap.creOpr} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={12}>
            <div style={{ margin: '0 auto', width: 400, height: 20 }}> {bizMap.ableThawAmt}: {ableThawAmt}</div>
          </Col>
        </Row>
        <p> &nbsp;</p>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.thawAmt1} {...formItemLayout} >
              {
                getFieldDecorator('thawAmt1', {
                  initialValue: data.thawAmt1,
                  validate: [{
                    rules: [
                      { validator: thawAmtValidate },
                    ], trigger: 'onBlur',
                  }],
                })(
                  <InputNumber placeholder={bizMap.thawAmt1} style={{ width: '100%' }} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.thawRsn} {...formItemLayout} >
              {
                getFieldDecorator('thawRsn')(
                  <Input type="textarea" rows="4" placeholder={bizMap.thawRsn} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

AccFrozDetailForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

AccFrozDetailForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(AccFrozDetailForm);
