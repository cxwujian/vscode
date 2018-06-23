import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker, Icon, InputNumber } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import { yuan2Cent } from '../../../../../utils/currency';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';
const dateFormat1 = 'YYYYMMDD';
const CasTxnJnlQueryForm = (props) => {
  const bizMap = i18n.bizMap('cas/casJnlQry');
  const commonMap = i18n.commonMap();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const { form, formSubmit, collapseClick, advExpand, transBaseOptionsData } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields } = form;
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFields((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.regTim && dat.regTim.length > 0) {
          dat.regTimStart = dat.regTim[0].format(dateFormat1);
          dat.regTimEnd = dat.regTim[1].format(dateFormat1);
          delete dat.regTim;
        }
        if (dat.actDat) {
          dat.actDat = dat.actDat.format(dateFormat1);
        }
        if (dat.txnAmtMin) {
          dat.txnAmtMin = yuan2Cent(dat.txnAmtMin);
        }
        if (dat.txnAmtMax) {
          dat.txnAmtMax = yuan2Cent(dat.txnAmtMax);
        }
        formSubmit(dat);
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
          <FormItem label={bizMap.txnTyp} {...formItemLayout}>
            {
              getFieldDecorator('txnTyp')(
                <Select placeholder={commonMap.select}>
                  <Option value="">&nbsp;</Option>
                  <Option value="N">{bizMap['txnTyp-N']}</Option>
                  <Option value="R">{bizMap['txnTyp-R']}</Option>
                  <Option value="C">{bizMap['txnTyp-C']}</Option>
                  <Option value="H">{bizMap['txnTyp-H']}</Option>
                  <Option value="T">{bizMap['txnTyp-T']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.txnCode} {...formItemLayout}>
            {
              getFieldDecorator('txnCode')(
                <Select>
                  <Option value="">&nbsp;</Option>
                  {
                    transBaseOptionsData.map((transBaseOption, idx) => {
                      return <Option key={idx} value={transBaseOption.txnCode}>{`${transBaseOption.txnCode}-${transBaseOption.txnDesc}`}</Option>;
                    })
                  }
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.regTim} {...formItemLayout}>
            {
              getFieldDecorator('regTim')(
                <RangePicker format={dateFormat} style={{ width: 300 }} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row style={{ display: advExpand ? 'block' : 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.actDat} {...formItemLayout}>
            {
              getFieldDecorator('actDat')(
                <DatePicker format={dateFormat} style={{ width: 300 }} />,
              )
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.txnAmt} {...formItemLayout}>
            {
              getFieldDecorator('txnAmtMin')(<InputNumber placeholder={bizMap.txnAmt} style={{ width: '47%' }} step={0.01} />)
            }
            {
              getFieldDecorator('txnAmtMax')(<InputNumber placeholder={bizMap.txnAmt} style={{ width: '47%' }} step={0.01} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.tckNo} {...formItemLayout}>
            {
              getFieldDecorator('tckNo')(
                <Input placeholder={bizMap.tckNo} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row style={{ display: advExpand ? 'block' : 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.accTxnSts} {...formItemLayout}>
            {
              getFieldDecorator('accTxnSts')(
                <Select placeholder={commonMap.select}>
                  <Option value="">&nbsp;</Option>
                  <Option value="U">{bizMap['accTxnSts-U']}</Option>
                  <Option value="S">{bizMap['accTxnSts-S']}</Option>
                  <Option value="F">{bizMap['accTxnSts-F']}</Option>
                  <Option value="C">{bizMap['accTxnSts-C']}</Option>
                  <Option value="R">{bizMap['accTxnSts-R']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup />
        </Col>
        <Col sm={24} md={12} style={{ textAlign: 'right', marginBottom: 16 }}>
          <a style={{ marginRight: 8, fontSize: 12 }} onClick={collapseClick}>
            {commonMap.advSearch} <Icon type={advExpand ? 'up' : 'down'} />
          </a>
          <Button type="primary" icon="search" htmlType="submit">{commonMap.search}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
};

CasTxnJnlQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  collapseClick: PropTypes.func,
  advExpand: PropTypes.bool,
  transBaseOptionsData: PropTypes.array,
};

CasTxnJnlQueryForm.defaultProps = {
  formSubmit: noop,
  collapseClick: noop,
  advExpand: false,
  transBaseOptionsData: [],
}

export default Form.create()(CasTxnJnlQueryForm);
