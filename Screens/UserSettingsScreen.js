import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Dimensions, ScrollView } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const UserSettingsScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUserId(user._id);
        setName(user.name);
        setLastName(user.lastName || '');
        setNickname(user.nickname);
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!name.trim() || !lastName.trim() || !nickname.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    setLoading(true);
    try {
      const response = await api.put(`/users/${userId}`, { name, lastName, nickname });
      if (response.data) {
        Alert.alert('Éxito', 'Datos guardados correctamente.');
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el perfil.');
      console.error(error);
    }
    setLoading(false);
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Por favor, ingresa y confirma la nueva contraseña.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    try {
      await api.put(`/users/${userId}/password`, { password: newPassword });
      Alert.alert('Éxito', 'Contraseña actualizada correctamente.');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la contraseña.');
      console.error(error);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.replace('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Icon name="account-circle" size={50} color="#fff" style={styles.icon} />
        <Text variant="headlineSmall" style={styles.title}>Configuración de Usuario</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Nombre"
          value={name}
          onChangeText={setName}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon name="account" />}
        />
        <TextInput
          label="Apellido"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon name="account" />}
        />
        <TextInput
          label="Correo Electrónico"
          value={nickname}
          onChangeText={setNickname}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon name="email" />}
        />

        <Text variant="headlineSmall" style={styles.subtitle}>Cambiar Contraseña</Text>

        <TextInput
          label="Nueva Contraseña"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon name="lock" />}
          right={
            <TextInput.Icon
              name={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <TextInput
          label="Confirmar Nueva Contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon name="lock" />}
          right={
            <TextInput.Icon
              name={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        <Button
          mode="contained"
          onPress={handleChangePassword}
          loading={loading}
          style={[styles.button, styles.passwordButton]}
          icon="key"
        >
          Actualizar Contraseña
        </Button>

         <Button
          mode="contained"
          onPress={handleUpdateProfile}
          loading={loading}
          style={styles.button}
          icon="account-edit"
        >
          Guardar Cambios
        </Button>

        <Button
          mode="contained"
          onPress={handleLogout}
          style={[styles.button, styles.logoutButton]}
          icon="logout"
        >
          Cerrar Sesión
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    padding: 15,
  },
  header: {
    backgroundColor: '#2196F3',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 15,
  },
  icon: {
    marginBottom: 5,
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '60%',
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 14,
    borderRadius: 5,
  },
  button: {
    width: '60%',
    backgroundColor: '#2196F3',
    borderRadius: 5,
    marginTop: 15,
    paddingVertical: 8,
  },
  passwordButton: {
    backgroundColor: '#FF9800',
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
  },
  subtitle: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
});

export default UserSettingsScreen;
