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
          - Description
          </td>
          <td className="required-field">
          - Category
          </td>
          <td className="required-field">
          - Backup Supplier
          </td>
        </tr>
        <tr>
          <td className="required-field">
          - Brand
          </td>
          <td className="required-field">
          - Manufacturer
          </td>
          <td className="required-field">
          - Preferred Supplier
          </td>
        </tr>
        <tr>
          <td className="required-field">
          - VAT Status
          </td>
          <td className="required-field">
          - Tags
          </td>
          <td className="required-field">
          - Measurement Unit
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default FieldsTable;
