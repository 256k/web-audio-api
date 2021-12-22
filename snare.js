const snareBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 1, audioContext.sampleRate);

const snareChannelData = snareBuffer.getChannelData(0)
for (let i = 0; i < snareChannelData.length; i++) {
  snareChannelData[i] = Math.random() *2 -1
}

const snareGainControl = audioContext.createGain();
snareGainControl.gain.setValueAtTime(0.05, 0);
snareGainControl.connect(audioContext.destination)

// for a snare we want to use a high pass filter. this is done with a biquad filter:
const snareFilter = audioContext.createBiquadFilter();
snareFilter.type = 'highpass';
snareFilter.frequency.value = 3500;
snareFilter.connect(snareGainControl);


const snareButton = document.createElement('button');
snareButton.innerText = 'play snare';
snareButton.addEventListener('click', () => {
  const snareSource = audioContext.createBufferSource();
  snareSource.buffer = snareBuffer;
  snareSource.connect(snareFilter);
  snareSource.start();
})
document.body.appendChild(snareButton);