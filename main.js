//https://teachablemachine.withgoogle.com/models/hxne-ALB4/

var prediction_1=""
var prediction_2=""
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
})

var camera = document.getElementById("camera");

Webcam.attach(camera);

function snap() {
    Webcam.snap(function (data_uri) {
        document.getElementById("resultpic").innerHTML = "<img id='x' src='" + data_uri + "'/>"
    })
}

console.log("ml5.version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/hxne-ALB4/model.json", modelLoaded);

function modelLoaded() {
    console.log('chuck morris rules');
}

function speak() {
    var synth = window.speechSynthesis;
    speech_1 = "zis is ze farst prediction ma man" + prediction_1;
    speech_2 = "zis is ze secand prediction ma man" + prediction_2;
    var utterthis = new SpeechSynthesisUtterance(speech_1 + speech_2);
    synth.speak(utterthis);
}

function predict() {
    img = document.getElementById("x");
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if(error){
        console.log(error)
    }
    else{
        console.log(result)
        document.getElementById("emoresult").innerHTML=result[0].label
        document.getElementById("emoresultreturns").innerHTML=result[1].label
        prediction_1=result[0].label
        prediction_2=result[1].label
        speak()
        if(prediction_1=="thums up"){
            document.getElementById("emojispace").innerHTML="👍👍👍👍👍"
        }
        if(prediction_1=="boooooooooooooooooo"){
            document.getElementById("emojispace").innerHTML="👎👎👎👎👎"
        }
        if(prediction_1=="grip"){
            document.getElementById("emojispace").innerHTML="✊✊✊✊✊✊"
        }
        if(prediction_2=="thums up"){
            document.getElementById("emojispacethesecond").innerHTML="👍👍👍👍👍"
        }
        if(prediction_2=="boooooooooooooooooo"){
            document.getElementById("emojispacethesecond").innerHTML="👎👎👎👎👎"
        }
        if(prediction_2=="grip"){
            document.getElementById("emojispacethesecond").innerHTML="✊✊✊✊✊✊"
        }
    }
}