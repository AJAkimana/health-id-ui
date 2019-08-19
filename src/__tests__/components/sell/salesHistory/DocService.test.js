import React from 'react';
import Doc from '../../../../components/sell/salesHistory/utils/docService';

jest.mock('../../../../components/sell/salesHistory/utils/docService');
describe('Doc service generator ', () => {
  const html = `
    <html lang="en">
      <head>
        <title>Code coverage report for All files</title>
      </head>
      <body>
        <div class="wrapper">
          Test
        </div>
      </body>
    </html>
    `;

  it('prints a document ', () => {
    const pdf = Doc.createPdf(html);
    expect(pdf).toBe(undefined);
  });
});
