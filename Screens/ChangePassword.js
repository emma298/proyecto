import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';

const ChangePassword = ({ route, navigation }) => {
  const { userId } = route.params || {};
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'Las contraseñas nuevas no coinciden.');
      return;
    }
    setLoading(true);
    try {
      await axios.put(`http://192.168.137.122:3000/api/users/${userId}/password`, {
        currentPassword,
        newPassword,
      });
      Alert.alert('Éxito', 'Contraseña actualizada correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      Alert.alert('Error', 'No se pudo cambiar la contraseña.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Cambiar Contraseña</Text>

      <TextInput label="Contraseña Actual" value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry style={styles.input} />
      <TextInput label="Nueva Contraseña" value={newPassword} onChangeText={setNewPassword} secureTextEntry style={styles.input} />
      <TextInput label="Confirmar Nueva Contraseña" value={confirmNewPassword} onChangeText={setConfirmNewPassword} secureTextEntry style={styles.input} />

      <Button mode="contained" onPress={handleChangePassword} loading={loading} style={styles.button}>
        Guardar Nueva Contraseña
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'white' },
  title: { textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
  input: { marginBottom: 15 },
  button: { marginTop: 10 },
});

export default ChangePassword;
