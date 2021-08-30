import React from 'react';

import {
  Pressable,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

const Home = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  function openGallery() {
    ImagePicker.openPicker({
      waitAnimationEnd: true,
      width: 400,
      height: 400
    }).then(image => {
      console.log(image);
      navigation.navigate("Detail", {uri: image})
    }).catch(e => {
      alert(e);
    })
  }

  function openCamera() {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      mediaType: 'photo',
      avoidEmptySpaceAroundImage: true
    }).then(image => {
      navigation.navigate("Detail", {uri: image})
      console.log(image);
    }).catch(e => {
      alert(e);
    })
  }

  return (
    <SafeAreaView >
      <View style={{ height: '30%', backgroundColor: '#E2F0FF', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
        <Image
          style={{ width: 300, height: 100, resizeMode: 'contain', padding: 20 }}
          source={require('../assets/logo.png')}
        />
        <Text style={styles.sectionTitle}>OCR-Demo</Text>
      </View>
      <View style={{ height: '70%', backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', padding: 30, borderRadius: 10 }}>
        <Pressable
          onPress={() => {
            openGallery()
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#086799' : '#46C0D2'
            },
            styles.wrapperCustom
          ]}>
          {({ pressed }) => (
            <Text style={styles.text}>
              Select Photos
            </Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            openCamera()
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#086799' : '#46C0D2'
            },
            styles.wrapperCustom
          ]}>
          {({ pressed }) => (
            <Text style={styles.text}>
              Take a Photos
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 18,
    color: '#FFFFFF'
  },
  wrapperCustom: {
    width: 200,
    height: 80,
    borderRadius: 10,
    padding: 6,
    margin: 20,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
export default Home;