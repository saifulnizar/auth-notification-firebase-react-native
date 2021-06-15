import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';
import {apiConfig} from '../global'; 

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {

	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [token_devices, setToken ] = useState(false);
	const [error, setError] = useState(null);

	return (
		<AuthContext.Provider value={{
			user, setUser, loading,  setLoading, error, setToken, token_devices, setError,
			login:(username, password) => {
				setLoading(true)
				axios.post(`${apiConfig.baseUrl}/login`, {
					username,
					password,
					token : token_devices.token_device.token,
				})

				.then(response => {
					
					// console.log(response.data)
					
					if (response.data.message){

						const userResponse = {
							username: response.data.data,
						}
						
						setUser(userResponse);
						setError(null);
						AsyncStorage.setItem('user', JSON.stringify(userResponse));

					} else {
						setError(response.data.data);
					}


					setLoading(false);
				})

				.catch(error => {
					setLoading(false)
					// console.log(error.response)
					const key = Object.keys(error.response.data)[0];
            		setError(error.response.data[key][0]);
					
				})
			},

			register:(username, password) => {
				setLoading(true);
				axios.post(`${apiConfig.baseUrl}/register`, {
					username,
					password,
					token : token_devices.token_device.token,
				})
				.then(response => {
					setLoading(false);
					if (response.data.message){

						Alert.alert('Sukses ', 'Register berhasil , silakan login');

					} else {
						
						Alert.alert('Gagal ', 'Register gagal');
						
					}


					
				})
				.catch(error => {
					setLoading(false)
					// console.log(error.response)
					const key = Object.keys(error.response.data)[0];
            		setError(error.response.data[key][0]);
					
				})
			},


			

			logout:() => {
				setUser(null);
				AsyncStorage.removeItem('user');
			}
		}}>
			{children}
		</AuthContext.Provider>	
	);
}