import React, { PropTypes } from 'react';
import { Form, Input, Select, DatePicker, Button, Cascader, Row, Radio, Col } from 'antd';
import moment from 'moment';
import cityData from '../../../../../../config/i18n/zh-cn/provCityAreaData.json';
import { apIDValid, phoneValid, faxValid, codeValid, userRealNameValidate, postValid } from '../../../../../utils/vaild';
import { getProvOptionList, getCityOptionList, getAreaOptionsList } from '../../../../../utils/provCityAreaUtil';
import * as i18n from '../../../../../utils/i18n';

const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const AgentStepForm1 = (props) => {
  const dateFormat = 'YYYYMMDD';
  const bizMap = i18n.bizMap('mms/agent');
  const validMap = i18n.bizMap('agentVaild');
  const valid = i18n.bizMap('vaild');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, nextClick, bizSaleList, validAgtName, validMobile, validEmail, agtNameChkMsg,
    agtMobileChkMsg, agtEmailChkMsg } = props; const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const formItemLayout2 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const agtNameValid = (rule, value, callback) => {
    const reg = /^([\u4e00-\u9fa5\·]{1,20}|[a-zA-Z\.\s]{2,20})$/; // 允许英文，中文和英文不能同时出现，1-20位
    if (!value) {
      callback();
    } else {
      if (reg.test(value)) {
        validAgtName(value);
        if (agtNameChkMsg) {
          callback(agtNameChkMsg);
        } else {
          callback();
        }
      } else {
        callback(valid.vaildIdentifiedZhnEn);
      }
    }
  };

  const agtMobileValid = (rule, value, callback) => {
    const mobileReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0,6,7,8]{1})|(14[5,7]{1}))+\d{8})$/;
    if (!value) {
      callback();
    } else {
      if (mobileReg.test(value)) {
        validMobile(value);
        if (agtMobileChkMsg) {
          callback(agtMobileChkMsg);
        } else {
          callback();
        }
      } else {
        callback(valid.vaildMobile);
      }
    }
  };

  const agtEmailValid = (rule, value, callback) => {
    const emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!value) {
      callback();
    } else {
      if (emailReg.test(value)) {
        validEmail(value);
        if (agtEmailChkMsg) {
          callback(agtEmailChkMsg);
        } else {
          callback();
        }
      } else {
        callback(valid.vaildIsCorrectEmail);
      }
    }
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (!errors) {
        const dat = getFieldsValue();
        if (dat.idDat && dat.idDat.length > 0) {
          dat.idEffDat = dat.idDat[0].format(dateFormat);
          dat.idExpDat = dat.idDat[1].format(dateFormat);
        }
        if (dat.orgDat && dat.orgDat.length > 0) {
          dat.orgEffDat = dat.orgDat[0].format(dateFormat);
          dat.orgExpDat = dat.orgDat[1].format(dateFormat);
        }
        if (dat.licDat && dat.licDat.length > 0) {
          dat.licEffDat = dat.licDat[0].format(dateFormat);
          dat.licExpDat = dat.licDat[1].format(dateFormat);
        }
        if (dat.agtInProvCityArea && dat.agtInProvCityArea.length > 0) {
          dat.agtProv = dat.agtInProvCityArea[0];
          dat.agtCity = dat.agtInProvCityArea[1];
          dat.agtArea = dat.agtInProvCityArea[2];
        }
        if (dat.agtCityProv) {
          dat.agtProxyProv = dat.agtCityProv;
        }
        if (dat.agtAreaProv) {
          dat.agtProxyProv = dat.agtAreaProv;
        }
        if (dat.agtAreaCity) {
          dat.agtProxyCity = dat.agtAreaCity;
        }
        delete dat.agtAreaCity;
        delete dat.agtAreaProv;
        delete dat.agtCityProv;
        delete dat.idDat;
        delete dat.orgDat;
        delete dat.licDat;
        delete dat.agtInProvCityArea;
        nextClick(dat);
      }
    });
  };
  const provList = getProvOptionList();
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
                rules: [{ required: true, message: validMap.vaildAgtName }],
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
                initialValue: data.agtType ? data.agtType : '0',
                rules: [{ required: true, message: validMap.vaildAgtType }],
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
        <Col span={12} >
          <FormItem label={bizMap.agtScope} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtScope', {
                initialValue: data.agtScope,
                rules: [{ required: false, message: validMap.vaildAgtScope }],
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
                    initialValue: data.agtProxyProv,
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
                    initialValue: data.agtProxyCity,
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
                    initialValue: data.agtProxyArea,
                    rules: [{ required: false }],
                  })(
                    <Select multiple>
                      {
                        getAreaOptionsList(getFieldsValue().agtAreaCity).map((item, idx) => {
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
          <FormItem label={bizMap.agtInProvCityArea} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('agtInProvCityArea', {
                initialValue: data.agtInProvCityArea,
                rules: [{ required: true }],
              })(
                <Cascader placeholder={bizMap.agtInProvCityArea} options={cityData} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.agtAddr} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('agtAddr', {
                initialValue: data.agtAddr,
                rules: [{ required: true, message: validMap.vaildAgtAddr }],
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
                rules: [{ required: true, message: validMap.vaildAgtMobile }],
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
                rules: [{ required: true, message: validMap.vaildAgtPost },
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
                rules: [{ required: true, message: validMap.vaildAgtEmail }],
              })(
                <Input placeholder={bizMap.agtEmail} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.agtFax} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtFax', {
                initialValue: data.agtFax ? data.agtFax : '',
                rules: [{ required: false, message: validMap.faxValid },
                { validator: faxValid }],
              })(
                <Input placeholder={bizMap.agtFax} />,
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
                initialValue: data.agtContacts ? data.agtContacts : '',
                rules: [{ required: true, message: validMap.vaildAgtContact },
                { validator: userRealNameValidate }],
              })(
                <Input placeholder={bizMap.agtContacst} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.agtContactPhone} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtContactPhone', {
                initialValue: data.agtContactPhone ? data.agtContactPhone : '',
                rules: [{ required: true, message: validMap.vaildAgtContactPhone },
                { validator: phoneValid }],
              })(
                <Input placeholder={bizMap.agtContactPhone} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 key="btn-split-1" className="split">&nbsp;</h4>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.agtAp} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtAp', {
                initialValue: data.agtAp,
                rules: [{ required: true, message: validMap.vaildAgtAp },
                { validator: userRealNameValidate }],
              })(
                <Input placeholder={bizMap.agtAp} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.idType} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('idType', {
                initialValue: data.idType,
                rules: [{ required: true, message: validMap.vaildAgtIdType }],
              })(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="01">{bizMap['certType-01']}</Option>
                  <Option value="02">{bizMap['certType-02']}</Option>
                  <Option value="03">{bizMap['certType-03']}</Option>
                  <Option value="04">{bizMap['certType-99']}</Option>
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
                rules: [{ required: true, message: validMap.vaildApId }, { validator: apIDValid }],
              })(
                <Input placeholder={bizMap.apId} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
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
                  rules: [{ required: true, message: validMap.vaildAgtBizLic },
                  { validator: codeValid }],
                })(
                  <Input placeholder={bizMap.bizLic} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
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
                  rules: [{ required: true, message: validMap.vaildAgtOrgCod },
                  { validator: codeValid }],
                })(
                  <Input placeholder={bizMap.orgCod} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
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
              getFieldDecorator('bizSale', {
                initialValue: data.bizSale,
              })(
                <Select>
                  <Option value="">&nbsp;</Option>
                  {
                    bizSaleList.map((bizsaleOption, idx) => {
                      return <Option key={idx} value={bizsaleOption.usrId}>{bizsaleOption.usrName}</Option>;
                    })
                  }
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 key="btn-split-5" className="split">&nbsp;</h4>
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.nextStep}</Button>
        </Col>
      </Row>
    </Form>
  );
}

AgentStepForm1.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  nextClick: PropTypes.func,
  validMobile: PropTypes.func,
  validEmail: PropTypes.func,
  validAgtName: PropTypes.func,
};

AgentStepForm1.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  nextClick: noop,
  validMobile: noop,
  validEmail: noop,
  validAgtName: noop,
}

export default Form.create()(AgentStepForm1);
