import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Select } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const AccSubProfilesForm = (props) => {
  // const dateFormat = 'YYYY-MM-DD';
  const bizMap = i18n.bizMap('cas/accProfiles');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit, setFormFieldsValue, cancelModel,
    ccyOptionsData, subAccCategoryDate, subAccCategoryDates } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields, setFieldsValue } = form;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
  const formItemLayout2 = {
    labelCol: { span: 10 },
    wrapperCol: { span: 12 },
  };
  const formItemLayout3 = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        let subAccNos = dat.subAccNo1;
        if (dat.subAccNo2) {
          subAccNos += dat.subAccNo2;
          if (dat.subAccNo3) {
            subAccNos += dat.subAccNo3;
          }
        }
        dat.cateIds = subAccNos;
        if (getFieldsValue().cateId1) {
          dat.cateId1 = getFieldsValue().cateId1.split('-')[0];
          dat.cateDesc1 = getFieldsValue().cateId1.split('-')[1];
          if (getFieldsValue().cateId2) {
            dat.cateId2 = getFieldsValue().cateId2.split('-')[0];
            dat.cateDesc2 = getFieldsValue().cateId2.split('-')[1];
            if (getFieldsValue().cateId3) {
              dat.cateId3 = getFieldsValue().cateId3.split('-')[0];
              dat.cateDesc3 = getFieldsValue().cateId3.split('-')[1];
            }
          }
        }
        if (dat.blgSubject) {
          dat.blgSubject = dat.blgSubject.split('-')[0];
        }
        formSubmit(dat);
      }
    });
  };

  const handleCancelModel = () => {
    resetFields();
    const dat = {};
    setFormFieldsValue(dat)
    cancelModel();
  }
  const changeActNme = () => {
    let actNme = '';
    let subAccDesc = '';
    const oldActNme = getFieldsValue().parentActNme;
    if (getFieldsValue().parentAccLevel === '0') {
      if (getFieldsValue().subAccDesc1) {
        subAccDesc += `-${getFieldsValue().subAccDesc1} `;
      }
    } else if (getFieldsValue().parentAccLevel === '1') {
      if (getFieldsValue().subAccDesc2) {
        subAccDesc += `-${getFieldsValue().subAccDesc2} `;
      }
    } else if (getFieldsValue().parentAccLevel === '2') {
      if (getFieldsValue().subAccDesc3) {
        subAccDesc += `-${getFieldsValue().subAccDesc3} `;
      }
    }
    actNme += oldActNme + subAccDesc;
    setFieldsValue({ actNme: actNme });
  }
  const cateId2Validate = (rule, value, callback) => {
    if (value) {
      if (value === getFieldsValue().cateId1) {
        callback(bizMap.cateIdNotSameNotice);
      }
    } else {
      callback(bizMap.validCateId2);
      return;
    }
    callback();
  }
  const cateId3Validate = (rule, value, callback) => {
    if (value) {
      if (value === getFieldsValue().cateId1 || value === getFieldsValue().cateId2) {
        callback(bizMap.cateIdNotSameNotice);
      }
    } else {
      callback(bizMap.validCateId2);
      return;
    }
    callback();
  }
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <div hidden>
          {
            getFieldDecorator('parentAccLevel', {
              initialValue: data.accLevel,
            })(
              <Input />,
            )
          }
          {
            getFieldDecorator('parentHasChildren', {
              initialValue: data.hasChildren,
            })(
              <Input />,
            )
          }
          {
            getFieldDecorator('parentActNme', {
              initialValue: data.actNme,
            })(
              <Input />,
            )
          }
        </div>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.blgAct} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('blgAct', {
                  initialValue: data.actNo,
                })(
                  <Input placeholder={bizMap.blgAct} disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.accTyp} {...formItemLayout} required>
              {
                getFieldDecorator('accTyp', {
                  initialValue: data.accTyp,
                })(
                  <Select disabled >
                    <Option value="">&nbsp;</Option>
                    <Option value="1">{bizMap['accTyp-1']}</Option>
                    <Option value="2">{bizMap['accTyp-2']}</Option>
                    <Option value="3">{bizMap['accTyp-3']}</Option>
                    <Option value="4">{bizMap['accTyp-4']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.blgSubject} {...formItemLayout} >
              {
                getFieldDecorator('blgSubject', {
                  initialValue: `${data.blgSubject}-${data.subjectNme}`,
                })(
                  <Input placeholder={bizMap.blgSubject} readOnly="true" disabled />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.ccy} {...formItemLayout} required>
              {
                getFieldDecorator('ccy', {
                  initialValue: data.ccy,
                })(
                  <Select disabled>
                    <Option value="">&nbsp;</Option>
                    {
                      ccyOptionsData.map((ccyOption, idx) => {
                        return <Option key={idx} value={ccyOption.ccy}>{`${ccyOption.ccy} -${ccyOption.ccyExplain} `}</Option>;
                      })
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {
          data.cusNo ?
            <Row>
              <Col span={24}>
                <FormItem label={data.cusNo.indexOf('CHN') === -1 ? bizMap.cusNo : bizMap.chnOrgCod} {...formItemLayout} >
                  {
                    getFieldDecorator('cusNo', {
                      initialValue: data.cusNo,
                    })(
                      <Input disabled />,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            ''
        }
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.cateId1} {...formItemLayout} >
              {
                getFieldDecorator('cateId1', {
                  initialValue: subAccCategoryDate.subAccId1 ? `${subAccCategoryDate.subAccId1}-${subAccCategoryDate.subAccName1}` : '',
                  rules: [{ required: true, message: bizMap.validCateId1 }],
                })(
                  <Select disabled={getFieldsValue().parentAccLevel !== '0' || (getFieldsValue().parentAccLevel === '0' && getFieldsValue().parentHasChildren)}>
                    <Option value="">&nbsp;</Option>
                    {
                      subAccCategoryDates.map((cateOption, idx) => {
                        return <Option key={idx} value={`${cateOption.subAccId}-${cateOption.subAccName}`}>{`${cateOption.subAccId} -${cateOption.subAccName} `}</Option>;
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
            <FormItem label={bizMap.subAccNo1} {...formItemLayout2} >
              {
                getFieldDecorator('subAccNo1', {
                  initialValue: getFieldsValue().parentAccLevel !== '0' || (getFieldsValue().parentAccLevel === '0' && !getFieldsValue().parentHasChildren) ? subAccCategoryDate.subAccNo1 : '',
                  rules: [{ required: true, message: bizMap.validSubAccNo1 }],
                })(
                  <Input placeholder={bizMap.subAccNo1} disabled={getFieldsValue().parentAccLevel !== '0'} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.subAccDesc1} {...formItemLayout3} >
              {
                getFieldDecorator('subAccDesc1', {
                  initialValue: getFieldsValue().parentAccLevel !== '0' || (getFieldsValue().parentAccLevel === '0' && !getFieldsValue().parentHasChildren) ? subAccCategoryDate.subAccDesc1 : '',
                  rules: [{ required: true, message: bizMap.validSubAccDesc1 }],
                })(
                  <Input placeholder={bizMap.subAccDesc1} onBlur={changeActNme} disabled={getFieldsValue().parentAccLevel !== '0'} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {
          getFieldsValue().parentAccLevel === '1' || getFieldsValue().parentAccLevel === '2' ?
            <div>
              <Row>
                <Col span={24}>
                  <FormItem label={bizMap.cateId2} {...formItemLayout} >
                    {
                      getFieldDecorator('cateId2', {
                        initialValue: getFieldsValue().parentAccLevel === '2' ? `${subAccCategoryDate.subAccId2} -${subAccCategoryDate.subAccName2} ` : '',
                        rules: [{ validator: cateId2Validate }],
                      },
                      )(
                        <Select disabled={getFieldsValue().parentAccLevel === '2'}>
                          <Option value="">&nbsp;</Option>
                          {
                            subAccCategoryDates.map((cateOption, idx) => {
                              return <Option key={idx} value={`${cateOption.subAccId}-${cateOption.subAccName}`}>{`${cateOption.subAccId} -${cateOption.subAccName} `}</Option>;
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
                  <FormItem label={bizMap.subAccNo2} {...formItemLayout2} >
                    {
                      getFieldDecorator('subAccNo2',
                        {
                          initialValue: getFieldsValue().parentAccLevel === '2' ? subAccCategoryDate.subAccNo2 : '',
                          rules: [{ required: true, message: bizMap.validSubAccNo2 }],
                        },
                      )(
                        <Input placeholder={bizMap.subAccNo2} disabled={getFieldsValue().parentAccLevel === '2'} />,
                      )
                    }
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label={bizMap.subAccDesc2} {...formItemLayout3} >
                    {
                      getFieldDecorator('subAccDesc2',
                        {
                          initialValue: getFieldsValue().parentAccLevel === '2' ? subAccCategoryDate.subAccDesc2 : '',
                          rules: [{ required: true, message: bizMap.validSubAccDesc2 }],
                        },
                      )(
                        <Input placeholder={bizMap.subAccDesc2} onBlur={changeActNme} disabled={getFieldsValue().parentAccLevel === '2'} />,
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
            </div>
            : null
        }
        {
          getFieldsValue().parentAccLevel === '2' ?
            <div>
              <Row>
                <Col span={24}>
                  <FormItem label={bizMap.cateId3} {...formItemLayout} >
                    {
                      getFieldDecorator('cateId3',
                        {
                          rules: [{ validator: cateId3Validate }],
                        },
                      )(
                        <Select>
                          <Option value="">&nbsp;</Option>
                          {
                            subAccCategoryDates.map((cateOption, idx) => {
                              return <Option key={idx} value={`${cateOption.subAccId}-${cateOption.subAccName}`}>{`${cateOption.subAccId} -${cateOption.subAccName} `}</Option>;
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
                  <FormItem label={bizMap.subAccNo3} {...formItemLayout2} >
                    {
                      getFieldDecorator('subAccNo3', {
                        rules: [{ required: true, message: bizMap.validSubAccNo3 }],
                      })(
                        <Input placeholder={bizMap.subAccNo3} />,
                      )
                    }
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label={bizMap.subAccDesc3} {...formItemLayout3} >
                    {
                      getFieldDecorator('subAccDesc3', {
                        rules: [{ required: true, message: bizMap.validSubAccDesc3 }],
                      })(
                        <Input placeholder={bizMap.subAccDesc3} onBlur={changeActNme} />,
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
            </div>
            : null
        }
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.actNme} {...formItemLayout} >
              {
                getFieldDecorator('actNme', {
                  initialValue: data.actNme,
                  rules: [{ required: true, message: bizMap.validActNme }],
                })(
                  <Input placeholder={bizMap.actNme} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.remark} {...formItemLayout} >
              {
                getFieldDecorator('remark', {
                  initialValue: data.remark,
                })(
                  <Input type="textarea" rows="4" placeholder={bizMap.remark} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleCancelModel}>{commonMap.cancel}</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

AccSubProfilesForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  setFormFieldsValue: PropTypes.func,
  ccyOptionsData: PropTypes.array,
  subAccCategoryDate: PropTypes.object,
  subAccCategoryDates: PropTypes.array,
  cancelModel: PropTypes.func,
};

AccSubProfilesForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  setFormFieldsValue: noop,
  ccyOptionsData: [],
  subAccCategoryDate: {},
  subAccCategoryDates: [],
  cancelModel: noop,
}

export default Form.create()(AccSubProfilesForm);
