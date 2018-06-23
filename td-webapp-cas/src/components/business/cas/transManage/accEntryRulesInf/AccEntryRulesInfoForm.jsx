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
let uuid = 0;
let cUuid = 0;
const AccEntryRulesInfoForm = (props) => {
  const bizMap = i18n.bizMap('cas/accEntryRulesInf');
  const commonMap = i18n.commonMap();
  const { form, data, loading, submiting, formSubmit,
    tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange,
    toggleSubjectTable, showSubjectTable, rowClickCallback, querySubjectList,
    ccyOptionsData, amtRulOptionsData,
    dSubjectKeys, cSubjectKeys, changeDSubjectKeys, changeCSubjectKeys, changeFormValue,
  } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 20 },
  };
  const formItemLayout1 = {
    labelCol: { span: 12 },
    wrapperCol: { span: 22 },
  };
  const formItemLayout2 = {
    labelCol: { span: 12 },
    wrapperCol: { span: 15 },
  };
  const formItemLayout3 = {
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
        let dAmtRulA = '';
        let dAmtRulB = '';
        let dAmtRulC = '';
        let dAmtRulD = '';
        let dAmtRulE = '';
        let cAmtRulA = '';
        let cAmtRulB = '';
        let cAmtRulC = '';
        let cAmtRulD = '';
        let cAmtRulE = '';
        if (dat.dAmtRulA0) {
          dAmtRulA += `\${${dat.dAmtRulA0}}`;
          if (dat.dAmtRulAOpt0 && dat.dAmtRulA1) {
            dAmtRulA += `${dat.dAmtRulAOpt0}\${${dat.dAmtRulA1}}`;
          }
          if (dat.dAmtRulAOpt1 && dat.dAmtRulA2) {
            dAmtRulA += `${dat.dAmtRulAOpt1}\${${dat.dAmtRulA2}}`;
          }
        }
        if (dat.dAmtRulB0) {
          dAmtRulB += `\${${dat.dAmtRulB0}}`;
          if (dat.dAmtRulBOpt0 && dat.dAmtRulB1) {
            dAmtRulB += `${dat.dAmtRulBOpt0}\${${dat.dAmtRulB1}}`;
          }
          if (dat.dAmtRulBOpt1 && dat.dAmtRulB2) {
            dAmtRulB += `${dat.dAmtRulBOpt1}\${${dat.dAmtRulB2}}`;
          }
        }
        if (dat.dAmtRulC0) {
          dAmtRulC += `\${${dat.dAmtRulC0}}`;
          if (dat.dAmtRulCOpt0 && dat.dAmtRulC1) {
            dAmtRulC += `${dat.dAmtRulCOpt0}\${${dat.dAmtRulC1}}`;
          }
          if (dat.dAmtRulCOpt1 && dat.dAmtRulC2) {
            dAmtRulC += `${dat.dAmtRulCOpt1}\${${dat.dAmtRulC2}}`;
          }
        }
        if (dat.dAmtRulD0) {
          dAmtRulD += `\${${dat.dAmtRulD0}}`;
          if (dat.dAmtRulDOpt0 && dat.dAmtRulD1) {
            dAmtRulD += `${dat.dAmtRulDOpt0}\${${dat.dAmtRulD1}}`;
          }
          if (dat.dAmtRulDOpt1 && dat.dAmtRulD2) {
            dAmtRulD += `${dat.dAmtRulDOpt1}\${${dat.dAmtRulD2}}`;
          }
        }
        if (dat.dAmtRulE0) {
          dAmtRulE += `\${${dat.dAmtRulE0}}`;
          if (dat.dAmtRulEOpt0 && dat.dAmtRulE1) {
            dAmtRulE += `${dat.dAmtRulEOpt0}\${${dat.dAmtRulE1}}`;
          }
          if (dat.dAmtRulEOpt1 && dat.dAmtRulE2) {
            dAmtRulE += `${dat.dAmtRulEOpt1}\${${dat.dAmtRulE2}}`;
          }
        }
        if (dat.cAmtRulA0) {
          cAmtRulA += `\${${dat.cAmtRulA0}}`;
          if (dat.cAmtRulAOpt0 && dat.cAmtRulA1) {
            cAmtRulA += `${dat.cAmtRulAOpt0}\${${dat.cAmtRulA1}}`;
          }
          if (dat.cAmtRulAOpt1 && dat.cAmtRulA2) {
            cAmtRulA += `${dat.cAmtRulAOpt1}\${${dat.cAmtRulA2}}`;
          }
        }
        if (dat.cAmtRulB0) {
          cAmtRulB += `\${${dat.cAmtRulB0}}`;
          if (dat.cAmtRulBOpt0 && dat.cAmtRulB1) {
            cAmtRulB += `${dat.cAmtRulBOpt0}\${${dat.cAmtRulB1}}`;
          }
          if (dat.cAmtRulBOpt1 && dat.cAmtRulB2) {
            cAmtRulB += `${dat.cAmtRulBOpt1}\${${dat.cAmtRulB2}}`;
          }
        }
        if (dat.cAmtRulC0) {
          cAmtRulC += `\${${dat.cAmtRulC0}}`;
          if (dat.cAmtRulCOpt0 && dat.cAmtRulC1) {
            cAmtRulC += `${dat.cAmtRulCOpt0}\${${dat.cAmtRulC1}}`;
          }
          if (dat.cAmtRulCOpt1 && dat.cAmtRulC2) {
            cAmtRulC += `${dat.cAmtRulCOpt1}\${${dat.cAmtRulC2}}`;
          }
        }
        if (dat.cAmtRulD0) {
          cAmtRulD += `\${${dat.cAmtRulD0}}`;
          if (dat.cAmtRulDOpt0 && dat.cAmtRulD1) {
            cAmtRulD += `${dat.cAmtRulDOpt0}\${${dat.cAmtRulD1}}`;
          }
          if (dat.cAmtRulDOpt1 && dat.cAmtRulD2) {
            cAmtRulD += `${dat.cAmtRulDOpt1}\${${dat.cAmtRulD2}}`;
          }
        }
        if (dat.cAmtRulE0) {
          cAmtRulE += `\${${dat.cAmtRulE0}}`;
          if (dat.cAmtRulEOpt0 && dat.cAmtRulE1) {
            cAmtRulE += `${dat.cAmtRulEOpt0}\${${dat.cAmtRulE1}}`;
          }
          if (dat.cAmtRulEOpt1 && dat.cAmtRulE2) {
            cAmtRulE += `${dat.cAmtRulEOpt1}\${${dat.cAmtRulE2}}`;
          }
        }
        dat.dAmtRulA = dAmtRulA;
        dat.dAmtRulB = dAmtRulB;
        dat.dAmtRulC = dAmtRulC;
        dat.dAmtRulD = dAmtRulD;
        dat.dAmtRulE = dAmtRulE;
        dat.cAmtRulA = cAmtRulA;
        dat.cAmtRulB = cAmtRulB;
        dat.cAmtRulC = cAmtRulC;
        dat.cAmtRulD = cAmtRulD;
        dat.cAmtRulE = cAmtRulE;
        if (dat.dSubjectA) {
          dat.dSubjectA = dat.dSubjectA.split('-')[0];
        }
        if (dat.dSubjectB) {
          dat.dSubjectB = dat.dSubjectB.split('-')[0];
        }
        if (dat.dSubjectC) {
          dat.dSubjectC = dat.dSubjectC.split('-')[0];
        }
        if (dat.dSubjectD) {
          dat.dSubjectD = dat.dSubjectD.split('-')[0];
        }
        if (dat.dSubjectE) {
          dat.dSubjectE = dat.dSubjectE.split('-')[0];
        }
        if (dat.cSubjectA) {
          dat.cSubjectA = dat.cSubjectA.split('-')[0];
        }
        if (dat.cSubjectB) {
          dat.cSubjectB = dat.cSubjectB.split('-')[0];
        }
        if (dat.cSubjectC) {
          dat.cSubjectC = dat.cSubjectC.split('-')[0];
        }
        if (dat.cSubjectD) {
          dat.cSubjectD = dat.cSubjectD.split('-')[0];
        }
        if (dat.cSubjectE) {
          dat.cSubjectE = dat.cSubjectE.split('-')[0];
        }
        formSubmit(dat);
      }
    });
  };
  const toggleSubject = (subLetter) => {
    const data = getFieldsValue();
    data.subjectLetter = subLetter;
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
      const dat = data;
      if (dat.subjectLetter === 'dSubjectA') {
        if (record.subTyp === 'CUS') {
          dat.dNumberA = 'payCusIdA';
        } else if (record.subTyp === 'CHN') {
          dat.dNumberA = 'payChnCodA';
        }
        dat.dSubjectA = `${record.subject}-${record.subjectNme}`;
      } else if (dat.subjectLetter === 'dSubjectB') {
        if (record.subTyp === 'CUS') {
          dat.dNumberB = 'payCusIdB';
        } else if (record.subTyp === 'CHN') {
          dat.dNumberB = 'payChnCodB';
        }
        dat.dSubjectB = `${record.subject}-${record.subjectNme}`;
      } else if (dat.subjectLetter === 'dSubjectC') {
        if (record.subTyp === 'CUS') {
          dat.dNumberC = 'payCusIdC';
        } else if (record.subTyp === 'CHN') {
          dat.dNumberC = 'payChnCodC';
        }
        dat.dSubjectC = `${record.subject}-${record.subjectNme}`;
      } else if (dat.subjectLetter === 'dSubjectD') {
        if (record.subTyp === 'CUS') {
          dat.dNumberD = 'payCusIdD';
        } else if (record.subTyp === 'CHN') {
          dat.dNumberD = 'payChnCodD';
        }
        dat.dSubjectD = `${record.subject}-${record.subjectNme}`;
      } else if (dat.subjectLetter === 'dSubjectE') {
        if (record.subTyp === 'CUS') {
          dat.dNumberE = 'payCusIdE';
        } else if (record.subTyp === 'CHN') {
          dat.dNumberE = 'payChnCodE';
        }
        dat.dSubjectE = `${record.subject}-${record.subjectNme}`;
      } else if (dat.subjectLetter === 'cSubjectA') {
        if (record.subTyp === 'CUS') {
          dat.cNumberA = 'pyeCusIdA';
        } else if (record.subTyp === 'CHN') {
          dat.cNumberA = 'pyeChnCodA';
        }
        dat.cSubjectA = `${record.subject}-${record.subjectNme}`;
      } else if (dat.subjectLetter === 'cSubjectB') {
        if (record.subTyp === 'CUS') {
          dat.cNumberB = 'pyeCusIdB';
        } else if (record.subTyp === 'CHN') {
          dat.cNumberB = 'pyeChnCodB';
        }
        dat.cSubjectB = `${record.subject}-${record.subjectNme}`;
      } else if (dat.subjectLetter === 'cSubjectC') {
        if (record.subTyp === 'CUS') {
          dat.cNumberC = 'pyeCusIdC';
        } else if (record.subTyp === 'CHN') {
          dat.cNumberC = 'pyeChnCodC';
        }
        dat.cSubjectC = `${record.subject}-${record.subjectNme}`;
      } else if (dat.subjectLetter === 'cSubjectD') {
        if (record.subTyp === 'CUS') {
          dat.cNumberD = 'pyeCusIdD';
        } else if (record.subTyp === 'CHN') {
          dat.cNumberD = 'pyeChnCodD';
        }
        dat.cSubjectD = `${record.subject}-${record.subjectNme}`;
      } else if (dat.subjectLetter === 'cSubjectE') {
        if (record.subTyp === 'CUS') {
          dat.cNumberE = 'pyeCusIdE';
        } else if (record.subTyp === 'CHN') {
          dat.cNumberE = 'pyeChnCodE';
        }
        dat.cSubjectE = `${record.subject}-${record.subjectNme}`;
      }
      rowClickCallback(dat);
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
  const subjectAfterA = (
    <Popover title={miniFormTitle} content={miniFormContent} visible={showSubjectTable && data.subjectLetter === 'dSubjectA'} cancelText="取消" onCancel={popoverOncancel}>
      <a onClick={() => { toggleSubject('dSubjectA'); }} >{commonMap.select}</a>
    </Popover>
  );
  const cSubjectAfterA = (
    <Popover title={miniFormTitle} content={miniFormContent} visible={showSubjectTable && data.subjectLetter === 'cSubjectA'}>
      <a onClick={() => { toggleSubject('cSubjectA'); }} >{commonMap.select}</a>
    </Popover>
  );
  const subjectAfterB = (
    <Popover title={miniFormTitle} content={miniFormContent} visible={showSubjectTable && data.subjectLetter === 'dSubjectB'}>
      <a onClick={() => { toggleSubject('dSubjectB'); }} >{commonMap.select}</a>
    </Popover>
  );
  const cSubjectAfterB = (
    <Popover title={miniFormTitle} content={miniFormContent} visible={showSubjectTable && data.subjectLetter === 'cSubjectB'}>
      <a onClick={() => { toggleSubject('cSubjectB'); }} >{commonMap.select}</a>
    </Popover>
  );
  const subjectAfterC = (
    <Popover title={miniFormTitle} content={miniFormContent} visible={showSubjectTable && data.subjectLetter === 'dSubjectC'}>
      <a onClick={() => { toggleSubject('dSubjectC'); }} >{commonMap.select}</a>
    </Popover>
  );
  const cSubjectAfterC = (
    <Popover title={miniFormTitle} content={miniFormContent} visible={showSubjectTable && data.subjectLetter === 'cSubjectC'}>
      <a onClick={() => { toggleSubject('cSubjectC'); }} >{commonMap.select}</a>
    </Popover>
  );
  const subjectAfterD = (
    <Popover title={miniFormTitle} content={miniFormContent} visible={showSubjectTable && data.subjectLetter === 'dSubjectD'}>
      <a onClick={() => { toggleSubject('dSubjectD'); }} >{commonMap.select}</a>
    </Popover>
  );
  const cSubjectAfterD = (
    <Popover title={miniFormTitle} content={miniFormContent} visible={showSubjectTable && data.subjectLetter === 'cSubjectD'}>
      <a onClick={() => { toggleSubject('cSubjectD'); }} >{commonMap.select}</a>
    </Popover>
  );
  const subjectAfterE = (
    <Popover title={miniFormTitle} content={miniFormContent} visible={showSubjectTable && data.subjectLetter === 'dSubjectE'}>
      <a onClick={() => { toggleSubject('dSubjectE'); }} >{commonMap.select}</a>
    </Popover>
  );
  const cSubjectAfterE = (
    <Popover title={miniFormTitle} content={miniFormContent} visible={showSubjectTable && data.subjectLetter === 'cSubjectE'}>
      <a onClick={() => { toggleSubject('cSubjectE'); }} >{commonMap.select}</a>
    </Popover>
  );
  const dSubjectAdd = () => {
    if (uuid > 3) {
      callNotice(commonMap.warning, bizMap.addList, 'warning');
      return;
    }
    uuid++;
    const keys = dSubjectKeys;
    const nextKeys = keys.concat(uuid);
    changeDSubjectKeys(nextKeys)
  }
  const dSubjectRemove = () => {
    const keys = dSubjectKeys;
    if (keys.length === 1) {
      return;
    }
    changeDSubjectKeys(keys.filter(key => key !== uuid))
    uuid--;
  }
  const dAmtRulA1OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().dAmtRulA0) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.dAmtRuleA1 = '';
      changeFormValue(dat);
    }
  }
  const dAmtRulA2OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().dAmtRulA0 || option.props.children === getFieldsValue().dAmtRulA1) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.dAmtRuleA2 = '';
      changeFormValue(dat);
    }
  }
  const dAmtRulB1OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().dAmtRulB0) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.dAmtRuleB1 = '';
      changeFormValue(dat);
    }
  }
  const dAmtRulB2OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().dAmtRulB0 || option.props.children === getFieldsValue().dAmtRulB1) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.dAmtRuleB2 = '';
      changeFormValue(dat);
    }
  }
  const dAmtRulC1OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().dAmtRulC0) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.dAmtRuleC1 = '';
      changeFormValue(dat);
    }
  }
  const dAmtRulC2OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().dAmtRulC0 || option.props.children === getFieldsValue().dAmtRulC1) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.dAmtRuleC2 = '';
      changeFormValue(dat);
    }
  }
  const dAmtRulD1OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().dAmtRulD0) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.dAmtRuleD1 = '';
      changeFormValue(dat);
    }
  }
  const dAmtRulD2OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().dAmtRulD0 || option.props.children === getFieldsValue().dAmtRulD1) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.dAmtRuleD2 = '';
      changeFormValue(dat);
    }
  }
  const dAmtRulE1OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().dAmtRulE0) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.dAmtRuleE1 = '';
      changeFormValue(dat);
    }
  }
  const dAmtRulE2OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().dAmtRulE0 || option.props.children === getFieldsValue().dAmtRulE1) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.dAmtRuleE2 = '';
      changeFormValue(dat);
    }
  }
  const cAmtRulA1OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().cAmtRulA0) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.cAmtRuleA1 = '';
      changeFormValue(dat);
    }
  }
  const cAmtRulA2OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().cAmtRulA0 || option.props.children === getFieldsValue().cAmtRulA1) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.cAmtRuleA2 = '';
      changeFormValue(dat);
    }
  }
  const cAmtRulB1OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().cAmtRulB0) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.cAmtRuleB1 = '';
      changeFormValue(dat);
    }
  }
  const cAmtRulB2OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().cAmtRulB0 || option.props.children === getFieldsValue().cAmtRulB1) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.cAmtRuleB2 = '';
      changeFormValue(dat);
    }
  }
  const cAmtRulC1OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().cAmtRulC0) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.cAmtRuleC1 = '';
      changeFormValue(dat);
    }
  }
  const cAmtRulC2OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().cAmtRulC0 || option.props.children === getFieldsValue().cAmtRulC1) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.cAmtRuleC2 = '';
      changeFormValue(dat);
    }
  }
  const cAmtRulD1OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().cAmtRulD0) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.cAmtRuleD1 = '';
      changeFormValue(dat);
    }
  }
  const cAmtRulD2OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().cAmtRulD0 || option.props.children === getFieldsValue().cAmtRulD1) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.cAmtRuleD2 = '';
      changeFormValue(dat);
    }
  }
  const cAmtRulE1OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().cAmtRulE0) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.cAmtRuleE1 = '';
      changeFormValue(dat);
    }
  }
  const cAmtRulE2OnSelect = (value, option) => {
    if (option.props.children === getFieldsValue().cAmtRulE0 || option.props.children === getFieldsValue().cAmtRulE1) {
      callNotice(commonMap.warning, bizMap.amtRuleNotice, 'warning');
      const dat = getFieldsValue();
      resetFields();
      dat.cAmtRuleE2 = '';
      changeFormValue(dat);
    }
  }
  const dSubjectFormItems = dSubjectKeys.map((k, index) => {
    return (
      index === 1 ?
        (<Row key={k}>
          <Col span={7}>
            <FormItem label={bizMap.dSubjectB} {...formItemLayout1} >
              {
                getFieldDecorator('dSubjectB', {
                  initialValue: data.dSubjectB,
                  rules: [{ required: true, message: bizMap.validEmpty }],
                })(
                  <Input placeholder={bizMap.dSubjectB} readOnly addonAfter={subjectAfterB} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem label={bizMap.dNumberB} {...formItemLayout2} >
              {
                getFieldDecorator('dNumberB', {
                  initialValue: data.dNumberB,
                })(
                  <Input placeholder={bizMap.dNumberB} disabled />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.dAmtRulB} {...formItemLayout3} >
              &nbsp;
            </FormItem>
            <div style={{ marginTop: -12 }} >
              {
                getFieldDecorator('dAmtRulB0', {
                  initialValue: data.dAmtRulB0,
                })(
                  <Select style={{ width: 100 }}>
                    <Option value="">&nbsp;</Option>

                    {
                      amtRulOptionsData.map((amtRulOption, idx) => {
                        return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                      })
                    }
                  </Select>,
                )
              }
              {
                getFieldsValue().dAmtRulB0 ?
                  getFieldDecorator('dAmtRulBOpt0', {
                    initialValue: data.dAmtRulBOpt0,
                  })(
                    <Select style={{ width: 50 }}>
                      <Option value="">&nbsp;</Option>
                      <Option value="+">+</Option>
                      <Option value="-">-</Option>
                    </Select>,
                  )
                  :
                  null
              }
              {
                getFieldsValue().dAmtRulB0 && getFieldsValue().dAmtRulBOpt0 ?
                  getFieldDecorator('dAmtRulB1', {
                    initialValue: data.dAmtRulB1,
                  })(
                    <Select style={{ width: 100 }} onSelect={(value, option) => dAmtRulB1OnSelect(value, option)}>
                      <Option value="">&nbsp;</Option>

                      {
                        amtRulOptionsData.map((amtRulOption, idx) => {
                          return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                        })
                      }
                    </Select>,
                  )
                  :
                  null
              }
              {
                getFieldsValue().dAmtRulB0 && getFieldsValue().dAmtRulBOpt0 && getFieldsValue().dAmtRulB1 ?
                  getFieldDecorator('dAmtRulBOpt1', {
                    initialValue: data.dAmtRulBOpt1,
                  })(
                    <Select style={{ width: 50 }}>
                      <Option value="">&nbsp;</Option>
                      <Option value="+">+</Option>
                      <Option value="-">-</Option>
                    </Select>,
                  )
                  :
                  null
              }
              {
                getFieldsValue().dAmtRulB0 && getFieldsValue().dAmtRulBOpt0 && getFieldsValue().dAmtRulB1 && getFieldsValue().dAmtRulBOpt1 ?
                  getFieldDecorator('dAmtRulB2', {
                    initialValue: data.dAmtRulB2,
                  })(
                    <Select style={{ width: 100 }} onSelect={(value, option) => dAmtRulB2OnSelect(value, option)}>
                      <Option value="">&nbsp;</Option>

                      {
                        amtRulOptionsData.map((amtRulOption, idx) => {
                          return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                        })
                      }
                    </Select>,
                  )
                  :
                  null
              }
            </div>
          </Col>
        </Row>)
        : (
          index === 2 ?
            <Row key={k}>
              <Col span={7}>
                <FormItem label={bizMap.dSubjectC} {...formItemLayout1} >
                  {
                    getFieldDecorator('dSubjectC', {
                      initialValue: data.dSubjectC,
                      rules: [{ required: true, message: bizMap.validEmpty }],
                    })(
                      <Input placeholder={bizMap.dSubjectC} readOnly addonAfter={subjectAfterC} />,
                    )
                  }
                </FormItem>
              </Col>
              <Col span={5}>
                <FormItem label={bizMap.dNumberC} {...formItemLayout2} >
                  {
                    getFieldDecorator('dNumberC', {
                      initialValue: data.dNumberC,
                    })(
                      <Input placeholder={bizMap.dNumberC} disabled />,
                    )
                  }
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label={bizMap.dAmtRulC} {...formItemLayout3} >
                  &nbsp;
                </FormItem>
                <div style={{ marginTop: -12 }}>
                  {
                    getFieldDecorator('dAmtRulC0', {
                      initialValue: data.dAmtRulC0,
                    })(
                      <Select style={{ width: 100 }}>
                        <Option value="">&nbsp;</Option>

                        {
                          amtRulOptionsData.map((amtRulOption, idx) => {
                            return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                          })
                        }
                      </Select>,
                    )
                  }
                  {
                    getFieldsValue().dAmtRulC0 ?
                      getFieldDecorator('dAmtRulCOpt0', {
                        initialValue: data.dAmtRulCOpt0,
                      })(
                        <Select style={{ width: 50 }}>
                          <Option value="">&nbsp;</Option>
                          <Option value="+">+</Option>
                          <Option value="-">-</Option>
                        </Select>,
                      )
                      :
                      null
                  }
                  {
                    getFieldsValue().dAmtRulC0 && getFieldsValue().dAmtRulCOpt0 ?
                      getFieldDecorator('dAmtRulC1', {
                        initialValue: data.dAmtRulC1,
                      })(
                        <Select style={{ width: 100 }} onSelect={(value, option) => dAmtRulC1OnSelect(value, option)}>
                          <Option value="">&nbsp;</Option>

                          {
                            amtRulOptionsData.map((amtRulOption, idx) => {
                              return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                            })
                          }
                        </Select>,
                      )
                      :
                      null
                  }
                  {
                    getFieldsValue().dAmtRulC0 && getFieldsValue().dAmtRulCOpt0 && getFieldsValue().dAmtRulC1 ?
                      getFieldDecorator('dAmtRulCOpt1', {
                        initialValue: data.dAmtRulCOpt1,
                      })(
                        <Select style={{ width: 50 }}>
                          <Option value="">&nbsp;</Option>
                          <Option value="+">+</Option>
                          <Option value="-">-</Option>
                        </Select>,
                      )
                      :
                      null
                  }
                  {
                    getFieldsValue().dAmtRulC0 && getFieldsValue().dAmtRulCOpt0 && getFieldsValue().dAmtRulC1 && getFieldsValue().dAmtRulCOpt1 ?
                      getFieldDecorator('dAmtRulC2', {
                        initialValue: data.dAmtRulC2,
                      })(
                        <Select style={{ width: 100 }} onSelect={(value, option) => dAmtRulC2OnSelect(value, option)}>
                          <Option value="">&nbsp;</Option>

                          {
                            amtRulOptionsData.map((amtRulOption, idx) => {
                              return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                            })
                          }
                        </Select>,
                      )
                      :
                      null
                  }
                </div>
              </Col>
            </Row>
            : (
              index === 3 ?
                <Row key={k}>
                  <Col span={7}>
                    <FormItem label={bizMap.dSubjectD} {...formItemLayout1} >
                      {
                        getFieldDecorator('dSubjectD', {
                          initialValue: data.dSubjectD,
                          rules: [{ required: true, message: bizMap.validEmpty }],
                        })(
                          <Input placeholder={bizMap.dSubjectD} readOnly addonAfter={subjectAfterD} />,
                        )
                      }
                    </FormItem>
                  </Col>
                  <Col span={5}>
                    <FormItem label={bizMap.dNumberD} {...formItemLayout2} >
                      {
                        getFieldDecorator('dNumberD', {
                          initialValue: data.dNumberD,
                        })(
                          <Input placeholder={bizMap.dNumberD} disabled />,
                        )
                      }
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label={bizMap.dAmtRulD} {...formItemLayout3} >
                      &nbsp;
                    </FormItem>
                    <div style={{ marginTop: -12 }}>
                      {
                        getFieldDecorator('dAmtRulD0', {
                          initialValue: data.dAmtRulD0,
                        })(
                          <Select style={{ width: 100 }}>
                            <Option value="">&nbsp;</Option>

                            {
                              amtRulOptionsData.map((amtRulOption, idx) => {
                                return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                              })
                            }
                          </Select>,
                        )
                      }
                      {
                        getFieldsValue().dAmtRulD0 ?
                          getFieldDecorator('dAmtRulDOpt0', {
                            initialValue: data.dAmtRulDOpt0,
                          })(
                            <Select style={{ width: 50 }}>
                              <Option value="">&nbsp;</Option>
                              <Option value="+">+</Option>
                              <Option value="-">-</Option>
                            </Select>,
                          )
                          :
                          null
                      }
                      {
                        getFieldsValue().dAmtRulD0 && getFieldsValue().dAmtRulDOpt0 ?
                          getFieldDecorator('dAmtRulD1', {
                            initialValue: data.dAmtRulD1,
                          })(
                            <Select style={{ width: 100 }} onSelect={(value, option) => dAmtRulD1OnSelect(value, option)}>
                              <Option value="">&nbsp;</Option>

                              {
                                amtRulOptionsData.map((amtRulOption, idx) => {
                                  return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                                })
                              }
                            </Select>,
                          )
                          :
                          null
                      }
                      {
                        getFieldsValue().dAmtRulD0 && getFieldsValue().dAmtRulDOpt0 && getFieldsValue().dAmtRulD1 ?
                          getFieldDecorator('dAmtRulDOpt1', {
                            initialValue: data.dAmtRulDOpt1,
                          })(
                            <Select style={{ width: 50 }}>
                              <Option value="">&nbsp;</Option>
                              <Option value="+">+</Option>
                              <Option value="-">-</Option>
                            </Select>,
                          )
                          :
                          null
                      }
                      {
                        getFieldsValue().dAmtRulD0 && getFieldsValue().dAmtRulDOpt0 && getFieldsValue().dAmtRulD1 && getFieldsValue().dAmtRulDOpt1 ?
                          getFieldDecorator('dAmtRulD2', {
                            initialValue: data.dAmtRulD2,
                          })(
                            <Select style={{ width: 100 }} onSelect={(value, option) => dAmtRulD2OnSelect(value, option)}>
                              <Option value="">&nbsp;</Option>

                              {
                                amtRulOptionsData.map((amtRulOption, idx) => {
                                  return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                                })
                              }
                            </Select>,
                          )
                          :
                          null
                      }
                    </div>
                  </Col>
                </Row>
                :
                (index === 4 ?
                  <Row key={k}>
                    <Col span={7}>
                      <FormItem label={bizMap.dSubjectE} {...formItemLayout1} >
                        {
                          getFieldDecorator('dSubjectE', {
                            initialValue: data.dSubjectE,
                            rules: [{ required: true, message: bizMap.validEmpty }],
                          })(
                            <Input placeholder={bizMap.dSubjectE} readOnly addonAfter={subjectAfterE} />,
                          )
                        }
                      </FormItem>
                    </Col>
                    <Col span={5}>
                      <FormItem label={bizMap.dNumberE} {...formItemLayout2} >
                        {
                          getFieldDecorator('dNumberE', {
                            initialValue: data.dNumberE,
                          })(
                            <Input placeholder={bizMap.dNumberE} disabled />,
                          )
                        }
                      </FormItem>
                    </Col>
                    <Col span={12}>
                      <FormItem label={bizMap.dAmtRulE} {...formItemLayout3} >
                        &nbsp;
                      </FormItem>
                      <div style={{ marginTop: -12 }}>
                        {
                          getFieldDecorator('dAmtRulE0', {
                            initialValue: data.dAmtRulE0,
                          })(
                            <Select style={{ width: 100 }}>
                              <Option value="">&nbsp;</Option>

                              {
                                amtRulOptionsData.map((amtRulOption, idx) => {
                                  return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                                })
                              }
                            </Select>,
                          )
                        }
                        {
                          getFieldsValue().dAmtRulE0 ?
                            getFieldDecorator('dAmtRulEOpt0', {
                              initialValue: data.dAmtRulEOpt0,
                            })(
                              <Select style={{ width: 50 }}>
                                <Option value="">&nbsp;</Option>
                                <Option value="+">+</Option>
                                <Option value="-">-</Option>
                              </Select>,
                            )
                            :
                            null
                        }
                        {
                          getFieldsValue().dAmtRulE0 && getFieldsValue().dAmtRulEOpt0 ?
                            getFieldDecorator('dAmtRulE1', {
                              initialValue: data.dAmtRulE1,
                            })(
                              <Select style={{ width: 100 }} onSelect={(value, option) => dAmtRulE1OnSelect(value, option)}>
                                <Option value="">&nbsp;</Option>

                                {
                                  amtRulOptionsData.map((amtRulOption, idx) => {
                                    return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                                  })
                                }
                              </Select>,
                            )
                            :
                            null
                        }
                        {
                          getFieldsValue().dAmtRulE0 && getFieldsValue().dAmtRulEOpt0 && getFieldsValue().dAmtRulE1 ?
                            getFieldDecorator('dAmtRulEOpt1', {
                              initialValue: data.dAmtRulEOpt1,
                            })(
                              <Select style={{ width: 50 }}>
                                <Option value="">&nbsp;</Option>
                                <Option value="+">+</Option>
                                <Option value="-">-</Option>
                              </Select>,
                            )
                            :
                            null
                        }
                        {
                          getFieldsValue().dAmtRulE0 && getFieldsValue().dAmtRulEOpt0 && getFieldsValue().dAmtRulE1 && getFieldsValue().dAmtRulEOpt1 ?
                            getFieldDecorator('dAmtRulE2', {
                              initialValue: data.dAmtRulE2,
                            })(
                              <Select style={{ width: 100 }} onSelect={(value, option) => dAmtRulE2OnSelect(value, option)}>
                                <Option value="">&nbsp;</Option>

                                {
                                  amtRulOptionsData.map((amtRulOption, idx) => {
                                    return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                                  })
                                }
                              </Select>,
                            )
                            :
                            null
                        }
                      </div>
                    </Col>
                  </Row>
                  :
                  null)
            )
        )
    );
  });
  const cSubjectAdd = () => {
    if (cUuid > 3) {
      callNotice(commonMap.warning, bizMap.addList, 'warning');
      return;
    }
    cUuid++;
    const keys = cSubjectKeys;
    const nextKeys = keys.concat(cUuid);
    changeCSubjectKeys(nextKeys)
  }
  const cSubjectRemove = () => {
    const keys = cSubjectKeys;
    if (keys.length === 1) {
      return;
    }
    changeCSubjectKeys(keys.filter(key => key !== cUuid))
    cUuid--;
  }
  const cSubjectFormItems = cSubjectKeys.map((k, index) => {
    return (
      index === 1 ?
        (<Row key={k}>
          <Col span={7}>
            <FormItem label={bizMap.cSubjectB} {...formItemLayout1} >
              {
                getFieldDecorator('cSubjectB', {
                  initialValue: data.cSubjectB,
                  rules: [{ required: true, message: bizMap.validEmpty }],
                })(
                  <Input placeholder={bizMap.cSubjectB} readOnly addonAfter={cSubjectAfterB} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem label={bizMap.cNumberB} {...formItemLayout2} >
              {
                getFieldDecorator('cNumberB', {
                  initialValue: data.cNumberB,
                })(
                  <Input placeholder={bizMap.cNumberB} disabled />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.cAmtRulB} {...formItemLayout3} >
              &nbsp;
            </FormItem>
            <div style={{ marginTop: -12 }} >
              {
                getFieldDecorator('cAmtRulB0', {
                  initialValue: data.cAmtRulB0,
                })(
                  <Select style={{ width: 100 }}>
                    <Option value="">&nbsp;</Option>

                    {
                      amtRulOptionsData.map((amtRulOption, idx) => {
                        return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                      })
                    }
                  </Select>,
                )
              }
              {
                getFieldsValue().cAmtRulB0 ?
                  getFieldDecorator('cAmtRulBOpt0', {
                    initialValue: data.cAmtRulBOpt0,
                  })(
                    <Select style={{ width: 50 }}>
                      <Option value="">&nbsp;</Option>
                      <Option value="+">+</Option>
                      <Option value="-">-</Option>
                    </Select>,
                  )
                  :
                  null
              }
              {
                getFieldsValue().cAmtRulB0 && getFieldsValue().cAmtRulBOpt0 ?
                  getFieldDecorator('cAmtRulB1', {
                    initialValue: data.cAmtRulB1,
                  })(
                    <Select style={{ width: 100 }} onSelect={(value, option) => cAmtRulB1OnSelect(value, option)}>
                      <Option value="">&nbsp;</Option>

                      {
                        amtRulOptionsData.map((amtRulOption, idx) => {
                          return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                        })
                      }
                    </Select>,
                  )
                  :
                  null
              }
              {
                getFieldsValue().cAmtRulB0 && getFieldsValue().cAmtRulBOpt0 && getFieldsValue().cAmtRulB1 ?
                  getFieldDecorator('cAmtRulBOpt1', {
                    initialValue: data.cAmtRulBOpt1,
                  })(
                    <Select style={{ width: 50 }}>
                      <Option value="">&nbsp;</Option>
                      <Option value="+">+</Option>
                      <Option value="-">-</Option>
                    </Select>,
                  )
                  :
                  null
              }
              {
                getFieldsValue().cAmtRulB0 && getFieldsValue().cAmtRulBOpt0 && getFieldsValue().cAmtRulB1 && getFieldsValue().cAmtRulBOpt1 ?
                  getFieldDecorator('cAmtRulB2', {
                    initialValue: data.cAmtRulB2,
                  })(
                    <Select style={{ width: 100 }} onSelect={(value, option) => cAmtRulB2OnSelect(value, option)}>
                      <Option value="">&nbsp;</Option>

                      {
                        amtRulOptionsData.map((amtRulOption, idx) => {
                          return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                        })
                      }
                    </Select>,
                  )
                  :
                  null
              }
            </div>
          </Col>
        </Row>)
        : (
          index === 2 ?
            <Row key={k}>
              <Col span={7}>
                <FormItem label={bizMap.cSubjectC} {...formItemLayout1} >
                  {
                    getFieldDecorator('cSubjectC', {
                      initialValue: data.cSubjectC,
                      rules: [{ required: true, message: bizMap.validEmpty }],
                    })(
                      <Input placeholder={bizMap.cSubjectC} readOnly addonAfter={cSubjectAfterC} />,
                    )
                  }
                </FormItem>
              </Col>
              <Col span={5}>
                <FormItem label={bizMap.cNumberC} {...formItemLayout2} >
                  {
                    getFieldDecorator('cNumberC', {
                      initialValue: data.cNumberC,
                    })(
                      <Input placeholder={bizMap.cNumberC} disabled />,
                    )
                  }
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label={bizMap.cAmtRulC} {...formItemLayout3} >
                  &nbsp;
                </FormItem>
                <div style={{ marginTop: -12 }}>
                  {
                    getFieldDecorator('cAmtRulC0', {
                      initialValue: data.cAmtRulC0,
                    })(
                      <Select style={{ width: 100 }}>
                        <Option value="">&nbsp;</Option>

                        {
                          amtRulOptionsData.map((amtRulOption, idx) => {
                            return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                          })
                        }
                      </Select>,
                    )
                  }
                  {
                    getFieldsValue().cAmtRulC0 ?
                      getFieldDecorator('cAmtRulCOpt0', {
                        initialValue: data.cAmtRulCOpt0,
                      })(
                        <Select style={{ width: 50 }}>
                          <Option value="">&nbsp;</Option>
                          <Option value="+">+</Option>
                          <Option value="-">-</Option>
                        </Select>,
                      )
                      :
                      null
                  }
                  {
                    getFieldsValue().cAmtRulC0 && getFieldsValue().cAmtRulCOpt0 ?
                      getFieldDecorator('cAmtRulC1', {
                        initialValue: data.cAmtRulC1,
                      })(
                        <Select style={{ width: 100 }} onSelect={(value, option) => cAmtRulC1OnSelect(value, option)}>
                          <Option value="">&nbsp;</Option>

                          {
                            amtRulOptionsData.map((amtRulOption, idx) => {
                              return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                            })
                          }
                        </Select>,
                      )
                      :
                      null
                  }
                  {
                    getFieldsValue().cAmtRulC0 && getFieldsValue().cAmtRulCOpt0 && getFieldsValue().cAmtRulC1 ?
                      getFieldDecorator('cAmtRulCOpt1', {
                        initialValue: data.cAmtRulCOpt1,
                      })(
                        <Select style={{ width: 50 }}>
                          <Option value="">&nbsp;</Option>
                          <Option value="+">+</Option>
                          <Option value="-">-</Option>
                        </Select>,
                      )
                      :
                      null
                  }
                  {
                    getFieldsValue().cAmtRulC0 && getFieldsValue().cAmtRulCOpt0 && getFieldsValue().cAmtRulC1 && getFieldsValue().cAmtRulCOpt1 ?
                      getFieldDecorator('cAmtRulC2', {
                        initialValue: data.cAmtRulC2,
                      })(
                        <Select style={{ width: 100 }} onSelect={(value, option) => cAmtRulC2OnSelect(value, option)}>
                          <Option value="">&nbsp;</Option>

                          {
                            amtRulOptionsData.map((amtRulOption, idx) => {
                              return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                            })
                          }
                        </Select>,
                      )
                      :
                      null
                  }
                </div>
              </Col>
            </Row>
            : (
              index === 3 ?
                <Row key={k}>
                  <Col span={7}>
                    <FormItem label={bizMap.cSubjectD} {...formItemLayout1} >
                      {
                        getFieldDecorator('cSubjectD', {
                          initialValue: data.cSubjectD,
                          rules: [{ required: true, message: bizMap.validEmpty }],
                        })(
                          <Input placeholder={bizMap.cSubjectD} readOnly addonAfter={cSubjectAfterD} />,
                        )
                      }
                    </FormItem>
                  </Col>
                  <Col span={5}>
                    <FormItem label={bizMap.cNumberD} {...formItemLayout2} >
                      {
                        getFieldDecorator('cNumberD', {
                          initialValue: data.cNumberD,
                        })(
                          <Input placeholder={bizMap.cNumberD} disabled />,
                        )
                      }
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label={bizMap.cAmtRulD} {...formItemLayout3} >
                      &nbsp;
                    </FormItem>
                    <div style={{ marginTop: -12 }}>
                      {
                        getFieldDecorator('cAmtRulD0', {
                          initialValue: data.cAmtRulD0,
                        })(
                          <Select style={{ width: 100 }}>
                            <Option value="">&nbsp;</Option>

                            {
                              amtRulOptionsData.map((amtRulOption, idx) => {
                                return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                              })
                            }
                          </Select>,
                        )
                      }
                      {
                        getFieldsValue().cAmtRulD0 ?
                          getFieldDecorator('cAmtRulDOpt0', {
                            initialValue: data.cAmtRulDOpt0,
                          })(
                            <Select style={{ width: 50 }}>
                              <Option value="">&nbsp;</Option>
                              <Option value="+">+</Option>
                              <Option value="-">-</Option>
                            </Select>,
                          )
                          :
                          null
                      }
                      {
                        getFieldsValue().cAmtRulD0 && getFieldsValue().cAmtRulDOpt0 ?
                          getFieldDecorator('cAmtRulD1', {
                            initialValue: data.cAmtRulD1,
                          })(
                            <Select style={{ width: 100 }} onSelect={(value, option) => cAmtRulD1OnSelect(value, option)}>
                              <Option value="">&nbsp;</Option>

                              {
                                amtRulOptionsData.map((amtRulOption, idx) => {
                                  return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                                })
                              }
                            </Select>,
                          )
                          :
                          null
                      }
                      {
                        getFieldsValue().cAmtRulD0 && getFieldsValue().cAmtRulDOpt0 && getFieldsValue().cAmtRulD1 ?
                          getFieldDecorator('cAmtRulDOpt1', {
                            initialValue: data.cAmtRulDOpt1,
                          })(
                            <Select style={{ width: 50 }}>
                              <Option value="">&nbsp;</Option>
                              <Option value="+">+</Option>
                              <Option value="-">-</Option>
                            </Select>,
                          )
                          :
                          null
                      }
                      {
                        getFieldsValue().cAmtRulD0 && getFieldsValue().cAmtRulDOpt0 && getFieldsValue().cAmtRulD1 && getFieldsValue().cAmtRulDOpt1 ?
                          getFieldDecorator('cAmtRulD2', {
                            initialValue: data.cAmtRulD2,
                          })(
                            <Select style={{ width: 100 }} onSelect={(value, option) => cAmtRulD2OnSelect(value, option)}>
                              <Option value="">&nbsp;</Option>

                              {
                                amtRulOptionsData.map((amtRulOption, idx) => {
                                  return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                                })
                              }
                            </Select>,
                          )
                          :
                          null
                      }
                    </div>
                  </Col>
                </Row>
                :
                (index === 4 ?
                  <Row key={k}>
                    <Col span={7}>
                      <FormItem label={bizMap.cSubjectE} {...formItemLayout1} >
                        {
                          getFieldDecorator('cSubjectE', {
                            initialValue: data.cSubjectE,
                            rules: [{ required: true, message: bizMap.validEmpty }],
                          })(
                            <Input placeholder={bizMap.cSubjectE} readOnly addonAfter={cSubjectAfterE} />,
                          )
                        }
                      </FormItem>
                    </Col>
                    <Col span={5}>
                      <FormItem label={bizMap.cNumberE} {...formItemLayout2} >
                        {
                          getFieldDecorator('cNumberE', {
                            initialValue: data.cNumberE,
                          })(
                            <Input placeholder={bizMap.cNumberE} disabled />,
                          )
                        }
                      </FormItem>
                    </Col>
                    <Col span={12}>
                      <FormItem label={bizMap.cAmtRulE} {...formItemLayout3} >
                        &nbsp;
                      </FormItem>
                      <div style={{ marginTop: -12 }}>
                        {
                          getFieldDecorator('cAmtRulE0', {
                            initialValue: data.cAmtRulE0,
                          })(
                            <Select style={{ width: 100 }}>
                              <Option value="">&nbsp;</Option>

                              {
                                amtRulOptionsData.map((amtRulOption, idx) => {
                                  return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                                })
                              }
                            </Select>,
                          )
                        }
                        {
                          getFieldsValue().cAmtRulE0 ?
                            getFieldDecorator('cAmtRulEOpt0', {
                              initialValue: data.cAmtRulEOpt0,
                            })(
                              <Select style={{ width: 50 }}>
                                <Option value="">&nbsp;</Option>
                                <Option value="+">+</Option>
                                <Option value="-">-</Option>
                              </Select>,
                            )
                            :
                            null
                        }
                        {
                          getFieldsValue().cAmtRulE0 && getFieldsValue().cAmtRulEOpt0 ?
                            getFieldDecorator('cAmtRulE1', {
                              initialValue: data.cAmtRulE1,
                            })(
                              <Select style={{ width: 100 }} onSelect={(value, option) => cAmtRulE1OnSelect(value, option)}>
                                <Option value="">&nbsp;</Option>

                                {
                                  amtRulOptionsData.map((amtRulOption, idx) => {
                                    return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                                  })
                                }
                              </Select>,
                            )
                            :
                            null
                        }
                        {
                          getFieldsValue().cAmtRulE0 && getFieldsValue().cAmtRulEOpt0 && getFieldsValue().cAmtRulE1 ?
                            getFieldDecorator('cAmtRulEOpt1', {
                              initialValue: data.cAmtRulEOpt1,
                            })(
                              <Select style={{ width: 50 }}>
                                <Option value="">&nbsp;</Option>
                                <Option value="+">+</Option>
                                <Option value="-">-</Option>
                              </Select>,
                            )
                            :
                            null
                        }
                        {
                          getFieldsValue().cAmtRulE0 && getFieldsValue().cAmtRulEOpt0 && getFieldsValue().cAmtRulE1 && getFieldsValue().cAmtRulEOpt1 ?
                            getFieldDecorator('cAmtRulE2', {
                              initialValue: data.cAmtRulE2,
                            })(
                              <Select style={{ width: 100 }} onSelect={(value, option) => cAmtRulE2OnSelect(value, option)}>
                                <Option value="">&nbsp;</Option>

                                {
                                  amtRulOptionsData.map((amtRulOption, idx) => {
                                    return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                                  })
                                }
                              </Select>,
                            )
                            :
                            null
                        }
                      </div>
                    </Col>
                  </Row>
                  :
                  null)
            )
        )
    );
  });

  // const dAmtRulA1Validate = (rule, value, callback) => {
  //   console.log('getFieldsValue().dAmtRulA0==', getFieldsValue().dAmtRulA0)
  //   if (value === getFieldsValue().dAmtRulA0) {
  //     callback(bizMap.amtRuleNotice);
  //   } else {
  //     callback();
  //   }
  // }

  return (
    <Spin spinning={loading}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Row style={{ display: 'none' }}>
          <Col span={24}>
            <FormItem label={bizMap.entryId} {...formItemLayout}>
              {
                getFieldDecorator('entryId', {
                  initialValue: data.entryId,
                })(
                  <Input placeholder={bizMap.entryId} />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label={bizMap.entryDesc} {...formItemLayout} >
              {
                getFieldDecorator('entryDesc', {
                  initialValue: data.entryDesc,
                  rules: [{ required: true, message: bizMap.validEntryDesc }],
                })(
                  <Input placeholder={bizMap.entryDesc} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.ccy} {...formItemLayout} required>
              {
                getFieldDecorator('ccy', {
                  initialValue: data.ccy,
                  rules: [{ required: true, message: bizMap.validCcy }],
                })(
                  <Select>
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
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={7}>
            <FormItem label={bizMap.dSubjectA} {...formItemLayout1} >
              {
                getFieldDecorator('dSubjectA', {
                  initialValue: data.dSubjectA,
                  rules: [{ required: true, message: bizMap.validDSubjectA }],
                })(
                  <Input placeholder={bizMap.dSubjectA} readOnly addonAfter={subjectAfterA} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem label={bizMap.dNumberA} {...formItemLayout2} >
              {
                getFieldDecorator('dNumberA', {
                  initialValue: data.dNumberA,
                })(
                  <Input placeholder={bizMap.dNumberA} disabled />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.dAmtRulA} {...formItemLayout3} >
              &nbsp;
            </FormItem>
            <div style={{ marginTop: -12 }}>
              {
                getFieldDecorator('dAmtRulA0', {
                  initialValue: data.dAmtRulA0,
                  rules: [{ required: true, message: bizMap.validDAmtRulA }],
                })(
                  <Select style={{ width: 100 }}>
                    <Option value="">&nbsp;</Option>
                    {
                      amtRulOptionsData.map((amtRulOption, idx) => {
                        return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                      })
                    }
                  </Select>,
                )
              }
              {
                getFieldsValue().dAmtRulA0 ?
                  getFieldDecorator('dAmtRulAOpt0', {
                    initialValue: data.dAmtRulAOpt0,
                  })(
                    <Select style={{ width: 50 }}>
                      <Option value="">&nbsp;</Option>
                      <Option value="+">+</Option>
                      <Option value="-">-</Option>
                    </Select>,
                  )
                  :
                  null
              }
              {
                getFieldsValue().dAmtRulA0 && getFieldsValue().dAmtRulAOpt0 ?
                  getFieldDecorator('dAmtRulA1', {
                    initialValue: data.dAmtRulA1,
                  })(
                    <Select style={{ width: 100 }} onSelect={(value, option) => dAmtRulA1OnSelect(value, option)} >
                      <Option value="">&nbsp;</Option>
                      {
                        amtRulOptionsData.map((amtRulOption, idx) => {
                          return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                        })
                      }
                    </Select>,
                  )
                  :
                  null
              }
              {
                getFieldsValue().dAmtRulA0 && getFieldsValue().dAmtRulAOpt0 && getFieldsValue().dAmtRulA1 ?
                  getFieldDecorator('dAmtRulAOpt1', {
                    initialValue: data.dAmtRulAOpt1,
                  })(
                    <Select style={{ width: 50 }}>
                      <Option value="">&nbsp;</Option>
                      <Option value="+">+</Option>
                      <Option value="-">-</Option>
                    </Select>,
                  )
                  :
                  null
              }
              {
                getFieldsValue().dAmtRulA0 && getFieldsValue().dAmtRulAOpt0 && getFieldsValue().dAmtRulA1 && getFieldsValue().dAmtRulAOpt1 ?
                  getFieldDecorator('dAmtRulA2', {
                    initialValue: data.dAmtRulA2,
                  })(
                    <Select style={{ width: 100 }} onSelect={(value, option) => dAmtRulA2OnSelect(value, option)} >
                      <Option value="">&nbsp;</Option>
                      {
                        amtRulOptionsData.map((amtRulOption, idx) => {
                          return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                        })
                      }
                    </Select>,
                  )
                  :
                  null
              }
            </div>
          </Col>
        </Row>
        {dSubjectFormItems}
        <Row>
          <Col span={12}>
            <div>
              <Button type="dashed" onClick={dSubjectAdd} style={{ width: '40%' }}>
                <Icon type="plus" /> {bizMap.addField}
              </Button>
              <Button type="dashed" onClick={dSubjectRemove} style={{ width: '40%' }}>
                <Icon type="delete" /> {bizMap.deleteField}
              </Button>
            </div>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={7}>
            <FormItem label={bizMap.cSubjectA} {...formItemLayout1} >
              {
                getFieldDecorator('cSubjectA', {
                  initialValue: data.cSubjectA,
                  rules: [{ required: true, message: bizMap.validCSubjectA }],
                })(
                  <Input placeholder={bizMap.cSubjectA} readOnly addonAfter={cSubjectAfterA} />,
                )
              }
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem label={bizMap.cNumberA} {...formItemLayout2} >
              {
                getFieldDecorator('cNumberA', {
                  initialValue: data.cNumberA,
                })(
                  <Input placeholder={bizMap.cNumberA} disabled />,
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={bizMap.cAmtRulA} {...formItemLayout3} >
              &nbsp;
            </FormItem>
            <div style={{ marginTop: -12 }}>
              {
                getFieldDecorator('cAmtRulA0', {
                  initialValue: data.cAmtRulA0,
                  rules: [{ required: true, message: bizMap.validCAmtRulA }],
                })(
                  <Select style={{ width: 100 }}>
                    <Option value="">&nbsp;</Option>

                    {
                      amtRulOptionsData.map((amtRulOption, idx) => {
                        return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                      })
                    }
                  </Select>,
                )
              }
              {
                getFieldsValue().cAmtRulA0 ?
                  getFieldDecorator('cAmtRulAOpt0', {
                    initialValue: data.cAmtRulAOpt0,
                  })(
                    <Select style={{ width: 50 }}>
                      <Option value="">&nbsp;</Option>
                      <Option value="+">+</Option>
                      <Option value="-">-</Option>
                    </Select>,
                  )
                  :
                  null
              }
              {
                getFieldsValue().cAmtRulA0 && getFieldsValue().cAmtRulAOpt0 ?
                  getFieldDecorator('cAmtRulA1', {
                    initialValue: data.cAmtRulA1,
                  })(
                    <Select style={{ width: 100 }} onSelect={(value, option) => cAmtRulA1OnSelect(value, option)}>
                      <Option value="">&nbsp;</Option>

                      {
                        amtRulOptionsData.map((amtRulOption, idx) => {
                          return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                        })
                      }
                    </Select>,
                  )
                  :
                  null
              }
              {
                getFieldsValue().cAmtRulA0 && getFieldsValue().cAmtRulAOpt0 && getFieldsValue().cAmtRulA1 ?
                  getFieldDecorator('cAmtRulAOpt1', {
                    initialValue: data.cAmtRulAOpt1,
                  })(
                    <Select style={{ width: 50 }}>
                      <Option value="">&nbsp;</Option>
                      <Option value="+">+</Option>
                      <Option value="-">-</Option>
                    </Select>,
                  )
                  :
                  null
              }
              {
                getFieldsValue().cAmtRulA0 && getFieldsValue().cAmtRulAOpt0 && getFieldsValue().cAmtRulA1 && getFieldsValue().cAmtRulAOpt1 ?
                  getFieldDecorator('cAmtRulA2', {
                    initialValue: data.cAmtRulA2,
                  })(
                    <Select style={{ width: 100 }} onSelect={(value, option) => cAmtRulA2OnSelect(value, option)}>
                      <Option value="">&nbsp;</Option>

                      {
                        amtRulOptionsData.map((amtRulOption, idx) => {
                          return <Option key={idx} value={amtRulOption.amtCde}>{amtRulOption.amtCdeDes}</Option>;
                        })
                      }
                    </Select>,
                  )
                  :
                  null
              }
            </div>
          </Col>
        </Row>
        {cSubjectFormItems}
        <Row>
          <Col span={12}>
            <div>
              <Button type="dashed" onClick={cSubjectAdd} style={{ width: '40%' }}>
                <Icon type="plus" /> {bizMap.addField}
              </Button>
              <Button type="dashed" onClick={cSubjectRemove} style={{ width: '40%' }}>
                <Icon type="delete" /> {bizMap.deleteField}
              </Button>
            </div>
          </Col>
        </Row>
        <h4 className="split">&nbsp;</h4>
        <Row>
          <Col span={12}>
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
    </Spin>
  );
}

AccEntryRulesInfoForm.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  submiting: PropTypes.bool,
  formSubmit: PropTypes.func,
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  showSubjectTable: PropTypes.bool,
  toggleSubjectTable: PropTypes.func,
  rowClickCallback: PropTypes.func,
  querySubjectList: PropTypes.func,
  ccyOptionsData: PropTypes.array,
  amtRulOptionsData: PropTypes.array,
  dSubjectKeys: PropTypes.array,
  cSubjectKeys: PropTypes.array,
  changeDSubjectKeys: PropTypes.func,
  changeCSubjectKeys: PropTypes.func,
  changeFormValue: PropTypes.func,
};

AccEntryRulesInfoForm.defaultProps = {
  data: {},
  loading: false,
  submiting: false,
  formSubmit: noop,
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  showSubjectTable: false,
  toggleSubjectTable: noop,
  rowClickCallback: noop,
  querySubjectList: noop,
  ccyOptionsData: [],
  amtRulOptionsData: [],
  dSubjectKeys: [],
  cSubjectKeys: [],
  changeDSubjectKeys: noop,
  changeCSubjectKeys: noop,
  changeFormValue: noop,
}

export default Form.create()(AccEntryRulesInfoForm);
