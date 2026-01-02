import AsyncStorage from '@react-native-async-storage/async-storage';
import { FC, useEffect, useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    ViewStyle
} from "react-native";


type Props = {
value: boolean;
onToggle?: (value: boolean) => void;
label?: string;
disabled?: boolean;
style?: ViewStyle;
labelStyle?: TextStyle;
testID?: string;
};

const HabitToggle: FC<Props> = ({
value,
onToggle,
label,
disabled = false,
style,
labelStyle,
testID,
}) => {
const handlePress = () => {
    if (disabled) return;
    onToggle?.(!value);
};
const [done, setDone] = useState(false);
const key = `habit-${label}`;

useEffect(() => {
    AsyncStorage.getItem(key).then(value => {
      if (value !== null) setDone(JSON.parse(value));
    });
}, []);

const toggle = async () => {
    const newValue = !done;
    setDone(newValue);
    await AsyncStorage.setItem(key, JSON.stringify(newValue));
  };



return (
    <Pressable
      onPress={toggle}
      style={[styles.button, done && styles.done]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  )
};

const SIZE = 40;
const THUMB = 18;

const styles = StyleSheet.create({
button: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#333',
    marginVertical: 8,
  },
done: {
    backgroundColor: '#4caf50',
  },
text: {
    color: 'white',
    fontSize: 18,
  },

wrapper: {
    flexDirection: "row",
    alignItems: "center",
},
track: {
    width: SIZE,
    height: SIZE / 2,
    borderRadius: SIZE / 4,
    justifyContent: "center",
    padding: 4,
    marginRight: 8,
},
trackOn: {
    backgroundColor: "#4ade80", // green
},
trackOff: {
    backgroundColor: "#e5e7eb", // gray
},
trackDisabled: {
    opacity: 0.5,
},
thumb: {
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    backgroundColor: "#fff",
    // shadow for ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    // elevation for android
    elevation: 1,
},
thumbOn: {
    alignSelf: "flex-end",
},
thumbOff: {
    alignSelf: "flex-start",
},
thumbDisabled: {
    backgroundColor: "#f3f4f6",
},
label: {
    fontSize: 16,
    color: "#111827",
},
});

export default HabitToggle;