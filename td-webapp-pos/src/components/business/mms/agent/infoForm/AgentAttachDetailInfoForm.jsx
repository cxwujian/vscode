import React, { PropTypes } from 'react';
import { Form, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import MulUpload from '../../../../common/MulUpload';

const AgentAttachDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/agent');
  const { agtType, data, style } = props;
  console.log(agtType);
  const image = 'data:image/png;base64,';
  const preAdd = [
    {
      label: bizMap.preModFjsrcPic01,
      name: 'a.png',
      editable: false,
      url: image + data.FJSRC_PIC_01,
      data: { LX: 'PIC', ORDERNUM: '01' },
    },
    {
      label: bizMap.preModFjsrcPic02,
      name: 'b.png',
      editable: false,
      url: image + data.FJSRC_PIC_02,
      data: { LX: 'PIC', ORDERNUM: '02' },
    },
    {
      label: bizMap.preModFjsrcPic03,
      name: 'c.png',
      editable: false,
      url: image + data.FJSRC_PIC_03,
      data: { LX: 'PIC', ORDERNUM: '03' },
    },
    {
      label: bizMap.preModFjsrcPic04,
      name: 'd.png',
      editable: false,
      url: image + data.FJSRC_PIC_04,
      data: { LX: 'PIC', ORDERNUM: '04' },
    },
    {
      label: bizMap.preModFjsrcPic05,
      name: 'e.png',
      editable: false,
      url: image + data.FJSRC_PIC_05,
      data: { LX: 'PIC', ORDERNUM: 'LOGO' },
    },
  ]
  const busAdd = [
    {
      label: bizMap.fjsrcPic01,
      name: 'a.png',
      editable: false,
      url: image + data.FJSRC_PIC_01,
      data: { LX: 'PIC', ORDERNUM: '01' },
    },
    {
      label: bizMap.fjsrcPic02,
      name: 'b.png',
      editable: false,
      url: image + data.FJSRC_PIC_02,
      data: { LX: 'PIC', ORDERNUM: '02' },
    },
    {
      label: bizMap.fjsrcPic03,
      name: 'c.png',
      editable: false,
      url: image + data.FJSRC_PIC_03,
      data: { LX: 'PIC', ORDERNUM: '03' },
    },
    {
      label: bizMap.fjsrcPic04,
      name: 'd.png',
      editable: false,
      url: image + data.FJSRC_PIC_04,
      data: { LX: 'PIC', ORDERNUM: '04' },
    },
    {
      label: bizMap.fjsrcPic05,
      name: 'e.png',
      editable: false,
      url: image + data.FJSRC_PIC_05,
      data: { LX: 'PIC', ORDERNUM: '05' },
    },
    {
      label: bizMap.fjsrcPic06,
      name: 'f.png',
      editable: false,
      url: image + data.FJSRC_PIC_06,
      data: { LX: 'PIC', ORDERNUM: '06' },
    },
    {
      label: bizMap.fjsrcPic07,
      name: 'g.png',
      editable: false,
      url: image + data.FJSRC_PIC_07,
      data: { LX: 'PIC', ORDERNUM: 'LOGO' },
    },
  ]
  const testFiles = agtType === '0' ? preAdd : busAdd;
  const testImgClick = () => {
            // 对于isNew为true的图片，可以考虑同步请求真实大小的图片地址并返回
            // 不返回或返回null, 则默认展现原img中的图片
  }
  return (
    <Form layout="horizontal" style={style} >
      <Row>
        <p className="br" />
        <Col sm={24} md={24} offset={2}>
          <MulUpload
            files={testFiles}
            onImgClick={testImgClick.bind(this)}
          />
        </Col>
      </Row>
    </Form>
  );
}

AgentAttachDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

AgentAttachDetailInfoForm.defaultProps = {
  data: {},
}

export default AgentAttachDetailInfoForm;
