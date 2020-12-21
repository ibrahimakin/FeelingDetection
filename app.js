const video = document.getElementById('video');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models'),
]).then(startCamera())

function startCamera() {
    return false;
    navigator.getUserMedia(
        { video: { } },
        (stream) => { video.srcObject = stream },
        (err) => { console.log(err) }
    );
}

video.addEventListener('play', () => {
    setInterval( async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
        console.log(detections);
    }, 100)
});

// https://youtu.be/vBt540hvogs?t=796