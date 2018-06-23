import React, { PropTypes } from 'react';
import { Spin, Form, Input, Cascader, Button, Row, Select, Col, Modal } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import CITYDATAS from '../../../../../../config/i18n/zh-cn/provCityData.json';
import currency from '../../../../../../config/i18n/zh-cn/currency.json';
import SuBankQueryForm from '../subBankInfo/SuBankQueryForm';
import SubBankCallBackPageTable from '../subBankInfo/SubBankCallBackPageTable';
import { getProvLabel, getCityLabel } from '../../../../../utils/provCityAreaUtil';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const MerchantBankInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/merchant');
  const vaildMap = i18n.bizMap('mms/merchantVaild');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formBankSubmit, querySubBanklist, subBankList, bankList,
     onCancelSubBankModel, subBankModalVisible } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.stlProvCity && dat.stlProvCity.length > 0) {
          dat.stlProv = dat.stlProvCity[0];
          dat.stlCity = dat.stlProvCity[1];
        }
        formBankSubmit(dat);
      }
    });
  };

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
      dat.provName = getProvLabel(dat.stlProvCity[0]);
      dat.cityName = getCityLabel(dat.stlProvCity[1]);
    }
    dat.bankParentCode = dat.stlBankName;
    delete dat.stlProvCity;
    querySubBanklist(Object.assign(dat, { currentPage: 1 }));
  }
  const handleQueryBanklist = (dat) => {
    form.setFieldsValue({ stlBank: dat });
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

  const handleReset = () => {
    resetFields();
  }

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.merId} {...formItemLayout}>
              {
                getFieldDecorator('merId', {
                  initialValue: data.merId,
                })(
                  <Input placeholder={bizMap.merId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.stlAcc} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('stlAcc', {
                  initialValue: data.stlAcc,
                  rules: [{ required: true, message: vaildMap.vaildStlAc }],
                })(
                  <Input placeholder={bizMap.stlAcc} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.stlName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('stlName', {
                  initialValue: data.stlName,
                  rules: [{ required: true, message: vaildMap.vaildStlName }],
                })(
                  <Input placeholder={bizMap.stlName} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
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
          <Col span={12}>
            <FormItem label={bizMap.stlBankName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('stlBankName', {
                  initialValue: data.stlBankName,
                  rules: [{ required: true, message: vaildMap.vaildStlBnkName }],
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
          <Col span={12}>
            <FormItem label={bizMap.stlBank} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('stlBank', {
                  initialValue: data.stlBank,
                })(
                  <Input placeholder={bizMap.stlBank} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.stlProvCity} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('stlProvCity', {
                  initialValue: data.stlProv ? [data.stlProv, data.stlCity] : null,
                  rules: [{ required: true, message: vaildMap.vaildAddress }],
                })(
                  <Cascader options={CITYDATAS} placeholder={bizMap.stlProvCity} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.stlCnapsName} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('stlCnapsName', {
                  initialValue: data.stlCnapsName,
                  rules: [{ required: true, message: vaildMap.vaildStlCnapsName }],
                })(
                  <Input placeholder={bizMap.stlCnapsName} onClick={handleQuerySubBanklist} />,
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
          <Col span={12}>
            <FormItem label={bizMap.stlCnaps} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('stlCnaps', {
                  initialValue: data.stlCnaps,
                })(
                  <Input placeholder={bizMap.stlCnaps} />,
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

MerchantBankInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formBankSubmit: PropTypes.func,
  querySubBanklist: PropTypes.func,
  bankList: PropTypes.array,
};

MerchantBankInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formBankSubmit: noop,
  querySubBanklist: noop,
  bankList: [],
}

export default Form.create()(MerchantBankInfoForm);
