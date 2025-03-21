import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';

const TaskStaticsScreen = ({ route, navigation }) => {
  const { userId } = route.params || {};
  const [statistics, setStatistics] = useState({ total: 0, completed: 0, inProgress: 0, pending: 0 });

  useEffect(() => {
    if (!userId) {
      Alert.alert('Error', 'No se recibió el userId.');
      return;
    }
    fetchStatistics();
  }, [userId]);

  // 🔹 Se ejecuta cada vez que el usuario regresa a la pantalla
  useFocusEffect(
    useCallback(() => {
      fetchStatistics();
    }, [])
  );

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`http://192.168.11.61:3000/api/tasks/user/${userId}`);
      const tasks = response.data;
      const stats = {
        total: tasks.length,
        completed: tasks.filter((task) => task.status === 'Completado').length,
        inProgress: tasks.filter((task) => task.status === 'En Progreso').length,
        pending: tasks.filter((task) => task.status === 'Pendiente').length,
      };
      setStatistics(stats);
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
    }
  };

  const data = {
    labels: ['Completadas', 'En Progreso', 'Pendientes'],
    datasets: [
      {
        data: [statistics.completed, statistics.inProgress, statistics.pending],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Estadísticas de Tareas</Text>

      <LineChart
        data={data}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: '#2196F3',
          backgroundGradientFrom: '#2196F3',
          backgroundGradientTo: '#1565C0',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        bezier
        style={styles.chart}
      />

      <Button mode="contained" onPress={() => navigation.navigate('Kanban', { userId })} style={styles.button}>
        Volver al Tablero
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chart: {
    marginVertical: 20,
    borderRadius: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1565C0',
  },
});

export default TaskStaticsScreen;
