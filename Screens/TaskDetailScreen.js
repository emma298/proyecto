import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import axios from "axios";

const TaskDetailScreen = ({ route, navigation }) => {
  const { task } = route.params || {}; // Evita errores si 'task' es undefined

  const [title, setTitle] = useState(task?.titulo || "");
  const [status, setStatus] = useState(task?.estado || "Pendiente");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      navigation.setOptions({ title: `Tarea: ${task.titulo}` });
    }
  }, [navigation, task]); 

  const handleUpdate = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "El título no puede estar vacío.");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`https://tu-api.com/tareas/${task.id}`, { titulo: title, estado: status });
      Alert.alert("Éxito", "Tarea actualizada correctamente.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar la tarea.");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    Alert.alert("Confirmar", "¿Estás seguro de que quieres eliminar esta tarea?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: async () => {
          setLoading(true);
          try {
            await axios.delete(`https://tu-api.com/tareas/${task.id}`);
            Alert.alert("Eliminado", "Tarea eliminada con éxito.");
            navigation.goBack();
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar la tarea.");
          }
          setLoading(false);
        },
      },
    ]);
  };

  if (!task) {
    return (
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          No se encontró la tarea
        </Text>
        <Button mode="contained" onPress={() => navigation.goBack()}>
          Volver
        </Button>
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

      <Button mode="contained" onPress={handleDelete} loading={loading} style={[styles.button, styles.deleteButton]}>
        Eliminar Tarea
      </Button>
    </View>
  );
};

export default TaskDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFF3E0",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "#D32F2F",
  },
});
