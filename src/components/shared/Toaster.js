import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure(1000);
const notify = message => toast(message);

export default notify;
