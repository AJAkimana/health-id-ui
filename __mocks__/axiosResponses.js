export const resolvedRequest = {
  status: 200,
  response: {
    data: {},
    statusText: 'OK',
    headers: {},
    config: {}
  }
};

export const rejectedRequest = {
  status: 400,
  response: {
    data: { errors: { message: 'errors' } },
    statusText: 'ERROR',
    headers: {},
    config: {}
  }
};
