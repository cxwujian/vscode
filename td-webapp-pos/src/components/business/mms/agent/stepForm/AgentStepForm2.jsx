import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Select, Row, Cascader, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import CITYDATAS from '../../../../../../config/i18n/zh-cn/provCityData.json';
import { numValid, userRealNameValidate } from '../../../../../utils/vaild';
import SuBankQueryForm from '../subBankInfo/SuBankQueryForm';
import SubBankCallBackPageTable from '../subBankInfo/SubBankCallBackPageTable';
import currency from '../../../../../../config/i18n/zh-cn/currency.json';
import { getProvLabel, getCityLabel } from '../../../../../utils/provCityAreaUtil';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const AgentStepForm2 = (props) => {
  const bizMap = i18n.bizMap('mms/agent');
  const vaildMap = i18n.bizMap('agentVaild');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, nextClick, prevClick, bankList, querySubBanklist,
    subBankList, subBankModalVisible, onCancelSubBankModel } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const handleQueryBanklist = (dat) => {
    form.setFieldsValue({ stlBank: dat });
  }

  const queryFormProps = {
    formSubmit: (datas) => {
      const dat = datas;
      const data = getFieldsValue();
      if (data.stlProvCity && data.stlProvCity.length > 0) {
        dat.provName = getProvLabel(data.stlProvCity[0]);
        dat.cityName = getCityLabel(data.stlProvCity[1]);
      }
      dat.bankParentCode = data.stlBankName;
      querySubBanklist(Object.assign({}, dat, { currentPage: 1 }));
    },
  };

  const handleQuerySubBanklist = () => {
    const dat = getFieldsValue();
    if (dat.stlProvCity && dat.stlProvCity.length > 0) {
      dat.provName = getProvLabel(data.stlProvCity[0]);
      dat.cityName = getCityLabel(data.stlProvCity[1]);
    }
    dat.bankParentCode = dat.stlBankName;
    delete dat.stlProvCity;
    querySubBanklist(Object.assign(dat, { currentPage: 1 }));
  }

  const infoModalProps = {
    width: 848,
    footer: null,
    title: bizMap.subBankDetail,
    visible: subBankModalVisible,
    onCancel: () => {
      onCancelSubBankModel();
    },
  };

  const tableProps = {
    tableCurrentPage: subBankList.tableCurrentPage,
    tableList: subBankList.tableList,
    tableTotal: subBankList.tableTotal,
    tableLoading: subBankList.tableLoading,
    tablePageChange(next) {
      const param = subBankList.tableParam;
      param.currentPage = next;
      querySubBanklist(param);
    },
    rowClickCallback(data) {
      form.setFieldsValue({ stlCnaps: data.bankCode });
      form.setFieldsValue({ stlCnapsName: data.subBranch });
      onCancelSubBankModel();
    },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.stlProv = dat.stlProvCity[0];
        dat.stlCity = dat.stlProvCity[1];
        delete dat.stlProvCity;
        nextClick(dat);
      }
    });
  };

  return (
    <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.stlName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlName', {
                initialValue: data.stlName,
                rules: [{ required: true, message: vaildMap.vaildAgtStlName },
                { validator: userRealNameValidate }],
              })(
                <Input placeholder={bizMap.stlName} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.ccy} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('ccy', {
                initialValue: data.ccy,
                rules: [{ required: true }],
              })(

                <Select>
                  {
                      currency.map((item, idx) => {
                        return <Option key={idx} value={item.value}>{item.label}</Option>;
                      })
                    }
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.stlAcc} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlAcc', {
                initialValue: data.stlAcc,
                rules: [{ required: true, message: vaildMap.vaildAgtStlAc },
                { validator: numValid }],
              })(
                <Input placeholder={bizMap.stlAcc} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.stlBankName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlBankName', {
                initialValue: data.bizScope,
                rules: [{ required: false, message: vaildMap.vaildstlBankName }],
              })(
                <Select onChange={handleQueryBanklist}>
                  {
                    bankList.map((item, idx) => {
                      return <Option key={idx} value={item.bankNo}>{item.bankName}</Option>;
                    })
                  }
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.stlBank} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlBank', {
                initialValue: data.stlBank ? data.stlBank : '',
                rules: [{ required: false, message: vaildMap.vaildAgtBnkName }],
              })(
                <Input placeholder={bizMap.stlBank} readOnly="true" />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.agtprovCityArea} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlProvCity', {
                initialValue: data.stlProvCity,
                rules: [{ required: true, message: vaildMap.vaildAddress }],
              })(
                <Cascader placeholder={bizMap.agtprovCityArea} options={CITYDATAS} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.stlCnapsName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlCnapsName', {
                initialValue: data.stlCnapsName,
              })(
                <Input placeholder={bizMap.stlCnapsName} onClick={handleQuerySubBanklist} readOnly="true" />,
              )
            }
          </FormItem>
        </Col>
        {subBankModalVisible
        ? <Col>
          <Modal {...infoModalProps}>
            <SuBankQueryForm {...queryFormProps} />
            <SubBankCallBackPageTable {...tableProps} />
          </Modal>
        </Col>
        : null
       }
        <Col span={24}>
          <FormItem label={bizMap.stlCnaps} {...formItemLayout} hasFeedback >
            {
              getFieldDecorator('stlCnaps', {
                initialValue: data.stlCnaps,
              })(
                <Input placeholder={bizMap.stlCnaps} readOnly="true" />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 key="btn-split" className="split">&nbsp;</h4>
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button onClick={prevClick} style={{ marginRight: 16 }}>{commonMap.prevStep}</Button>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.nextStep}</Button>
        </Col>
      </Row>
    </Form>
  );
}

AgentStepForm2.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  nextClick: PropTypes.func,
  prevClick: PropTypes.func,
  querySubBanklist: PropTypes.func,
};

AgentStepForm2.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  nextClick: noop,
  prevClick: noop,
  querySubBanklist: noop,
}

export default Form.create()(AgentStepForm2);
