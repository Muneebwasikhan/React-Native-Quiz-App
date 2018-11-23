import React from 'react';
import { Alert,Button, View, StyleSheet } from 'react-native';
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
  // onPress={() => {Alert.alert("Clicked")}}
  title="Start Mcqs"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
      </View>
    );
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
