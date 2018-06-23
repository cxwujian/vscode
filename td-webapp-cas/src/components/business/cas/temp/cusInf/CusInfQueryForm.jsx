import React, { PropTypes } from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';

/*查询组件*/

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const CusInfQueryForm = (props) => {
  const bizMap = i18n.bizMap('cas/cusInf');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, cusTyp } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        formSubmit(getFieldsValue());
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.cusTyp} {...formItemLayout}>
            {
              getFieldDecorator('cusTyp', {
                initialValue: cusTyp,
              })(
                <Select initialValue="" disabled >
                  <Option value="">&nbsp;</Option>
                  <Option value="usr">{bizMap['usr-typ']}</Option>
                  <Option value="mer">{bizMap['mer-typ']}</Option>
                  <Option value="agt">{bizMap['agt-typ']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.cusNme} {...formItemLayout}>
            {
              getFieldDecorator('cusNme')(<Input placeholder={bizMap.cusNme} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          &nbsp;
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

CusInfQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  cusTyp: PropTypes.string,
};

CusInfQueryForm.defaultProps = {
  formSubmit: noop,
  cusTyp: noop,
}

export default Form.create()(CusInfQueryForm);
