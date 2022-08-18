Back_toyou_song="";
Im_Alive_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_Back_toyou = "";
song_Im_Alive = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Back_toyou_song = loadSound("backtoyou.mp3");
    Im_Alive_song = loadSound("imalive.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_Back_toyou = Back_toyou_song.isPlaying();
    console.log(song_Back_toyou);

    song_Im_Alive = Im_Alive_song.isPlaying();
    console.log(song_Im_Alive);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Im_Alive_song.stop();
        if(song_Back_toyou == false){
           Back_toyou_song.play();
        }
        else{
            console.log("Song Name: Back to you");
                document.getElementById("song_id").innerHTML = "Song Name: Back to you";
        }
    }

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Back_toyou_song.stop();
        if(song_Im_Alive == false){
           Im_Alive.play();
        }
        else{
            console.log("Song Name: Im Alive");
            document.getElementById("song_id").innerHTML = "Song Name: Im Alive";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}
