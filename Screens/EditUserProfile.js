import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';

const EditUserProfile = ({ route, navigation }) => {
  const { userId } = route.params || {};
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://192.168.137.122:3000/api/users/${userId}`);
      setName(response.data.name);
      setLastName(response.data.lastName);
      setEmail(response.data.nickname);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      Alert.alert('Error', 'No se pudo obtener la información del usuario.');
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(`http://10.50.32.32:3000/api/users/${userId}`, {
        name,
        lastName,
        nickname: email,
      });
      Alert.alert('Éxito', 'Perfil actualizado correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Editar Perfil</Text>

      <TextInput label="Nombre" value={name} onChangeText={setName} style={styles.input} />
      <TextInput label="Apellido" value={lastName} onChangeText={setLastName} style={styles.input} />
      <TextInput label="Correo" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />

      <Button mode="contained" onPress={handleUpdate} loading={loading} style={styles.button}>
        Guardar Cambios
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

export default EditUserProfile;
