import 'react-native-gesture-handler';
import React from 'react';

import {View, Text, FlatList} from 'react-native';
import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import {HomeStyle} from './HomeStyle';
import {List} from 'react-native-paper';
import {Checkbox} from 'react-native-paper';
import {FAB} from 'react-native-paper';

const data = require('./todo.json');

function Item({
  completed,
  description,
  id,
  title,
  userid,
  Task,
  item,
  index,
  setTask,
}) {
  return (
    <List.Item
      title={title}
      description={description}
      left={() => (
        <Checkbox
          status={completed ? 'checked' : 'unchecked'}
          onPress={() => {
            console.log('asddf');
            let taskArray = Task;
            let updatedObj = {...item, completed: !completed};
            taskArray[index] = updatedObj;
            setTask(taskArray);
          }}
        />
      )}
    />
  );
}

export function HomeScreen({navigation}) {
  const [Task, setTask] = useState(null);
  useEffect(() => {
    setTask(data);
  }, []);

  return (
    <View style={HomeStyle.container}>
      <FlatList
        style={{
          flex: 1,
        }}
        data={Task ? Task : []}
        keyExtractor={(item, index) => item.id}
        renderItem={({item, index}) => (
          <Item
            completed={item.completed}
            description={item.description}
            id={item.id}
            title={item.title}
            userid={item.userid}
            item={item}
            index={index}
            Task={Task}
            setTask={setTask}
          />
        )}
      />
      <FAB
        style={HomeStyle.fab}
        small
        icon="plus"
        onPress={() => {
          navigation.navigate('ADD');
        }}
      />
    </View>
  );
}
