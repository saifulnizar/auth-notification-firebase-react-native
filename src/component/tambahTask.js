import React, { useContext, useState } from 'react';
import { Block, Text, Input } from 'galio-framework';
import { TouchableOpacity, Dimensions, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {apiConfig} from '../global'; 
import { TaskContext } from '../contex/TaskContext';
import theme from '../theme';

const { width, height } = Dimensions.get("screen");


const TambahTask = ({route}) => {

	const navigation = useNavigation();
	const { addTask, user } = useContext(TaskContext);
	const [text, setText] = useState('');
	
	function action(){
		// addTask(user.username.id, route.params.id, text);

				axios.defaults.headers.common['username'] = `${user.username.username}`;
				axios.defaults.headers.common['password'] = `${user.username.password}`;
				axios.post(`${apiConfig.baseUrl}/add`, {
					id_from : user.username.id, 
					id_to : route.params.id, 
					text
				})
				.then(response => {
					
				
					// if (response.data.message){

						Alert.alert('Success, Menyimpan', 'Data berhasil di inputkan',
								[
								{
									text: "ok",
									onPress: () => navigation.goBack()
								
								}
								]
								);
					

					// } else {
						
					// 	Alert.alert('Gagal ', 'Task gagal');
					
						
					// }
					
				})
				.catch(error => {
				
					console.log(error.response)
					// return false
					
				})


	}

	return (
		<Block flex>

			<Block style={{ marginHorizontal: 20 }} >
				<Input
	              right
	              value={route.params.nama}
	              placeholder="Username"
	              icon="user"
	              family="antdesign"
	              iconSize={14}
	              iconColor={theme.COLORS.BLACK}
	              label="Kepada"
            	/>

            	<Input 
            		label="Isi"
            		onChangeText={text => setText(text)}
            	/>

            	{
            		text ? (
            			<Block  middle style={{marginTop:10}} >
		            		<TouchableOpacity
		            			style={{
		            				paddingVertical: 10 / 1.5,
								    paddingHorizontal: 10 / 1.5,
								    borderColor: theme.COLORS.DRIBBBLE,
								    borderRadius: 20 / 2,
								    borderWidth: 1.5,
								    width: width / 2,
								    backgroundColor: theme.COLORS.DRIBBBLE,
								    marginBottom: 10
		            			}}

		            			onPress={() =>  action() }
		            		>
		            			<Text center color={theme.COLORS.WHITE} >Kirim</Text>
		            		</TouchableOpacity>
            			</Block>
            		) : null
            	}

			</Block>

		</Block>
	);

}

export default TambahTask;