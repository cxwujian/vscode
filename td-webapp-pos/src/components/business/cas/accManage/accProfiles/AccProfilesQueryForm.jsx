import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select, InputNumber, DatePicker, Icon, Modal } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import { yuan2Cent } from '../../../../../utils/currency';
import SubjectCodeQueryForm from '../../temp/subject/SubjectCodeQueryForm';
import SubjectCallBackPageTable from '../../temp/subject/SubjectCallBackPageTable';

const noop = () => { };
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';
const dateFormat1 = 'YYYYMMDD';
const AccProfilesQueryForm = (props) => {
  const bizMap = i18n.bizMap('cas/accProfiles');
  const commonMap = i18n.commonMap();
  const { form, formSubmit, addClick, enableClick, disableClick, advExpand, collapseClick,
    querySubjectList, subjectModalVisible, subjectData, onCancelSubjectModel } = props;
  const { getFieldDecorator, getFieldsValue, validateFields, resetFields, setFieldsValue } = form;
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
        if (dat.regTim && dat.regTim.length > 0) {
          dat.regTimStart = dat.regTim[0].format(dateFormat1);
          dat.regTimEnd = dat.regTim[1].format(dateFormat1);
          delete dat.regTim;
        }
        if (dat.accBalMin) {
          dat.accBalMin = yuan2Cent(dat.accBalMin);
        }
        if (dat.accBalMax) {
          dat.accBalMax = yuan2Cent(dat.accBalMax);
        }
        if (dat.avlAccBalMin) {
          dat.avlAccBalMin = yuan2Cent(dat.avlAccBalMin);
        }
        if (dat.avlAccBalMax) {
          dat.avlAccBalMax = yuan2Cent(dat.avlAccBalMax);
        }
        formSubmit(dat);
      }
    });
  };

  const handleReset = () => {
    resetFields();
  }
  const handQuerySubjectList = () => {
    const data = {};
    data.currentPage = 1;
    data.isFirst = true;
    data.accTyp = getFieldsValue().accTyp;
    data.subSts = '00';
    data.isLastLev = '1';
    querySubjectList(data);
  }
  const subjectInfoModalProps = {
    width: 848,
    footer: null,
    title: bizMap.subjectQueryList,
    visible: subjectModalVisible,
    onCancel: () => {
      onCancelSubjectModel();
    },
  };
  const subjectQueryFormProps = {
    type: 'query',
    accTyp: getFieldsValue().accTyp,
    subSts: '00',
    isLastLev: '1',
    formSubmit: (dat) => {
      const data = dat;
      data.currentPage = 1;
      data.accTyp = getFieldsValue().accTyp;
      querySubjectList(data);
    },
  };
  const subjectTableProps = {
    tableCurrentPage: subjectData.tableCurrentPage,
    tableList: subjectData.tableList,
    tableTotal: subjectData.tableTotal,
    tableLoading: subjectData.tableLoading,
    tablePageChange(next) {
      const param = subjectData.tableParam;
      param.currentPage = next;
      param.accTyp = getFieldsValue().accTyp;
      querySubjectList(param);
    },
    rowClickCallback(data) {
      setFieldsValue({ blgSubject: data.subject })
      onCancelSubjectModel();
    },
  };

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
          <FormItem label={bizMap.actNme} {...formItemLayout}>
            {
              getFieldDecorator('actNme')(<Input placeholder={bizMap.actNme} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.blgSubject} {...formItemLayout}>
            {
              getFieldDecorator('blgSubject')(<Input onClick={handQuerySubjectList} readOnly="true" placeholder={bizMap.blgSubject} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          {subjectModalVisible
            ? <Row>
              <Modal {...subjectInfoModalProps}>
                <SubjectCodeQueryForm {...subjectQueryFormProps} />
                <SubjectCallBackPageTable {...subjectTableProps} />
              </Modal>
            </Row>
            : null
          }
        </Col>
      </Row>
      <Row style={{ display: advExpand ? 'block' : 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.accSts} {...formItemLayout}>
            {
              getFieldDecorator('accSts')(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="00">{bizMap['accSts-00']}</Option>
                  <Option value="01">{bizMap['accSts-01']}</Option>
                  <Option value="02">{bizMap['accSts-02']}</Option>
                  <Option value="03">{bizMap['accSts-03']}</Option>
                </Select>)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.accBal} {...formItemLayout}>
            {
              getFieldDecorator('accBalMin')(<InputNumber placeholder={bizMap.accBal} style={{ width: '47%' }} />)
            }
            {
              getFieldDecorator('accBalMax')(<InputNumber placeholder={bizMap.accBal} style={{ width: '47%' }} />)
            }
          </FormItem>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.avlAccBal} {...formItemLayout}>
            {
              getFieldDecorator('avlAccBalMin')(<InputNumber placeholder={bizMap.avlAccBal} style={{ width: '47%' }} />)
            }
            {
              getFieldDecorator('avlAccBalMax')(<InputNumber placeholder={bizMap.avlAccBal} style={{ width: '47%' }} />)
            }
          </FormItem>
        </Col>
      </Row>
      <Row style={{ display: advExpand ? 'block' : 'none' }}>
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
      <Row>
        <Col sm={24} md={12} style={{ marginBottom: 16 }}>
          <ButtonGroup>
            <Button icon="plus" type="primary" onClick={addClick}>{bizMap.add}</Button>
            <Button style={{ marginLeft: 8 }} icon="check" onClick={enableClick}>{commonMap['status-1']}</Button>
            <Button style={{ marginLeft: 8 }} icon="minus" onClick={disableClick}>{commonMap['status-0']}</Button>
          </ButtonGroup>
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
}

AccProfilesQueryForm.propTypes = {
  formSubmit: PropTypes.func,
  addClick: PropTypes.func,
  enableClick: PropTypes.func,
  disableClick: PropTypes.func,
  advExpand: PropTypes.bool,
  collapseClick: PropTypes.func,
  querySubjectList: PropTypes.func,
  onCancelSubjectModel: PropTypes.func,
};

AccProfilesQueryForm.defaultProps = {
  formSubmit: noop,
  addClick: noop,
  enableClick: noop,
  disableClick: noop,
  advExpand: false,
  collapseClick: noop,
  querySubjectList: noop,
  onCancelSubjectModel: noop,
}

export default Form.create()(AccProfilesQueryForm);
