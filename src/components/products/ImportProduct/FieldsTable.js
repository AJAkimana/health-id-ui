import React from 'react';

const FieldsTable = () => (
  <div>
    <div>
      <h3 className="fields-title">Guide and sample data for the CSV file you are uploading</h3>
    </div>
    <table className="fields-table-products">
      <tbody>
        <tr className="fields-tr">
          <td className="required-field">
            <div className="required-field-name">Name*</div>
            <li>Product`s name</li>
            <li>e.g. Panadol Tabs (40 sachets)</li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Description*</div>
            <li>Product description</li>
            <li>e.g. content, uses, dosage etc</li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Brand*</div>
            <li>Company`s distinct identifier</li>
            <li>e.g. Emzor</li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name tier">Manufacturer*</div>
            <li>Company that manufactured the product</li>
            <li>e.g. Unilever PLC</li>
            <span>required</span>
          </td>
        </tr>
        <tr className="fields-tr">
          <td className="required-field">
            <div className="required-field-name">Category*</div>
            <li>Select from: prescription</li>
            <li>OTC, daily essentials, beauty</li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Loyalty Weight*</div>
            <li>The # of loyalty points</li>
            <li>members receive during purchase</li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">VAT Status*</div>
            <li>VAT application on a product</li>
            <li>Select VAT or No VAT</li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Dispensing Size*</div>
            <li>Select from: tablets, bottles, cans, packs, tins,</li>
            <li>sachets, rolls, tubes, cartons, pieces, bags, pairs</li>
            <span>required</span>
          </td>
        </tr>
        <tr className="fields-tr">
          <td className="required-field">
            <div className="required-field-name">Preferred Supplier*</div>
            <li>Enter your preferred supplier</li>
            <li>email from existing suppliers</li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Backup Supplier*</div>
            <li>Enter your backup supplier</li>
            <li>email from existing suppliers</li>
            <span>required</span>
          </td>

          <td className="required-field">
            <div className="required-field-name">Tags</div>
            <li>Enter short labels for products</li>
            <li>and separate with comma</li>
            <span>optional</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Product Image</div>
            <li>Product image in</li>
            <li>PNG/JPG</li>
            <span>optional</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default FieldsTable;
