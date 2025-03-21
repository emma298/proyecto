import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const KanbanBoardScreen = ({ route, navigation }) => {
  if (!route.params || !route.params.userId) {
    return (
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>Error: No se recibió el userId.</Text>
        <Button mode="contained" onPress={() => navigation.goBack()}>Volver</Button>
      </View>
    );
  }
  const { userId } = route.params;
  const [tasks, setTasks] = useState([]);

  // Función para obtener tareas
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://192.168.11.61:3000/api/tasks/user/${userId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  // Recargar tareas cuando la pantalla se enfoque
  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <Card key={task._id} style={styles.taskCard} onPress={() => navigation.navigate('Detalle de Tareas', { task, userId })}>
          <Card.Content>
            <Text style={styles.taskTitle}>{task.title}</Text>
          </Card.Content>
        </Card>
      ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Tablero Kanban</Text>

      <View style={styles.kanbanContainer}>
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Pendiente</Text>
          {renderTasks('Pendiente')}
        </View>

        <View style={styles.column}>
          <Text style={styles.columnTitle}>En Progreso</Text>
          {renderTasks('En Progreso')}
        </View>

        <View style={styles.column}>
          <Text style={styles.columnTitle}>Completado</Text>
          {renderTasks('Completado')}
        </View>
      </View>

      <Button mode="contained" onPress={() => navigation.navigate('Crear Tarea', { userId })}>
        Crear Nueva Tarea
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#F5F5F5' },
  title: { textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
  kanbanContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  column: { flex: 1, marginHorizontal: 5, padding: 10, backgroundColor: '#E0E0E0', borderRadius: 8 },
  columnTitle: { textAlign: 'center', fontWeight: 'bold', marginBottom: 10 },
  taskCard: { marginBottom: 10, backgroundColor: '#FFFFFF' },
  taskTitle: { fontWeight: 'bold' },
});

export default KanbanBoardScreen;
