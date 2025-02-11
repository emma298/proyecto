import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';

const UserSettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Configuración de Usuario
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="bodyLarge" style={styles.cardText}>
            Modifica tu información personal aquí.
          </Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('EditUserProfile')}
      >
        Editar Perfil
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('ChangePassword')}
      >
        Cambiar Contraseña
      </Button>

      <Button
        mode="contained"
        style={[styles.button, styles.logoutButton]}
        onPress={() => navigation.navigate('Login')}
      >
        Cerrar Sesión
      </Button>
    </View>
  );
};

export default UserSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', 
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', 
  },
  card: {
    marginBottom: 20,
    padding: 10,
    width: '100%',
    backgroundColor: '#e0e0e0', 
    borderRadius: 10,
  },
  cardText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
  button: {
    marginVertical: 10,
    width: '100%',
    padding: 10,
    backgroundColor: '#3f51b5', 
  },
  logoutButton: {
    backgroundColor: '#d32f2f', 
  },
});
