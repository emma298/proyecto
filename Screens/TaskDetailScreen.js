import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import api from '../api/api';

const TaskDetailScreen = ({ route, navigation }) => {
  const { task, userId } = route.params || {};
  const [title, setTitle] = useState(task?.title || '');
  const [status, setStatus] = useState(task?.status || 'Pendiente');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      navigation.setOptions({ title: `Tarea: ${task.title}` });
    }
  }, [navigation, task]);

  const handleUpdate = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El título no puede estar vacío.');
      return;
    }
    if (!task?._id) {
      Alert.alert('Error', 'No se encontró la tarea.');
      return;
    }

    setLoading(true);
    try {
      await api.put(`/tasks/${task._id}`, { title, status });
      Alert.alert('Éxito', 'Tarea actualizada correctamente.');
      navigation.navigate('Kanban', { userId, refresh: true }); // Fuerza actualización
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la tarea.');
      console.error('Error al actualizar tarea:', error.response?.data || error.message);
    }
    setLoading(false);
  };

  // Versión simplificada que siempre funciona
const handleDelete = async () => {
  try {
    await api.delete(`/tasks/${task._id}`);
    Alert.alert('Éxito', 'Tarea eliminada');
    
    // Fuerza recarga manual
    navigation.reset({
      index: 0,
      routes: [
        { 
          name: 'Main', 
          params: { 
            screen: 'Kanban',
            params: { 
              userId: userId,
              refresh: Date.now() // Timestamp único
            }
          }
        }
      ]
    });
    
  } catch (error) {
    Alert.alert('Error', 'No se pudo eliminar');
  }
};

  if (!task) {
    return (
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>No se encontró la tarea</Text>
        <Button mode="contained" onPress={() => navigation.goBack()}>Volver</Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Detalle de la Tarea</Text>
      <TextInput label="Título" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput label="Estado" value={status} onChangeText={setStatus} style={styles.input} />
      <Button mode="contained" onPress={handleUpdate} loading={loading} style={styles.button}>
        Guardar Cambios
      </Button>
      <Button 
        mode="contained" 
        onPress={handleDelete} 
        loading={loading} 
        style={[styles.button, styles.deleteButton]}
      >
        Eliminar Tarea
      </Button>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#121212' },
  title: { textAlign: 'center', marginBottom: 20, fontWeight: 'bold', fontSize: 22, color: '#FFA726' },
  input: { width: '90%', marginBottom: 15, backgroundColor: '#FFF', fontSize: 16, borderRadius: 10 },
  buttonContainer: { width: '90%', marginTop: 20 },
  button: { marginVertical: 5, backgroundColor: '#FFA726', borderRadius: 10 },
  deleteButton: { backgroundColor: '#D32F2F' },
});

export default TaskDetailScreen;