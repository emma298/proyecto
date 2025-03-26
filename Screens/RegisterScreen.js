import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import api from '../api/api';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    
    try {
      const response = await api.post('/users', {
        name, lastName, nickname: email, password, state: true, profile: 1
      });

      if (response.data) {
        Alert.alert('Éxito', 'Usuario registrado correctamente');
        navigation.replace('Login');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error en respuesta:', error.response.data);
        Alert.alert('Error', error.response.data.message || 'No se pudo registrar el usuario.');
      } else if (error.request) {
        console.error('Error en solicitud:', error.request);
        Alert.alert('Error', 'No se pudo conectar con el servidor.');
      } else {
        console.error('Error desconocido:', error.message);
        Alert.alert('Error', 'Ocurrió un problema inesperado.');
      }
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Registrarse</Text>

      <TextInput
        label="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        label="Apellido"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />

      <TextInput
        label="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        label="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" onPress={handleRegister} loading={loading} style={styles.button}>
        Registrarse
      </Button>

      <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'pink' },
  title: { textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
  input: { marginBottom: 15 },
  button: { marginTop: 10 },
  loginText: { marginTop: 15, textAlign: 'center', color: 'blue' },
});

export default RegisterScreen;
