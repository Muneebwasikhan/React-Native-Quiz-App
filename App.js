import React from 'react'
import { Alert,Button, View, StyleSheet,Text } from 'react-native'
import CameraScreen from './screens/camera'
import QuizScreen from './screens/quiz'
// import { createStackNavigator, createAppContainer } from "react-navigation";




// const RootStack = createStackNavigator({
//   CameraScreen,

// })


export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      home : false,
      startMcqs: false,
      started: false
    }
  }

  startMcqs = () => {
    this.setState({startMcqs: true});
    console.log("start mcqs");
  }
  render() {
    const {home,startMcqs,started} = this.state;

    if(!home){
      return (
         
        <View style={styles.container}>
        <Button
    onPress={() => {this.setState({home:true})}}
    title="Login by face detector"
    color="#841584"
    accessibilityLabel="Learn more about this purple button"
  />
      </View>
      
        );
    }
    else if(home && !startMcqs){
      return ( <CameraScreen startMcqs={this.startMcqs} />
      
        ); 
    }
    else if(home && startMcqs && !started){
      return ( 
        <View style={styles.container}>
        <Button
    onPress={() => {this.setState({started:true})}}
    title="Start Quiz"
    color="#841584"
    accessibilityLabel="Learn more about this purple button"
  />
      </View>
      
        ); 
    }
    else if(home && startMcqs && started){
      return ( 
        
  <QuizScreen />
      
        ); 
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
