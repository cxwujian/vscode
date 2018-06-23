import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Icon, Select } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const MiniSubjectQueryForm = (props) => {
  const bizMap = i18n.bizMap('cas/subject');
  const commonMap = i18n.commonMap();
  const { form, formSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFields } = form;

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
  return (
    <Form layout="horizontal" onSubmit={handleSubmit} style={{ paddingTop: 8 }}>
      <Row gutter={16}>
        <Col span={9}>
          <FormItem>
            {
              getFieldDecorator('accTyp')(
                <Select prefix={<Icon type="edit" style={{ fontSize: 13 }} />} placeholder={bizMap.accTyp}>
                  <Option value="" />
                  <Option value="1">{bizMap['accTyp-1']}</Option>
                  <Option value="2">{bizMap['accTyp-2']}</Option>
                  <Option value="3">{bizMap['accTyp-3']}</Option>
                  <Option value="4">{bizMap['accTyp-4']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col span={9}>
          <FormItem>
            {
              getFieldDecorator('subjectNme')(<Input prefix={<Icon type="edit" style={{ fontSize: 13 }} />} placeholder={bizMap.subjectNme} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={9}>
          <FormItem>
            {
              getFieldDecorator('groupId')(<Input prefix={<Icon type="edit" style={{ fontSize: 13 }} />} placeholder={bizMap.groupId} />)
            }
          </FormItem>
        </Col>
        <Col span={6} style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
        </Col>
      </Row>
    </Form>
  );
}

MiniSubjectQueryForm.propTypes = {
  formSubmit: PropTypes.func,
};

MiniSubjectQueryForm.defaultProps = {
  advExpand: false,
  collapseClick: noop,
  formSubmit: noop,
}

export default Form.create()(MiniSubjectQueryForm);
