import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import api from '../api/api';
import { Ionicons } from '@expo/vector-icons';

const KanbanBoardScreen = ({ route, navigation }) => {
  if (!route.params || !route.params.userId) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: No se recibió el userId.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { userId } = route.params;
  const [tasks, setTasks] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    fetchTasks();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [route.params?.refresh]); // Escucha cambios en `refresh`

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks/user/${userId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  const renderTasks = (status, color) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <Animated.View 
          key={task._id} 
          style={[styles.taskCard, { backgroundColor: color, opacity: fadeAnim }]}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Detalle de Tareas', { task, userId })} 
          >
            <Card.Content>
              <Text style={styles.taskTitle}>{task.title}</Text>
            </Card.Content>
          </TouchableOpacity>
        </Animated.View>
      ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tablero Kanban</Text>

      <ScrollView contentContainerStyle={styles.kanbanContainer}>
        <View style={[styles.column, { backgroundColor: '#FFD700' }]}>
          <View style={styles.columnHeader}>
            <Ionicons name="hourglass-outline" size={20} color="#6D4C41" />
            <Text style={styles.columnTitle}>Pendiente</Text>
          </View>
          {renderTasks('Pendiente', '#FFEB3B')}
        </View>

        <View style={[styles.column, { backgroundColor: '#2196F3' }]}>
          <View style={styles.columnHeader}>
            <Ionicons name="construct-outline" size={20} color="white" />
            <Text style={styles.columnTitle}>En Progreso</Text>
          </View>
          {renderTasks('En Progreso', '#64B5F6')}
        </View>

        <View style={[styles.column, { backgroundColor: '#4CAF50' }]}>
          <View style={styles.columnHeader}>
            <Ionicons name="checkmark-done-outline" size={20} color="white" />
            <Text style={styles.columnTitle}>Completado</Text>
          </View>
          {renderTasks('Completado', '#81C784')}
        </View>
      </ScrollView>

      {/* Botón flotante para agregar tarea */}
      <TouchableOpacity 
        style={styles.floatingButton} 
        onPress={() => navigation.navigate('Crear Tarea', { userId })}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1E1E1E',
    paddingVertical: 20,
  },
  title: { 
    textAlign: 'center', 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#FFF',
    marginBottom: 15,
  },
  kanbanContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  column: { 
    flex: 1, 
    marginHorizontal: 5, 
    padding: 10, 
    borderRadius: 15, 
    elevation: 4, 
    alignItems: 'center',
  },
  columnHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10, 
  },
  columnTitle: { 
    fontWeight: 'bold', 
    fontSize: 16, 
    marginLeft: 5, 
    color: '#FFF',
  },
  taskCard: { 
    width: '90%', 
    marginVertical: 8, 
    borderRadius: 10, 
    padding: 15, 
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  taskTitle: { 
    fontWeight: 'bold', 
    fontSize: 16, 
    color: '#333',
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF5722',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  errorText: { 
    textAlign: 'center', 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: 'red', 
    marginBottom: 20 
  },
  backButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default KanbanBoardScreen;