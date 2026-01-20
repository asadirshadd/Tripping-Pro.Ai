import {Alert, Modal, PermissionsAndroid, Platform, Text, TouchableOpacity, View,} from 'react-native';
import styles from '../../../styling/css/Style';
import Feather from 'react-native-vector-icons/Feather';
import ViewShot, {captureRef} from 'react-native-view-shot';
import QRCode from 'react-native-qrcode-svg';
import {useRef, useState} from 'react';
import RNFS from "react-native-fs";
import * as MediaScannerConnection from "react-native-fs";
import showMessage, {showError} from "../../toast-messages/ToastMessage";

export default function QrCodeModal({navigation, setQrCodeModal,qrCodeValue}) {
  const qrRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    
    // Request permission for Android to save to device storage
    const requestPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message: 'App needs access to your storage to save QR code image',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true; // iOS doesn't require explicit permission
    };

    // const saveQRCode = async () => {
    //     // Check for permissions
    //     const hasPermission = await requestPermission();
    //     if (!hasPermission) {
    //         console.log('Permission denied');
    //         return;
    //     }
    //
    //     // Capture the QR code as an image
    //     captureRef(qrRef, {
    //         format: 'png',
    //         quality: 0.8,
    //     }).then(
    //         async (uri) => {
    //             // Save the image to device storage
    //             const path = `${RNFS.PicturesDirectoryPath}/QRCode.png`; // Set the path
    //             RNFS.copyFile(uri, path).then(() => {
    //                 console.log('QR Code saved to:', path);
    //             }).catch((err) => {
    //                 console.log('Error saving QR code:', err);
    //             });
    //         },
    //         (error) => console.error('Oops, snapshot failed', error)
    //     );
    // };
    const saveQRCode = async () => {
        // Check for permissions
        const hasPermission = await requestPermission();
        if (!hasPermission) {
            console.log('Permission denied');
            return;
        }

        // Capture the QR code as an image
        captureRef(qrRef, {
            format: 'png',
            quality: 0.8,
        }).then(
            async (uri) => {
                // Save the image to device storage
                let val = qrCodeValue?.split('/');
                val = val[4];
                const path = `${RNFS.DownloadDirectoryPath}/Order-${val}.png`; // Set the path
                RNFS.copyFile(uri, path).then(() => {
                    console.log('QR Code saved to:', path);

                    // Notify the system to scan the new image
                    MediaScannerConnection.scanFile(
                        path,
                        ['image/png'],
                        (error, results) => {
                            if (error) {
                                showError()
                            } else {
                                console.log('File scanned:', results);
                            }
                        }
                    );
                    // Optionally, you can show a Toast or alert to notify the user that the image is saved
                    showMessage("success","Qr-Code saved!","Your QR code has been saved to your gallery.")
                    setQrCodeModal(false)
                }).catch((err) => {
                    console.log('Error saving QR code:', err);
                });
            },
            (error) => console.error('Oops, snapshot failed', error)
        );
    };

  return (
    <>
      <Modal
        style={{
          flex: 1,
        }} visible={isVisible}
        transparent={true}
        animationType={'slide'}>
        <View style={styles.service_modal_overlay} />
        <View
          style={{
            width: '100%',
            backgroundColor: '#fff',
            height: 500,
            position: 'absolute',
            bottom: 0,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={styles.service_modal_close_btn} onPress={()=>{
              setQrCodeModal(false);
          }}>
            <Feather name={'x'} style={styles.message_modal_btn_close_icon} />
          </TouchableOpacity>
          <View>
            <ViewShot ref={qrRef} options={{format: 'png', quality: 1}} style={{
                padding : 20,
            }}>
              <QRCode value={qrCodeValue? qrCodeValue : "No Value Found"} size={250} />
            </ViewShot>
            <View style={styles.form_group}>
              <TouchableOpacity style={styles.default_screen_btn} onPress={saveQRCode}>
                  <Text style={styles.default_screen_btn_text}>Download QR-Code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
