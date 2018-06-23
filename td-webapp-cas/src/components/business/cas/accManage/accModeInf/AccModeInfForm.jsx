import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select, TimePicker, Radio } from 'antd';
import moment from 'moment';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const AccModeInfForm = (props) => {
  // const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('cas/accModeInf');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit,
    type,
  } = props;
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
        if (dat.accMode === '03') {
          if (dat.fixedAlterType) {
            if (dat.fixedAlterType === '1') {
              dat.fixedAlterTim = `H${dat.fixedAlterTimH.format('HH')}`;
              delete dat.fixedAlterTimH;
            } else if (dat.fixedAlterType === '2') {
              dat.fixedAlterTim = `M${dat.fixedAlterTimM.format('mm')}`;
              delete dat.fixedAlterTimM;
            } else if (dat.fixedAlterType === '3') {
              dat.fixedAlterTim = `S${dat.fixedAlterTimS.format('ss')}`;
              delete dat.fixedAlterTimS;
            }
          }
        } else if (dat.accMode === '02') {
          dat.fixedTim = dat.fixedTim.format('HHmmss');
        }
        console.log('dat==', dat)
        formSubmit(dat);
      }
    });
  };
  const handleReset = () => {
    resetFields();
  }
  let fixedAlterType = '';
  let fixedAlterTimH = '';
  let fixedAlterTimM = '';
  let fixedAlterTimS = '';
  if (data.fixedAlterTim) {
    if (data.fixedAlterTim.indexOf('H') >= 0) {
      fixedAlterType = '1';
      fixedAlterTimH = data.fixedAlterTim.substring(1, data.fixedAlterTim.length)
    } else if (data.fixedAlterTim.indexOf('M') >= 0) {
      fixedAlterType = '2';
      fixedAlterTimM = data.fixedAlterTim.substring(1, data.fixedAlterTim.length)
    } else if (data.fixedAlterTim.indexOf('S') >= 0) {
      fixedAlterType = '3';
      fixedAlterTimS = data.fixedAlterTim.substring(1, data.fixedAlterTim.length)
    }
  }
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.modeId} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('modeId', {
                  initialValue: data.modeId,
                })(
                  <Input placeholder={bizMap.modeId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.accMode} {...formItemLayout} required>
              {
                getFieldDecorator('accMode', {
                  initialValue: data.accMode,
                  rules: [{ required: true, message: bizMap.validAccMode }],
                })(
                  <Select disabled={type === 'update'}>
                    <Option value="">&nbsp;</Option>
                    <Option value="01">{bizMap['accMode-01']}</Option>
                    <Option value="02">{bizMap['accMode-02']}</Option>
                    <Option value="03">{bizMap['accMode-03']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.modeNme} {...formItemLayout} >
              {
                getFieldDecorator('modeNme', {
                  initialValue: data.modeNme,
                  rules: [{ required: true, message: bizMap.validModeNme }],
                })(
                  <Input placeholder={bizMap.modeNme} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {
          getFieldsValue().accMode === '02' ?
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.fixedTim} {...formItemLayout} >
                  {
                    getFieldDecorator('fixedTim', {
                      initialValue: moment(data.fixedTim ? data.fixedTim : '00:00:00', 'HH:mm:ss'),
                      rules: [{ required: true, message: bizMap.validFixedTim }],
                    })(
                      <TimePicker format={'HH:mm:ss'} style={{ width: '100%' }} />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        {
          getFieldsValue().accMode === '03' ?
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.fixedAlterType} {...formItemLayout} >
                  {
                    getFieldDecorator('fixedAlterType', {
                      initialValue: fixedAlterType,
                      rules: [{ required: true, message: bizMap.validFixedAlterType }],
                    })(
                      <RadioGroup>
                        <Radio value={'1'}>{bizMap.hour}</Radio>
                        <Radio value={'2'}>{bizMap.min}</Radio>
                        <Radio value={'3'}>{bizMap.second}</Radio>
                      </RadioGroup>,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        {
          getFieldsValue().fixedAlterType === '1' ?
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.fixedAlterTim} {...formItemLayout} required >
                  {
                    getFieldDecorator('fixedAlterTimH', {
                      initialValue: fixedAlterTimH ? moment(fixedAlterTimH, 'HH') : '',
                    })(
                      <TimePicker format={'HH'} style={{ width: '30%' }} placeholder={bizMap.hour} />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        {
          getFieldsValue().fixedAlterType === '2' ?
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.fixedAlterTim} {...formItemLayout} required >
                  {
                    getFieldDecorator('fixedAlterTimM', {
                      initialValue: fixedAlterTimM ? moment(fixedAlterTimM, 'mm') : '',
                    })(
                      <TimePicker format={'mm'} style={{ width: '30%' }} placeholder={bizMap.min} />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        {
          getFieldsValue().fixedAlterType === '3' ?
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.fixedAlterTim} {...formItemLayout} required >
                  {
                    getFieldDecorator('fixedAlterTimS', {
                      initialValue: fixedAlterTimS ? moment(fixedAlterTimS, 'ss') : '',
                    })(
                      <TimePicker format={'ss'} style={{ width: '30%' }} placeholder={bizMap.second} />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.remark} {...formItemLayout} >
              {
                getFieldDecorator('remark', {
                  initialValue: data.remark,
                })(
                  <Input type="textarea" rows="4" placeholder={bizMap.remark} />,
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

AccModeInfForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  type: PropTypes.string,
};

AccModeInfForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  type: '',
}

export default Form.create()(AccModeInfForm);
