import { useCallback, useEffect, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import Slider from "@react-native-community/slider";
import { ConvertSecondsInHour } from "../../utils/dataTime";

import { styles } from "./styles";
import Script from "./script";

let playPause, changeBpm, timeOcurredInterval;

export default function Metronome() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBpm, setCurrentBpm] = useState(80);
  const [timeOccurred, setTimeOccurred] = useState(0);

  const clearTimeOccurred = useCallback(() => {
    setTimeOccurred(0);
    if (timeOcurredInterval) clearInterval(timeOcurredInterval);
  }, []);

  const handlePlayPause = useCallback(async () => {
    await playPause(currentBpm);
    setIsPlaying((playing) => {
      if (!playing) {
        timeOcurredInterval = setInterval(() => {
          setTimeOccurred((time) => {
            if (time > 299) {
              playPause(currentBpm);
              clearInterval(timeOcurredInterval);
              return 0;
            }
            return time + 1;
          });
        }, 1000);
        return !playing;
      }
      clearTimeOccurred(playing);
      return !playing;
    });
  }, [currentBpm, setIsPlaying]);

  const handleChangeProgress = useCallback(async (value) => {
    setCurrentBpm(value);
    await changeBpm(value);
  }, []);

  const init = useCallback(async () => {
    const { playPause: playPauseScript, changeBpm: changeBpmScript } =
      await Script();
    playPause = playPauseScript;
    changeBpm = changeBpmScript;
  }, []);

  useEffect(() => {
    init();
    Audio.requestPermissionsAsync().then(({ granted }) => {
      if (granted) {
        Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: true,
        });
      }
    });
  }, [init]);

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.containerTitleText}>Metronome</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.containerProgress}>
          <Text style={styles.progressNumber}>{currentBpm}</Text>
          <Text style={styles.progressBPM}>bpm</Text>
        </View>
        <Slider
          value={currentBpm}
          onValueChange={setCurrentBpm}
          onSlidingComplete={(value) => handleChangeProgress(value)}
          minimumValue={40}
          maximumValue={218}
          style={styles.slider}
          step={1}
        />
        <Pressable onPressIn={handlePlayPause}>
          <MaterialIcons
            name={isPlaying ? "pause-circle-filled" : "play-circle-fill"}
            size={60}
            color="#212121"
          />
        </Pressable>
        <View style={styles.containerTime}>
          <Text style={styles.containerTimeText}>
            {ConvertSecondsInHour(timeOccurred)}
          </Text>
          <MaterialIcons
            style={styles.containerTimeIcon}
            name="timer"
            size={24}
            color="#212121"
          />
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}
