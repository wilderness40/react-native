import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  Image,
  TouchableHighlight,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

function SettingsScreen({navigation}) {
  const [userInfo, setUserInfo] = useState(null);
  const [isSigningIn, setIsSigningIn] = useState(false); // 로그인여부

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
        console.log('사용자 사진', userInfoFromGoogle.user.photo);
        setUserInfo(userInfoFromGoogle);
        setIsSigningIn(true);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('sign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');
      } else {
        console.log('some other error happened');
      }
    }
  };
  const signOutWithGoogle = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
      setIsSigningIn(false);
    } catch (error) {
      console.error('failed to logout, error:', error);
    }
  };

  useEffect(() => {
    googleSigninConfigure();
  }, []);

  return (
    <SafeAreaView style={styles.block}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
      <View>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle}
          disabled={isSigningIn}
          style={styles.signInBtn}
        />
        {userInfo && userInfo.user && (
          <View style={styles.profileInfo}>
            <View>
              <Image
                source={{uri: userInfo.user.photo}}
                style={styles.profileImg}
              />
            </View>
            <View style={styles.profileText}>
              <Text style={[styles.info, {fontWeight: 'bold', fontSize: 20}]}>
                {userInfo.user.name}
              </Text>
              <Text style={styles.info}>{userInfo.user.email}</Text>
            </View>
          </View>
        )}
        <TouchableHighlight
          onPress={signOutWithGoogle}
          style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.logoutBtn,
              {backgroundColor: userInfo ? '#a8c8ffff' : 'lightgrey'},
            ]}>
            <Text style={styles.logoutBtnText}>구글 로그아웃</Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
  },
  signInBtn: {
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  profileInfo: {
    marginVertical: 20,
    marginHorizontal: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#eee',
  },
  profileText: {
    borderRadius: 10,
    padding: 20,
  },
  info: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logoutBtn: {
    flex: 1,
    height: 35,
    borderRadius: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoutBtnText: {
    color: '#fff',
    letterSpacing: 3,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default SettingsScreen;