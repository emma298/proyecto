import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

const UserSettingsScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
        Alert.alert('Éxito', 'Perfil actualizado correctamente.');
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
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Configuración de Usuario</Text>

      <TextInput label="Nombre" value={name} onChangeText={setName} style={styles.input} />
      <TextInput label="Apellido" value={lastName} onChangeText={setLastName} style={styles.input} />
      <TextInput label="Correo Electrónico" value={nickname} onChangeText={setNickname} style={styles.input} disabled />

      <Button mode="contained" onPress={handleUpdateProfile} loading={loading} style={styles.button}>
        Guardar Cambios
      </Button>

      <Text variant="headlineMedium" style={styles.subtitle}>Cambiar Contraseña</Text>

      <TextInput label="Nueva Contraseña" value={newPassword} onChangeText={setNewPassword} secureTextEntry style={styles.input} />
      <TextInput label="Confirmar Nueva Contraseña" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry style={styles.input} />

      <Button mode="contained" onPress={handleChangePassword} loading={loading} style={[styles.button, styles.passwordButton]}>
        Actualizar Contraseña
      </Button>

      <Button mode="contained" onPress={handleLogout} style={[styles.button, styles.logoutButton]}>
        Cerrar Sesión
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontWeight: 'bold', marginBottom: 20, color: '#333' },
  subtitle: { fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  input: { marginBottom: 15, width: '100%' },
  button: { marginTop: 10, width: '100%', backgroundColor: '#3f51b5' },
  passwordButton: { backgroundColor: '#FF9800' },
  logoutButton: { backgroundColor: '#d32f2f' },
});

export default UserSettingsScreen;
