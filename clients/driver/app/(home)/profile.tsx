import { StyleSheet } from "react-native";
import { useSession } from "../../providers/SessionProvider";

import { Text, View } from "../../components/Themed";
import { Button } from "tamagui";

export default function ProfileScreen() {
  const session = useSession();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        onPress={() => {
          session?.signOut();
        }}
      >
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});