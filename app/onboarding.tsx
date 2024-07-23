import { StyleSheet, Button, Alert, View, Text } from "react-native";
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import { usePermissions } from "expo-media-library";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = usePermissions();

  const handleContinue = async () => {
    const allPermissionsGranted = await requestAllPermissions();
    if (allPermissionsGranted) {
      router.replace("/(tabs)");
    } else {
      Alert.alert("To continue please provide permissions in settings");
    }
  };

  async function requestAllPermissions() {
    const cameraStatus = await requestCameraPermission();
    if (!cameraStatus.granted) {
      Alert.alert("Error", "Camera permission is required.");
      return false;
    }

    const microphoneStatus = await requestMicrophonePermission();
    if (!microphoneStatus.granted) {
      Alert.alert("Error", "Microphone permission is required.");
      return false;
    }

    const mediaLibraryStatus = await requestMediaLibraryPermission();
    if (!mediaLibraryStatus.granted) {
      Alert.alert("Error", "Media Library permission is required.");
      return false;
    }

    await AsyncStorage.setItem("hasOpened", "true");
    return true;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Permissions Required</Text>
      <Text style={styles.subtitle}>Camera Permissions</Text>
      <Text>🎥 For taking pictures and videos</Text>
      <Text style={styles.subtitle}>Microphone Permissions</Text>
      <Text>🎙️ For taking videos with audio</Text>
      <Text style={styles.subtitle}>Media Library Permissions</Text>
      <Text>📸 To save/view your amazing shots</Text>
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
});
