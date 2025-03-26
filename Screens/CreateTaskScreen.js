import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import api from '../api/api';

const CreateTaskScreen = ({ route, navigation }) => {
  if (!route.params || !route.params.userId) {
    return (
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>Error: No se recibió el userId.</Text>
        <Button mode="contained" onPress={() => navigation.goBack()}>Volver</Button>
      </View>
    );
  }

  const { userId } = route.params;
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Pendiente');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [statusOptions, setStatusOptions] = useState([
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'En Progreso', value: 'En Progreso' },
    { label: 'Completado', value: 'Completado' },
  ]);

  const handleCreateTask = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El título no puede estar vacío.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/tasks', { title, status, userId });
      Alert.alert('Éxito', 'Tarea registrada correctamente.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar la tarea.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Nueva Tarea</Text>
      <TextInput label="Título" value={title} onChangeText={setTitle} style={styles.input} />
      <DropDownPicker
        open={open} value={status} items={statusOptions} setOpen={setOpen} setValue={setStatus} setItems={setStatusOptions}
        placeholder="Selecciona el estado" style={styles.dropdown}
      />
      <Button mode="contained" onPress={handleCreateTask} loading={loading} style={styles.button}>Registrar Tarea</Button>
      <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.cancelButton}>Cancelar</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#FFF3E0' },
  title: { textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
  input: { marginBottom: 15 },
  dropdown: { marginBottom: 15, borderColor: '#6200ea', borderWidth: 1, borderRadius: 5 },
  button: { marginTop: 10 },
  cancelButton: { marginTop: 10, borderColor: '#D32F2F', borderWidth: 1 },
});

export default CreateTaskScreen;
