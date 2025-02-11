import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, ingresa tu correo y contraseña.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://tu-api.com/login", { email, password });

      if (response.data.success) {
        Alert.alert("Éxito", "Inicio de sesión exitoso.");
        navigation.replace("KanbanBoardScreen"); 
      } else {
        Alert.alert("Error", response.data.message || "Credenciales incorrectas.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Iniciar Sesión
      </Text>

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

      <Button mode="contained" onPress={handleLogin} loading={loading} style={styles.button}>
        Iniciar Sesión
      </Button>

      <Text style={styles.registerText} onPress={() => navigation.navigate("RegisterScreen")}>
        ¿No tienes cuenta? Regístrate aquí
      </Text>
    </View>
  );
};

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "yellow",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  registerText: {
    marginTop: 15,
    textAlign: "center",
    color: "blue",
  },
});

