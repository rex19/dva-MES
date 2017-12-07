import { message } from 'antd';


export default class MessageComponents {
  successMessage = (message) => {
    message.success(message);
  };

  errorMessage = (message) => {
    message.error(message);
  };

  warningMessage = (message) => {
    message.warning(message);
  };

}
