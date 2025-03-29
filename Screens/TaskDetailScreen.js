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
        <Text style={styles.title}>No se encontró la tarea</Text>
        <Button mode="contained" onPress={() => navigation.goBack()}>Volver</Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de la Tarea</Text>
      <TextInput label="Título" value={title} onChangeText={setTitle} style={styles.input} mode="outlined" />
      <TextInput label="Estado" value={status} onChangeText={setStatus} style={styles.input} mode="outlined" />
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleUpdate} loading={loading} style={styles.button} icon="content-save">Guardar</Button>
        <Button mode="contained" onPress={handleDelete} loading={loading} style={[styles.button, styles.deleteButton]} icon="delete">Eliminar</Button>
      </View>
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
