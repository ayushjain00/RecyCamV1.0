import * as React from "react";
import { SafeAreaView, View } from "react-native";
import {
  CameraMode,
  CameraView,
  FlashMode,
} from "expo-camera";
import MainRowActions from "@/components/MainRowActions";
import PictureView from "@/components/PictureView";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import CameraTools from "@/components/CameraTools";

export default function HomeScreen() {
  const cameraRef = React.useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = React.useState<CameraMode>("picture");
  const [cameraTorch, setCameraTorch] = React.useState<boolean>(false);
  const [cameraFlash, setCameraFlash] = React.useState<FlashMode>("off");
  const [cameraFacing, setCameraFacing] = React.useState<"front" | "back">("back");
  const [cameraZoom, setCameraZoom] = React.useState<number>(0);
  const [picture, setPicture] = React.useState<string>("");
  const [isBrowsing, setIsBrowsing] = React.useState<boolean>(false);

  async function handleTakePicture() {
    const response = await cameraRef.current?.takePictureAsync({});
    setPicture(response!.uri);
  }

  if (isBrowsing) return <></>;
  if (picture) return <PictureView picture={picture} setPicture={setPicture} />;

  return (
    <Animated.View
      layout={LinearTransition}
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      style={{ flex: 1 }}
    >
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing={cameraFacing}
        mode={cameraMode}
        zoom={cameraZoom}
        enableTorch={cameraTorch}
        onCameraReady={() => console.log("Ready to Scan Item")}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 6 }}>
            <CameraTools
              cameraZoom={cameraZoom}
              //cameraFlash={cameraFlash}
              cameraTorch={cameraTorch}
              setCameraZoom={setCameraZoom}
              setCameraFacing={setCameraFacing}
              setCameraTorch={setCameraTorch}
              //setCameraFlash={setCameraFlash}
            />
            <MainRowActions
              isRecording={false}
              handleTakePicture={
                cameraMode === "picture" ? handleTakePicture : () => {}
              }
              cameraMode={cameraMode}
            />
          </View>
        </SafeAreaView>
      </CameraView>
    </Animated.View>
  );
}