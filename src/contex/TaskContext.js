import React, { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';
import {apiConfig} from '../global'; 
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './AuthContext';

export const TaskContext = React.createContext({});

export const TaskProvider = ({children}) => {

	// const navigation = useNavigation();
	const { user, logout } = useContext(AuthContext);
	const [data , setData] = useState(false);
	const [dataUser, setDataUser] = useState(false);

	

	function actionLogout() {
		logout();
	}

	return (
		<TaskContext.Provider  value={{
			data, user, dataUser,
			getUser: () => {
				axios.defaults.headers.common['username'] = `${user.username.username}`;
				axios.defaults.headers.common['password'] = `${user.username.password}`;
				axios.get(`${apiConfig.baseUrl}/user`)
				.then(response => {
					setDataUser(response.data);
				})
				.catch(error => {
					console.log(error.response)
					
				})
			},

			editUser:(id, username, password) => {
				axios.defaults.headers.common['username'] = `${user.username.username}`;
				axios.defaults.headers.common['password'] = `${user.username.password}`;
				axios.post(`${apiConfig.baseUrl}/edit`, {
					id,
					username,
					password,
				})
				.then(response => {
					
					if (response.data.message){

						Alert.alert('Sukses', `silakan login kembali`, [
							{
								text: "Ok",
								onPress: () => actionLogout()
							}
						]);

					} else {
						
						Alert.alert('Gagal ', 'Update gagal');
						
					}


					
				})
				.catch(error => {
					
					// console.log(error.response)
					const key = Object.keys(error.response.data)[0];
            		setError(error.response.data[key][0]);
					
				})

			},

			get:() => {
				axios.defaults.headers.common['username'] = `${user.username.username}`;
				axios.defaults.headers.common['password'] = `${user.username.password}`;
				axios.get(`${apiConfig.baseUrl}/task`)
				.then(response => {
					setData(response.data);
				})
				.catch(error => {
					console.log(error.response)
					
				})
			},

			addTask:(id_from, id_to, text) => {
				axios.defaults.headers.common['username'] = `${user.username.username}`;
				axios.defaults.headers.common['password'] = `${user.username.password}`;
				axios.post(`${apiConfig.baseUrl}/add`, {
					id_from, id_to, text
				})
				.then(response => {
					// console.log(response.data)
				
					if (response.data.message){

						Alert.alert('Sukses ', 'Task berhasil');
						// return true;

					} else {
						
						Alert.alert('Gagal ', 'Task gagal');
						// return false;
						
					}
					
				})
				.catch(error => {
				
					console.log(error.response)
					// return false
					
				})

			}
		}} >
			{children}
		</TaskContext.Provider>
	);

}