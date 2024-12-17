import { View, Text, StyleSheet } from "react-native";
import {Avatar} from "react-native-elements";
import { BarChart } from 'react-native-gifted-charts';
import axios from 'axios';
import { useEffect, useState } from "react";
import { isLoaded } from "expo-font";


interface BarData {
  value: number;
  label: string;
}

export default function Home(){

  const [barData, setBarData] = useState<BarData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
    .get('https://api.edamam.com/api/nutrition-data?app_id=3c56db6d&app_key=47eb0a72b8ee6835ac875de011433395&nutrition-type=logging&ingr=chicken')
.then(response => {
  console.log(response.data.healthLabels);

  // Declare the Nutrition data containing Calories, Carbohydrates, Protein, Fat 
const nutritionData = [
  {
    name: 'Calories',
    amount: response.data.calories,
    unit: 'kcal',
    
  },
  {
    name: 'Fat',
    amount: response.data.totalNutrients.FAT.quantity,
    unit: 'g',
  },
  {
    name: 'Carbs',
    amount: response.data.totalNutrients.CHOCDF.quantity,
    unit: 'g',
  },
  {
    name: 'Protein',
    amount: response.data.totalNutrients.PROCNT.quantity,
    unit: 'g',
  },
];
const barData = nutritionData.map(item => ({
  value: item.amount,
  label: item.name
}));

setBarData(barData);
setLoading(false);
console.log(barData)
})
.catch(error => {
  console.error(error);
});

  }, []);

if (loading) {
    return (
    <View style={styles.container}>
    <Text>Loading...</Text>
  </View>
    )
  }
    return (
    
      <View style={styles.container}>
        <View>
        <Avatar rounded size={'xlarge'} icon={{ name: 'home', type: 'font-awesome' }} containerStyle={styles.avatar} />
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome User</Text>
        </View>
        <BarChart
            showFractionalValues
            showYAxisIndices
            showXAxisIndices
            hideRules
            noOfSections={5}
            data={barData}
            showGradient
            frontColor={'#1B6BB0'}
            gradientColor={'#FFEEFE'}
            backgroundColor={'#FECF9E'}
        />
      </View>  
    );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 20,
    alignSelf: 'center',	
  },
    container: {
        flex: 0,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
      },
    
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center'
      },
      contentContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start' 
       },
})
