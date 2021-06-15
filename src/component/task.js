import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../contex/AuthContext';
import { Block , Text, Button } from 'galio-framework';
import { TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TaskContext } from '../contex/TaskContext';
import theme from '../theme';

const BASE_SIZE = theme.SIZES.BASE;
const { width, height } = Dimensions.get("screen");

const Task = () => {

	const { dataUser, getUser } = useContext(TaskContext);
	const navigation = useNavigation();
	React.useEffect(() => {
	  	if (! dataUser ){
	      getUser()
	  	} 
  	}, []);


	return (
		<Block flex >	
			<Block  middle style={{marginTop:0}} >
				<Text size={30} >Assigment</Text>
			</Block>
			<Block middle style={{ marginTop: 20 }} >
			{
				dataUser ? 
					dataUser.map((row , index) => {
						return (
							<TouchableOpacity key={index} style={styles.cardDeviden} 
								onPress={ () => navigation.navigate('Tambah', { id: row.id, nama: row.username})  }
							>
								<Text size={18} >{row.username}</Text>
							</TouchableOpacity>
						);
					})
				: null
			}
            </Block>
		</Block>
	);
}

const styles = StyleSheet.create({
   cardDeviden: {
    borderRadius: BASE_SIZE,
    borderColor: 'transparent',
    marginHorizontal: BASE_SIZE / 3,
    marginVertical: BASE_SIZE / 8,
    paddingVertical: BASE_SIZE ,
    paddingHorizontal: BASE_SIZE ,
    backgroundColor: theme.COLORS.WHITE,
    width : width / 2
  },

});

export default Task;