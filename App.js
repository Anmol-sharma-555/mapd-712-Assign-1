import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput , Pressable , Alert ,Switch} from 'react-native';
import React, { useState } from "react";
export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    clearValues()
  }
  const [weight, setWeightValue] = React.useState("");
  const [height, setHeightValue] = React.useState("");
  const [bmi, setBMIValue] = React.useState("N/A");
  const [weightType, setWeightCategory] = React.useState("N/A");
   // Function for error messages when weight and height are not specified
  const errorhandling = () => {
    if(height == "" || weight == "") {
      Alert.alert(
        "Error",
        "Please enter height and weight both.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      return false
    }else{
      return true
    }
  }
  // Function to calculate BMI
  const calculateBMI = () => {
    if(errorhandling()){
      let hValue = parseFloat(height);
      let wValue = parseFloat(weight);
      // When measuring is in Metrics
      if(!isEnabled){
          // Convert feet to cm
          hValue *= 30.48
          // Convert lbs to kg
          wValue *= 0.453592
      }
      // Convert m to cm
      hValue /= 100
       // Calculating BMI
      const bmiValue = (wValue / (hValue * hValue)).toFixed(2);
      setBMIValue(bmiValue)
      // Underweight = <18.5
      // Normal weight = 18.5–24.9
      // Overweight = 25–29.9
      // Obesity = BMI of 30 or greater
      if(bmiValue<= 18.5){
        setWeightCategory('Under Weight')
      }else if(bmiValue>18.5 && bmiValue < 25){
        setWeightCategory('Normal Weight')
      }else if(bmiValue>=25 && bmiValue < 30){
        setWeightCategory('Over Weight')
      }else{
        setWeightCategory('Obese')
      }
    }
  }
  const clearValues = () => {
    setWeightValue("")
    setHeightValue("")
    setBMIValue("N/A")
    setWeightCategory("N/A")
  }

  return (
    <View style={styles.container} >
      <Text style={styles.heading}>BMI Calculator</Text>
      <Text style={styles.subHeading}>Measurement System : {isEnabled? "Metric" : "Imperial"}</Text>
      <Switch
        trackColor={{false: "#767577", true: "#F6E8EA" }}
        thumbColor={isEnabled ? "#EF626C" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style={styles.label}>Height {isEnabled? "(centimeters) : ": "(feets) : "}</Text>
      <TextInput  style={styles.input}
            placeholder="Enter your Height"
            onChangeText={(text) => setHeightValue(text)}
            value={height}
            keyboardType="numeric"/>
      <Text style={styles.label}>Weight {isEnabled? "(kilograms) : ": "(pounds) : "}</Text>
      <TextInput style={styles.input}
            placeholder="Enter your weight"
            onChangeText={(text) => setWeightValue(text)}
            value={weight}
            keyboardType="numeric"/>
        <Pressable style={styles.button} onPress={()=> calculateBMI()}>
            <Text style={styles.text}>Calculate BMI</Text>
        </Pressable>
        <Text style={styles.label}>BMI : {bmi}</Text> 
        <Text style={styles.label}>Category : {weightType} </Text> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B9FAF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
    margin : 10
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  heading : {
    color: 'black',
    fontSize : 22,
    fontWeight : 'bold',
    margin : 10
  },
  subHeading : {
    color: '#312F2F',
    fontSize : 20,
    fontWeight : 'bold',
    margin : 10
  },
  label : {
    color: 'black',
    fontSize : 16,
    fontWeight : 'bold',
    margin : 10
  },
  input: {
    borderColor: "#b5c6e0",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    height: 40,
    color: "#333",
    margin : 10,
    width: 150,
  },
});
