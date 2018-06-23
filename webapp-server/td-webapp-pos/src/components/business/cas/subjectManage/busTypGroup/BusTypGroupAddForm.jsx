import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Alert, Icon } from 'antd';
import { } from '../../../../../utils/vaild';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;

const BusTypGroupAddForm = (props) => {
  const bizMap = i18n.bizMap('cas/subject');
  const commonMap = i18n.commonMap();
  const { form, style, submiting, addFormSubmit, busIds, changeBusIds, keys, busTypData } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        addFormSubmit(dat);
      }
    });
  };
  const itemDisable = {
    disabled: true,
  }

  //弹出业务子码组件
  const add = () => {
    changeBusIds(busIds, keys, 'add');
  }

  const remove = (k) => {
    const keyArr = keys.filter((key) => {
      return key !== k;
    });
    changeBusIds(busIds, keyArr, 'del');
  }

  const handleReset = () => {
    resetFields();
  }

  const addButtonItems = [
    <FormItem wrapperCol={{ span: 18, offset: 6 }}>
      <Button onClick={add}>{bizMap.addBusId}</Button>
    </FormItem>,
  ];
  const formItems = keys.map((k, index) => {
    return (
      <Row key={k}>
        <Col span={8}>
          <FormItem label={`${bizMap.busId}  ${index}`} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator(`busId${index}`, {
                rules: [{ required: true, message: bizMap.validBusId }],
              })(
                <Input placeholder={bizMap.busId} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={bizMap.busDesc} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator(`busDesc${index}`, {
                rules: [{ required: true, message: bizMap.validBusDesc }],
              })(
                <Input placeholder={bizMap.busDesc} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={5}>
          <FormItem label={bizMap.remark} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator(`remark${index}`, {
                rules: [{ required: false }],
              })(
                <Input placeholder={bizMap.remark} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={3}>
          &nbsp;&nbsp;&nbsp;
          <a onClick={() => remove(k)} {...k === 0 ? itemDisable : null} ><Icon type="cross" /></a>
        </Col>
      </Row>
    );
  });

  return (
    <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
      <Alert message={bizMap.busTypGroupInfo} type="success" />
      <Row>
        {
          busTypData.groupId ?
            <Col span={8}>
              <FormItem label={bizMap.groupId} {...formItemLayout}>
                {
                  getFieldDecorator('groupId', {
                    initialValue: busTypData.groupId,
                  })(
                    <Input disabled />,
                  )
                }
              </FormItem>
            </Col>
            :
            ''
        }
        <Col span={8}>
          <FormItem label={bizMap.groupDesc} {...formItemLayout} >
            {
              getFieldDecorator('groupDesc', {
                initialValue: busTypData.groupDesc,
                rules: [{ required: true, message: bizMap.validGroupDesc }],
              })(
                <Input placeholder={bizMap.groupDesc} disabled={busTypData.groupId} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Alert message={bizMap.busIdInfo} type="success" />
      <Row>
        <Col span={24}>
          {formItems}
        </Col>
      </Row>
      {addButtonItems}
      <h4 key="btn-split-5" className="split">&nbsp;</h4>
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

BusTypGroupAddForm.propTypes = {
  style: PropTypes.object,
  busTypData: PropTypes.object,
  submiting: PropTypes.bool,
  addFormSubmit: PropTypes.func,
  busIds: PropTypes.number,
  keys: PropTypes.array,
  changeResetFlag: PropTypes.func,
};

BusTypGroupAddForm.defaultProps = {
  style: {},
  busTypData: {},
  submiting: false,
  addFormSubmit: noop,
  busIds: 1,
  keys: [],
  changeResetFlag: noop,
}

export default Form.create()(BusTypGroupAddForm);
