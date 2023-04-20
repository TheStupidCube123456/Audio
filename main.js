song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
rightWristScore = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(500, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    background("rgb(204, 8, 204)");
    image(video, 12, 50, 475, 350);
    if (rightWristScore > 0.2){
        circle(rightWristX, rightWristY, 20);
        if (rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speedSpan").innerHTML = "0.5x";
            song.rate(0.5);
        }
        else if (rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speedSpan").innerHTML = "1x";
            song.rate(1);
        }
        else if (rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speedSpan").innerHTML = "1.5x";
            song.rate(1.5);
        }
        else if (rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speedSpan").innerHTML = "2x";
            song.rate(2);
        }
        else if (rightWristY > 400){
            document.getElementById("speedSpan").innerHTML = "2.5";
            song.rate(2.5);
        }
    }
    if (leftWristScore > 0.2){
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals / 500;
        document.getElementById("volumeSpan").innerHTML = volume;
        song.setVolume(volume);
    }
}

function modelLoaded(){
    console.log("Model loaded!");
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        rightWristScore = results[0].pose.keypoints[10].score;
        leftWristScore = results[0].pose.keypoints[10].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}