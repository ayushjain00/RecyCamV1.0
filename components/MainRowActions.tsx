import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CameraMode } from "expo-camera";
import { FontAwesome } from '@expo/vector-icons';  // Import FontAwesome for icons
import { Colors } from "@/constants/Colors";

interface MainRowActionsProps {
  handleTakePicture: () => void;
  cameraMode: CameraMode;
  isRecording: boolean;
}

export default function MainRowActions({
  handleTakePicture,
}: MainRowActionsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleTakePicture} style={styles.button}>
        <FontAwesome name="camera" size={40} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "103%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    position: "absolute",
    bottom: 40,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 45,
    width: 80,
    height: 80,
  },
});
