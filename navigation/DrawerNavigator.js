import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RegisterScreen from '../Screens/RegisterScreen'
import LoginScreen from '../Screens/LoginScreen';
import KanbanBScreen from '../Screens/KanbanBScreen';
import TaskDetailScreen from '../Screens/TaskDetailScreen';
import TaskStaticsScreen from '../Screens/TaskStaticsScreen';
import UserSettingsScreen from '../Screens/UserSettingsScreen';
import CreateTaskScreen from '../Screens/CreateTaskScreen';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Registro"
          component={RegisterScreen}
          options={{ title: 'Registro' }}
        />
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Iniciar Sesion' }}
        />
        <Drawer.Screen
          name="kanbanB"
          component={KanbanBScreen}
          options={{ title: 'Kanba B' }}
        />
        <Drawer.Screen
          name="TaskDetail"
          component={TaskDetailScreen}
          options={{ title: 'Detalle de Tareas' }}
        />
        <Drawer.Screen
          name="Task Statics"
          component={TaskStaticsScreen}
          options={{ title: 'Toma Estatica' }}
        />
        <Drawer.Screen
          name="UserSettings"
          component={UserSettingsScreen}
          options={{ title: 'Configuracion de Usuario' }}
        />
         <Drawer.Screen
          name="Create Taks Scrren"
          component={CreateTaskScreen}
          options={{ title: 'Crear tarea' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
