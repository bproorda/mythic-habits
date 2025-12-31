import HabitToggle from '@/components/HabitToggle';
import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mythic Habits</Text>
      <Text style={styles.subtitle}>Begin your daily arc</Text>
      <HabitToggle label="The Watcher (Movement)" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#aaa',
    marginTop: 8,
  },
});

