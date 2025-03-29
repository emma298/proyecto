import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Animaciones
  const buttonScale = useState(new Animated.Value(1))[0]; // Animación del botón de login
  const fieldsFade = useState(new Animated.Value(0))[0]; // Desvanecimiento de los campos de entrada

  useEffect(() => {
    Animated.timing(fieldsFade, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa tu correo y contraseña.');
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('/users/login', { nickname: email, password });

      if (response.data) {
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        Alert.alert('Éxito', 'Inicio de sesión exitoso.');
        navigation.replace('Main', { userId: response.data._id });
      } else {
        Alert.alert('Error', 'Credenciales incorrectas.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Texto "Iniciar Sesión" con un efecto brillante */}
      <Animated.Text style={[styles.title, { opacity: fieldsFade }]}>
        Iniciar Sesión
      </Animated.Text>

      {/* Campos de entrada */}
      <Animated.View style={{ opacity: fieldsFade }}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={24} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Correo"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              onPressIn={handleButtonPressIn}
              onPressOut={handleButtonPressOut}
            >
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>

      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#ff6347',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 5,
    textShadowColor: '#fff',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    animation: 'pulse 1.5s infinite', 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    marginBottom: 20,
    borderRadius: 30,
    paddingLeft: 15,
    paddingRight: 15,
    height: 50,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
    color: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 18,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
