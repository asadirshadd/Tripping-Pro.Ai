import Toast from 'react-native-toast-message';

const showMessage = (type, header, body) => {
  Toast.show({
    type: type,
    text1: header,
    text2: body,
    position: 'top',
    topOffset : 10,
    visibilityTime: 3000,
  });
};
const showError = () => {
  Toast.show({
    type: 'error',
    text1: 'Server Error !',
    text2: 'Please try again later.',
    position: 'top',
    visibilityTime: 3000,
    topOffset : 10,
  });
};
const showSuccess = (header, body) => {
  Toast.show({
    type: 'success',
    text1: header,
    text2: body,
    position: 'top',
    topOffset : 10,
    visibilityTime: 3000,
  });
};
export default showMessage;
export {showError, showSuccess};
