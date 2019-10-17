const map = {};
window.URL.createObjectURL = jest.fn(file => file);

window.document.addEventListener = jest.fn((event, callback) => {
  map[event] = callback;
});
window.addEventListener = jest.fn((event, callback) => {
  map[event] = callback;
});

const event = jest.fn(e => map[e.name](e));
export const document = { event };
export class MockFileReader extends FileReader {
  constructor() {
    super();
    return {
      removeEventListener: jest.fn((e, callback) => {
        map[event] = callback;
      }),
      addEventListener: jest.fn((e, callback) => {
        map[event] = callback;
      }),
      readAsDataURL: jest.fn(),
      result: {}
    };
  }
}
window.FileReader = MockFileReader;
export default {
  ...document,
  document,
  FileReader,
  map
};
