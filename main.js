song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(500,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function gotPoses(results,error){
    if (error){
        console.error(error);
    }
    if (results.length>0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("score left wrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + leftWristX+"left wrist y = "+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + rightWristX+"right wrist y = "+rightWristY);
    }
}

function draw(){
    image(video,0,0,500,400);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    fill("#ff0000");
    stroke("#ff0000");
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        song1.stop();
        if(song2_status == false){
            song2.play();
            document.getElementById("songname").innerHTML = "Song Name = Harry Potter Theme";
        }
    }
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(song1_status == false){
            song1.play();
            document.getElementById("songname").innerHTML = "Song Name = Peter Pan Theme";
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}