import {Modal, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../../styling/css/Style';
import Feather from 'react-native-vector-icons/Feather';

export default function InformationModal({
  type,
  title,
  message,
  isVisible,
  setIsVisible,
}) {
  return (
    <>
      <Modal
        visible={isVisible}
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => setIsVisible(false)}
        onDismiss={() => setIsVisible(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.message_modal}>
            <TouchableOpacity style={styles.message_modal_btn_close} onPress={()=> setIsVisible(false)}>
              <Feather name={'x'} style={styles.message_modal_btn_close_icon} />
            </TouchableOpacity>
            <View style={styles.message_modal_content}>
              {type === 'error' ? (
                <View style={styles.message_modal_icon_error_container}>
                  <Feather
                    name={'alert-circle'}
                    style={styles.message_modal_icon}
                  />
                </View>
              ) : (
                <View style={styles.message_modal_icon_success_container}>
                  <Feather
                    name={'check-circle'}
                    style={styles.message_modal_icon}
                  />
                </View>
              )}
              <Text style={styles.message_modal_title}>{title}</Text>
              <Text style={styles.message_modal_message}>{message}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
