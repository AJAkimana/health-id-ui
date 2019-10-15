import React from 'react';

const FieldsTable = () => (
  <div>
    <div>
      <h3 className="fields-title">Ensure the following fields are present in the .csv file you are uploading</h3>
    </div>
    <table className="fields-table">
      <tbody>
        <tr className="fields-tr">
          <td className="required-field">
            - Name
          </td>
          <td className="required-field">
            - Email
          </td>
          <td className="required-field">
            - Mobile #
          </td>
          <td className="required-field">
            - Tier
          </td>
        </tr>
        <tr>
          <td className="required-field">
            - Address Line 1
          </td>
          <td className="required-field">
            - Address Line 2
          </td>
          <td className="required-field">
            - Country
          </td>
          <td className="required-field">
            - City
          </td>
        </tr>
        <tr>
          <td className="required-field">
            - LGA
          </td>
          <td className="required-field">
            - Payment terms
          </td>
          <td className="required-field">
            - Credit Days
          </td>
          <td className="required-field">
            - Supplier Rating
          </td>
        </tr>
        <tr>
          <td className="required-field">
            - Commentary
          </td>
          <td className="required-field">
            - Supplier Logo
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default FieldsTable;
