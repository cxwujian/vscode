import React, { PropTypes } from 'react';
import { Form, Row, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import MulUpload from '../../../../common/MulUpload';

const MerchantAttachDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/merchant');
  const { data, style } = props;
  const image = 'data:image/png;base64,';
  const testFiles = [
    {
      label: bizMap.fjidPic01,
      name: 'a.png',
      editable: false,
      url: image + data.FJSRC_PIC_01,
      data: { LX: 'PIC', ORDERNUM: '01' },
    },
    {
      label: bizMap.fjidPic02,
      name: 'b.png',
      editable: false,
      url: image + data.FJSRC_PIC_02,
      data: { LX: 'PIC', ORDERNUM: '02' },
    },
    {
      label: bizMap.fjidPic03,
      name: 'c.png',
      editable: false,
      url: image + data.FJSRC_PIC_03,
      data: { LX: 'PIC', ORDERNUM: '03' },
    },
    {
      label: bizMap.fjidPic04,
      name: 'd.png',
      editable: false,
      url: image + data.FJSRC_PIC_04,
      data: { LX: 'PIC', ORDERNUM: '04' },
    },
    {
      label: bizMap.fjidPic05,
      name: 'e.png',
      editable: false,
      url: image + data.FJSRC_PIC_05,
      data: { LX: 'PIC', ORDERNUM: '05' },
    },
    {
      label: bizMap.fjidPic06,
      name: 'f.png',
      editable: false,
      url: image + data.FJSRC_PIC_06,
      data: { LX: 'PIC', ORDERNUM: '06' },
    },
    {
      label: bizMap.fjidPic07,
      name: 'g.png',
      editable: false,
      url: image + data.FJSRC_PIC_07,
      data: { LX: 'PIC', ORDERNUM: '07' },
    },
    {
      label: bizMap.fjidPic08,
      name: 'h.png',
      editable: false,
      url: image + data.FJSRC_PIC_08,
      data: { LX: 'PIC', ORDERNUM: '08' },
    },
    {
      label: bizMap.fjidPic09,
      name: 'i.png',
      editable: false,
      url: image + data.FJSRC_PIC_09,
      data: { LX: 'PIC', ORDERNUM: '09' },
    },
    {
      label: bizMap.fjidPic10,
      name: 'j.png',
      editable: false,
      url: image + data.FJSRC_PIC_10,
      data: { LX: 'PIC', ORDERNUM: 'LOGO' },
    },
  ]
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

MerchantAttachDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

MerchantAttachDetailInfoForm.defaultProps = {
  data: {},
}

export default MerchantAttachDetailInfoForm;
