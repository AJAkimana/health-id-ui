import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html) => {
    savePDF(html, {
      scale: 0.6,
      paperSize: 'A4',
      repeatHeaders: true,
      landscape: true,
      fileName: 'healthID_sales.pdf',
      margin: 10,
      top: 10
    });
  }
}

const Doc = new DocService();

export default Doc;
