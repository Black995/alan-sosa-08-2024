export function playAudio(audioFile:string) {
    const audio = new Audio(audioFile);
    audio.play();
}