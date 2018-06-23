import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Alert } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const BusIdCancelForm = (props) => {
  const bizMap = i18n.bizMap('cas/subject');
  const { form, data, submiting, cancelBusId, hiddenBut } = props;
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const handCancelBusId = () => {
    cancelBusId(data);
  }
  return (
    <Form layout="horizontal" >
      <Alert message={bizMap.busIdInfo} type="success" />
      <div hidden>
        {
          getFieldDecorator('groupId', {
            initialValue: data.groupId,
          })(
            <Input />,
          )
        }
        {
          getFieldDecorator('busId', {
            initialValue: data.busId,
          })(
            <Input />,
          )
        }
      </div>
      <Row>
        <Col span={8}>
          <FormItem label={bizMap.groupDesc} {...formItemLayout} >
            {
              getFieldDecorator('groupDesc1', {
                initialValue: `${data.groupId}-${data.groupDesc}`,
              })(
                <Input placeholder={bizMap.groupDesc} disabled />,
              )
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.busDesc} {...formItemLayout} >
            {
              getFieldDecorator('busDesc1', {
                initialValue: `${data.busId}-${data.busDesc}`,
              })(
                <Input placeholder={bizMap.busDesc} disabled />,
              )
            }
          </FormItem>
        </Col>
        <Col span={5}>
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
        <div hidden={hiddenBut}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" loading={submiting} onClick={handCancelBusId} >{bizMap.conCancel}</Button>
          </Col>
        </div>
      </Row>
    </Form>
  );
}

BusIdCancelForm.propTypes = {
  data: PropTypes.object,
  cancelBusId: PropTypes.func,
  hiddenBut: PropTypes.bool,
};

BusIdCancelForm.defaultProps = {
  data: {},
  submiting: false,
  cancelBusId: noop,
  hiddenBut: true,
}

export default Form.create()(BusIdCancelForm);
