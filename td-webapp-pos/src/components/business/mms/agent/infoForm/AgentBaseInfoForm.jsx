import React, { PropTypes } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Cascader, Col, Radio } from 'antd';
import moment from 'moment';
import CITYDATAS from '../../../../../../config/i18n/zh-cn/provCityAreaData.json';
import { emailValid, apIDValid, phoneValid, mobileValid, codeValid, userRealNameValidate, postValid } from '../../../../../utils/vaild';
import { getProvOptionList, getCityOptionList, getAreaOptionsList, getProvLabel, getCityLabel, getAreaLabel } from '../../../../../utils/provCityAreaUtil';
import * as i18n from '../../../../../utils/i18n';

const RangePicker = DatePicker.RangePicker;
const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const UpdateBaseForm = (props) => {
  const dateFormat = 'YYYY-MM-DD';
  const dateUpdFormat = 'YYYYMMDD';
  const bizMap = i18n.bizMap('mms/agent');
  const vaildMap = i18n.bizMap('agentVaild');
  const valid = i18n.bizMap('vaild');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, formBaseSubmit, bizSaleList, validAgtName, validMobile, validEmail, agtNameChkMsg,
     agtMobileChkMsg, agtEmailChkMsg } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const formItemLayout2 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const agtProxyProv = (data) => {
    const prov = data.agtProxyProv ? null : data.agtProxyProv;
    const provs = prov.split(',');
    let strProv = '';
    for (let i = 0; i < provs.length; i++) {
      strProv += getProvLabel(provs[i]);
    }
    return strProv;
  };
  const agtProxyCity = (data) => {
    const city = data.agtProxyCity ? null : data.agtProxyCity;
    const citys = city.split(',');
    let strCity = '';
    for (let i = 0; i < citys.length; i++) {
      strCity += getCityLabel(citys[i]);
    }
    return strCity;
  };
  const agtProxyArea = (data) => {
    const area = data.agtProxyArea ? null : data.agtProxyArea;
    const areas = area.split(',');
    let strArea = '';
    for (let i = 0; i < areas.length; i++) {
      strArea += getAreaLabel(areas[i]);
    }
    return strArea;
  };
  const agtId = getFieldsValue().agtId;
  const agtNameValid = (rule, value, callback) => {
    const reg = /^([\u4e00-\u9fa5\·]{1,20}|[a-zA-Z\.\s]{2,20})$/; // 允许英文，中文和英文不能同时出现，1-20位
    if (!value) {
      callback();
    } else if (reg.test(value)) {
      validAgtName(value);
      if (agtNameChkMsg) {
          callback(agtNameChkMsg);
        } else {
          callback();
        }
    } else {
      callback(valid.vaildIdentifiedZhnEn);
    }
  };

  const agtMobileValid = (rule, value, callback) => {
    const mobileReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0,6,7,8]{1})|(14[5,7]{1}))+\d{8})$/;
    if (!value) {
      callback();
    } else if (mobileReg.test(value)) {
      validMobile(value, agtId);
      if (agtMobileChkMsg) {
          callback(agtMobileChkMsg);
        } else {
          callback();
        }
    } else {
      callback(valid.vaildMobile);
    }
  };

  const agtEmailValid = (rule, value, callback) => {
    const emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!value) {
      callback();
    } else if (emailReg.test(value)) {
      validEmail(value);
      if (agtEmailChkMsg) {
          callback(agtEmailChkMsg);
        } else {
          callback();
        }
    } else {
      callback(valid.vaildIsCorrectEmail);
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.idDat && dat.idDat.length > 0) {
          dat.idEffDat = dat.idDat[0].format(dateUpdFormat);
          dat.idExpDat = dat.idDat[1].format(dateUpdFormat);
        }
        if (dat.orgDat && dat.orgDat.length > 0) {
          dat.orgEffDat = dat.orgDat[0].format(dateUpdFormat);
          dat.orgExpDat = dat.orgDat[1].format(dateUpdFormat);
        }
        if (dat.licDat && dat.licDat.length > 0) {
          dat.licEffDat = dat.licDat[0].format(dateUpdFormat);
          dat.licExpDat = dat.licDat[1].format(dateUpdFormat);
        }
        delete dat.idDat;
        delete dat.orgDat;
        delete dat.licDat;
        formBaseSubmit(dat);
      }
    });
  };
  const provList = getProvOptionList();
  const handleReset = () => {
    resetFields();
  }
  return (
    <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
      <Row style={{ display: 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.agtId} {...formItemLayout}>
            {
              getFieldDecorator('agtId', {
                initialValue: data.agtId,
              })(
                <Input placeholder={bizMap.agtId} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.agtName} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('agtName', {
                initialValue: data.agtName,
                validate: [{
                  rules: [{ required: true, message: vaildMap.vaildAgtName }, { validator: agtNameValid }],
                }],
              })(
                <Input placeholder={bizMap.agtName} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.agtType} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtType', {
                initialValue: data.agtType,
                rules: [{ required: true, message: vaildMap.vaildAgtType }],
              })(
                <RadioGroup>
                  <Radio value="0">{bizMap['agtType-0']}</Radio>
                  <Radio value="1">{bizMap['agtType-1']}</Radio>
                </RadioGroup>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.agtScope} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtScope', {
                initialValue: data.agtScope,
                rules: [{ required: true, message: vaildMap.vaildAgtScope }],
              })(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="01">{bizMap['agtScope-01']}</Option>
                  <Option value="02">{bizMap['agtScope-02']}</Option>
                  <Option value="03">{bizMap['agtScope-03']}</Option>
                  <Option value="04">{bizMap['agtScope-04']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      { /* 省代理 */
        getFieldsValue().agtScope === '02' ?
          <Row>
            <Col span={12}>
              <FormItem label={bizMap.agtProxyProv} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('agtProxyProv', {
                    initialValue: agtProxyProv(data),
                    rules: [{ required: false }],
                  })(
                    <Select multiple>
                      {
                        provList.map((item, idx) => {
                          return <Option key={idx} value={item.value}>{item.label}</Option>;
                        })
                      }
                    </Select>,
                  )
                }
              </FormItem>
            </Col>
          </Row> : null
      }
      { /* 市代理 */
        getFieldsValue().agtScope === '03' ?
          <Row>
            <Col span={12}>
              <FormItem label={bizMap.agtCityProv} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('agtCityProv', {
                    initialValue: data.agtCityProv,
                    rules: [{ required: false }],
                  })(
                    <Select>
                      {
                        provList.map((item, idx) => {
                          return <Option key={idx} value={item.value}>{item.label}</Option>;
                        })
                      }
                    </Select>,
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={bizMap.agtProxyCity} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('agtProxyCity', {
                    initialValue: agtProxyCity(data),
                    rules: [{ required: false }],
                  })(
                    <Select multiple>
                      {
                        getCityOptionList(getFieldsValue().agtCityProv).map((item, idx) => {
                          return <Option key={idx} value={item.value}>{item.label}</Option>;
                        })
                      }
                    </Select>,
                  )
                }
              </FormItem>
            </Col>
          </Row> : null
      }
      {/** 区代理*/
        getFieldsValue().agtScope === '04' ?
          <Row>
            <Col span={12}>
              <FormItem label={bizMap.agtAreaProv} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('agtAreaProv', {
                    initialValue: data.agtAreaProv,
                    rules: [{ required: false }],
                  })(
                    <Select>
                      {
                        provList.map((item, idx) => {
                          return <Option key={idx} value={item.value}>{item.label}</Option>;
                        })
                      }
                    </Select>,
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={bizMap.agtAreaCity} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('agtAreaCity', {
                    initialValue: data.agtAreaCity,
                    rules: [{ required: false }],
                  })(
                    <Select>
                      {
                        getCityOptionList(getFieldsValue().agtAreaProv).map((item, idx) => {
                          return <Option key={idx} value={item.value}>{item.label}</Option>;
                        })
                      }
                    </Select>,
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={bizMap.agtProxyArea} {...formItemLayout} hasFeedback>
                {
                  getFieldDecorator('agtProxyArea', {
                    initialValue: agtProxyArea(data),
                    rules: [{ required: false }],
                  })(
                    <Select multiple>
                      {
                        getAreaOptionsList(getFieldsValue().agtProxyCity).map((item, idx) => {
                          return <Option key={idx} value={item.value}>{item.label}</Option>;
                        })
                      }
                    </Select>,
                  )
                }
              </FormItem>
            </Col>
          </Row> : null
      }
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.agtAddr} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('agtAddr', {
                initialValue: data.agtAddr,
                rules: [{ required: true, message: vaildMap.vaildAgtAddr }],
              })(
                <Input placeholder={bizMap.agtAddr} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.agtMobile} {...formItemLayout} hasFeedback>
            {
                getFieldDecorator('agtMobile', {
                  initialValue: data.agtMobile,
                  rules: [{ required: true, message: vaildMap.vaildAgtMobile },
                  { validator: agtMobileValid }],
                })(
                  <Input placeholder={bizMap.agtMobile} />,
                )
              }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.agtPost} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtPost', {
                initialValue: data.agtPost,
                rules: [{ required: true, message: vaildMap.vaildAgtPost },
                { validator: postValid }],
              })(
                <Input placeholder={bizMap.agtPost} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.agtEmail} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtEmail', {
                initialValue: data.agtEmail,
                rules: [{ required: true, message: vaildMap.vaildAgtEmail },
                { validator: agtEmailValid }],
              })(
                <Input placeholder={bizMap.agtEmail} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row key="1">
        <Col span={12}>
          <FormItem label={bizMap.agtAp} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtAp', {
                initialValue: data.agtAp,
                rules: [{ required: true, message: vaildMap.vaildAgtAp },
                { validator: userRealNameValidate }],
              })(
                <Input placeholder={bizMap.agtAp} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 key="btn-split-1" className="split">&nbsp;</h4>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.idType} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('idType', {
                initialValue: data.idType,
                rules: [{ required: true, message: vaildMap.vaildAgtIdType }],
              })(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="01">{bizMap['certType-01']}</Option>
                  <Option value="02">{bizMap['certType-02']}</Option>
                  <Option value="03">{bizMap['certType-99']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.apId} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('apId', {
                initialValue: data.apId,
                rules: [{ required: true, message: vaildMap.vaildApId }, { validator: apIDValid }],
              })(
                <Input placeholder={bizMap.apId} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={10}>
          <FormItem label={bizMap.idExpDat} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('idDat', {
                initialValue: [
                  data.idEffDat ? moment(data.idEffDat, dateFormat) : null,
                  data.idExpDat ? moment(data.idExpDat, dateFormat) : null,
                ],
                rules: [{ required: true }],
              })(
                <RangePicker format={dateFormat} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      {getFieldsValue().agtType === '1' ?
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.bizLic} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('bizLic', {
                  initialValue: data.bizLic,
                  rules: [{ required: true, message: vaildMap.vaildAgtBizLic },
                  { validator: codeValid }],
                })(
                  <Input placeholder={bizMap.bizLic} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem label={bizMap.licExpDat} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('licDat', {
                  initialValue: [
                    data.licEffDat ? moment(data.licEffDat, dateFormat) : null,
                    data.licExpDat ? moment(data.licExpDat, dateFormat) : null,
                  ],
                  rules: [{ required: true }],
                })(
                  <RangePicker format={dateFormat} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        : ''}
      {getFieldsValue().agtType === '1' ?
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.orgCod} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('orgCod', {
                  initialValue: data.orgCod,
                  rules: [{ required: true, message: vaildMap.vaildAgtOrgCod },
                  { validator: codeValid }],
                })(
                  <Input placeholder={bizMap.orgCod} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem label={bizMap.orgExpDat} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('orgDat', {
                  initialValue: [
                    data.orgEffDat ? moment(data.orgEffDat, dateFormat) : null,
                    data.orgExpDat ? moment(data.orgExpDat, dateFormat) : null,
                  ],
                  rules: [{ required: true }],
                })(
                  <RangePicker format={dateFormat} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        : ''}
      <h4 key="btn-split-3" className="split">&nbsp;</h4>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.bizSale} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('bizSaleId', {
                initialValue: data.bizSale,
                rules: [{ required: false, message: vaildMap.vaildAgtBizSale }],
              })(
                <Select>
                  {
                    bizSaleList.map((bizsaleOption, idx) => {
                      return <Option key={idx} value={`${bizsaleOption.usrId}-${bizsaleOption.usrName}`}>{bizsaleOption.usrName}</Option>;
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
          <FormItem label={bizMap.agtContacts} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtContacts', {
                initialValue: data.agtContacts,
                rules: [{ required: true, message: vaildMap.vaildAgtContact },
                { validator: userRealNameValidate }],
              })(
                <Input placeholder={bizMap.agtContacts} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={10}>
          <FormItem label={bizMap.agtContactPhone} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtContactPhone', {
                initialValue: data.agtContactPhone,
                rules: [{ required: true, message: vaildMap.vaildAgtContactPhone },
                { validator: phoneValid }],
              })(
                <Input placeholder={bizMap.agtContactPhone} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 key="btn-split" className="split">&nbsp;</h4>
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

UpdateBaseForm.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  formBaseSubmit: PropTypes.func,
  validMobile: PropTypes.func,
  validEmail: PropTypes.func,
  validAgtName: PropTypes.func,
  bizSaleList: PropTypes.array,
};

UpdateBaseForm.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  nextClick: noop,
  formBaseSubmit: noop,
  validMobile: noop,
  validEmail: noop,
  validAgtName: noop,
  bizSaleList: [],
}

export default Form.create()(UpdateBaseForm);
