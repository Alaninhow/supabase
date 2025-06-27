import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import BntAdd from '../../components/BtnAdd';
import Item from '../../components/Item';
import LoggedUser from '../../components/LoggedUser';

interface Tarefa {
  id: string;
  titulo: string;
}

const Page = () => {
  const router = useRouter();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error) return;
      setUser(data.user);
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchTarefas = async () => {
      const { data, error } = await supabase
        .from('tarefas')
        .select('*')
        .eq('userId', user.id)
        .order('createdAt', { ascending: false });

      if (!error) setTarefas(data as Tarefa[]);
    };

    fetchTarefas();
  }, [user]);

  const handleDeleteTask = async (id: string) => {
    const { error } = await supabase.from('tarefas').delete().eq('id', id);
    if (error) Alert.alert('Erro ao deletar', error.message);
    else setTarefas(tarefas.filter(t => t.id !== id));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={styles.container}>
      <LoggedUser email={user?.email ?? 'Convidado'} onLogout={handleLogout} />
      <Item
        data={tarefas}
        onDelete={handleDeleteTask}
        onEdit={(id) => Alert.alert('Editar', `Editar tarefa com id: ${id}`)}
      />
      <BntAdd onPress={() => router.push('(auth)/nova-tarefa')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: 'relative',
  },
});

export default Page;
  