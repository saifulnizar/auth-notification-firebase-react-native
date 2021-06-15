import React, { useEffect, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { View , ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from './contex/AuthContext';
import { Block , Text, Button } from 'galio-framework';
import Landing from './screen/stack';

import NotifService from '../NotifService';

import StackRoot from './component/stack';

export default function Router() { 

	const { user, setUser, loading, setLoading, token_devices, setToken } = useContext(AuthContext);

	const [registerToken, setRegisterToken] = useState('');
	const [fcmRegister, setFcmRegister] = useState(false);

	useEffect(() => {

  		AsyncStorage.getItem('user')
	      .then(userString => {
	        if (userString) {
	     
	          userObject = JSON.parse(userString)
	          setUser(userObject);
	        }
	        setLoading(false);
	      })
	      .catch(err => {
	        console.log(err);
	      })

	if(!token_devices) {

	    AsyncStorage.getItem('token')
	      .then(userToken => {
	        if (userToken) {
	   
	          setToken(JSON.parse(userToken));
	        }
	        
	      })
	      .catch(err => {
	        console.log(err);
	      })
	}      


  	}, []);


  	// console.log(token_devices.token_device.token)
	  
	  
	  const onRegister = (token) => {
	    setRegisterToken(token.token)
	    setFcmRegister(true)
	  };

	  const onNotif = (notif) => {
	    // Alert.alert(notif.title, notif.message);
	    notification.localNotif(notif);
	    // console.log(notif.id_user)
	  };

	   const notification = new NotifService(onRegister, onNotif);

	  const handlePerm = (perm) => {
	    Alert.alert('Permision', JSON.stringify(perms));
	  };

  	
  	if (loading) {
	    return (
	      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
	        <ActivityIndicator size="large" color="#0000ff"  />
	      </View>
	    );
	 }

	return (
		<NavigationContainer>
		{user ?  <StackRoot />  : <Landing />}
		</NavigationContainer>
	);

}