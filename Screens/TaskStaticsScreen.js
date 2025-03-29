import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import api from '../api/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TaskStaticsScreen = ({ route, navigation }) => {
  if (!route.params || !route.params.userId) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error: No se recibió el userId.</Text>
        <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>Volver</Button>
      </View>
    );
  }

  const { userId } = route.params;
  const [statistics, setStatistics] = useState({ total: 0, completed: 0, inProgress: 0, pending: 0 });

  useFocusEffect(
    useCallback(() => {
      fetchStatistics();
    }, [])
  );

  const fetchStatistics = async () => {
    try {
      const response = await api.get(`/tasks/user/${userId}`);
      const tasks = response.data;

      const stats = {
        total: tasks.length,
        completed: tasks.filter((task) => task.status === 'Completado').length,
        inProgress: tasks.filter((task) => task.status === 'En Progreso').length,
        pending: tasks.filter((task) => task.status === 'Pendiente').length,
      };

      setStatistics(stats);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron obtener las estadísticas.');
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
      <Icon name="chart-line" size={50} color="#FFEB3B" style={styles.icon} />
      <Text style={styles.title}>Estadísticas de Tareas</Text>

      <LineChart
        data={data}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: '#000',
          backgroundGradientFrom: '#000',
          backgroundGradientTo: '#333',
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
    backgroundColor: '#212121',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFEB3B',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 20,
  },
  chart: {
    marginVertical: 20,
    borderRadius: 16,
    backgroundColor: '#333',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FF5722',
  },
});

export default TaskStaticsScreen;
