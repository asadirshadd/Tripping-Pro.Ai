import React from "react";
import { View, Text, Image } from "react-native";
import styles from "../../styling/css/Style";

function SplashScreen() {
    return (
        <View style={styles.splash_container}>
            <View style={styles.splash_image_container}>
                <Image source={require("../../assets/img/logo.png")} style={styles.splash_image} />
            </View>
        </View>
    );
}

export default SplashScreen;
