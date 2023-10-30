import React, { useEffect } from 'react';
import {View, Button, StyleSheet, Alert} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

function LoginButton({navigation}) {
  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      webClientId:
        '1023322995193-vka655hv2goqrf585ejetodagaungvi2.apps.googleusercontent.com',
    });
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfoFromGoogle = await GoogleSignin.signIn();
      if (userInfoFromGoogle) {
        console.log('사용자 연락처', userInfoFromGoogle.user);
        navigation.navigate('App');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow');
        Alert.alert('로그인을 취소하셨습니다.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('sign in is in progress already');
        Alert.alert('로그인이 이미 진행중입니다.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');
        Alert.alert('구글 플레이 서비스를 사용할 수 없습니다.');
      } else {
        console.log('some other error happened');
        Alert.alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  useEffect(() => {
    googleSigninConfigure()
  },[])

  return (
    <View style={styles.buttonWrapper}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInWithGoogle}
        disabled={false}
        style={styles.signInBtn}
      />
    </View>
  );
}

export default LoginButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 100,
  },
  signInBtn: {
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
