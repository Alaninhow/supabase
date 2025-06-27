import { supabase } from './lib/supabaseClient';
import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  Alert,
} from 'react-native';

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert('Erro ao cadastrar', error.message);
    else Alert.alert('Sucesso', 'Verifique seu email!');
    setLoading(false);
  };

  const signIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert('Erro ao entrar', error.message);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Senha"
        />
        {loading ? (
          <ActivityIndicator size={'small'} style={{ margin: 28 }} />
        ) : (
          <>
            <Button onPress={signIn} title="Login" />
            <Button onPress={signUp} title="Criar uma conta" />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
});
