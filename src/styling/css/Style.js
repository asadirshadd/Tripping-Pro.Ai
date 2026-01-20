import {Dimensions, StyleSheet} from 'react-native';
import {
  BLACK,
  PRIMARY,
  WHITE,
  SECONDARY,
  BLACK_2,
  BLACK_1,
  BLACK_3,
} from '../colors/Colors';
// Responsive FontSizes
import {RFValue} from 'react-native-responsive-fontsize';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

// Fonts
const LIGHT = 'Poppins Light';
const BOLD = 'Poppins';
const MEDIUM = 'Poppins Medium';
const SEMI = 'Poppins SemiBold';
const REGULAR = 'Poppins Regular';

const styles = StyleSheet.create({
  // Loader
  loader_container: {
    width: WIDTH,
    height: HEIGHT,
    position: 'fixed',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 9999,
  },
  loader_container_bg: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    opacity: 0.95,
    zIndex: -1,
  },
  loader_image: {
    width: 100,
    height: 100,
  },
  loader_text: {
    fontFamily: MEDIUM,
    fontSize: RFValue(15),
    color: BLACK_2,
    marginTop: 10,
  },
  // Custom Classes
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  row_center: {
    justifyContent: 'center',
  },
  row_between: {
    justifyContent: 'space-between',
  },
  row_end: {
    justifyContent: 'flex-end',
  },
  row_align_center: {
    alignItems: 'center',
  },
  row_align_start: {
    alignItems: 'flex-start',
  },
  col_center: {
    alignItems: 'center',
  },
  col_align_center: {
    justifyContent: 'center',
  },
  mt_1: {
    marginTop: 10,
  },
  mt_2: {
    marginTop: 20,
  },
  mt_3: {
    marginTop: 30,
  },
  mt_4: {
    marginTop: 40,
  },
  mt_5: {
    marginTop: 50,
  },
  mv_1: {
    marginVertical: 10,
  },
  mv_2: {
    marginVertical: 20,
  },
  mv_3: {
    marginVertical: 30,
  },
  mv_4: {
    marginVertical: 40,
  },
  mv_5: {
    marginVertical: 50,
  },

  //     Splash Screen
  splash_container: {
    width: WIDTH,
    height: HEIGHT,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY,
  },
  splash_image_container: {
    width: 300,
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splash_image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  //   App Auth/Splash/Introduction
  container: {
    flex: 1,
    backgroundColor: WHITE,
    position: 'relative',
  },
  auth_container: {
    flex: 1,
    backgroundColor: WHITE,
    position: 'relative',
  },
  default_screen_header_container: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 80,
    paddingHorizontal: 40,
  },
  default_screen_header: {
    width: 300,
    height: 300,
    objectFit: 'contain',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  default_screen_header_img: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  default_screen_body: {
    flex: 1,
    paddingHorizontal: 40,
    marginTop: -20,
  },
  default_screen_title: {
    fontFamily: BOLD,
    fontSize: RFValue(20),
    color: BLACK,
    marginTop: 20,
    textAlign: 'center',
  },
  default_screen_subtitle: {
    fontFamily: REGULAR,
    fontSize: RFValue(12),
    color: BLACK_1,
    marginBottom: 10,
    textAlign: 'center',
  },
  default_screen_btn: {
    width: '100%',
    backgroundColor: PRIMARY,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  default_screen_btn_text: {
    fontFamily: SEMI,
    fontSize: RFValue(12),
    color: WHITE,
    textAlign: 'center',
  },
  default_screen_btn1: {
    backgroundColor: PRIMARY,
  },
  default_screen_btn2: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: PRIMARY,
  },
  default_screen_btn2_text: {
    color: PRIMARY,
  },
  //   Sign In Screen
  auth_body: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 30,
    justifyContent: 'center',
  },
  auth_body_title: {
    fontFamily: BOLD,
    fontSize: RFValue(25),
    color: BLACK,
    marginBottom: 10,
  },
  auth_body_subtitle: {
    fontFamily: REGULAR,
    fontSize: RFValue(13),
    color: BLACK,
    marginBottom: 10,
  },

  auth_input_container: {
    marginVertical: 8,
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    // paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY,
  },
  auth_input_icon: {
    position: 'absolute',
    left: 17,
    color: SECONDARY,
    fontSize: 20,
  },
  auth_input: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    fontSize: RFValue(12),
    color: PRIMARY,
    fontFamily: REGULAR,
  },
  auth_button_container: {
    width: '100%',
    position: 'relative',
  },
  auth_button_item: {
    marginVertical: 10,
    position: 'relative',
  },
  //   Menu
  menu_topbar: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  menu_topbar_title: {
    fontFamily: BOLD,
    fontSize: RFValue(16),
    color: BLACK,
    textTransform: 'uppercase',
  },
  menu_topbar_btn_back: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    backgroundColor: WHITE,
    borderRadius: 100,
  },
  menu_topbar_btn_back_icon: {
    fontSize: 20,
    color: PRIMARY,
  },
  menu_body: {
    flex: 1,
  },
  menu_item: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
  menu_item_text_icon: {
    color: BLACK_2,
    fontSize: 20,
  },
  menu_item_text: {
    fontFamily: SEMI,
    fontSize: RFValue(14),
    color: BLACK_2,
    marginLeft: 10,
  },
  menu_item_icon: {
    fontSize: 20,
    color: BLACK_2,
  },
  //   Page Header
  page_header: {
    width: '100%',
    height: 70,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  page_header_title: {
    fontFamily: BOLD,
    fontSize: RFValue(16),
    color: BLACK,
    textTransform: 'uppercase',
  },
  page_header_subtitle: {
    fontFamily: REGULAR,
    fontSize: RFValue(10),
    color: WHITE,
    marginTop: -8,
  },
  page_header_btn_back: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    backgroundColor: WHITE,
    borderRadius: 100,
  },
  page_header_btn_add: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    backgroundColor: WHITE,
    borderRadius: 100,
  },
  page_header_btn_back_icon: {
    fontSize: 20,
    color: PRIMARY,
  },
  //   Page Body
  page_body: {
    flex: 1,
    backgroundColor: WHITE,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    // paddingVertical: 40,
    paddingHorizontal: 30,
    paddingBottom: 60,
  },
  page_body_title: {
    fontFamily: BOLD,
    fontSize: RFValue(24),
    color: BLACK,
  },
  page_body_subtitle: {
    fontFamily: SEMI,
    fontSize: RFValue(16),
    color: BLACK,
  },
  page_body_detail: {
    fontFamily: REGULAR,
    fontSize: RFValue(12),
    color: BLACK_2,
  },
  social_btn: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY,
    marginHorizontal: 10,
  },
  social_btn_icon: {
    fontSize: RFValue(15),
    color: WHITE,
  },
  message_modal: {
    width: '90%',
    minHeight: 150,
    backgroundColor: WHITE,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  message_modal_btn_close: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 5,
  },
  message_modal_btn_close_icon: {
    fontSize: RFValue(15),
    color: WHITE,
  },
  message_modal_content: {
    marginVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message_modal_icon_error_container: {
    width: 80,
    height: 80,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0000',
  },
  message_modal_icon_success_container: {
    width: 80,
    height: 80,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4BB543',
  },
  message_modal_icon: {
    fontSize: RFValue(25),
    color: WHITE,
  },
  message_modal_title: {
    fontSize: RFValue(20),
    color: BLACK_1,
    fontFamily: BOLD,
    marginTop: 10,
  },
  message_modal_message: {
    fontSize: RFValue(12),
    color: BLACK_3,
    fontFamily: REGULAR,
    marginTop: -7,
    textAlign: 'center',
  },
  order_no_data: {
    width: '100%',
    marginVertical: 20,
    textAlign: 'center',
    fontSize: RFValue(16),
    color: BLACK_1,
    fontFamily: BOLD,
  },
  btn_header_auth: {
    position: 'absolute',
    top: 25,
    left: 25,
  },
  btn_header_auth_icon: {
    fontSize: RFValue(22),
    color: BLACK,
  },
  auth_input_button: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
  auth_input_button_icon: {
    fontSize: RFValue(18),
    color: PRIMARY,
  },
  text_regular: {
    fontSize: RFValue(12),
    color: BLACK_2,
    fontFamily: REGULAR,
  },
  btn_link: {
    marginVertical: 5,
    textAlign: 'center',
  },
  btn_link_text: {
    textDecorationLine: 'underline',
    color: PRIMARY,
    textAlign: 'center',
    fontFamily: REGULAR,
  },
  home_search_bar: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  home_search_bar_container: {
    width: '100%',
    backgroundColor: WHITE,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    top: -30,
    borderRadius: 10,
    elevation: 5,
  },
  home_search_bar_icon: {
    fontSize: RFValue(20),
    color: BLACK,
    position: 'absolute',
    left: 15,
  },
  home_search_bar_input: {
    flex: 1,
    height: 50,
    fontFamily: REGULAR,
    fontSize: RFValue(14),
    paddingHorizontal: 10,
    paddingLeft: 45,
    color: BLACK,
    marginTop: 4,
  },
  history_item: {
    width: 150,
    height: 150,
    elevation: 3,
    marginRight: 20,
  },
  history_item_img: {
    borderRadius: 10,
    width: '100%',
    height: 120,
    objectFit: 'contain',
  },
  history_item_title: {
    fontFamily: SEMI,
    fontSize: RFValue(12),
    color: BLACK_1,
    textAlign: 'center',
    width: 150,
    flexShrink: 1,
    marginTop : 10,
  },

});
export default styles;
export {REGULAR, BOLD, SEMI, MEDIUM, WIDTH, HEIGHT};
