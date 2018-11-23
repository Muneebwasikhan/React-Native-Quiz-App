import React, { Component } from "react";
import { CheckBox } from "react-native-elements";
import { View, StyleSheet, Text, Button,TouchableWithoutFeedback,Alert } from "react-native";
// import { RadioButtons } from 'react-native-radio-buttons';
import RadioButton from "radio-button-react-native";
class QuizScreen extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: "Option 1",
      show:true,
      num: 0,
      answers:[],
      ansOf: "----------"
    };
  }
  handleOnPress(value) {
    this.setState({value:value})
    console.log(value);
  }

  componentDidMount() {
    this.listData();
  }

  listData = () => {
    const { show,list } = this.state;
    const th = this;
    fetch("https://opentdb.com/api.php?amount=10")
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson.results);
        var arr = myJson.results;
          arr = arr.map(temp => {
            temp.incorrect_answers.splice(Math.floor(Math.random()*(temp.incorrect_answers.length+1)),0,temp.correct_answer);
          return temp;
        });
        th.setState({ list: arr }, () => {
          console.log(arr);
          console.log("list avail now --------");
          
          
        });
      });
  };

  render() {
    const { list,num,show,ansOf,answers } = this.state;
    return (
      <View style={styles.container}>
        {show && list && list.length && (
          <View>
            <Text style={styles.titleText}>{list[num].question}</Text>
            {list[num].incorrect_answers.map(res => {
              
                  return(
                    <View>
                    <RadioButton
                currentValue={this.state.ansOf}
                value={res}
                onPress={() => {
                  this.setState({ansOf: res},() => {
                    console.log(res)
                  });
                
                }}
              >
                <Text style={styles.baseText}>
                  {res}
                </Text>
              </RadioButton>
                  </View>
                  );
                })}
            {num<list.length-1 && <Button 
            onPress={() => {
              console.log("next");
              let ls = answers;
              ls.push(ansOf);
              this.setState({num: num+1,answers: ls,ansOf: "--------------"},() => {
                console.log(answers);
              });
            }}
            title="Next"
            />}
            {num==list.length-1 && <Button 
            onPress={() => {
              console.log("next");
              let ls = answers;
              if(answers.length < list.length){
              ls.push(ansOf);
              this.setState({answers: ls,ansOf: "--------------"},() => {
                console.log(answers);

                var marks = 0;
                list.map((res,ind) => {
                  if(res.correct_answer == answers[ind]){
                    marks++;
                  }
                })

                Alert.alert("completed and you got " + marks + " marks out of " + answers.length);
              });
              }
              
            }}
            title="Finish"
            />}
          </View>
        )}
      </View>
    );
  }
}

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
