import React, { useState } from 'react';
import { View, StyleSheet, Alert, Dimensions } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import api from '../api/api';

const { width } = Dimensions.get('window');

const CreateTaskScreen = ({ route, navigation }) => {
  if (!route.params || !route.params.userId) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>⚠️ Error: No se recibió el userId.</Text>
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
    { label: 'Pendiente', value: 'Pendiente', icon: () => <Ionicons name="clipboard-outline" size={20} color="#FFA726" /> },
    { label: 'En Progreso', value: 'En Progreso', icon: () => <Ionicons name="construct-outline" size={20} color="#FFA726" /> },
    { label: 'Completado', value: 'Completado', icon: () => <Ionicons name="checkmark-circle-outline" size={20} color="#4CAF50" /> },
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
      avigation.navigate('Kanban', { userId, refresh: true });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar la tarea.');
      console.error(error);
    }
    setLoading(false);
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
    })
  };

  return (
    <View style={styles.container}>
      <Ionicons name="clipboard-outline" size={70} color="#FFA726" style={styles.icon} />
      <Text style={styles.title}>Nueva Tarea</Text>

      <TextInput
        label="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        mode="outlined"
        left={<TextInput.Icon icon="pencil-outline" />}
      />

      <View style={styles.dropdownContainer}>
        <DropDownPicker
          open={open}
          value={status}
          items={statusOptions}
          setOpen={setOpen}
          setValue={setStatus}
          setItems={setStatusOptions}
          placeholder="Seleccione el estado"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownMenu}
          itemSeparator={true}
          showArrow={true}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleCreateTask}
          loading={loading}
          style={styles.button}
          icon="check-bold"
        >
          Registrar
        </Button>
        <View style={{ height: 40 }} />
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
          icon="close-thick"
        >
          Cancelar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  icon: {
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA726',
    marginBottom: 20,
  },
  input: {
    width: width * 0.8,
    height: 45,
    marginBottom: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
    borderRadius: 8,
  },
  dropdownContainer: {
    width: width * 0.8,
    marginBottom: 30,
  },
  dropdown: {
    borderRadius: 8,
    borderColor: '#FFA726',
    backgroundColor: '#FFF',
  },
  dropdownMenu: {
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    width: width * 0.8,
    alignItems: 'center',
    marginTop: 80,
  },
  button: {
    width: '100%',
    backgroundColor: '#FFA726',
    borderRadius: 8,
  },
  cancelButton: {
    width: '100%',
    borderColor: '#D32F2F',
    borderWidth: 2,
    borderRadius: 8,
  },
});

export default CreateTaskScreen;
