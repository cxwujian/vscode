import React, { PropTypes } from 'react';
import * as i18n from '../../../../../utils/i18n';

const AccEntryRulesTable = (props) => {
  const bizMap = i18n.bizMap('cas/accEntryRulesInf');
  const { data } = props;
  let entSts = '';
  switch (data.entSts) {
    case '00': entSts = bizMap['entSts-00']; break;
    case '01': entSts = bizMap['entSts-01']; break;
    default: entSts = ''; break;
  }
  let isSystem = '';
  switch (data.isSystem) {
    case '0': isSystem = bizMap['isSystem-0']; break;
    case '1': isSystem = bizMap['isSystem-1']; break;
    default: isSystem = ''; break;
  }
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.entryDesc}:</td>
          <td>{data.entryDesc}</td>
        </tr>
        <tr>
          <td>{bizMap.dSubjectA}:</td>
          <td>{data.dSubjectA}</td>
          <td>{bizMap.dNumberA}:</td>
          <td>{data.dNumberA}</td>
          <td>{bizMap.dAmtRulA}:</td>
          <td>{data.dAmtRulDesA ? data.dAmtRulDesA : data.dAmtRulA}</td>
        </tr>
        {
          data.dSubjectB ?
            <tr>
              <td>{bizMap.dSubjectB}:</td>
              <td>{data.dSubjectB}</td>
              <td>{bizMap.dNumberB}:</td>
              <td>{data.dNumberB}</td>
              <td>{bizMap.dAmtRulB}:</td>
              <td>{data.dAmtRulDesB ? data.dAmtRulDesB : data.dAmtRulB}</td>
            </tr>
            : null
        }
        {
          data.dSubjectC ?
            <tr>
              <td>{bizMap.dSubjectC}:</td>
              <td>{data.dSubjectC}</td>
              <td>{bizMap.dNumberC}:</td>
              <td>{data.dNumberC}</td>
              <td>{bizMap.dAmtRulC}:</td>
              <td>{data.dAmtRulDesC ? data.dAmtRulDesC : data.dAmtRulC}</td>
            </tr>
            : null
        }
        {
          data.dSubjectD ?
            <tr>
              <td>{bizMap.dSubjectD}:</td>
              <td>{data.dSubjectD}</td>
              <td>{bizMap.dNumberD}:</td>
              <td>{data.dNumberD}</td>
              <td>{bizMap.dAmtRulD}:</td>
              <td>{data.dAmtRulDesD ? data.dAmtRulDesD : data.dAmtRulD}</td>
            </tr>
            : null
        }
        {
          data.dSubjectE ?
            <tr>
              <td>{bizMap.dSubjectE}:</td>
              <td>{data.dSubjectE}</td>
              <td>{bizMap.dNumberE}:</td>
              <td>{data.dNumberE}</td>
              <td>{bizMap.dAmtRulE}:</td>
              <td>{data.dAmtRulDesE ? data.dAmtRulDesE : data.dAmtRulE}</td>
            </tr>
            : null
        }

        <tr>
          <td>{bizMap.cSubjectA}:</td>
          <td>{data.cSubjectA}</td>
          <td>{bizMap.cNumberA}:</td>
          <td>{data.cNumberA}</td>
          <td>{bizMap.cAmtRulA}:</td>
          <td>{data.cAmtRulDesA ? data.cAmtRulDesA : data.cAmtRulA}</td>
        </tr>
        {
          data.cSubjectB ?
            <tr>
              <td>{bizMap.cSubjectB}:</td>
              <td>{data.cSubjectB}</td>
              <td>{bizMap.cNumberB}:</td>
              <td>{data.cNumberB}</td>
              <td>{bizMap.cAmtRulB}:</td>
              <td>{data.cAmtRulDesB ? data.cAmtRulDesB : data.cAmtRulB}</td>
            </tr>
            : null
        }

        {
          data.cSubjectC ?
            <tr>
              <td>{bizMap.cSubjectC}:</td>
              <td>{data.cSubjectC}</td>
              <td>{bizMap.cNumberC}:</td>
              <td>{data.cNumberC}</td>
              <td>{bizMap.cAmtRulC}:</td>
              <td>{data.cAmtRulDesC ? data.cAmtRulDesC : data.cAmtRulC}</td>
            </tr>
            : null
        }

        {
          data.cSubjectD ?
            <tr>
              <td>{bizMap.cSubjectD}:</td>
              <td>{data.cSubjectD}</td>
              <td>{bizMap.cNumberD}:</td>
              <td>{data.cNumberD}</td>
              <td>{bizMap.cAmtRulD}:</td>
              <td>{data.cAmtRulDesD ? data.cAmtRulDesD : data.cAmtRulD}</td>
            </tr>
            : null
        }

        {data.cSubjectE ?
          <tr>
            <td>{bizMap.cSubjectE}:</td>
            <td>{data.cSubjectE}</td>
            <td>{bizMap.cNumberE}:</td>
            <td>{data.cNumberE}</td>
            <td>{bizMap.cAmtRulE}:</td>
            <td>{data.cAmtRulDesE ? data.cAmtRulDesE : data.cAmtRulE}</td>
          </tr>
          : null
        }
        <tr>
          <td>{bizMap.ccy}:</td>
          <td>{data.ccy}</td>
          <td>{bizMap.isSystem}:</td>
          <td>{isSystem}</td>
        </tr>
        <tr>
          <td>{bizMap.entSts}:</td>
          <td>{entSts}</td>
          <td>{bizMap.remark}:</td>
          <td>{data.remark}</td>
        </tr>
      </tbody>
    </table>
  );
}

AccEntryRulesTable.propTypes = {
  data: PropTypes.object,
};

AccEntryRulesTable.defaultProps = {
  data: {},
}

export default AccEntryRulesTable;
