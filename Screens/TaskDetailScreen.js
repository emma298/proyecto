import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import api from '../api/api';

const TaskDetailScreen = ({ route, navigation }) => {
  const { task } = route.params || {};
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
    setLoading(true);
    try {
      await api.put(`/tasks/${task._id}`, { title, status });
      Alert.alert('Éxito', 'Tarea actualizada correctamente.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la tarea.');
      console.error(error);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    Alert.alert('Confirmar', '¿Estás seguro de que quieres eliminar esta tarea?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: async () => {
          setLoading(true);
          try {
            await api.delete(`/tasks/${task._id}`);
            Alert.alert('Eliminado', 'Tarea eliminada con éxito.');
            navigation.goBack();
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar la tarea.');
            console.error(error);
          }
          setLoading(false);
        },
      },
    ]);
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
      <Button mode="contained" onPress={handleUpdate} loading={loading} style={styles.button}>Guardar Cambios</Button>
      <Button mode="contained" onPress={handleDelete} loading={loading} style={[styles.button, styles.deleteButton]}>Eliminar Tarea</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#FFF3E0' },
  title: { textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
  input: { marginBottom: 15 },
  button: { marginTop: 10 },
  deleteButton: { backgroundColor: '#D32F2F' },
});

export default TaskDetailScreen;
