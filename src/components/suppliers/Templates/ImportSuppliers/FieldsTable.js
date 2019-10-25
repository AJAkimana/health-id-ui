import React from 'react';

const FieldsTable = () => (
  <div>
    <div>
      <h3 className="fields-title">Use guide below as format and sample data for CSV file you are uploading</h3>
    </div>
    <table className="fields-table">
      <tbody>
        <tr className="fields-tr">
          <td className="required-field">
            <div className="required-field-name">Name*</div>
            <li>Supplier`s name</li>
            <li>e.g: Abi LTD</li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Email*</div>
            <li>Supplier`s email</li>
            <li>e.g: orders@abi.com</li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Mobile #*</div>
            <li>Supplier mobile number</li>
            <li>e.g: +2348060000000</li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name tier">Tier*</div>
            <li>Enter if supplier is Manufacturer; Importer;</li>
            <li>1T wholesaler, 2T wholesale or 3T wholesaler</li>
            <span>required</span>
          </td>
        </tr>
        <tr className="fields-tr">
          <td className="required-field">
            <div className="required-field-name">Address Line 1*</div>
            <li>Supplier`s address 1st line</li>
            <li>e.g: 123 alphabet way</li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Address Line 2</div>
            <li>Supplier`s address 2nd line</li>
            <li>e.g: off letters road</li>
            <span>optional</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Country*</div>
            <li>Supplier`s country location</li>
            <li>e.g: Nigeria</li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">City*</div>
            <li>City located in the selected country</li>
            <li>e.g: Lagos</li>
            <span>required</span>
          </td>
        </tr>
        <tr className="fields-tr">
          <td className="required-field">
            <div className="required-field-name">Region</div>
            <li>Region in the selected city</li>
            <li>e.g: Yaba</li>
            <span>optional</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Logo</div>
            <li>Supplier`s brand logo</li>
            <li>in PNG/JPG</li>
            <span>optional</span>
          </td>

          <td className="required-field">
            <div className="required-field-name">Commentary</div>
            <li>Comments on the proposed</li>
            <li>supplier e.g: No bank transfers</li>
            <span>optional</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Payment Terms*</div>
            <li>Cash on delivery payment is set to 0 days.</li>
            <li>any value between 1-45 is set as credit days</li>
            <span>required</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default FieldsTable;
