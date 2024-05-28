import { Audio } from "expo-av";

let timer = null;
let isPlay = false;
let numberOfTics = 0;

export default async function Script() {
  const { sound: clap1 } = await Audio.Sound.createAsync(
    require("../../../assets/clap1.mp3")
  );
  const { sound: clap2 } = await Audio.Sound.createAsync(
    require("../../../assets/clap2.mp3")
  );
  await clap1.setPositionAsync(0);
  await clap2.setPositionAsync(0);

  const tick = async () => {
    numberOfTics = numberOfTics > 3 ? 1 : numberOfTics + 1;
    return numberOfTics === 1
      ? await clap1.playAsync()
      : await clap2.playAsync();
  };

  const pause = () => {
    isPlay = false;
    if (timer) clearInterval(timer);
  };

  const play = async (bpm = 40) => {
    try {
      timer = setInterval(tick, 60000 / bpm);
      isPlay = true;
      return;
    } catch (error) {
      console.log("Error: ", error);
      if (
        error.message ==
        "play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD"
      ) {
        setTimeout(play, 100);
      }
    }
  };

  const playPause = async (bpm = 40) => {
    return isPlay ? pause() : play(bpm);
  };

  const changeBpm = async (bpm) => {
    if (timer) clearInterval(timer);
    if (isPlay) play(bpm);
    return;
  };

  return { playPause, changeBpm };
}
