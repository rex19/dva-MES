import { message } from 'antd';

const successMessage = (message) => {
  message.success(message);
};

const errorMessage = (message) => {
  message.error(message);
};

const warningMessage = (message) => {
  message.warning(message);
};

export { successMessage, errorMessage, warningMessage }
