import React, { PropTypes } from 'react';
import { Form, Button, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };
const SubjectCodeCancelForm = (props) => {
  const bizMap = i18n.bizMap('cas/subject');
  const commonMap = i18n.commonMap();
  const { data, submiting, cancelSub } = props;

  const accTyp = (type) => {
    let accTyp = '';
    switch (type) {
      case '1':
        accTyp = bizMap['accTyp-1'];
        break;
      case '2':
        accTyp = bizMap['accTyp-2'];
        break;
      case '3':
        accTyp = bizMap['accTyp-3'];
        break;
      case '4':
        accTyp = bizMap['accTyp-4'];
        break;
      default: accTyp = '';
        break;
    }
    return accTyp;
  };

  const subSts = (type) => {
    let subSts = '';
    switch (type) {
      case '00':
        subSts = commonMap['status-00'];
        break;
      case '01':
        subSts = commonMap['status-01'];
        break;
      default: subSts = '';
        break;
    }
    return subSts;
  };

  const subjectLev = (type) => {
    let subjectLev = '';
    switch (type) {
      case '1':
        subjectLev = bizMap['subjectLev-1'];
        break;
      case '2':
        subjectLev = bizMap['subjectLev-2'];
        break;
      case '3':
        subjectLev = bizMap['subjectLev-3'];
        break;
      default: subjectLev = '';
        break;
    }
    return subjectLev;
  };

  const isLastLev = (type) => {
    let isLastLev = '';
    switch (type) {
      case '0':
        isLastLev = bizMap['isLastLev-0'];
        break;
      case '1':
        isLastLev = bizMap['isLastLev-1'];
        break;
      default: isLastLev = '';
        break;
    }
    return isLastLev;
  };

  const cdFlg = (type) => {
    let cdFlg = '';
    switch (type) {
      case 'D':
        cdFlg = bizMap['cdFlg-D'];
        break;
      case 'C':
        cdFlg = bizMap['cdFlg-C'];
        break;
      default: cdFlg = '';
        break;
    }
    return cdFlg;
  };

  const isSystem = (type) => {
    let isSystem = '';
    switch (type) {
      case '0':
        isSystem = bizMap['isSystem-0'];
        break;
      case '1':
        isSystem = bizMap['isSystem-1'];
        break;
      default: isSystem = '';
        break;
    }
    return isSystem;
  };

  const handCancelSub = () => {
    cancelSub(data);
  }

  return (
    <Form layout="horizontal">
      <table className="detail_table">
        <tbody>
          <tr>
            <td>{bizMap.accTyp}:</td>
            <td>{accTyp(data.accTyp)}</td>
            <td>{bizMap.subject}:</td>
            <td>{data.subject}</td>
          </tr>
          <tr>
            <td>{bizMap.subjectNme}:</td>
            <td>{data.subjectNme}</td>
            <td>{bizMap.subSts}:</td>
            <td>{subSts(data.subSts)}</td>
          </tr>
          <tr>
            <td>{bizMap.subjectLev}:</td>
            <td>{subjectLev(data.subjectLev)}</td>
            <td>{bizMap.isLastLev}:</td>
            <td>{isLastLev(data.isLastLev)}</td>
          </tr>
          <tr>
            <td>{bizMap.supSubject}:</td>
            <td>{data.supSubject}</td>
            <td>{bizMap.cdFlg}:</td>
            <td>{cdFlg(data.cdFlg)}</td>
          </tr>
          <tr>
            <td>{bizMap.isSystem}:</td>
            <td>{isSystem(data.isSystem)}</td>
            <td>{bizMap.remark}:</td>
            <td>{data.remark}</td>
          </tr>
        </tbody>
      </table>
      &nbsp;
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" loading={submiting} onClick={handCancelSub}>{bizMap.conCancel}</Button>
        </Col>
      </Row>
    </Form>
  );
}

SubjectCodeCancelForm.propTypes = {
  data: PropTypes.object,
  cancelSub: PropTypes.func,
};

SubjectCodeCancelForm.defaultProps = {
  data: {},
  submiting: false,
  cancelSub: noop,
}

export default Form.create()(SubjectCodeCancelForm);
