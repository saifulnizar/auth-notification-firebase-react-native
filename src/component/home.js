import React, { useEffect, useContext, useState, useRef } from 'react';
import { Block , Text, Button } from 'galio-framework';
import { TouchableOpacity, Dimensions, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import theme from '../theme';
import { AuthContext } from '../contex/AuthContext';
import { TaskContext } from '../contex/TaskContext';



const { width, height } = Dimensions.get("screen");

const BASE_SIZE = theme.SIZES.BASE;
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const Home = () => {

	const navigation = useNavigation();
	const { logout, user } = useContext(AuthContext);
	const { get, data } = useContext(TaskContext);
	const [refreshing, setRefreshing] = useState(false);

	React.useEffect(() => {

	    if(!data){
	      onRefresh();        
	    } 


  	}, []);

	const onRefresh = React.useCallback(() => {
	    setRefreshing(true);
	    get();
	    wait(3000).then(() => setRefreshing(false));
  	}, []);

	return (
		<Block flex >	
			<Block  middle style={{marginTop:0}} >
				<Text size={30} >Hai, {user.username.username}</Text>
				  
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
				  	onPress={() => navigation.navigate('Task')}
				  >
				  	<Text center color={theme.COLORS.WHITE} >Assignment</Text>
				  </TouchableOpacity>

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
				  	onPress={() => navigation.navigate('Edit')}
				  >
				  	<Text center color={theme.COLORS.WHITE} >Edit Profil</Text>
				  </TouchableOpacity>

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
                    onPress={() => logout()}
                  >
                    <Text center color={theme.COLORS.WHITE} >Logout</Text>
                  </TouchableOpacity>

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
                    onPress={() => alert()}
                  >
                    <Text center color={theme.COLORS.WHITE} >Coba</Text>
                  </TouchableOpacity>

            </Block>

            <ScrollView style={{flex: 1}}  showVerticalScrollIndicator={false}
        		refreshControl={
              	<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          		}
      		>
      		<Block middle>
	      		{

	      			data ? data.length > 0 ? data.map((row, index) => {

	      				return (
	      					<TouchableOpacity key={index} style={styles.cardDeviden} >
	      						<Text>{row.text}</Text>
	      					</TouchableOpacity>
	      				);

	      			}) : (
	      				<Text middle >Belum ada Task</Text>
	      			) : null

	      		}
	      	</Block>
      		</ScrollView>

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
    width : width / 1.2
  },

});

export default Home;