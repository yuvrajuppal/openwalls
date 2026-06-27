import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Loginpage from '../pages/Loginpage';
import SignupPage from '../pages/SignupPage';

export type RootStackParamList = {
  Login: undefined
  Signup: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Loginpage} />
        <Stack.Screen name="Signup" component={SignupPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;

const styles = StyleSheet.create({});
