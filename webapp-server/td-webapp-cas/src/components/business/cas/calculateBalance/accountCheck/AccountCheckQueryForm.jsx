import React, { PropTypes } from 'react';
import { Form, Button, Row, Col, DatePicker, Select } from 'antd';
import moment from 'moment';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD';
const dateFormat1 = 'YYYYMMDD';
const Option = Select.Option;
const AccountCheckQueryForm = (props) => {
  const bizMap = i18n.bizMap('cas/accountCheck');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, ccyOptionsData } = props;
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
        const dat = getFieldsValue();
        if (dat.actDat) {
          dat.actDat = dat.actDat.format(dateFormat1);
        }
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }

  const disabledDate = (current) => {
    return current && current.valueOf() > Date.now();
  }
  const nowTimt = new Date().toLocaleDateString();
  return (
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Row>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.accTyp} {...formItemLayout}>
            {
              getFieldDecorator('accTyp')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="1">{bizMap['accTyp-1']}</Option>
                  <Option value="2">{bizMap['accTyp-2']}</Option>
                  <Option value="3">{bizMap['accTyp-3']}</Option>
                  <Option value="4">{bizMap['accTyp-4']}</Option>
                </Select>)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.actDat} {...formItemLayout}>
            {
              getFieldDecorator('actDat', { initialValue: moment(nowTimt, dateFormat) })(
                <DatePicker format={dateFormat} disabledDate={disabledDate} placeholder={nowTimt} />,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.ccy} {...formItemLayout}>
            {
              getFieldDecorator('ccy')(
                <Select placeholder={commonMap.select}>
                  <Option value="">&nbsp;</Option>
                  {
                    ccyOptionsData.map((ccyOption, idx) => {
                      return <Option key={idx} value={ccyOption.ccy}>{`${ccyOption.ccy}-${ccyOption.ccyExplain}`}</Option>;
                    })
                  }
                </Select>,
              )
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

AccountCheckQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  ccyOptionsData: PropTypes.array,
};

AccountCheckQueryForm.defaultProps = {
  formSubmit: noop,
  ccyOptionsData: [],
}

export default Form.create()(AccountCheckQueryForm);
