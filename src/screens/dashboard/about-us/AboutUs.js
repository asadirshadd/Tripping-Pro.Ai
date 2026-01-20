import styles from '../../../styling/css/Style';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function AboutUs({navigation}) {
  return (
    <>
      <View style={styles.auth_container}>
        <View style={styles.page_header}>
          <Text style={styles.page_header_title}>About Us</Text>
          <TouchableOpacity
            style={styles.page_header_btn_back}
            onPress={() => navigation.goBack()}>
            <Feather
              name={'chevron-left'}
              style={styles.page_header_btn_back_icon}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.page_body, {paddingBottom: 10}]}>
          <ScrollView style={{flexGrow: 1}}>
            <Text style={styles.page_body_subtitle}>Om oss</Text>
            <Text style={styles.page_body_detail}>
              Under våra 30 år i tvätteribranschen har vi strävat efter att
              hålla hög kvalité, bra priser och utmärkt service. Vi lägger stor
              vikt vid att lyssna på dig och anpassa tvätten efter dina
              önksemål.Toppmodern utrustning och avancerade tygskötseltekniker
              kan leverera fräscha, rena plagg, men det krävs även en personlig
              känsla för att skapa helt nöjda kunder. Vi vill vara ditt
              favorittvätteri.
            </Text>
            <Text style={styles.page_body_subtitle}>Privatpersoner</Text>
            <Text style={styles.page_body_detail}>
              Vår målsättning är att våra kunder ska ha en bekymmerslös tvätt.
              Vår service håller hög kvalité och vi strävar alltid att ge våra
              kunder ett vänligt bemötande och tillmötesgå våra kunders behov.
              Hittils verkar vår affärsidé ha fungerat, vi har många trogna
              kunder. Vår förhoppning är att du också ska bli en av dem.
            </Text>
            <Text style={styles.page_body_subtitle}>Företag</Text>
            <Text style={styles.page_body_detail}>
              Vi är verksamma inom ett flertal branscher, inklusive hotelltvätt,
              industritvätt, restaurangtvätt m.m. Vi erbjuder hög kvalitet och
              snabb leverans. I vår bransch får ingenting försvinna eller komma
              för sent, därför satsar vi mycket på logistik. Våra kunder
              sträcker sig från företag med stora volymer till kyrkor med
              enstaka värdefulla material daterade ända från 1800-talet.
              Välkommen in och prova oss!
            </Text>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
