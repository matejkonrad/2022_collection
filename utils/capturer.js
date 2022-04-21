let capturing = false;
export const initCapturer = () => {
  return capturer = new CCapture({
    format: 'png',
    framerate: 60
  });
}

export function startCapture() {
	if (keyCode === ENTER){ 
		if (!capturing) {
			capturer.start();
			capturing = true;
		} else {
			capturer.stop();
			capturer.save();
			capturing = false;
		}
	}
}
