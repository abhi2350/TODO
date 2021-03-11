import 'react-native-gesture-handler';
import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text, View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TodoMap from "./src/Screens/TodoMap.js";
import ToDoListing from "./src/Screens/ToDoListing.js";
import {createStackNavigator} from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GLOBAL_STYLES } from './global_styles';
import { APP_LEVEL_CONSTANTS } from './app_level_constants.js';

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="TodoListing"
        component={ToDoListing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TodoMap"
        component={TodoMap}
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={GLOBAL_STYLES.top_navbar_leftButton}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('./img/back_icon.png')} />
            </TouchableOpacity>
          ),
          headerTitle: ''
        })}
      />
    </Stack.Navigator>
  );
};

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <SafeAreaProvider>
            {Auth()}
        </SafeAreaProvider>
      </NavigationContainer>
    )
  }
}