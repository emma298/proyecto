import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../Screens/RegisterScreen'
import LoginScreen from '../Screens/LoginScreen';
import KanbanBScreen from '../Screens/KanbanBScreen';
import TaskDetailScreen from '../Screens/TaskDetailScreen';
import TaskStaticsScreen from '../Screens/TaskStaticsScreen';
import UserSettingsScreen from '../Screens/UserSettingsScreen';
import CreateTaskScreen from '../Screens/CreateTaskScreen';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Registro" component={ RegisterScreen } />
        <Stack.Screen name="Login" component={ LoginScreen } />
        <Stack.Screen name="kanbanB" component={ KanbanBScreen } />
        <Stack.Screen name="TaskDetail" component={ TaskDetailScreen } />
        <Stack.Screen name="Task Statics" component={ TaskStaticsScreen } />
         <Stack.Screen name="UserSettings" component={ UserSettingsScreen } />
        <Stack.Screen name="create Taks Screen" component={ CreateTaskScreen } />


      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator;