import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';

export default function NovaTarefa() {
  const [titulo, setTitulo] = useState('');
  const router = useRouter();

  const handleSalvar = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!titulo.trim() || !user) return;

    const { error } = await supabase.from('tarefas').insert({
      titulo,
      userId: user.id,
      createdAt: new Date().toISOString(),
    });

    if (error) {
      console.error('Erro ao salvar:', error);
      return;
    }

    Alert.alert('Sucesso', 'Tarefa adicionada!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título da tarefa"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />
      <Button title="Gravar tarefa" onPress={handleSalvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});
