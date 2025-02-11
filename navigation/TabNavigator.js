import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import RegisterScreen from '../Screens/RegisterScreen';
import LoginScreen from '../Screens/LoginScreen';
import KanbanBoardScreen from '../Screens/KanbanBScreen';
import TaskDetailScreen from '../Screens/TaskDetailScreen';
import TaskStaticsScreen from '../Screens/TaskStaticsScreen';
import UserSettingsScreen from '../Screens/UserSettingsScreen';
import CreateTaskScreen from '../Screens/CreateTaskScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        {/* Registro */}
        <Tab.Screen
          name="Registro"
          component={RegisterScreen}
          options={{
            title: 'Registro',
            tabBarIcon: () => <FontAwesome5 name="user-plus" size={24} color="black" />,
          }}
        />

        {/* Login */}
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Acceso',
            tabBarIcon: () => <FontAwesome5 name="sign-in-alt" size={24} color="black" />,
          }}
        />

        {/* Kanban Board */}
        <Tab.Screen
          name="KanbanBoard"
          component={KanbanBoardScreen}
          options={{
            title: 'Kanban',
            tabBarIcon: () => <FontAwesome5 name="tasks" size={24} color="black" />,
          }}
        />

        {/* Detalle de Tareas */}
        <Tab.Screen
          name="TaskDetail"
          component={TaskDetailScreen}
          options={{
            title: 'Detalle de Tareas',
            tabBarIcon: () => <FontAwesome5 name="info-circle" size={24} color="black" />,
          }}
        />

        {/* Estadísticas */}
        <Tab.Screen
          name="TaskStatics"
          component={TaskStaticsScreen}
          options={{
            title: 'Estadísticas',
            tabBarIcon: () => <FontAwesome5 name="chart-bar" size={24} color="black" />,
          }}
        />

        {/* Configuración de Usuario */}
        <Tab.Screen
          name="UserSettings"
          component={UserSettingsScreen}
          options={{
            title: 'Configuración',
            tabBarIcon: () => <FontAwesome5 name="cog" size={24} color="black" />,
          }}
        />

        {/* Crear Tarea */}
        <Tab.Screen
          name="CreateTaskScreen"
          component={CreateTaskScreen}
          options={{
            title: 'Nueva Tarea',
            tabBarIcon: () => <FontAwesome5 name="plus-circle" size={24} color="black" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
