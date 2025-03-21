import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useRoute } from '@react-navigation/native';
import KanbanBoardScreen from '../Screens/KanbanBoardScreen';
import CreateTaskScreen from '../Screens/CreateTaskScreen';
import TaskDetailScreen from '../Screens/TaskDetailScreen';
import TaskStaticsScreen from '../Screens/TaskStaticsScreen';
import UserSettingsScreen from '../Screens/UserSettingsScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  // Obtiene el userId pasado desde StackNavigator a través de route.params
  const route = useRoute();
  const { userId } = route.params || {};

  return (
    <Drawer.Navigator initialRouteName="Kanban">
      <Drawer.Screen name="Kanban" component={KanbanBoardScreen} initialParams={{ userId }} />
      <Drawer.Screen name="Crear Tarea" component={CreateTaskScreen} initialParams={{ userId }} />
      <Drawer.Screen name="Detalle de Tareas" component={TaskDetailScreen} initialParams={{ userId }} />
      <Drawer.Screen name="Estadísticas" component={TaskStaticsScreen} initialParams={{ userId }} />
      <Drawer.Screen name="Configuración" component={UserSettingsScreen} initialParams={{ userId }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
