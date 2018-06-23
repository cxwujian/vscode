import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select, TimePicker } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const AccModeInfDeleteForm = (props) => {
  // const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('cas/accModeInf');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit,
  } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;
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
        formSubmit(dat);
      }
    });
  };
  const gettime = (time) => {
    let a = '';
    if (time) {
      a = `${time.substring(0, 2)}:${time.substring(2, 4)}:${time.substring(4, 6)}`;
    } else { a = ''; }
    return a;
  };
  let fixedTim = '';
  if (data.fixedTim) {
    const tims = data.fixedTim.split('|');
    for (let i = 0; i < tims.length; i++) {
      fixedTim += `${gettime(`${tims[i]}`)},`;
    }
  }
  let fixedAlterTim = '';
  if (data.fixedAlterTim) {
    fixedAlterTim = data.fixedAlterTim.replace(/\|/g, ':');
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
          <Col span={12}>
            <FormItem label={bizMap.accMode} {...formItemLayout} required>
              {
                getFieldDecorator('accMode', {
                  initialValue: data.accMode,
                  rules: [{ required: true, message: bizMap.validAccMode }],
                })(
                  <Select disabled>
                    <Option value="">&nbsp;</Option>
                    <Option value="01">{bizMap['accMode-01']}</Option>
                    <Option value="02">{bizMap['accMode-02']}</Option>
                    <Option value="03">{bizMap['accMode-03']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.modeNme} {...formItemLayout} >
              {
                getFieldDecorator('modeNme', {
                  initialValue: data.modeNme,
                  rules: [{ required: true, message: bizMap.validModeNme }],
                })(
                  <Input placeholder={bizMap.modeNme} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            {
              getFieldsValue().accMode === '02' ?

                <FormItem label={bizMap.fixedTim} {...formItemLayout} >
                  {
                    getFieldDecorator('fixedTim', {
                      initialValue: fixedTim,
                    })(
                      <Input placeholder={bizMap.fixedTim} disabled />,
                    )
                  }
                </FormItem>

                :
                null
            }
            {
              getFieldsValue().accMode === '03' ?
                <FormItem label={bizMap.fixedAlterTim} {...formItemLayout} >
                  {
                    getFieldDecorator('fixedAlterTim', {
                      initialValue: fixedAlterTim,
                    })(
                      <Input placeholder={bizMap.fixedAlterTim} disabled />,
                    )
                  }
                </FormItem>
                :
                null
            }
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.remark} {...formItemLayout} >
              {
                getFieldDecorator('remark', {
                  initialValue: data.remark,
                })(
                  <Input placeholder={bizMap.remark} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ textAlign: 'center' }}>
            &nbsp;
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.delete}</Button>
          </Col>
        </Row>
        <p>&nbsp;</p>
        <h4 className="split">&nbsp;</h4>
      </Form>
    </Spin>
  );
}

AccModeInfDeleteForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  timKeys: PropTypes.array,
  changeTimKeys: PropTypes.func,
};

AccModeInfDeleteForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  timKeys: [],
  changeTimKeys: noop,
}

export default Form.create()(AccModeInfDeleteForm);
