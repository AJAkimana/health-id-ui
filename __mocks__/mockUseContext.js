import * as StateContext from '../src/providers/stateProvider';

const contextValues = [{ isActive: 'grid1' }, jest.fn()];
const contextMock = jest
  .spyOn(StateContext, 'useStateValue')
  .mockImplementation(() => contextValues);
export default contextMock;
