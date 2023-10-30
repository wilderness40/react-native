/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
// import LandingScreen from './screens/LandingScreen'
import stackRouter from './StackRouter';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => stackRouter);
