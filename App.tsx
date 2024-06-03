import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';

const App = () => {
  const [expense, setExpense] = useState('hello');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState<any>([]);
  const [category, setCategory] = useState('food'); // default to 'food'

  const saveExpensesToStorage = async () => {
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  const loadExpensesFromStorage = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem('expenses');
      if (storedExpenses !== null) {
        setExpenses(JSON.parse(storedExpenses));
      }
    } catch (error) {
      console.error('Error loading data', error);
    }
  };

  const handleAddExpense = () => {
    console.log(expense)
    if (expense && amount) {
      setExpenses([
        ...expenses,
        {id: Date.now().toString(), expense, amount, category},
      ]);
      setExpense('');
      setAmount('');
    }
  };

  return (
    <View>
      <Text>Expense Tracker</Text>
      <TextInput defaultValue={expense} onChangeText={ex=>{setExpense(ex)}} placeholder="Enter Expense" />
      <TextInput defaultValue={amount} onChangeText={am=>{setAmount(am)}} placeholder="Enter Amount" />
      
      <Picker
        selectedValue={category}
        onValueChange={itemValue => setCategory(itemValue)}>
        <Picker.Item label="Food" value="food" />
        <Picker.Item label="Travel" value="travel" />
        <Picker.Item label="Entertainment" value="entertainment" />
        <Picker.Item label="Other" value="other" />
        {/* Add more categories as needed */}
      </Picker>
      <Button title="Add" onPress={handleAddExpense} />

      <View>
        {expenses.map((item:any) => (
          <View key={item.id}>
            <Text>
              {item.expense} - ${item.amount} ({item.category})
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
  },
  // ... add more styles as required
});

export default App;
