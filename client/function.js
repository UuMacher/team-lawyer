var recorder, gumStream, input;
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext;

var recordButton = document.getElementById("recordButton");
var result = document.getElementById("result");

recordButton.addEventListener("click", toggleRecording);

function toggleRecording() {
    if (recorder && recorder.recording) {
        recorder.stop();
        gumStream.getAudioTracks()[0].stop();
        recorder.exportWAV(sendInfo);
    } else {
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then((stream) => {
            gumStream = stream;
            input = audioContext.createMediaStreamSource(stream);
            recorder = new Recorder(input);
            recorder.record();
        });
    }
}

function sendInfo(blob) {    
    fetch('http://localhost:3000/mockPath', {
        method: 'PUT',
        body: blob
    })
    .then((response) => response.json())
    .then((result) => {
        console.log('Success:', result);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}