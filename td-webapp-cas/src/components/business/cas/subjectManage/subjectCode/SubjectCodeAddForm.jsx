import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select, Modal, Icon } from 'antd'; import { } from '../../../../../utils/vaild';
import * as i18n from '../../../../../utils/i18n';

import SubBusIdQueryForm from './SubBusIdQueryForm';
import SubBusIdCallBackPageTable from './SubBusIdCallBackPageTable';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const SubjectCodeAddForm = (props) => {
  const bizMap = i18n.bizMap('cas/subject');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, addFormSubmit, subBusIdModalVisible, onCancelSubBusIdModel, queryBusIdList, subBusInfReset, busData, setFormFieldsValue, ccyOptionsData } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const formItemLayout2 = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        const subjectLev = dat.subjectLev;
        if (subjectLev === '1') {
          dat.subjectNme = dat.subjectNme;
        } else if (subjectLev === '2') {
          dat.subject = `${dat.subjectTwo + data.subject2}`;
          dat.subjectNme = `${data.subjectNme}-${data.busDesc}`;
        } else {
          dat.subject = `${dat.subjectThree + data.subject3}`;
          dat.subjectNme = `${data.subjectNme}-${data.busDesc}`;
        }
        addFormSubmit(dat);
      }
    });
  };

  const infoModalProps = {
    width: 900,
    footer: null,
    title: bizMap.busIdQueryList,
    visible: subBusIdModalVisible,
    onCancel: () => {
      onCancelSubBusIdModel();
    },
  };
  const queryFormProps = {
    subjectLev: data.subjectLev,
    formSubmit: (dat) => {
      queryBusIdList(Object.assign({}, dat, { currentPage: 1 }));
    },
  };

  const tableProps = {
    tableCurrentPage: busData.tableCurrentPage,
    tableList: busData.tableList,
    tableTotal: busData.tableTotal,
    tableLoading: busData.tableLoading,
    tablePageChange(next) {
      const param = busData.tableParam;
      param.currentPage = next;
      queryBusIdList(param);
    },
    rowClickCallback: (dat) => {
      onCancelSubBusIdModel();
      const dataForm = getFieldsValue();
      const tempData = {};
      dataForm.busId = dat.busId;
      dataForm.busDesc = dat.busDesc;
      dataForm.groupId = dat.groupId;
      if (dataForm.subjectLev === '2') {
        dataForm.subject2 = dat.busId;
      } else if (dataForm.subjectLev === '3') {
        dataForm.subject3 = dat.busId;
      }
      tempData.addFormData = dataForm;
      tempData.subBusIdModalVisible = false;
      subBusInfReset(tempData);
    },
  };

  const handShowSubBusId = () => {
    const subjectLev = getFieldsValue().subjectLev;
    if (subjectLev !== '1') {
      const data = {};
      data.busSts = '00';
      queryBusIdList(data);
    }
  }

  const handleReset = () => {
    resetFields();
    const dat = {};
    setFormFieldsValue(dat);
  }

  const subjectValidate = (rule, value, callback) => {
    if (value) {
      if (isNaN(value)) {
        callback(commonMap.amtIsNum);
      }
      if (value.length !== 4) {
        callback(bizMap.validSubjectLength);
        return;
      }
    }
    callback();
  }
  console.log('data==', data)
  //一级科目
  const subjectLev1 = (
    <Row>
      <Col span={18}>
        <FormItem label={bizMap.subject} {...formItemLayout2} required>
          {
            getFieldDecorator('subject', {
              validate: [{
                rules: [
                  { validator: subjectValidate },
                ], trigger: 'onBlur',
              }],
            })(
              <Input placeholder={bizMap.subject} />,
            )
          }
        </FormItem>
      </Col>
      <Col span={6}>
        <FormItem>
          <Icon type="info-circle" style={{ color: '#99B6DD', fontSize: '14px' }} /> <span style={{ color: '#FF0000' }} maxLength="4">{bizMap.validSubjectLength}</span>
        </FormItem>
      </Col>
    </Row>
  );

  //二级科目
  const subjectLev2 = (
    <Row>
      <Col span={18}>
        <FormItem label={bizMap.subject} {...formItemLayout2} required>
          {
            getFieldDecorator('subjectTwo', {
              initialValue: data.subject2,
              rules: [{ required: true, message: bizMap.validSubject }],
            })(
              <Input placeholder={bizMap.subject} addonBefore={data.subjectTwo} onClick={handShowSubBusId} />,
            )
          }
          <div hidden>
            {
              getFieldDecorator('subjectTwo', {
                initialValue: data.subjectTwo,
              })(
                <Input hidden />,
              )
            }
          </div>
        </FormItem>
      </Col>
    </Row>
  );

  //三级科目
  const subjectLev3 = (
    <Row>
      <Col span={18}>
        <FormItem label={bizMap.subject} {...formItemLayout2} required >
          {
            getFieldDecorator('subjectThree', {
              initialValue: data.subject3,
              rules: [{ required: true, message: bizMap.validSubject }],
            })(
              <Input placeholder={bizMap.subject} addonBefore={data.subjectThree} onClick={handShowSubBusId} />,
            )
          }
          <div hidden>
            {
              getFieldDecorator('subjectThree', {
                initialValue: data.subjectThree,
              })(
                <Input hidden />,
              )
            }
          </div>
        </FormItem>
      </Col>
    </Row>
  );

  //一级科目名称
  const subjectNme1 = (
    <Row>
      <Col span={24}>
        <FormItem label={bizMap.subjectNme} {...formItemLayout} >
          {
            getFieldDecorator('subjectNme', {
              rules: [{ required: true, message: bizMap.validSubjectNme }],
            })(
              <Input placeholder={bizMap.subjectNme} />,
            )
          }
        </FormItem>
      </Col>
    </Row>
  );

  //二级科目名称
  const subjectNme2 = (
    <Row>
      <Col span={24}>
        <FormItem label={bizMap.subjectNme} {...formItemLayout} >
          {
            getFieldDecorator('subjectNme', {
              initialValue: data.busDesc,
              rules: [{ required: true, message: bizMap.validSubjectNme }],
            })(
              <Input placeholder={bizMap.subjectNme} addonBefore={data.subjectNme} />,
            )
          }
          <div hidden>
            {
              getFieldDecorator('subjectNme', {
                initialValue: data.subjectNme,
              })(
                <Input hidden />,
              )
            }
          </div>
        </FormItem>
      </Col>
    </Row>
  );

  //三级科目名称
  const subjectNme3 = (
    <Row>
      <Col span={24}>
        <FormItem label={bizMap.subjectNme} {...formItemLayout} >
          {
            getFieldDecorator('subjectNme', {
              initialValue: data.busDesc,
              rules: [{ required: true, message: bizMap.validSubjectNme }],
            })(
              <Input placeholder={bizMap.subjectNme} addonBefore={data.subjectNme} />,
            )
          }
          <div hidden>
            {
              getFieldDecorator('subjectNme', {
                initialValue: data.subjectNme,
              })(
                <Input hidden />,
              )
            }
          </div>
        </FormItem>
      </Col>
    </Row>
  );

  return (
    <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
      <dic hidden>
        {
          getFieldDecorator('groupId', {
            initialValue: data.groupId,
          })(
            <Input hidden />,
          )
        }
      </dic>
      <dic hidden>
        {
          getFieldDecorator('busId', {
            initialValue: data.busId,
          })(
            <Input hidden />,
          )
        }
      </dic>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.accTyp} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('accTyp', {
                initialValue: data.accTyp,
                rules: [{ required: true, message: bizMap.validAccTyp }],
              })(
                <Select placeholder={commonMap.select} disabled={data.subjectLev !== '1'} >
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
          <FormItem label={bizMap.subjectLev} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('subjectLev', {
                initialValue: data.subjectLev,
                rules: [{ required: true, message: bizMap.validSubjectLev }],
              })(
                <Select placeholder={commonMap.select} readOnly="true" disabled>
                  <Option value="">&nbsp;</Option>
                  <Option value="1">{bizMap['subjectLev-1']}</Option>
                  <Option value="2">{bizMap['subjectLev-2']}</Option>
                  <Option value="3">{bizMap['subjectLev-3']}</Option>
                </Select>,
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
                rules: [{ required: true, message: bizMap.validCcy }],
              })(
                <Select disabled={data.subjectLev !== '1'} >
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
        <Col span={24}>
          <FormItem label={bizMap.subTyp} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('subTyp', {
                initialValue: data.subTyp,
                rules: [{ required: true, message: bizMap.validSubTyp }],
              })(
                <Select placeholder={commonMap.subTyp}>
                  <Option value="">&nbsp;</Option>
                  <Option value="CUS">{bizMap['subTyp-CUS']}</Option>
                  <Option value="PLAT">{bizMap['subTyp-PLAT']}</Option>
                  <Option value="CHN">{bizMap['subTyp-CHN']}</Option>
                  <Option value="BANK">{bizMap['subTyp-BANK']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      {
        data.subjectLev === '1' ? subjectLev1 : null
      }
      {
        data.subjectLev === '2' ? subjectLev2 : null
      }
      {
        data.subjectLev === '3' ? subjectLev3 : null
      }
      {subBusIdModalVisible
        ? <Row>
          <Modal {...infoModalProps}>
            <SubBusIdQueryForm {...queryFormProps} />
            <SubBusIdCallBackPageTable {...tableProps} />
          </Modal>
        </Row>
        : null
      }
      {
        data.subjectLev === '1' ? subjectNme1 : null
      }
      {
        data.subjectLev === '2' ? subjectNme2 : null
      }
      {
        data.subjectLev === '3' ? subjectNme3 : null
      }
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.remark} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('remark', {
                initialValue: data.remark,
                rules: [{ required: false }],
              })(
                <Input placeholder={bizMap.remark} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
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

SubjectCodeAddForm.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  addFormSubmit: PropTypes.func,
  subBusIdModalVisible: PropTypes.func,
  onCancelSubBusIdModel: PropTypes.func,
  queryBusIdList: PropTypes.func,
  subBusInfReset: PropTypes.func,
  setFormFieldsValue: PropTypes.func,
  ccyOptionsData: PropTypes.array,
};

SubjectCodeAddForm.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  addFormSubmit: noop,
  subBusIdModalVisible: noop,
  onCancelSubBusIdModel: noop,
  queryBusIdList: noop,
  subBusInfReset: noop,
  setFormFieldsValue: noop,
  ccyOptionsData: [],
}

export default Form.create()(SubjectCodeAddForm);
