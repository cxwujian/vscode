import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, InputNumber, Select } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import { yuan2Cent, cent2Yuan } from '../../../../../utils/currency';

const noop = () => { };
const Option = Select.Option;
const FormItem = Form.Item;
const AccProfilesFrozenForm = (props) => {
  // const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('cas/accProfiles');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.frozAmt = yuan2Cent(dat.frozAmt);
        if (data.accBal) {
          dat.accBal = yuan2Cent(dat.accBal);
        }
        if (data.avlAccBal) {
          dat.avlAccBal = yuan2Cent(dat.avlAccBal);
        }
        if (data.frozAccAmt) {
          dat.frozAccAmt = yuan2Cent(dat.frozAccAmt);
        }
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const frozAmtValidate = (rule, value, callback) => {
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
      const avlAccBal = getFieldsValue().avlAccBal;
      if (avlAccBal) {
        if (Number(avlAccBal) < Number(value)) {
          callback(bizMap.valueGAvlAccBal);
          return;
        }
      }
    } else {
      callback(bizMap.validFrozAmt);
      return;
    }
    callback();
  }
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.actNo} {...formItemLayout} hasFeedback>
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
            <FormItem label={bizMap.cusNo} {...formItemLayout} >
              {
                getFieldDecorator('cusNo', {
                  initialValue: data.cusNo,
                })(
                  <Input placeholder={bizMap.cusNo} disabled />,
                )
              }
            </FormItem>
          </Col>
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
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.blgSubject} {...formItemLayout} >
              {
                getFieldDecorator('blgSubject', {
                  initialValue: data.blgSubject,
                })(
                  <Input placeholder={bizMap.blgSubject} disabled />,
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
            <FormItem label={bizMap.ccy} {...formItemLayout} required>
              {
                getFieldDecorator('ccy', {
                  initialValue: data.ccy,
                })(
                  <Select disabled >
                    <Option value="">&nbsp;</Option>
                    <Option value="CNY">{bizMap['ccy-CNY']}</Option>
                    <Option value="USD">{bizMap['ccy-USD']}</Option>
                    <Option value="EUR">{bizMap['ccy-EUR']}</Option>
                    <Option value="HKD">{bizMap['ccy-HKD']}</Option>
                    <Option value="GBP">{bizMap['ccy-GBP']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.accSts} {...formItemLayout} >
              {
                getFieldDecorator('accSts', {
                  initialValue: data.accSts,
                })(
                  <Select disabled >
                    <Option value="">&nbsp;</Option>
                    <Option value="00">{bizMap['accSts-00']}</Option>
                    <Option value="01">{bizMap['accSts-01']}</Option>
                    <Option value="02">{bizMap['accSts-02']}</Option>
                    <Option value="03">{bizMap['accSts-03']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.accBal} {...formItemLayout} required>
              {
                getFieldDecorator('accBal', {
                  initialValue: cent2Yuan(data.accBal),
                })(
                  <Input placeholder={bizMap.accBal} disabled />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.avlAccBal} {...formItemLayout} >
              {
                getFieldDecorator('avlAccBal', {
                  initialValue: cent2Yuan(data.avlAccBal),
                })(
                  <Input placeholder={bizMap.blgSubject} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.frozAccAmt1} {...formItemLayout} >
              {
                getFieldDecorator('frozAccAmt', {
                  initialValue: cent2Yuan(data.frozAccAmt),
                })(
                  <Input placeholder={bizMap.frozAccAmt} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.frozAmt} {...formItemLayout} required >
              {
                getFieldDecorator('frozAmt', {
                  initialValue: data.frozAmt,
                  validate: [{
                    rules: [
                      { validator: frozAmtValidate },
                    ], trigger: 'onBlur',
                  }],
                })(
                  <InputNumber placeholder={bizMap.frozAmt} style={{ width: '100%' }} min={0} />,
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
                  rules: [{ required: true, message: bizMap.validFrozRsn }],
                })(
                  <Input type="textarea" rows="4" placeholder={bizMap.frozRsn} />,
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

AccProfilesFrozenForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
};

AccProfilesFrozenForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
}

export default Form.create()(AccProfilesFrozenForm);
