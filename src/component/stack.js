import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { TaskProvider } from '../contex/TaskContext';
import Home from './home';
import Task from './task';
import Edit from './edit';
import TambahTask from './tambahTask';

const Stack = createStackNavigator();

const coba = {
	gestureEnabled: true, // If you want to swipe back like iOS on Android
    ...TransitionPresets.SlideFromRightIOS
};

const StackRoot = () => {

	return (
	<TaskProvider>
		<Stack.Navigator initialRouteName="Home" >
			<Stack.Screen name="Home" component={Home} options={coba} />
			<Stack.Screen name="Task" component={Task} options={coba} />
			<Stack.Screen name="Edit" component={Edit} options={coba} />
			<Stack.Screen name="Tambah" component={TambahTask} options={coba} />
		</Stack.Navigator>
	</TaskProvider>
	);

}

export default StackRoot;