import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const TaskStaticsScreen = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>📊 Estadísticas de Tareas</Text>
      
      <Text style={styles.description}>
        Aquí puedes ver el resumen de tu rendimiento y progreso en las tareas.
      </Text>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('login')}
        style={styles.button}>
        Ir a Configuración
      </Button>
    </View>
  );
};

export default TaskStaticsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2196F3', 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#e3f2fd',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#1565C0',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

