import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../api/api';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Animaciones
  const buttonScale = useState(new Animated.Value(1))[0]; // Animación del botón de login
  const fieldsFade = useState(new Animated.Value(0))[0]; // Desvanecimiento de los campos de entrada

  React.useEffect(() => {
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
      Alert.alert('Error', 'No se pudo registrar el usuario.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Título con efecto animado */}
      <Animated.Text style={[styles.title, { opacity: fieldsFade }]}>
        Registrarse
      </Animated.Text>

      {/* Campos de entrada */}
      <Animated.View style={{ opacity: fieldsFade }}>
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={24} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="person" size={24} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Apellido"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={24} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Correo Electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
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

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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
              onPress={handleRegister}
              onPressIn={handleButtonPressIn}
              onPressOut={handleButtonPressOut}
            >
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.registerText}>¿Ya tienes cuenta? Inicia sesión</Text>
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
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#ff6347',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 5,
    textShadowColor: '#fff',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    height: 45,
    width: '90%',
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
    fontSize: 16,
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

export default RegisterScreen;
