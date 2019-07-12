import React from 'react';
import { mount } from 'enzyme';
import TableContent from '../../../../components/sell/salesHistory/tableContent';

const ref = React.createRef();
const props = {
  classes: { table: '' },
  columns: [{ id: 1, label: '' }],
  data: [
    { id: '', dateSold: '', timeSold: '', location: '', soldBy: '', receiptId: '', soldTo: '' },
    { id: '', dateSold: '', timeSold: '', location: '', soldBy: '', receiptId: '', soldTo: '' },
    { id: '', dateSold: '', timeSold: '', location: '', soldBy: '', receiptId: '', soldTo: '' }
  ],
  page: 1,
  rowsPerPage: 1,
};
describe('TableContent component', () => {
  const wrapper = mount(<TableContent {...props} ref={ref} />);
  it('renders TableContent component', () => {
    const table = wrapper.find('Table').length;
    expect(table).toBe(1);
  });
});
