import styles from '../../../styling/css/Style';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Feather from "react-native-vector-icons/Feather";

export default function TermsCondition({navigation}) {
  return (
    <>
      <View style={styles.auth_container}>
        <View style={styles.page_header}>
          <Text style={styles.page_header_title}>Allmänna Villkor</Text>
          <TouchableOpacity style={styles.page_header_btn_back} onPress={()=> navigation.goBack()}>
            <Feather name={'chevron-left'} style={styles.page_header_btn_back_icon} />
          </TouchableOpacity>
        </View>
        <View style={[styles.page_body, {paddingBottom: 10}]}>
          <ScrollView style={{flexGrow: 1}}>
            <Text style={styles.page_body_detail}>
              Dessa villkor reglerar dina beställningar hos
              tvattkorgen.se(hädanefter “tvattkorgen”, “Vi” eller “Oss”) och
              gäller för alla transaktioner som görs via vår hemsida
              www.tvattkorgen.se. Genom att använda vår tjänst och göra en
              beställning ingår du ett avtal med oss, och du godkänner dessa
              villkor. Vid eventuella oklarheter mellan dessa villkor och det
              avtal du ingår, ska avtalet ha företräde. Se till att du noggrant
              läser igenom och förstår villkoren innan du slutför din
              beställning.
            </Text>
            <Text style={styles.page_body_detail}>
              För att göra en beställning hos oss måste du vara minst 18 år och
              inte stå under förmyndarskap.
            </Text>
            <Text style={styles.page_body_subtitle}>Priser och Betalning</Text>
            <Text style={styles.page_body_detail}>
              Alla priser anges i svenska kronor (SEK). Betalning sker via vår
              betalningsmodul på hemsidan eller via faktura som skickas till
              dig. Det pris du betalar är det som gäller vid
              beställningstillfället, även om priset ändras senare. Det är ditt
              ansvar att säkerställa att informationen om betalkortet är
              korrekt.
            </Text>
            <Text style={styles.page_body_detail}>
              Alla priser inkluderar moms och övriga kostnader. Om det finns
              rabatter, dras dessa vid kassan. Vid betalning via faktura görs en
              kreditprövning. Om betalningen inte görs i tid, tillkommer ränta
              enligt räntelagen, samt en påminnelseavgift på 60 SEK. Vid
              eventuella inkassoåtgärder tillkommer kostnader enligt gällande
              lag.
            </Text>
            <Text style={styles.page_body_detail}>
              För tvätt som överstiger den angivna vikten (övervikt) debiteras
              80 SEK per kg.
            </Text>
            <Text style={styles.page_body_subtitle}>Beställning</Text>
            <Text style={styles.page_body_detail}>
              När du slutför din beställning godkänner du att köpa de produkter
              eller tjänster som valts. Beställningen är inte bindande för
              Tvattkorgen förrän vi har godkänt den. Tvattkorgen förbehåller sig
              rätten att annullera eller inte godkänna en beställning om:
            </Text>
            <Text style={styles.page_body_subtitle}>Ansvar</Text>
            <Text style={styles.page_body_detail}>
              Risk för tvätten övergår till Tvattkorgen vid upphämtning och till dig vid återlämning. Om du begär att tvätten lämnas utanför dörren, övergår risken till dig när den återlämnas.
              Vid skador som orsakas av brand, inbrott eller vattenläckage hos tvätteriet, täcks din egendom av din privata hemförsäkring. Tvattkorgen ansvarar inte om du saknar en hemförsäkring.
            </Text>
            <Text style={styles.page_body_subtitle}>Ångerrätt</Text>
            <Text style={styles.page_body_detail}>
              Du kan ångra din beställning upp till åtta timmar innan beställd upphämtning utan kostnad. Om avbeställningen sker inom de sista åtta timmarna innan upphämtning debiteras en avgift på 80 SEK.
            </Text>
            <Text style={styles.page_body_subtitle}>Reklamation</Text>
            <Text style={styles.page_body_detail}>
              Om du är missnöjd med vår service ska du lämna en reklamation inom fyra dagar efter att tvätten har återlämnats. För reklamation måste du returnera det defekta plagget till oss för bedömning.
            </Text>
            <Text style={styles.page_body_subtitle}>Kontakt</Text>
            <Text style={styles.page_body_detail}>
              Om du har frågor kring dessa villkor, kontakta oss via Email:info@tvattkorgen.se.
            </Text>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
