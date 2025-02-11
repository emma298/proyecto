import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import axios from "axios";

const KanbanBoardScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://tu-api.com/tareas");
      setTasks(response.data);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.estado = status)
      .map((task) => (
        <Card key={task.id} style={styles.taskCard} onPress={() => navigation.navigate("TaskDetailScreen", { task })}>
          <Card.Content>
            <Text style={styles.taskTitle}>{task.titulo}</Text>
          </Card.Content>
        </Card>
      ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Tablero Kanban
      </Text>

      <View style={styles.kanbanContainer}>
        {/* Columna Pendiente */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Pendiente</Text>
          {renderTasks("Pendiente")}
        </View>

        {/* Columna En Progreso */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>En Progreso</Text>
          {renderTasks("En Progreso")}
        </View>

        {/* Columna Completado */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Completado</Text>
          {renderTasks("Completado")}
        </View>
      </View>

      <Button mode="contained" onPress={() => navigation.navigate("TaskDetailScreen")}>
        Ir a Task Detail
      </Button>
    </ScrollView>
  );
};

export default KanbanBoardScreen;



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  kanbanContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
  },
  columnTitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskCard: {
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  taskTitle: {
    fontWeight: "bold",
  },
});


