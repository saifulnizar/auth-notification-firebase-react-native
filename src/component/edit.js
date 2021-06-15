import React, {useContext, useState} from 'react';
import { 
  StyleSheet, 
  Keyboard,
  Dimensions, 
  Image, 
  ImageBackground, 
  Platform, 
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  Button, Block, Icon, Text, galioConfig, GalioFont, Input
} from 'galio-framework';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import theme from '../theme';

import { TaskContext } from '../contex/TaskContext';

const { width, height } = Dimensions.get("screen");
const BASE_SIZE = theme.SIZES.BASE;

const Edit = () => {

    const { user, editUser } = useContext(TaskContext);
    const [username, setUsername] = useState(user.username.username);
    const [password, setPassword] = useState(user.username.password);

 	function action(){
 		editUser(user.username.id, username, password);
 		setUsername('');
 		setPassword('');
 	}

	return (
		<Block safe flex>
      <StatusBar />
       <KeyboardAwareScrollView
          enableOnAndroid={true}
          extraHeight={50} 
          extraScrollHeight={50}
          style={{flex: 1 }} 
        > 
        <Block middle style={styles.header} >
          <Text  muted size={20} 
            style={{
              // fontFamily: 'Lato_700Bold'
              color: theme.COLORS.BLACK
            }} >Edit </Text>
          <Text size={30} 
            style={{
              // fontFamily: 'Lato_700Bold',
              color: theme.COLORS.BLACK,
            }} ></Text>
        </Block>

        <Block flex style={{ width, marginTop: '25%'}}>
          
            <Block flex style={styles.Card}>
              <Block middle flex style={{marginTop: '-20%'}} >
                <Block middle style={styles.avatarContainer}>
                  
                </Block>
              </Block>

              <Block flex={1} width={width * 0.8} style={{marginTop:'10%'}} >
                <Block flex={1} middle>
               
                </Block>
                <Input
                  right
                  type="email-address"
                  placeholder="Username"
                  value={username}
                  icon="user"
                  family="antdesign"
                  iconSize={14}
                  iconColor={theme.COLORS.BLACK}
                  onChangeText={text => setUsername(text)}
                />
                <Input
                  password
                  viewPass
                  placeholder="Password"
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
                <Text
                  color={theme.COLORS.BLACK}
                  size={theme.SIZES.FONT * 0.75}
                  onPress={() => Alert.alert('Not implemented')}
                  style={{ alignSelf: 'flex-end', lineHeight: theme.SIZES.FONT * 2 }}
                >
                  Input kan dengan teliti
                </Text>
                <Block flex middle style={{marginTop:0}} >
                  <TouchableOpacity 
                    onPress={() => action()} 
                    style={styles.button}
                  >
                    <Text center color={theme.COLORS.WHITE}>Update</Text>
                  </TouchableOpacity>
                </Block>
              </Block>
            </Block>
        </Block>
        </KeyboardAwareScrollView>
    
		</Block>
		);
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: BASE_SIZE, 
    paddingVertical: BASE_SIZE, 
    marginTop: BASE_SIZE 
  },
  imageContainer: {
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    borderRadius: BASE_SIZE,
    marginHorizontal: BASE_SIZE,
    marginVertical: BASE_SIZE / 2,

  },
   profileContainer: {
    width: width,
    height: height,
    zIndex: 1
  },
  profileBackground: {
    width: width,

  },
  Card: {
    borderRadius: BASE_SIZE,
    borderColor: 'transparent',
    marginHorizontal: BASE_SIZE,
    marginVertical: BASE_SIZE / 2,
    padding: BASE_SIZE,
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
   avatarContainer: {
    position: "relative",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 0,
  },

  button:{
    paddingVertical: 10 / 1.5,
    paddingHorizontal: 10 / 1.5,
    borderColor: theme.COLORS.DRIBBBLE,
    borderRadius: 20 / 2,
    borderWidth: 1.5,
    width: width / 2,
    backgroundColor: theme.COLORS.DRIBBBLE,
    marginBottom: 10
  }
})

export default Edit;