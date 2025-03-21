import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import KanbanBoardScreen from '../Screens/KanbanBoardScreen';
import TaskDetailScreen from '../Screens/TaskDetailScreen';
import TaskStaticsScreen from '../Screens/TaskStaticsScreen';
import UserSettingsScreen from '../Screens/UserSettingsScreen';
import CreateTaskScreen from '../Screens/CreateTaskScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Kanban"
        component={KanbanBoardScreen}
        options={{
          title: 'Kanban',
          tabBarIcon: () => <FontAwesome5 name="tasks" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Detalle de Tareas"
        component={TaskDetailScreen}
        options={{
          title: 'Detalle',
          tabBarIcon: () => <FontAwesome5 name="info-circle" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Estadísticas"
        component={TaskStaticsScreen}
        options={{
          title: 'Estadísticas',
          tabBarIcon: () => <FontAwesome5 name="chart-bar" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Configuración"
        component={UserSettingsScreen}
        options={{
          title: 'Configuración',
          tabBarIcon: () => <FontAwesome5 name="cog" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Crear Tarea"
        component={CreateTaskScreen}
        options={{
          title: 'Nueva Tarea',
          tabBarIcon: () => <FontAwesome5 name="plus-circle" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
