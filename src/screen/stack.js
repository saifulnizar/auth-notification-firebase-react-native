import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import Login from './login';
import Register from './register';

const Stack = createStackNavigator();


const coba = {
	gestureEnabled: true, // If you want to swipe back like iOS on Android
    ...TransitionPresets.SlideFromRightIOS
};

const Landing = () => {
	
	return (
			<Stack.Navigator initialRouteName="Login">
		        <Stack.Screen name="Login" component={Login} options={coba} />
		        <Stack.Screen name="Register" component={Register} options={coba} />
			</Stack.Navigator>
	);
}

export default Landing;