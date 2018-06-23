import React, { PropTypes } from 'react';
import { Spin, Form, Input, Button, Row, Col, Popover, Select, Icon } from 'antd';
import MiniSubjectPageTable from '../../temp/miniSubjectForm/MiniSubjectPageTable';
import MiniSubjectQueryForm from '../../temp/miniSubjectForm/MiniSubjectQueryForm';
import MiniFormTitle from '../../../../common/MiniFormTitle';
import * as i18n from '../../../../../utils/i18n';
import { callNotice } from '../../../../../utils/alert';

const Option = Select.Option;
const noop = () => { };
const FormItem = Form.Item;
const OpenAccSceneInfoForm = (props) => {
  const bizMap = i18n.bizMap('cas/openAcc');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit,
    tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange,
    toggleSubjectTable, showSubjectTable, changeSubjectVals, querySubjectList,
    cateIdOptionsData, changeSubjectKeys, subjectKeys, subjectVals, type,
  } = props;
  let uuid = subjectKeys.length - 1;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const formItemLayout1 = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        let subjects = '';
        let subject = '';
        for (const k in dat) {
          if (k.indexOf('subject') >= 0) {
            subject = dat[k].split('-')[0];
            subjects += `${subject},`;
            delete dat[k];
          }
        }
        dat.subjects = subjects.substring(0, subjects.length - 1);
        if (dat.subjects && dat.subjects.length === 0) {
          callNotice(commonMap.warning, bizMap.addSubNotice, 'warning');
        }
        formSubmit(dat);
      }
    });
  };
  const toggleSubject = (index) => {
    const data = getFieldsValue();
    data.index = index;
    toggleSubjectTable(data);
  };
  const popoverOncancel = () => {
    const data = getFieldsValue();
    toggleSubjectTable(data);
  };
  const handleReset = () => {
    resetFields();
  }
  const tableProps = {
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    scroll: { y: 240 },
    tablePageChange(next) {
      tablePageChange(next);
    },
    clickCallback(record) {
      const vals = subjectVals;
      vals.splice(data.index, 1, `${record.subject}-${record.subjectNme}`);
      changeSubjectVals(vals);
      popoverOncancel();
    },
  };
  const queryFormProps = {
    formSubmit(dat) {
      querySubjectList(dat);
    },
  };
  const miniFormTitleProps = {
    title: bizMap.popTitle,
    popoverOncancel() {
      popoverOncancel();
    },
  };
  const miniFormTitle = (
    <MiniFormTitle {...miniFormTitleProps} />
  );
  const miniFormContent = [
    <MiniSubjectQueryForm key="query" {...queryFormProps} />,
    <MiniSubjectPageTable key="pageTable" {...tableProps} />,
  ];
  const subjectAfter = index => (
    <Popover title={miniFormTitle} content={miniFormContent} visible={showSubjectTable && data.index === index} cancelText="取消" onCancel={popoverOncancel}>
      <a onClick={() => { toggleSubject(index); }} >{commonMap.select}</a>
    </Popover>
  );
  const subjectAdd = () => {
    if (uuid > 8) {
      callNotice(commonMap.warning, bizMap.addList, 'warning');
      return;
    }
    uuid++;
    const keys = subjectKeys;
    const nextKeys = keys.concat(uuid);
    changeSubjectKeys(nextKeys);
    const vals = subjectVals;
    vals.push('');
    changeSubjectVals(vals);
  }
  const subjectRemove = (k, index) => {
    const keys = subjectKeys;
    if (keys.length === 1) {
      return;
    }
    changeSubjectKeys(keys.filter(key => key !== uuid));
    const vals = subjectVals;
    vals.splice(index, 1);
    changeSubjectVals(vals);
  }
  const subjectFormItems = subjectKeys.map((k, index) => {
    return (
      <Row key={k}>
        <Col span={20}>
          <FormItem label={' '} {...formItemLayout1} >
            {
              getFieldDecorator(`subject${index}`, {
                initialValue: subjectVals[index] ? subjectVals[index] : '',
              })(
                <Input placeholder={bizMap.dSubjectB} readOnly addonAfter={subjectAfter(index)} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={4}>
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => subjectRemove(k, index)}
          />
        </Col>
      </Row>)
  });
  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        {
          type === 'update' ?
            <Row >
              <Col span={24}>
                <FormItem label={bizMap.sceneId} {...formItemLayout}>
                  {
                    getFieldDecorator('sceneId', {
                      initialValue: data.sceneId,
                    })(
                      <Input placeholder={bizMap.sceneId} disabled />,
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
            <FormItem label={bizMap.sceneDesc} {...formItemLayout}>
              {
                getFieldDecorator('sceneDesc', {
                  initialValue: data.sceneDesc,
                })(
                  <Input placeholder={bizMap.sceneDesc} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.accLevel} {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('accLevel', {
                  initialValue: data.accLevel,
                  rules: [{ required: true, message: bizMap.validAccLevel }],
                })(
                  <Select placeholder={commonMap.select} >
                    <Option value="">&nbsp;</Option>
                    <Option value="0">{bizMap['accLevel-0']}</Option>
                    <Option value="1">{bizMap['accLevel-1']}</Option>
                    <Option value="2">{bizMap['accLevel-2']}</Option>
                    <Option value="3">{bizMap['accLevel-3']}</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        {
          getFieldsValue().accLevel && getFieldsValue().accLevel !== '0' ?
            <Row>
              <Col span={24}>
                <FormItem label={bizMap.cateId} {...formItemLayout}>
                  {
                    getFieldDecorator('cateId', {
                      initialValue: data.cateId,
                      rules: [{ required: true, message: bizMap.validCateId }],
                    })(
                      <Select>
                        <Option value="">&nbsp;</Option>
                        {
                          cateIdOptionsData.map((cateIdOption, idx) => {
                            return <Option key={idx} value={cateIdOption.cateId}>{`${cateIdOption.cateId}`}</Option>;
                          })
                        }
                      </Select>,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            :
            null
        }
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={24}>
            <FormItem label={bizMap.subject} {...formItemLayout} required >
              <Button type="dashed" onClick={subjectAdd}>
                <Icon type="plus" /> {bizMap.addSubjectField}
              </Button>
            </FormItem>
          </Col>
        </Row>
        {subjectFormItems}
        <h4 className="split">&nbsp;</h4>
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
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
          </Col>
        </Row>
      </Form>
    </Spin >
  );
}

OpenAccSceneInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  cateIdOptionsData: PropTypes.array,
  showSubjectTable: PropTypes.bool,
  toggleSubjectTable: PropTypes.func,
  changeSubjectVals: PropTypes.func,
  querySubjectList: PropTypes.func,
  subjectKeys: PropTypes.array,
  subjectVals: PropTypes.array,
  changeSubjectKeys: PropTypes.func,
  type: PropTypes.string,
};

OpenAccSceneInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  cateIdOptionsData: [],
  showSubjectTable: false,
  toggleSubjectTable: noop,
  changeSubjectVals: noop,
  querySubjectList: noop,
  subjectKeys: [],
  subjectVals: [],
  changeSubjectKeys: noop,
  type: '',
}

export default Form.create()(OpenAccSceneInfoForm);
