"use client"

import { View, Text, ScrollView } from "react-native"

const PRIMARY = "#0084ff"
const WHITE = "#FFFFFF"
const BLACK = "#000000"
const GRAY = "#F5F5F5"

export default function AndroidNetworkConfig() {
  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: WHITE }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Android React Native Network Configuration
      </Text>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>1. Android Manifest Permissions</Text>
          <Text style={{ marginBottom: 8 }}>
            Make sure your android/app/src/main/AndroidManifest.xml includes these permissions:
          </Text>
          <View style={{ backgroundColor: GRAY, padding: 12, borderRadius: 8, marginBottom: 16 }}>
            <Text style={{ fontFamily: "monospace", fontSize: 12 }}>
              {`<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />`}
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
            2. Network Security Config (Android 9+)
          </Text>
          <Text style={{ marginBottom: 8 }}>
            For Android 9 and above, you may need to allow cleartext traffic. Add this to your AndroidManifest.xml:
          </Text>
          <View style={{ backgroundColor: GRAY, padding: 12, borderRadius: 8, marginBottom: 16 }}>
            <Text style={{ fontFamily: "monospace", fontSize: 12 }}>
              {`<application
    android:usesCleartextTraffic="true"
    android:networkSecurityConfig="@xml/network_security_config"
    ...>
</application>`}
            </Text>
          </View>

          <Text style={{ marginBottom: 8 }}>Create android/app/src/main/res/xml/network_security_config.xml:</Text>
          <View style={{ backgroundColor: GRAY, padding: 12, borderRadius: 8, marginBottom: 16 }}>
            <Text style={{ fontFamily: "monospace", fontSize: 12 }}>
              {`<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">api.openai.com</domain>
        <domain includeSubdomains="true">rapidapi.com</domain>
        <domain includeSubdomains="true">skyscanner44.p.rapidapi.com</domain>
        <domain includeSubdomains="true">booking-com18.p.rapidapi.com</domain>
        <domain includeSubdomains="true">kiwi-com-cheap-flights.p.rapidapi.com</domain>
        <domain includeSubdomains="true">tripadvisor16.p.rapidapi.com</domain>
    </domain-config>
</network-security-config>`}
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>3. Metro Configuration</Text>
          <Text style={{ marginBottom: 8 }}>Update your metro.config.js to handle network requests properly:</Text>
          <View style={{ backgroundColor: GRAY, padding: 12, borderRadius: 8, marginBottom: 16 }}>
            <Text style={{ fontFamily: "monospace", fontSize: 12 }}>
              {`const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  resolver: {
    assetExts: ['bin', 'txt', 'jpg', 'png', 'json'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);`}
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>4. Debug Network Issues</Text>
          <Text style={{ marginBottom: 8 }}>To debug network issues in your Android app:</Text>
          <View style={{ marginLeft: 16, marginBottom: 16 }}>
            <Text style={{ marginBottom: 4 }}>• Enable network debugging in React Native</Text>
            <Text style={{ marginBottom: 4 }}>• Use Chrome DevTools for network inspection</Text>
            <Text style={{ marginBottom: 4 }}>• Check Android Studio logcat for detailed errors</Text>
            <Text style={{ marginBottom: 4 }}>• Test on both emulator and physical device</Text>
          </View>
        </View>

        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>5. Testing Commands</Text>
          <Text style={{ marginBottom: 8 }}>Use these commands to test your app:</Text>
          <View style={{ backgroundColor: GRAY, padding: 12, borderRadius: 8, marginBottom: 16 }}>
            <Text style={{ fontFamily: "monospace", fontSize: 12 }}>
              {`# Clean and rebuild
cd android && ./gradlew clean && cd ..
npx react-native run-android

# Enable network debugging
npx react-native log-android

# Test on device
adb devices
npx react-native run-android --device`}
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>6. Common Android Network Issues</Text>
          <View style={{ marginLeft: 16, marginBottom: 16 }}>
            <Text style={{ marginBottom: 8, fontWeight: "bold" }}>Issue: "Network request failed"</Text>
            <Text style={{ marginBottom: 4 }}>• Check internet permissions in manifest</Text>
            <Text style={{ marginBottom: 4 }}>• Verify device has internet connection</Text>
            <Text style={{ marginBottom: 4 }}>• Test with simple HTTP request first</Text>
            <Text style={{ marginBottom: 12 }}></Text>

            <Text style={{ marginBottom: 8, fontWeight: "bold" }}>Issue: "Cleartext HTTP traffic not permitted"</Text>
            <Text style={{ marginBottom: 4 }}>• Add network security config</Text>
            <Text style={{ marginBottom: 4 }}>• Enable cleartext traffic in manifest</Text>
            <Text style={{ marginBottom: 12 }}></Text>

            <Text style={{ marginBottom: 8, fontWeight: "bold" }}>Issue: SSL/TLS errors</Text>
            <Text style={{ marginBottom: 4 }}>• Check device date and time</Text>
            <Text style={{ marginBottom: 4 }}>• Update Android system WebView</Text>
            <Text style={{ marginBottom: 4 }}>• Test on different Android versions</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
