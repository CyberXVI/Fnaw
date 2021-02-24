/**
    * Five Nights at Winston's 2
    * Made by Olivier
    * Released: November 13, 2017
    * Time Taken To Make: Several Months
    * Lines of code 8800+ (8976 to be exact) 
    * Description: A survival horror game where you have to stop animatronics from entering your office and killing you.
**/

// I look forward to seeing YouTube videos of people playing this.

/*WARNING‼ This game has sound!*/
/*WARNING‼ This game has sound!*/
/*WARNING‼ This game has sound!*/

/* WARNING: This game is a HORROR GAME. People who hate horror games probably wouldn't like this game. */

/**@IMPORTANT: For instructions on how to play the game, read the basic guide: https://www.khanacademy.org/computer-programming/fnaw-2-basic-guide/5299490559295488
**/

// If you've started a game and you want to go back to the menu, you can go on the monitor and press the "DIE" button. Hopper will immediately jumpscare you.

/** Note about the lag:
    * When you start the game you will notice ultimate lag. Please do not quit out of frustration because of this. It will go away. To make sure it goes away and doesn't kill you in the game, close and open the back door and open and close the monitor. Then, close and open the right and left doors in all combinations. **/
    
/* WARNING: This game may make 𝓐wesomecookie1000's computer very hot */

/** CHEATS **/
var Night = 5; // The night from 1-5 you're on. Keep at 0 to save your progress when this program is restarted.

var Everything = true; // Make true if you want 6th Night and Custom Night available. (They will become availble anyway when you beat 5th Night) Make false if you want not. Keep null if you want to save your progress when this program is restarted.
/** ------ **/

// Code {
// jsh/int ignore: start
smooth();
noStroke();
var scene = "start";
var night;
var Tnight;
var Cnight = null;
var nights;
var lives;
if(Night > 0) {
    night = Night;
    if(Tnight < 1 || Tnight === undefined) {
        Tnight = 1;
    }
}
if(Everything === true) {
    Tnight = 3;
} else if (Everything === false){
    Tnight = 0;
}
if(night === undefined) {
    night = 0;
}
if(Tnight === undefined) {
    Tnight = 0;
}
if(nights === undefined) {
    nights = [
        {"win": 0, "hopps": 3, "ohnoes": 3, "squid": 0, "hal": 0, "pant": 0, "sam": 0, "fuzz": 0},
        {"win": 0, "hopps": 6, "ohnoes": 6, "squid": 6, "hal": 1, "pant": 0, "sam": 0, "fuzz": 0},
        {"win": 3, "hopps": 10, "ohnoes": 10, "squid": 8, "hal": 4, "pant": 3, "sam": 1, "fuzz": 0},
        {"win": 8, "hopps": 12, "ohnoes": 12, "squid": 10, "hal": 7, "pant": 6, "sam": 6, "fuzz": 1},
        {"win": 13, "hopps": 14, "ohnoes": 14, "squid": 12, "hal": 12, "pant": 9, "sam": 10, "fuzz": 9},
        {"win": 15, "hopps": 15, "ohnoes": 15, "squid": 15, "hal": 15, "pant": 15, "sam": 15, "fuzz": 15},
        {"win": 0, "hopps": 0, "ohnoes": 0, "squid": 0, "hal": 0, "pant": 0, "sam": 0, "fuzz": 0},
    ];
}
if(lives === undefined) {
    lives = 3;
}
var nightData = [];
var mouseIsClicked = false;
var mouseWasReleased = false;
var mouseWasPressed = false;
mouseReleased = function() {
    mouseWasReleased  = true;
};
mousePressed = function() {
    mouseWasPressed  = true;
};
mouseClicked = function() {
    mouseIsClicked = true;
};
var chance = function(l) {
    var list;
    if(arguments.length === 0) {
        throw { message: 'It looks like you are trying to use \"chance();\". You can use it like:\"chance([[10, \'apple\'], [20, \'banana\'], [70, \'orange\']]); | Jack JS\"' };
    }
    if(arguments.length === 1) {
        list = l;
    }
    list = Array.prototype.slice.call(arguments);
    var output;
    var a = 0;
    for (var i=0;i<list.length;i++) {
        a += list[i][0];
    }
    var r = random(a); // generates not 1/100, in case the sum of the odds are less than 100, or greater than that. Also avoids the problem with floating point arithmetic if you force the odds to add to 100.
    a = 0;
    for (var i=0;i<list.length;i++) {
        a += list[i][0];
        if (r<a) {
            return list[i][1];
        }
    }
    return list[0][0]; // in case something goes wrong, but should happen with 0 probability.
};
var Timer = function() {
    this.paused = true;
    this.reset = function() {
        this.startTime = millis();
        this.currentTime = 0;
        this.timeStorage = 0;
    };
    this.reset();
    this.pause = function() {
        this.paused = true;
        this.timeStorage = this.currentTime;
    };
    this.start = function() {
        this.paused = false;
        this.startTime = millis();
    };
    this.play = function() {
        this.start();
    };
    this.stop = function() {
        this.pause();
        this.reset();
    };
    this.getTime = function() {
        if(!this.paused) {
            this.currentTime = millis() - this.startTime + this.timeStorage;
        }
        return this.currentTime/1000;
    };
};
var average = function(one, two) {
    return(one + two)/2;
};
var randChoice = function(list) {
    return list[floor(random(list.length))];
};
var spf, s, curs = "default";
var sounds = [
    "rpg/battle-magic", "rpg/battle-spell", "rpg/battle-swing", "rpg/coin-jingle", "rpg/door-open", "rpg/giant-hyah", "rpg/giant-no", "rpg/giant-yah", "rpg/hit-clop", "rpg/hit-splat", "rpg/hit-thud", "rpg/hit-whack", "rpg/metal-chime", "rpg/metal-clink", "rpg/step-heavy", "rpg/water-bubble", "rpg/water-slosh", "retro/boom1", "retro/boom2", "retro/coin", "retro/hit1", "retro/hit2", "retro/jump1", "retro/jump2", "retro/laser1", "retro/laser2", "retro/laser3", "retro/laser4", "retro/rumble", "retro/thruster-short", "retro/thruster-long", "retro/whistle1", "retro/whistle2"];
// {
var lSounds = sounds;
var Sound = function(sound) {
    this.speed = 1;
    this.audio = sound.audio  || function() {throw {message: "Sound is not selected."};};
    this.start = 0;
    this.stop = 1;
    if(this.start>this.stop) {
        throw {message: "Start is greater than stop."};
    }
    this.audio.playbackRate = 1;
    this.volume = [];
    for(var i=0; i<100; i++) {
        this.volume.push(1);
    }
    this.audio.volume = 1;
    this.audio.currentTime = 0;
    this.play = function() {
        this.audio.currentTime = this.start*this.audio.duration;
        this.audio.play();
    };
    this.run = function() {
        if(this.audio.currentTime>this.audio.duration*this.stop) {
            this.audio.pause();
        } else {
            this.audio.volume = this.volume[floor((this.audio.currentTime/this.audio.duration)*100)] || 0;
        }
    };
};
var setSounds = function() {
    var s = sounds;
    sounds = {};
    for(var i=0; i<s.length; i++) {
        sounds[s[i]] = new Sound(getSound(s[i]));
    }
};
setSounds();
var soundTPList = [];
var resetSounds = function() {
    soundTPList = [];
    for(var i in sounds) {
        sounds[i].audio.pause();
    }
};
var normVol = function(vol) {
    var l = [];
    for(var i=0; i<100; i++) {
        l.push(vol);
    }
    return l;
};
var addSound = function(sound, s) {
    sounds[sound].ended = false;
    var time = s.time+millis() || millis();
    var vol = s.volume || normVol(1);
    var start = s.start || 0;
    var stop = s.stop || 1;
    var PBR = s.PBR || 1;
    soundTPList.push([time, sound, start, stop, vol, PBR]);
    soundTPList.sort(function(a, b) {return a[0]-b[0];});
};
var runSounds = function() {
    for(var i=0; i<soundTPList.length; i++) {
        if(millis() > soundTPList[i][0]) {
            sounds[soundTPList[i][1]].start = soundTPList[i][2];
            sounds[soundTPList[i][1]].stop = soundTPList[i][3];
            sounds[soundTPList[i][1]].volume = soundTPList[i][4];
            sounds[soundTPList[i][1]].audio.playbackRate = soundTPList[i][5];
            sounds[soundTPList[i][1]].play();
            soundTPList.splice(i, 1);
        } else {
            break;
        }
    }
    for(var i in sounds) {
        sounds[i].run();
    }
};
var addFade = function(l, start, stop) {
    var thing = function(i) {
        if(l[i] !== undefined) {
            l[i] = map(i, start[0], stop[0], start[1], stop[1]);
        }
        
    };
    if(start<stop) {
        for(var i=start[0]; i<stop[0]; i++) {
            thing(i);
        }
    }
    if(start>stop) {
        for(var i=start[0]; i>stop[0]; i--) {
            thing(i);
        }
    }
    return l;
};
// } Sound stuff.
var noiseVol = 0.01;
var noiseSound = {
    c: millis(),
    lVol: (function(){
        var v = normVol(noiseVol);
        v = addFade(v, [0, 0], [12, noiseVol]);
        v = addFade(v, [37, noiseVol], [50, 0]);
        return v;
    })(),
    sVol: (function(){
        var v = normVol(noiseVol);
        v = addFade(v, [0, 0], [25, noiseVol]);
        v = addFade(v, [25, noiseVol], [100, 0]);
        return v;
    })(),
    play: function() {
        if(millis()-this.c>sounds["retro/thruster-long"].audio.duration*500) {
            this.c = millis();
            addSound("retro/thruster-long", {start: 0, stop: 0.5, volume: this.lVol});
            addSound("retro/thruster-short", {start: 0, stop: 1, volume: this.sVol,
                time: sounds["retro/thruster-long"].audio.duration*500-sounds["retro/thruster-short"].audio.duration*500, PBR: 0.5});
        }
    }
};
var menuMusic = function() {
    addSound("retro/hit1", {time: 0, volume: normVol(1/2)});
    addSound("retro/hit1", {time: 750, volume: normVol(1/2)});
    addSound("retro/hit2", {time: 1000, volume: normVol(0.5/2)});
    addSound("retro/hit1", {time: 2250, volume: normVol(1/2)});
    addSound("retro/hit1", {time: 2750, volume: normVol(1/2)});
    addSound("retro/hit2", {time: 3000, volume: normVol(0.5/2)});
    addSound("retro/hit1", {time: 0+4000, volume: normVol(1/2)});
    addSound("retro/hit1", {time: 750+4000, volume: normVol(1/2)});
    addSound("retro/hit2", {time: 1000+4000, volume: normVol(0.5/2)});
    addSound("retro/hit1", {time: 2250+4000, volume: normVol(1/2)});
    addSound("retro/hit1", {time: 2750+4000, volume: normVol(1/2)});
    addSound("retro/hit2", {time: 3000+4000, volume: normVol(0.5/2), PBR: 0.5});
};
var gameStart = function() {
    addSound("retro/hit2", {start: 0, stop: 0.01, volume: normVol(0.5)});
};
var noBackground = function() {
    (background)(0, 0);
};
var linearGrad = function(x, y, c1, c2, w, h, f, r) {
    r = r || 0;
    f = 1/f;
    var img = createGraphics(w, h, JAVA2D);
    img.noStroke();
    img.background(0, 0);
    for(var i=0; i<=1; i+=f) {
        img.fill(lerpColor(c1, c2, i), map(i, 0, 1, alpha(c1), alpha(c2)));
        img.rect(w*i, 0, w*f, h);
    }
    imageMode(CENTER);
    pushMatrix();
    translate(x, y);
    rotate(r);
    image(img, 0, 0);
    popMatrix();
    imageMode(CORNER);
};
// Draw Animatronics {
var drawAnimatronicWinston = function(x, y, z, mouth, eye, eyeX, rotX, mouthRot, darkness, eyeBrightness) {
    if(eyeBrightness === undefined) {
        eyeBrightness = 255;
    }
    var yellow = lerpColor(color(255, 255, 0), color(0), darkness);
    var dkyellow = lerpColor(color(237, 237, 12), color(0), darkness);
    var dkyellow2 = lerpColor(color(248, 252, 3), color(0), darkness);
    var red = lerpColor(color(245, 0, 0), color(0), darkness);
    var gray = lerpColor(color(145, 127, 97), color(0), darkness);
    pushMatrix();
    noStroke();
    translate(x, y);
    scale(1/(z/200+1));
    fill(yellow);
    ellipse(0, 0, 200, 200);
    pushMatrix();
    translate(sin(rotX)*100, 0);
    scale(1-abs(sin(rotX)), 1);
    fill(eyeBrightness);
    ellipse(-35, -40, 25, 25);
    ellipse(35, -40, 25, 25);
    if(eye<=25 && eye>0) {
        fill(0);
        arc(35, -40, 25+1, 25+1, -179, 0);
        arc(-35, -40, 25+1, 25+1, -179, 0);
        fill(eyeBrightness);
        ellipse(-35, -40, 25, 25-eye);
        ellipse(35, -40, 25, 25-eye);
    }
    fill(0);
    var pSize = 7.5;
    var eyeM = sin(eyeX)*(25);
    eyeM = constrain(eyeM, -12.5+pSize/2, 12.5-pSize/2);
    var eyeS = ((abs(eyeM)/25+1));
    ellipse(-35+eyeM, -40, pSize/eyeS, pSize);
    ellipse(35+eyeM, -40, pSize/eyeS, pSize);
    fill(255-map(darkness, 0, 1, constrain(map(eye, 12.5, 25, 0, 255), 0, 255), 255));
    ellipse(-35+eyeM+pSize/4/(abs(eyeM)+1), -40-pSize/4, 1.5, 1.5);
    ellipse(35+eyeM+pSize/4/(abs(eyeM)+1), -40-pSize/4, 1.5, 1.5);
    if(eye>25 && eye<=50) {
        fill(0);
        arc(35, -40, 25+1, 25+1, -179, 0);
        arc(-35, -40, 25+1, 25+1, -179, 0);
        ellipse(-35, -40, 25+1, eye-25+1);
        ellipse(35, -40, 25+1, eye-25+1);
    }
    if(eye > 50) {
        fill(0);
        ellipse(-35, -40, 25+1, 25+1);
        ellipse(35, -40, 25+1, 25+1);
        fill(eyeBrightness);
        ellipse(-35, -40, pSize/2, pSize/2);
        ellipse(35, -40, pSize/2, pSize/2);
    }
    mouth = constrain(mouth, 0, 100);
    fill(red);
    ellipse(0, 35, mouth, mouth);
    fill(gray);
    for(var i=mouthRot; i<360+mouthRot; i+=30) {
        quad(cos(i)*50, sin(i)*50+35,
        cos(i)*40, sin(i)*40+35,
        cos(i+20)*40, sin(i+20)*40+35,
        cos(i+20)*50, sin(i+20)*50+35);
    }
    fill(dkyellow2);
    stroke(dkyellow);
    strokeWeight(2);
    for(var i=mouth*2; i<360+mouth*2; i+=10) {
        quad(cos(i)*(mouth/2), sin(i)*(mouth/2)+35,
        cos(i+5+10)*50, sin(i+5+10)*50+35,
        cos(i+15+10)*50, sin(i+15+10)*50+35,
        cos(i+10)*(mouth/2), sin(i+10)*(mouth/2)+35);
    }
    noFill();
    noStroke();
    popMatrix();
    popMatrix();
};
var drawAnimatronicHopper = function(x, y, z, mouth, eye, eyeX, headRot, arm1, arm2, leg1, leg2, bodyRot, tail, darkness, eyeBrightness) {
    if(eyeBrightness === undefined) {
        eyeBrightness = 255;
    }
    darkness = darkness || 0;
    var yellow = lerpColor(color(255, 214, 90), color(0), darkness);
    var dkyellow = lerpColor(color(237, 198, 83), color(0), darkness);
    var nsdkyellow = lerpColor(color(247, 204, 86), color(0), darkness);
    var gray = lerpColor(color(200), color(0), darkness);
    var red = lerpColor(color(118, 16, 19), color(0), darkness);
    var white = lerpColor(color(250), color(0), darkness);
    var brown = lerpColor(color(181, 109, 41), color(0), darkness);
    var armThickness = 20;
    var arm = function(l, t, end) {
        stroke(gray);
        strokeWeight(7.5);
        line(0, 0, l + 5 + (end ? -5 : 5), 0);
        noStroke();
        fill(nsdkyellow);
        for(var i=-t; i<t; i++) {
            ellipse(5+l/2, i, l, 30);
        }
    };
    var teeth = function(s) {
        s /= 2;
        fill(white);
        for(var i=15; i<=180; i+=30) {
            pushMatrix();
            rotate(i);
            rect(s, 0, s/5, s/2.5, 5);
            popMatrix();
        }
    };
    var eyeW = z/200+1;
    rectMode(CENTER);
    pushMatrix();
    translate(x, y);
    scale(1/(z/200+1));
    pushMatrix();
    scale(cos(bodyRot), 1);
    pushMatrix();
    fill(brown);
    translate(0, 25);
    rotate(tail);
    ellipse(50, 0, 100, 40);
    popMatrix();
    // Arm 2 {
    pushMatrix();
    translate(60, -60);
    rotate(arm2[0]+45);
    arm(50, 7, false);
    pushMatrix();
    translate(60, 0);
    rotate(arm2[1]);
    arm(50, 7, true);
    popMatrix();
    popMatrix();
    // }
    // Arm 1 {
    pushMatrix();
    scale(-1, 1);
    translate(60, -60);
    rotate(arm1[0]+45);
    arm(50, 7, false);
    pushMatrix();
    translate(60, 0);
    rotate(arm1[1]);
    arm(50, 7, true);
    popMatrix();
    popMatrix();
    // }
    // Arm 2 Shoulder {
    pushMatrix();
    translate(60, -60);
    stroke(gray);
    strokeWeight(7.5);
    line(0, 0, -10, 0);
    noStroke();
    fill(yellow);
    arc(-5, 10, 50, 50, -90, -45);
    popMatrix();
    // }
    // Arm 1 Shoulder {
    pushMatrix();
    scale(-1, 1);
    translate(60, -60);
    stroke(gray);
    strokeWeight(7.5);
    line(0, 0, -10, 0);
    noStroke();
    fill(yellow);
    arc(-5, 10, 50, 50, -90, -45);
    popMatrix();
    // }
    // Leg 2 {
    pushMatrix();
    translate(30, 15);
    rotate(leg2[0]+90);
    arm(75, 10, false);
    pushMatrix();
    translate(85, 0);
    rotate(leg2[1]);
    arm(75, 10, false);
    fill(dkyellow);
    ellipse(0, 0, 25, 25);
    pushMatrix();
    translate(85, 0);
    rotate(-leg2[0]-leg2[1]);
    fill(nsdkyellow);
    arc(37.5, 0, 75, 75, 90, 270);
    popMatrix();
    popMatrix();
    popMatrix();
    // }
    // Leg 1 {
    pushMatrix();
    scale(-1, 1);
    translate(30, 15);
    rotate(leg1[0]+90);
    arm(75, 10, false);
    pushMatrix();
    translate(85, 0);
    rotate(leg1[1]);
    arm(75, 10, false);
    fill(dkyellow);
    ellipse(0, 0, 25, 25);
    pushMatrix();
    translate(85, 0);
    rotate(-leg1[0]-leg1[1]);
    fill(nsdkyellow);
    arc(37.5, 0, 75, 75, 90, 270);
    popMatrix();
    popMatrix();
    popMatrix();
    // }
    popMatrix();
    // Head & Body {
    pushMatrix();
    scale(cos(headRot), 1);
    stroke(gray);
    strokeWeight(7.5);
    line(-25, -130, -30, -135);
    line(25, -130, 30, -135);
    noStroke();
    fill(yellow);
    arc(-30, -137, 40, 40, -225, -45);
    arc( 30, -135, 40, 40, -135, 45);
    popMatrix();
    arc(0, -75, 100, 250, 0, 180);
    fill(dkyellow);
    ellipse(0, -75, 100, 10);
    fill(gray);
    ellipse(0, -75, 20, 5);
    rect(0, -95, 20, 40);
    fill(yellow);
    arc(0, -90, 100, 100, -180, 0);
    mouth = constrain(mouth, 0, 90);
    fill(nsdkyellow);
    for(var i=-90; i<-85; i++) {
        arc(0, i, 100, sin(mouth+5)*100, 0, 180);
    }
    fill(red);
    arc(0, -90, 100, sin(mouth)*100, 0, 180);
    if(mouth > 0) {
        pushMatrix();
        translate(0, -90);
        scale(1, sin(mouth));
        teeth(75);
        popMatrix();
    }
    pushMatrix();
    translate(sin(headRot)*50, 0);
    scale(1-abs(sin(headRot)), 1);
    fill(white);
    rect(0, -85, 25, 15);
    var pSize = 7.5;
    var eyePos = [20, 110];
    var eyeSize = 15;
    fill(eyeBrightness);
    ellipse(-eyePos[0], -eyePos[1], eyeSize, eyeSize);
    ellipse(eyePos[0], -eyePos[1], eyeSize, eyeSize);
    if(eye<=eyeSize && eye>0) {
        fill(0);
        arc(eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize+eyeW, -179, 0);
        arc(-eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize+eyeW, -179, 0);
        fill(eyeBrightness);
        ellipse(-eyePos[0], -eyePos[1], eyeSize, eyeSize-eye);
        ellipse(eyePos[0], -eyePos[1], eyeSize, eyeSize-eye);
    }
    fill(0);
    var eyeM = sin(eyeX)*(25);
    eyeM = constrain(eyeM, -(eyeSize/2)+pSize/2, (eyeSize/2)-pSize/2);
    var eyeS = ((abs(eyeM)/25+1));
    ellipse(-eyePos[0]+eyeM, -eyePos[1], pSize/eyeS, pSize);
    ellipse(eyePos[0]+eyeM, -eyePos[1], pSize/eyeS, pSize);
    fill(255-map(darkness, 0, 1, constrain(map(eye, eyeSize/2, eyeSize, 0, 255), 0, 255), 255));
    ellipse(-eyePos[0]+eyeM+pSize/4/(abs(eyeM)+1), -eyePos[1]-pSize/4, 1.5, 1.5);
    ellipse(eyePos[0]+eyeM+pSize/4/(abs(eyeM)+1), -eyePos[1]-pSize/4, 1.5, 1.5);
    if(eye>eyeSize && eye<=eyeSize*2) {
        fill(0);
        arc(eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize+eyeW, -179, 0);
        arc(-eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize+eyeW, -179, 0);
        ellipse(-eyePos[0], -eyePos[1], eyeSize+eyeW, eye-eyeSize+eyeW);
        ellipse(eyePos[0], -eyePos[1], eyeSize+eyeW, eye-eyeSize+eyeW);
    }
    if(eye > eyeSize*2) {
        fill(0);
        ellipse(-eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize+eyeW);
        ellipse(eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize+eyeW);
        fill(eyeBrightness);
        ellipse(-eyePos[0], -eyePos[1], pSize/2, pSize/2);
        ellipse(eyePos[0], -eyePos[1], pSize/2, pSize/2);
    }
    popMatrix();
    // }
    popMatrix();
    rectMode(CORNER);
};
var drawAnimatronicOhNoes = function(x, y, z, mouth, eye, eyeX, eyebrow, rotX, darkness, eyeBrightness) {
    if(eyeBrightness === undefined) {
        eyeBrightness = 255;
    }
    var green = lerpColor(color(188, 231, 177), color(0), darkness);
    var dkgreen = lerpColor(color(136, 167, 127), color(0), darkness); // dark green
    var nsdkgreen = lerpColor(color(158, 201, 147), color(0), darkness); // not so dark green
    var red = lerpColor(color(129, 30, 25), color(0), darkness);
    var gray = lerpColor(color(145, 127, 97), color(0), darkness);
    var white = lerpColor(color(254), color(0), darkness);
    var eyeW = z/200+1;
    pushMatrix();
    noStroke();
    translate(x, y);
    scale(1/(z/200+1));
    fill(green);
    pushMatrix();
    translate(-195, -175);
    beginShape();
    vertex(170, 20);
    bezierVertex(300, 12, 386, 129, 352, 220);
    bezierVertex(306, 320, 111, 345, 50, 280);
    bezierVertex(3, 230, 20, 47, 170, 20);
    endShape();
    popMatrix();
    pushMatrix();
    translate(sin(rotX)*100, 0);
    scale(1-abs(sin(rotX)), 1);
    // Eyes {
    pushMatrix();
    translate(0, -50);
    var pSize = 27;
    var eyePos = [55, 0];
    var eyeSize = 70;
    var thing = 1.5;
    fill(eyeBrightness);
    ellipse(-eyePos[0], -eyePos[1], eyeSize, eyeSize*thing);
    ellipse(eyePos[0], -eyePos[1], eyeSize, eyeSize*thing);
    if(eye<=eyeSize && eye>0) {
        fill(0);
        arc(eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize*thing+eyeW, -179, 0);
        arc(-eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize*thing+eyeW, -179, 0);
        fill(eyeBrightness);
        ellipse(-eyePos[0], -eyePos[1], eyeSize, (eyeSize-eye)*thing);
        ellipse(eyePos[0], -eyePos[1], eyeSize, (eyeSize-eye)*thing);
    }
    var eyeM = sin(eyeX)*25;
    var eyeM2 = cos(eyeX);
    eyeM = constrain(eyeM, -(eyeSize/2)+pSize/2, (eyeSize/2)-pSize/2);
    eyeM2 = constrain(eyeM2, 0.5, 1);
    var eyeS = ((abs(eyeM)/25+1));
    pushMatrix();
    translate(-55+eyeM, 0);
    scale(1/eyeS, 1);
    fill(0);
    ellipse(0, 0, pSize, pSize);
    fill(255-map(darkness, 0, 1, constrain(map(eye, eyeSize/2, eyeSize, 0, 255), 0, 255), 255));
    ellipse(10*0.75, 0, 10*0.75, 17*0.75);
    popMatrix();
    pushMatrix();
    translate(55+eyeM, 0);
    scale(1/eyeS, 1);
    fill(0);
    ellipse(0, 0, pSize, pSize);
    fill(255-map(darkness, 0, 1, constrain(map(eye, eyeSize/2, eyeSize, 0, 255), 0, 255), 255));
    ellipse(10*0.75, 0, 10*0.75, 17*0.75);
    popMatrix();
    if(eye>eyeSize && eye<=eyeSize*2) {
        fill(0);
        arc(eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize*thing+eyeW, -179, 0);
        arc(-eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize*thing+eyeW, -179, 0);
        ellipse(-eyePos[0], -eyePos[1], eyeSize+eyeW, (eye-eyeSize)*thing+eyeW);
        ellipse(eyePos[0], -eyePos[1], eyeSize+eyeW, (eye-eyeSize)*thing+eyeW);
    }
    if(eye > eyeSize*2) {
        fill(0);
        ellipse(-eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize*thing+eyeW);
        ellipse(eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize*thing+eyeW);
        fill(eyeBrightness);
        ellipse(-eyePos[0], -eyePos[1], pSize/2, pSize/2);
        ellipse(eyePos[0], -eyePos[1], pSize/2, pSize/2);
    }
    popMatrix(); // }
    fill(dkgreen);
    textFont(createFont("Georgia Bold"));
    textSize(100);
    textAlign(CENTER, CENTER);
    for(var i=-3; i<3; i++) { 
        text(";", i, -125);
    }
    // Mouth {
    pushMatrix();
    translate(0, 60);
    rotate(mouth);
    fill(red);
    arc(0, 45, 145, 200, -179, 0);
    fill(white);
    rect(-21, -53, 20, 30);
    rect(3, -53, 20, 30);
    noFill();
    stroke(nsdkgreen);
    strokeWeight(5);
    arc(0, 45, 145, 200, -179, 0);
    line(-72.5, 45, 72.5, 45);
    noStroke();
    popMatrix();
    // }
    // Eyebrows {
    eyebrow = constrain(map(eyebrow, 0, 100, -135, -45), -135, -45);
    // #1
    pushMatrix();
    translate(-55+cos(eyebrow)*35, -50+sin(eyebrow)*55);
    rotate(eyebrow);
    stroke(nsdkgreen);
    strokeWeight(10);
    line(0, -25, 0, 37.5);
    popMatrix();
    // #2
    pushMatrix();
    scale(-1, 1);
    translate(-55+cos(eyebrow)*35, -50+sin(eyebrow)*55);
    rotate(eyebrow);
    stroke(nsdkgreen);
    strokeWeight(10);
    line(0, -25, 0, 37.5);
    popMatrix();
    noStroke();
    // }
    popMatrix();
    popMatrix();
};
var drawAnimatronicSquidical = function(x, y, z, head, eye, eyeX, arm1, arm2, legs, rot, darkness, eyeBrightness) {
    if(eyeBrightness === undefined) {
        eyeBrightness = 255;
    }
    var orange = lerpColor(color(243, 147, 37), color(0), darkness);
    var ltorange = lerpColor(color(251, 185, 32), color(0), darkness);
    var dkorange = lerpColor(color(217, 94, 51), color(0), darkness);
    var gray = lerpColor(color(200), color(0), darkness);
    var dkgray = lerpColor(color(100), color(0), darkness);
    var nsdkgray = lerpColor(color(150), color(0), darkness);
    var sdkorange = lerpColor(color(91, 64, 5), color(0), darkness);
    var white = lerpColor(color(255), color(0), darkness);
    var black = lerpColor(color(0), color(0), darkness);
    var grayShade = function(shade) {
        return lerpColor(white, black, shade);
    };
    var orangeShade = function(shade) {
        return lerpColor(orange, dkorange, shade);
    };
    var eyeW = z/200+1;
    pushMatrix();
    noStroke();
    rectMode(CENTER);
    translate(x, y);
    rotate(rot);
    scale(1/(z/200+1));
    // Arms {
    fill(gray);
    ellipse(-30, 45, 25, 25);
    ellipse(30, 45, 25, 25);
    // Arm 1 {
    pushMatrix();
    translate(-30, 45);
    rotate(arm1[0]);
    fill(gray);
    ellipse(-60, 0, 20, 20);
    fill(orangeShade(0.5));
    quad(-7, -15, -7, 15, -57, 10, -57, -10);
    pushMatrix();
    translate(-55, 0);
    rotate(arm1[1]);
    fill(orangeShade(0.5));
    triangle(-7, -10, -7, 10, -107, 0);
    popMatrix();
    popMatrix();
    // }
    // Arm 2 {
    pushMatrix();
    scale(-1, 1);
    translate(-30, 45);
    rotate(arm2[0]);
    fill(gray);
    ellipse(-60, 0, 20, 20);
    fill(orangeShade(0.5));
    quad(-7, -15, -7, 15, -57, 10, -57, -10);
    pushMatrix();
    translate(-55, 0);
    rotate(arm2[1]);
    fill(orangeShade(0.5));
    triangle(-7, -10, -7, 10, -107, 0);
    popMatrix();
    popMatrix();
    // }
    // }
    // Legs {
    pushMatrix();
    var hmm = 15/65;
    translate(0, 115);
    scale(1, hmm);
    legs %= 360/6;
    for(var i=legs; i>=legs-360; i-=60) {
        fill(orangeShade(-sin(i)*0.5+0.5));
        triangle(
            cos(i+30)*32.5, sin(i+30)*32.5,
            cos(i-30)*32.5, sin(i-30)*32.5,
            cos(i)*50, sin(i)*50+200
        );
    } 
    popMatrix();
    // }
    // Body {
    fill(orange);
    rect(0, 65, 65, 100);
    ellipse(0, 115, 64, 15);
    fill(orangeShade(0.5));
    ellipse(0, 15, 64, 15);
    fill(gray);
    ellipse(0, 15, 25, 7.5);
    rect(0, 10, 25, 7.5);
    fill(orange);
    ellipse(0, -50, 130, 130);
    fill(sdkorange);
    ellipse(0, -105, 20, 10);
    pushMatrix();
    translate(sin(head)*65, 0);
    scale(1-abs(sin(head)), 1);
    fill(ltorange);
    ellipse(0, -50, 90, 90);
    // }
    // Eye {
    pushMatrix();
    translate(0, -50);
    var pSize = 46;
    var eyePos = [0, 0];
    var eyeSize = 70;
    var thing = 1;
    fill(eyeBrightness);
    ellipse(-eyePos[0], -eyePos[1], eyeSize, eyeSize*thing);
    ellipse(eyePos[0], -eyePos[1], eyeSize, eyeSize*thing);
    if(eye<=eyeSize && eye>0) {
        fill(0);
        arc(eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize*thing+eyeW, -179, 0);
        fill(eyeBrightness);
        ellipse(-eyePos[0], -eyePos[1], eyeSize, (eyeSize-eye)*thing);
    }
    var eyeM = sin(eyeX)*25;
    var eyeM2 = cos(eyeX);
    eyeM = constrain(eyeM, -(eyeSize/2)+pSize/2, (eyeSize/2)-pSize/2);
    eyeM2 = constrain(eyeM2, 0.5, 1);
    var eyeS = ((abs(eyeM)/25+1));
    pushMatrix();
    translate(-eyePos[0]+eyeM, 0);
    scale(1/eyeS, 1);
    fill(0);
    ellipse(0, 0, pSize, pSize);
    fill(255-map(darkness, 0, 1, constrain(map(eye, eyeSize/2, eyeSize, 0, 255), 0, 255), 255));
    ellipse(10*0.75, -3, 10*0.55*1.5, 17*0.65*1.5);
    popMatrix();
    if(eye>eyeSize && eye<=eyeSize*2) {
        fill(0);
        arc(eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize*thing+eyeW, -179, 0);
        ellipse(-eyePos[0], -eyePos[1], eyeSize+eyeW, (eye-eyeSize)*thing+eyeW);
    }
    if(eye > eyeSize*2) {
        fill(0);
        ellipse(-eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize*thing+eyeW);
        fill(eyeBrightness);
        ellipse(-eyePos[0], -eyePos[1], pSize/2, pSize/2);
    }
    popMatrix(); // }
    popMatrix();
    // Mouth {
        //fill(0);
        //quad(0, -7, 9.5, 2.5, 0, 12, -9.5, 2.5);
        //fill(dkorange);
        //triangle(0, -7.5, 10, 2.5, -10, 2.5);
        //triangle(10, 2.5, 0, 12.5, -10, 2.5);
    // }
    popMatrix();
    rectMode(CORNER);
};
var rotatedEllipse = function(x, y, w, h, rot) {
    pushMatrix();
    translate(x, y);
    rotate(rot);
    ellipse(0, 0, w, h);
    popMatrix();
};
var rotatedArc = function(x, y, w, h, start, stop, rot) {
    pushMatrix();
    translate(x, y);
    rotate(rot);
    arc(0, 0, w, h, start, stop);
    popMatrix();
};
var drawHal = function(x, y, z, arm1, arm2, leg1, leg2, eyes, darkness) {
    var red = lerpColor(color(176, 11, 49), color(0), darkness);
    var yellow = lerpColor(color(255, 197, 0), color(0), darkness);
    var black = lerpColor(color(34, 34, 38), color(0), darkness);
    var dkgray = lerpColor(color(90, 96, 107), color(0), darkness);
    var gray = lerpColor(color(113, 119, 133), color(0), darkness);
    var ltgray = lerpColor(color(216, 229, 255), color(0), darkness);
    var eye = function(x, y, width) {
        width = constrain(width, 0, 85);
        fill(255, 0, 0, 127.5/width);
        for(var i=width*4-100; i<width*4; i+=20) {
            ellipse(x, y, i, i);
            ellipse(-x, y, i, i);
        }
        fill(255);
        width = constrain(width, 0, 2.5);
        ellipse(x, y, width, width);
        ellipse(-x, y, width, width);
    };
    rectMode(CENTER);
    pushMatrix();
    translate(x, y);
    scale(1/(z/200+1));
    // Legs {
    // Leg 1 {
    pushMatrix();
    translate(-27, 20);
    rotate(leg1);
    fill(dkgray);
    rect(0, 66, 37.5, 100);
    fill(black);
    ellipse(0, 66, 45, 45);
    fill(ltgray);
    arc(0, 140, 75, 75, -180, 0);
    popMatrix();
    // }
    // Leg 2 {
    pushMatrix();
    scale(-1, 1);
    translate(-27, 20);
    rotate(leg2);
    fill(dkgray);
    rect(0, 66, 37.5, 100);
    fill(black);
    ellipse(0, 66, 45, 45);
    fill(ltgray);
    arc(0, 140, 75, 75, -180, 0);
    popMatrix();
    // }
    fill(ltgray);
    arc(-27, 20, 60, 60, 40, 145);
    arc(27, 20, 60, 60, 40, 145);
    // }
    for(var i=-10; i<=10; i++) {
        (fill)([black, dkgray][abs(i%2)]);
        rect(i*5, 0, 5, 75);
    }
    fill(red);
    arc(0, 38, 105, 25, 181, 360);
    fill(gray);
    rotatedEllipse(-26, -55, 30, 15, -6);
    rotatedEllipse(26, -55, 30, 15, 6);
    // Head {
    // Ears
    pushMatrix();
    translate(-20, -100);
    rotate(-32);
    fill(yellow);
    rect(0, 0, 7.5, 20);
    rotate(-7.5);
    rect(2, -9, 2.5, 25);
    popMatrix();
    pushMatrix();
    scale(-1, 1);
    translate(-20, -100);
    rotate(-32);
    fill(yellow);
    rect(0, 0, 7.5, 20);
    rotate(-7.5);
    rect(2, -9, 2.5, 25);
    popMatrix();
    // Forehead
    fill(gray);
    arc(0, -55, 50, 100, -165, -15);
    // Neck
    fill(black);
    ellipse(0, -55, 30, 12);
    ellipse(0, -59, 30, 12);
    ellipse(0, -62, 30, 12);
    // Chin
    fill(gray);
    arc(0, -70, 50, 15, 15, 165);
    // Mouth
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(0, -83, 50, 15, 45, 135);
    noStroke();
    // Eyes
    fill(yellow);
    rect(0, -90, 30, 6, 3);
    fill(red);
    rect(0, -91, 28, 5, 3);
    eye(7.5, -90, eyes);
    // Helmet
    fill(red);
    triangle(0, -96, -15, -110, 15, -110);
    arc(0, -108, 30, 10, -165, -15);
    // }
    // Arms {
    // Arm 1 {
    pushMatrix();
    translate(-40, -50);
    rotate(arm1[0]);
    fill(ltgray);
    rect(-35, 10, 80, 30);
    fill(black);
    rect(-35, 2.5, 80, 7.5);
    fill(red);
    ellipse(-27, 0, 50, 35);
    pushMatrix();
    translate(-75, 10);
    rotate(arm1[1]);
    fill(red);
    ellipse(-13, 0, 65, 37.5);
    pushMatrix();
    translate(-45, 0);
    rotate(arm1[2]);
    fill(ltgray);
    rect(-15, 0, 37.5, 25,
        25, 0, 0, 0);
    fill(yellow);
    ellipse(0, 0, 20, 25);
    popMatrix();
    popMatrix();
    popMatrix();
    // }
    // Arm 2 {
    pushMatrix();
    scale(-1, 1);
    translate(-40, -50);
    rotate(arm2[0]);
    fill(ltgray);
    rect(-35, 10, 80, 30);
    fill(black);
    rect(-35, 2.5, 80, 7.5);
    fill(red);
    ellipse(-27, 0, 50, 35);
    pushMatrix();
    translate(-75, 10);
    rotate(arm2[1]);
    fill(red);
    ellipse(-13, 0, 65, 37.5);
    pushMatrix();
    translate(-45, 0);
    rotate(arm2[2]);
    fill(ltgray);
    rect(-15, 0, 37.5, 25,
        25, 0, 0, 0);
    fill(yellow);
    ellipse(0, 0, 20, 25);
    popMatrix();
    popMatrix();
    popMatrix();
    // }
    // }
    fill(black);
    ellipse(-40, -50, 15, 15);
    ellipse(40, -50, 15, 15);
    // Chest Thingy {
    fill(gray);
    rotatedArc(-26, -28, 60, 80, 0, 180, 30);
    rotatedArc(26, -28, 60, 80, 0, 180, -30);
    rect(0, -23, 77, 30);
    rect(0, -28, 102, 30);
    fill(ltgray);
    rotatedEllipse(-22, -35, 67, 40, -4);
    rotatedEllipse(22, -35, 67, 40, 4);
    stroke(gray);
    strokeWeight(1);
    arc(0, -9, 10, 75, -165, -15);
    noStroke();
    fill(gray);
    arc(0, -9, 12.5, 35, -180, 0);
    rotatedEllipse(-30, -36, 40, 25, -10);
    rotatedEllipse(30, -36, 40, 25, 10);
    fill(yellow);
    rotatedEllipse(-30, -36, 35, 20, -10);
    rotatedEllipse(30, -36, 35, 20, 10);
    // }
    popMatrix();
    rectMode(CORNER);
};
var drawMrPanteater = function(x, y, z, mouth, headRot, eye, eyeX, rotX, arm1, arm2, darkness, eyeBrightness) {
    if(eyeBrightness === undefined) {
        eyeBrightness = 255;
    }
    
    var blue = lerpColor(color(66, 183, 161), color(0), darkness);
    var sdkblue = lerpColor(color(62, 168, 147), color(0), darkness); // slightly dark blue
    var ltblue = lerpColor(color(199, 228, 213), color(0), darkness);
    var dkblue = lerpColor(color(32, 59, 52), color(0), darkness);
    var red = lerpColor(color(203, 57, 81), color(0), darkness);
    var gray = lerpColor(color(74, 75, 73), color(0), darkness);
    var white = lerpColor(color(254, 254, 254), color(0), darkness);
    var eyeW = z/200+1;
    var ear = function(x, y, rot) {
        pushMatrix();
        translate(x, y);
        rotate(rot);
        stroke(dkblue);
        strokeWeight(7.5);
        line(0, 0, 0, -10);
        noStroke();
        fill(blue);
        rect(0, -30, 50, 45,
            25, 25, 0, 0);
        fill(white);
        rect(0, -30, 35, 30,
            100, 100, 10, 10);
        popMatrix();
    };
    var arm = function(x, y, rot) {
        pushMatrix();
        translate(x, y);
        rotate(rot);
        fill(sdkblue);
        pushMatrix();
        translate(80, 12.5);
        ellipse(-80, -12.5, 25, 25);
        ellipse(-80, -100, 75, 75);
        quad(-92.5, -12.5, -67.5, -12.5, -42.5, -100, -117.5, -100);
        popMatrix();
        popMatrix();
    };
    rectMode(CENTER);
    pushMatrix();
    noStroke();
    translate(x, y);
    scale(1/(z/200+1));
    // Ears {
    pushMatrix();
    scale(cos(headRot), 1);
    ear(-52.5, -132.5, -25);
    ear(52.5, -132.5, 25);
    popMatrix();
    // }
    // Body {
    fill(blue);
    rect(0, -10, 200, 275, 100);
    pushMatrix();
    translate(sin(rotX)*100, 0);
    scale(1-abs(sin(rotX)), 1);
    fill(dkblue);
    ellipse(-80, -12.5, 25, 50);
    ellipse(80, -12.5, 25, 50);
    // }
    // Mouth {
    pushMatrix();
    translate(0, -37.5);
    rotate(mouth);
    fill(dkblue);
    arc(0, 12.5, 45, 65, -179, 0);
    fill(white);
    ellipse(0, -17, 40, 10);
    fill(red);
    ellipse(-10, 12, 40, 20);
    ellipse(8, 14, 35, 20);
    noFill();
    stroke(blue);
    strokeWeight(25);
    arc(0, 12.5, 70, 90, -179, 0);
    line(-35, 25, 35, 25);
    noStroke();
    popMatrix();
    // }
    // Eyebrows {
    noFill();
    stroke(dkblue);
    strokeWeight(3);
    arc(-25, -105, 18, 25, -135, -45);
    arc(25, -105, 18, 25, -135, -45);
    noStroke();
    // }
    // Eyes {
    pushMatrix();
    translate(0, 0);
    var pSize = 9;
    var eyePos = [23, 90];
    var eyeSize = 21;
    var thing = 1;
    fill(eyeBrightness);
    ellipse(-eyePos[0], -eyePos[1], eyeSize, eyeSize*thing);
    ellipse(eyePos[0], -eyePos[1], eyeSize, eyeSize*thing);
    if(eye<=eyeSize && eye>0) {
        fill(0);
        arc(eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize*thing+eyeW, -179, 0);
        arc(-eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize*thing+eyeW, -179, 0);
        fill(eyeBrightness);
        ellipse(-eyePos[0], -eyePos[1], eyeSize, (eyeSize-eye)*thing);
        ellipse(eyePos[0], -eyePos[1], eyeSize, (eyeSize-eye)*thing);
    }
    var eyeM = sin(eyeX)*25;
    var eyeM2 = cos(eyeX);
    eyeM = constrain(eyeM, -(eyeSize/2)+pSize/2, (eyeSize/2)-pSize/2);
    eyeM2 = constrain(eyeM2, 0.5, 1);
    var eyeS = ((abs(eyeM)/25+1));
    pushMatrix();
    translate(-eyePos[0]+eyeM, -eyePos[1]);
    scale(1/eyeS, 1);
    fill(0);
    ellipse(0, 0, pSize, pSize);
    fill(255-map(darkness, 0, 1, constrain(map(eye, eyeSize/2, eyeSize, 0, 255), 0, 255), 255));
    ellipse(2, -2, 3, 3);
    popMatrix();
    pushMatrix();
    translate(eyePos[0]+eyeM, -eyePos[1]);
    scale(1/eyeS, 1);
    fill(0);
    ellipse(0, 0, pSize, pSize);
    fill(255-map(darkness, 0, 1, constrain(map(eye, eyeSize/2, eyeSize, 0, 255), 0, 255), 255));
    ellipse(2, -2, 3, 3);
    popMatrix();
    if(eye>eyeSize && eye<=eyeSize*2) {
        fill(0);
        arc(eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize*thing+eyeW, -179, 0);
        arc(-eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize*thing+eyeW, -179, 0);
        ellipse(-eyePos[0], -eyePos[1], eyeSize+eyeW, (eye-eyeSize)*thing+eyeW);
        ellipse(eyePos[0], -eyePos[1], eyeSize+eyeW, (eye-eyeSize)*thing+eyeW);
    }
    if(eye > eyeSize*2) {
        fill(0);
        ellipse(-eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize*thing+eyeW);
        ellipse(eyePos[0], -eyePos[1], eyeSize+eyeW, eyeSize*thing+eyeW);
        fill(eyeBrightness);
        ellipse(-eyePos[0], -eyePos[1], pSize/2, pSize/2);
        ellipse(eyePos[0], -eyePos[1], pSize/2, pSize/2);
    }
    popMatrix();
    // }
    // Feet {
        fill(ltblue);
        ellipse(-35, 132, 55, 25);
        ellipse(35, 132, 55, 25);
    // }
    // Hat {
        fill(gray);
        ellipse(0, -145, 100, 25);
        fill(white);
        ellipse(0, -145, 75, 12.5);
        rect(0, -152, 75, 12.5);
        fill(gray);
        ellipse(0, -158, 75, 12.5);
        rect(0, -195, 75, 75);
        ellipse(0, -232, 75, 12.5);
    // }
    // Arms {
    arm(-80, -12.5, arm1);
    arm(80, -12.5, arm2);
    // }
    popMatrix();
    popMatrix();
    rectMode(CORNER);
};
var animatronicSam = function(x, y, z, rotX, glitch, darkness) {
    var blue = lerpColor(color(0, 146, 213), color(0), darkness);
    var navyblue = lerpColor(color(0, 50, 74), color(0), darkness);
    var white = lerpColor(color(255), color(0), darkness);
    var gray = lerpColor(color(50), color(0), darkness);
    var red = lerpColor(color(200, 0, 25), color(0), darkness);
    rectMode(CENTER);
    pushMatrix();
    noStroke();
    translate(x, y);
    scale(1/(z/200+1));
    fill(blue);
    ellipse(0, 0, 200, 200);
    pushMatrix();
    translate(sin(rotX)*100, 0);
    scale(1-abs(sin(rotX)), 1);
    // Head {
    if(glitch[6]) {
        pushMatrix();
        translate(31, 61);
        rotate(-25);
        fill(red);
        rect(0, 0, 100, 50, 25);
        fill(white);
        for(var i=-36; i<38; i+=20) {
            triangle(i, -25, i+20, -25, i+10, -3);
            triangle(i, 23, i+20, 23, i+10, 1);
        }
        popMatrix();
    }
    if(glitch[0]) {
        pushMatrix();
        rotate(-26);
        translate(-12, -25);
    }
    fill(white);
    rect(-32, 0, 29, 30, 5);
    rect(32, 0, 29, 30, 5);
    fill(0);
    ellipse(-32, 0, 15, 15);
    ellipse(32, 0, 15, 15);
    fill(white);
    ellipse(-29, -3, 5, 5);
    ellipse(34, -3, 5, 5);
    if(glitch[3]) {
        fill(0);
        rect(32, 0, 29, 30, 5);
        fill(255, 50, 0);
        ellipse(32, 0, 10, 10);
    }
    if(glitch[4]) {
        fill(0);
        rect(-32, 0, 29, 30, 5);
        fill(255, 50, 0);
        ellipse(-32, 0, 10, 10);
    }

    if(glitch[2]) {
        pushMatrix();
        rotate(-20);
        translate(-30, 37);
    }
    noFill();
    stroke(gray);
    strokeWeight(3);
    rect(-37, 3, 34, 21, 5);
    rect(37, 4, 36, 21, 5);
    line(-17, 0, 19, 0);
    noStroke();
    if(glitch[2]) {
        popMatrix();
    }
    if(glitch[1]) {
        pushMatrix();
        rotate(13);
    }
    fill(0);
    rect(-33, -25, 30, 6);
    rect(33, -25, 30, 6);
    if(glitch[1]) {
        popMatrix();
    }
    if(glitch[0]) {
        popMatrix();
    }
    // }
    popMatrix();
    fill(navyblue);
    var e = 0;
    if(glitch[5]) {
        e = 25;
    }
    pushMatrix();
    rotate(e);
    translate(0, -95);
    beginShape();
    var thing = 45;
    for(var i=e+5; i<=360+e+5; i+=thing) {
        vertex(cos(i)*25*3, sin(i)*25/2*3);
        vertex(cos(i+thing/2)*5*3, sin(i+thing/2)*5/2*3);
    }
    endShape();
    popMatrix();
    popMatrix();
    rectMode(CORNER);
};
var drawFuzzy = function(x, y, z, rot, rotX, darkness, eye, q) {
    q |= 1;
    if(eye === undefined) {
        eye = 255;
    }
    var red = lerpColor(color(209, 63, 37), color(0), darkness);
    var dkred = lerpColor(color(185, 24, 26), color(0), darkness);
    var gray = lerpColor(color(150), color(0), darkness);
    var dkgray = lerpColor(color(100), color(0), darkness);
    pushMatrix();
    noStroke();
    translate(x, y);
    scale(1/(z/200+1));
    var Width = 50;
    for(var i=Width; i>=0; i-=q) {
        pushMatrix();
        translate(sin(rotX)*i, 0);
        scale(cos(rotX), 1);
        fill(gray);
        if(i === 0 && rot>0) {
            fill(dkgray);
        }
        if(i === Width && rot<360) {
            fill(dkgray);
        }
        var spikeLength = 50;
        var spikes = 9;
        var spikeWidth = 360/spikes;
        beginShape();
        for(var j=0+rot; j<360+rot; j+=spikeWidth) {
            vertex(cos(j)*(75+spikeLength), sin(j)*(75+spikeLength));
            vertex(cos(j+spikeWidth/2)*(75+spikeLength/4), sin(j+spikeWidth/2)*(75+spikeLength/4));
        }
        endShape();
        fill(red);
        ellipse(0, 0, 150, 150);
        popMatrix();
    }
    pushMatrix();
    scale(cos(rotX), 1);
    fill(0);
    stroke(dkred);
    strokeWeight(5);
    ellipse(-30, 0, 50, 50);
    ellipse(30, 0, 50, 50);
    noStroke();
    fill(eye);
    ellipse(-30, 0, 10, 10);
    ellipse(30, 0, 10, 10);
    popMatrix();
    popMatrix();
};
var goldenWinston = function(x, y, size) {
    pushMatrix();
    translate(x, y);
    scale(size/400);
    fill(227, 179, 22);
    ellipse(0, 0, 400, 400);
    var y = 75;
    fill(0);
    ellipse(0, y, 200, 200);
    ellipse(-85, -85, 50, 50);
    ellipse(85, -85, 50, 50);
    strokeWeight(5);
    noFill();
    stroke(0, 100, 255);
    arc(-126, -48, 100, 100, -15, 15);
    arc(-30, -22, 100, 100, -15-180, 15-180);
    stroke(255, 50, 0);
    arc(-127, -54, 75, 50, -15, 15);
    arc(-55, -39, 75, 50, -15-180, 15-180);
    noStroke();
    fill(230);
    ellipse(85, -65, 10, 10);
    fill(88, 169, 227);
    ellipse(85, -65, 5, 5);
    fill(0);
    ellipse(85, -65, 3, 3);
    fill(125, 96, 66);
    for(var i=0; i<360; i+=30) {
        triangle(cos(i)*100, sin(i)*100+y,
        cos(i+10)*60, sin(i+10)*60+y,
        cos(i+20)*100, sin(i+20)*100+y);
    }
    noFill();
    stroke(161, 125, 16);
    strokeWeight(5);
    ellipse(0, y, 200, 200);
    noStroke();
    popMatrix();
};
// }
var drawPowerUsage = function(x, y, usage) {
    pushMatrix();
    translate(x, y);
    if(usage>0) {
        fill(0, 245, 0);
        rect(0, 0, 15, 25);
        fill(0, 235, 0);
        rect(15, 0, 5, 25);
        translate(22, 0);
    }
    if(usage>1) {
        fill(0, 245, 0);
        rect(0, 0, 15, 25);
        fill(0, 235, 0);
        rect(15, 0, 5, 25);
        translate(22, 0);
    }
    if(usage>2) {
        fill(245, 245, 0);
        rect(0, 0, 15, 25);
        fill(335, 225, 0);
        rect(15, 0, 5, 25);
        translate(22, 0);
    }
    if(usage>3) {
        fill(245, 0, 0);
        rect(0, 0, 15, 25);
        fill(235, 0, 0);
        rect(15, 0, 5, 25);
        translate(22, 0);
    }
    popMatrix();
};
var powerOut = false;
// Loading Stuff {
var generateNoise = function() {
    noBackground();
    for(var i=0;i<750;i++) {
        (fill)(255, random(20, 40));
        var w = random(20, 23);
        var h = random(1.5, 3);
        ellipse(random(-w/2, width*0.5+w/2), random(-h/2, height*0.5+h/2), w, h);
    }
    return get(0, 0, width*0.5, height*0.5);
};
var images = {};
images.noise = [];
var displayNoise = function() {
    image(images.noise[frameCount%images.noise.length],0,0,width,height);
    image(images.noise[(frameCount+floor(images.noise.length/2))%images.noise.length],0,0,width,height);
};
var noiseCount = 50;
var textures = [[[color(156, 81, 6), color(245, 209, 110)], [0.1, 0.01], 5, null, 5, 5], [[color(0), color(255)], [0.05, 0.05], 7, null, 3, 5,0], [[(color)(255, 50), (color)(0, 100)], [0.01, 0.01], 1, null, 25, 3]];
images.textures = [];
var texCount = 0;
var texTime = 0;
var textureProgress = null;
var createTexture = function(colors, fineness, smoothness, y, octaves, octaveNum, variaty){
    var C;
    var xoff = 0;
    octaves |= 1;
    octaveNum |= 2;
    variaty |= 0;
    noBackground();
    strokeWeight(1);
    var n;
    for (var x = 0; x < 200; x++) {
        n = noise(x*fineness[0], y*fineness[1]);
        var lnum = 1;
        for(var i=0;i<octaves;i++) {
            lnum*=octaveNum;
            var l = [];
            for(var j=0;j<lnum;j++) {
                l.push(n);
            }
            l.push(noise(x*fineness[0]*lnum, y*fineness[1]*lnum));
            var o = 0;
            for(var i=0;i<l.length;i++) {
                o = average(o, l[i]);
            }
            n = o;
        }
        C = lerpColor(colors[0], colors[1], n);
        C = color(
        round(red(C)/smoothness)*smoothness+random(-variaty, variaty),
        round(green(C)/smoothness)*smoothness+random(-variaty, variaty),
        round(blue(C)/smoothness)*smoothness+random(-variaty, variaty),
        map(n, 0, 1, alpha(colors[0]), alpha(colors[1])));
        stroke(C);
        point(x, y);
    }
    noStroke();
};
var blurThing = function(B, S) {
    (image)(images.wanted);
    var img = get(0, 0, width, height);
    background(0);
    fill(255);
    ellipse(300, 300, S, S);
    var cut = get(0, 0, width, height);
    img.mask(cut);
    background(255);
    (image)(images.wanted);
    filter(BLUR, B);
    (image)(img);
    images.wanted = get(0, 0, width, height);
};
var isEven = function(num){
    var output = false;
    if(floor(num/2) === num/2){
        output = true;
    }
    return output;
};
images.progress = {};
var IGFC = 0;
var loadingDone = 0;
var IGF = [
    function() {
        noBackground();
        pushMatrix();
        translate(-202, -161);
        fill(90);
        ellipse(243+10, 221, 80, 120);
        fill(120);
        ellipse(243, 221, 80, 120);
        fill(150);
        rect(235,219,20,54);
        ellipse(254,246,20,54);
        rect(225, 180, 16, 27 );
        ellipse(239, 193, 16, 27 );
        var move = [25, 4];
        rect(225+move[0], 180+move[1], 16, 27 );
        ellipse(239+move[0], 193+move[1], 16, 27 );
        
        pushMatrix();
        translate(235, 246);
        scale(0.25, 0.51);
        
        rotate(5);
        fill(150, 0, 0);
        stroke(100);
        strokeWeight(5);
        ellipse(0, 0, 100, 100);
        noStroke();
        fill(100);
        for(var i=0;i<360;i+=30){
            triangle(cos(i)*50,sin(i)*50,cos(i+20)*50,sin(i+20)*50,cos(i+10)*30,sin(i+10)*30);
        }
        fill(10);
        ellipse(-50, -100, 50, 50);
        ellipse(50, -100, 50, 50);
        fill(255);
        ellipse(-43, -100, 10, 10);
        ellipse(53, -100, 10, 10);
        popMatrix();
        popMatrix();
        images.menu = {};
        images.menu.exo = get(0, 0, 91, 120);
    }, // menu.exo
    function() {
        noBackground();
        linearGrad(300, 300, color(0, 0), color(0, 255), 600, 600, 150, 0);
        images.menuGrad = get(0, 0, width, height);
    }, // menuGrad
    function() {
        background(255);
        image(images.textures[2], 0, 0, width, height);
        (fill)(255, 150);
        rect(0, 0, width, height);
        pushMatrix();
        rotate(-1);
        textFont(createFont("Century Gothic"));
        noFill();
        stroke(0);
        strokeWeight(5);
        rectMode(CENTER);
        rect(300, 300, 400, 400);
        rect(0, 100, 200, 400);
        rect(0, 500, 200, 400);
        rect(600, 250, 200, 400);
        rect(600, 650, 200, 400);
        rect(600, 0, 200, 100);
        noStroke();
        fill(0);
        rect(300, 125, 400, 50);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(50);
        text("HELP WANTED", 300, 125);
        textSize(30);
        fill(0);
        textFont(createFont("Cambria"));
        text("Winston's Doughnut\nShop and Fun Place", 300, 187.5);
        textSize(15);
        textAlign(RIGHT, TOP);
        text("We are looking for\na security guard to\nwork the nightshift.\n12 am to 6 am.\n\nMonitor cameras, ensure\nsafety of equipment and\nanimatronic charactors.\n\nNot responsible for\ninjury/dismemberment\n\n$120 a week\nTo apply call:\n1-888-EAT-WIN-STON", 490, 220);
        textAlign(LEFT, TOP);
        text("Blah. Blah. Blah. Blah.\nThis ad is nothing.\nAnything cool is good.\nBlah. Blah. Blah.\nIT'S ME‼ You will die!\nBlah. Blah. Blah.\nWARNING: Using this server will ruin your life.\nCost: $101. Don't buy it!\nAre you listing to me?!", 510, 460);
        text("Chewie, hit the hyperdrive!\n Are you nuts! No!", 510, 10);
        text("Yada. Yada. Yada. Just say Yoda! Blah. Blah. Blah. Blah. Blah.\nBlah. Blah. Blah. Blah. Hey you! Do you want to eat a salmon\nsandwich? Why don't you eat one while playing with a\nNintendo Switch? Blah. Blah. Blah. Blah. Blah. Blah. Blah.\nBlah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Blah. Bye.", 110, 0);
        text("See that ad above me? Do not work there the animatronics\nwill kill you‼ Work at Freddy Fazbear's instead! If you see\nan animatronic, it will be the last thing you'll ever see. If sam\nenters through the air vents into you room, monitor the\nkitchen tools and he will be gone! Blah. Blah. Blah. Blah.\nBlah. Blah. Blah. Blah. Blah. Blah. Blah. It will be unlikely. Yo!", 110, 505);
        text("You probally\nwon't be killed\nby them. Well,\nyou might. But\nit would be\nunlikely. Blah.\nBlah. Blah. Blah.\nBlah. Blah. Blah.\nBlah. Blah. Blah.\nBlah. Blah. You\n might survive\nif you act dead,\nbe limp, they\nmight not think\n you are an\n animatronic.", -2, 0);
        text("But then they\nmight think\nyou are an empty\ncostume... Nevermind,\nscratch that. Blah.\nBlah. Blah. Blah.\nBlah. Blah. Blah.\nBlah. Blah. Blah.\nBlah. Blah. Blah.\nIT'S ME‼ Blah.\nBlah. Blah. Blah.\nBlah. Blah. Blah.\nBlah. Blah. Blah.\nBlah. Blah. Blah.\nBlah. Blah. Blah.\nBlah. Blah. Blah.\nBlah. Blah. Blah.\nThis ad is nothing\nto do with working\nrelevent to\nthe game. Blah.\nBlah. Blah. Blah.", 510, 55);
        text("names of all of\nthe\nanimatronics:\nWinston,\nHopper,\nOh Noes,\nSquidical,\nHal,\nMr. Panteater,\nSam,\nand Fuzzy.\nBlah. Blah. Blah.\nBlah. Blah. Blah.\nBlah. Blah. Blah.\nBlah. Blah. Blah.\nBlah. Blah. Blah.\nBlah. Blah. Blah.", -7, 305);
        textFont(createFont("monospace"));
        fill(100);
        rect(200, 350, 150, 250);
        fill(150);
        rect(200, 412.5, 150, 125);
        fill(50);
        ellipse(200, 412.5, 125, 50);
        drawAnimatronicWinston(200, 350, 100, 75, 10, 0, 0, 0, 0.00);
        rectMode(CORNER);
        filter(GRAY);
        popMatrix();
        noFill();
        stroke(255, 0, 127.5, 150);
        strokeWeight(7.5);
        beginShape();
        curveVertex(-948, 791);
        curveVertex(333, 120);
        curveVertex(504, 477);
        curveVertex(135, 473);
        curveVertex(175, 133);
        curveVertex(483, 106);
        curveVertex(1035, 146);
        endShape();
        noStroke();
        images.wanted = get(0, 0, 600*2, 600*2);
    }, // wanted
    function() {
        blurThing(0.5, 400);
    }, // Blur 1
    function() {
        blurThing(1, 410);
    }, // Blur 2
    function() {
        blurThing(1, 425);
    }, // Blur 3
    function() {
        blurThing(1.5, 450);
    }, // Blur 4
    function() {
        imageMode(CENTER);
        pushMatrix();
        translate(100, 100);
        rotate(90);
        image(images.textures[0], 0, 0);
        popMatrix();
        imageMode(CORNER);
        images.woodRot = get(0, 0, 200, 200);
    }, // woodRot
    function() {
        var i;
        var Donut = function(color, sprinkles){
            background(255, 196, 48);
            stroke(color);
            noFill();
            strokeWeight(30);
            ellipse(200, 215, 230, 160);
            var donut = get(0, 0, 400, 400);
            noStroke();
            background(0);
            fill(255);
            ellipse(200, 200, 150, 150);
            fill(0);
            ellipse(200, 200, 50, 50);
            var cutter = get(0, 0, 400, 400);
            donut.mask(cutter);
            background(0, 0, 0, 0);
            image(donut, 0, 0);
            var getSprinkleCoordinates = function(){
                var randNum = [random(150), random(150)];
                var randRot = random(180);
                if(dist(randNum[0], randNum[1], 75, 75) < 150 && 
                dist(randNum[0], randNum[1], 200, 215) < 160){
                    return [[
                    randNum[0]+cos(randRot)*10,
                    randNum[1]+sin(randRot)*10], [
                    randNum[0]+cos(randRot+180)*10,
                    randNum[1]+sin(randRot+180)*10]];
                } else {getSprinkleCoordinates();}
            };
            if(sprinkles){
                var randNum = 0;
                var s;
                colorMode(HSB);
                for(i=0;i<10;i++){
                    stroke(random(255), 0, 0);
                    s = getSprinkleCoordinates();
                    // println(s);
                    line(s[0][0], s[0][1], s[1][0], s[1][1]);
                }
                colorMode(RGB);
            }
            return get(125, 125, 150, 150);
        };
        var donuts = {
            pink: Donut(color(255, 99, 245, 245)),
            chocolate: Donut(color(135, 96, 29, 250)),
            glazed: Donut(color(255, 255, 255, 100)),
            blue: Donut(color(0, 196, 255, 165))
        };
        image(getImage("space/background"), 0, 0);
        imageMode(CENTER);
        for(i=0;i<10;i++){
            var r = floor(random(5));
            var r2 = random(70, 110);
            if(r===0){r=donuts.pink;}
            else if(r===1){r=donuts.chocolate;}
            else if(r===2){r=donuts.glazed;}
            else if(r===3){r=donuts.blue;}
            pushMatrix();
            translate(random(400), random(400));
            rotate(random(360));
            image(r, 0, 0, r2, r2);
            popMatrix();
        }
        imageMode(CORNER);
        drawAnimatronicHopper(64, 211, 110, 6, 5, 0, 0, [23, 36], [23, 36], [0, 0], [0, 0], 0, 0, 0.00);
        drawAnimatronicWinston(177, 286, 110, 75, 10, 0, 0, 0, 0.00);
        drawAnimatronicOhNoes(294, 296, 324, 180, 20, 0, 0, 0, 0.00);
        var bak = get(0,0,350,350);
        var ref = get(0,0,350,350);
        background(50);
        var cut = get(0,0,350,350);
        ref.mask(cut);
        image(bak, 0, 0);
        pushMatrix();
        translate(0, 400);
        scale(1, -0.142);
        image(images.woodRot, 0, 0, 350, 350);
        image(ref, 0, 0);
        popMatrix();
        noFill();
        (stroke)(0, 245);
        strokeWeight(150);
        ellipse(175, 600, 1150, 1150);
        strokeWeight(1);
        for(var i=0; i<=245; i+=245/50) {
            (stroke)(0, i);
            var s = map(i, 245, 0, 1000, 950)+1;
            ellipse(175, 600, s, s);
        }
        noStroke();
        var t = "CELEBRATE!";
        textFont(createFont("Broadway Copyist Text Ext Bold"));
        textSize(75);
        textAlign(CENTER, CENTER);
        fill(255, 0, 0);
        for(var i=0; i<360; i+=45) {
            text(t, 175+cos(i)*2, 65+sin(i)*2);
        }
        fill(255, 255, 0);
        text(t, 175, 65);
        image(images.textures[2], 0, 0, 1000, 1000);
        (fill)(0, 100);
        rect(0, 0, width, height);
        images.CELEBRATE = get(0, 0, 350, 400);
    }, // CELEBRATE
    /*
    function() {
        images.fan = createGraphics(200, 200, P2D);
        images.fan.update = function(frameCount) {
            this.background(0, 0);
            this.angleMode = "degrees";
            this.noStroke();
            this.pushMatrix();
            this.translate(100, 100);
            this.rotate(frameCount*25);
            this.fill(powerOut ? color(10, 10, 20): color(50));
            var blades = 3;
            for(var i=0; i<blades; i++) {
                this.arc(0, 0, 15, 120, 0, 180);
                this.rotate(360/blades);
            }
            this.popMatrix();
            this.noFill();
            this.stroke(powerOut ? color(10, 10, 20): color(50));
            this.strokeWeight(3);
            this.ellipse(100, 100, 125, 125);
            this.strokeWeight(1);
            for(var i=0; i<80; i+=12) {
                this.stroke(powerOut ? color(75, 75, 125) : color(240));
                this.arc(100, 100, sin(i)*125, sin(i)*125, -90, 0);
                this.arc(100, 100, sin(i)*125, sin(i)*125, 90, 180);
                this.stroke(powerOut ? color(10, 10, 50): color(50));
                this.arc(100, 100, sin(i)*125, sin(i)*125, 0, 90);
                this.arc(100, 100, sin(i)*125, sin(i)*125, 180, 270);
            }
            this.strokeCap(SQUARE);
            this.strokeWeight(7.5);
            this.stroke(powerOut ? color(50, 50, 75) : color(150));
            this.line(100, 100, 162.5, 100);
            this.stroke(powerOut ? color(10, 10, 20): color(50));
            this.line(100, 37.5+1, 100, 162.5-1);
            this.line(37.5+1, 100, 100, 100);
            this.noStroke();
            this.fill(powerOut ? color(10, 10, 20): color(50));
            this.ellipse(100, 100, 20, 20);
            this.fill(powerOut ? color(75, 75, 125) : color(240));
            for(var i=-2; i<=2; i++) {
                this.ellipse(104+i, 96+i, 3+(2-abs(i)), 3+(2-abs(i)));
            }
            this.fill(powerOut ? color(10, 10, 20): color(50));
            this.triangle(100, 100-5, 120, 200-5, 80, 200-5);
            this.rectMode(CENTER);
            this.rect(100, 200-5, 100, 10-5);
        };
    }, // fan
    */
    function() {
        var doorPic = function(){
            background(50, 30, 30);
            for(var i = -50;i<450;i+=30){
                noStroke();
                if(isEven((i+50)/30)){
                    fill(0);
                } else {
                    fill(100, 100, 0);
                }
                quad(i, 30, i+30, 30, i-5, 80, i-35, 80);
                
                if(isEven((i+50)/30)){
                    fill(100, 100, 0);
                } else {
                    fill(0);
                }
                quad(i+20, 320, i+50, 320, i+15, 370, i-15, 370);
            }
            return get(0, 0, 200, 400);
        };
        image(doorPic(), 0, 0);
        image(images.textures[2], 0, 0, 600, 600);
        images.door = get(0, 0, 200, 400);
    }, // door
    function() {
        image(images.door, 0, 0);
        (fill)(0, 100);
        rect(0, 0, 200, 400);
        images.doorDark = get(0, 0, 200, 400);
    }, // doorDark
    function() {
        var gleam = function(x, y, size) {
            for(var i=size; i>=size/4; i--) {
                fill(lerpColor(color(20), color(220), map(i, size, size/4, 0, 1)));
                ellipse(x, y, i, i);
            }
        };
        var rim = function(x, y, size) {
            for(var i=0; i<=360; i++) {
                noFill();
                stroke(lerpColor(color(20), color(220), constrain(abs(sin(i+-45))*2-1.0, 0, 1)));
                strokeWeight(5);
                arc(x, y, size, size, i, i+1);
            }
            noStroke();
        };
        fill(10);
        rect(0, 0, 250, 400);
        gleam(110, 141, 20);
        gleam(102, 322, 25);
        fill(10);
        ellipse(125, 125, 125/3, 125/3);
        ellipse(125, 300, 175/3, 175/3);
        rim(125, 125, 125);
        rim(125, 300, 175);
        fill(220);
        ellipse(25, 25, 5, 5);
        images.speakers = get(0, 0, 250, 400);
    }, // speakers
    function() {
        var gleam = function(x, y, size) {
            for(var i=size; i>=size/4; i--) {
                fill(lerpColor(color(20), color(57, 57, 84), map(i, size, size/4, 0, 1)));
                ellipse(x, y, i, i);
            }
        };
        var rim = function(x, y, size) {
            for(var i=0; i<=360; i++) {
                noFill();
                stroke(lerpColor(color(20), color(57, 57, 84), constrain(abs(sin(i+-45))*2-1.0, 0, 1)));
                strokeWeight(5);
                arc(x, y, size, size, i, i+1);
            }
            noStroke();
        };
        fill(10);
        rect(0, 0, 250, 400);
        gleam(110, 141, 20);
        gleam(102, 322, 25);
        fill(10);
        ellipse(125, 125, 125/3, 125/3);
        ellipse(125, 300, 175/3, 175/3);
        rim(125, 125, 125);
        rim(125, 300, 175);
        images.darkSpeakers = get(0, 0, 250, 400);
    }, // darkSpeakers
    function() {
        var squareSize = 50;
        noStroke();
        for(var x=0;x<width/squareSize;x++){
        for(var y=0;y<height/squareSize;y++){
            fill(
                [color(5), color(210, 211, 219)][(x+y)%2]);
            rect(x*squareSize, y*squareSize, squareSize, squareSize);
        }}
        image(images.textures[2], 0, 0, 1000, 1000);
        (fill)(0, 50);
        rect(0, 0, 135, 200);
        rect(135, 0, 265, 52);
        images.officeFloor = get(0, 0, 400, 600);
    }, // officeFloor
    function() {
        var squareSize = 50;
        noStroke();
        for(var x=0;x<width/squareSize;x++){
        for(var y=0;y<height/squareSize;y++){
            fill(
                [color(5), color(85, 87, 99)][(x+y)%2]);
            rect(x*squareSize, y*squareSize, squareSize, squareSize);
        }}
        image(images.textures[2], 0, 0, 1000, 1000);
        (fill)(0, 200);
        rect(0, 0, 135, 200);
        rect(135, 0, 265, 52);
        images.officeFloorDark = get(0, 0, 400, 600);
    }, // officeFloorDark
    function() {
        var grad = function(x, y, width, height) {
            for(var i=0; i<=height; i++) {
                fill(lerpColor(color(5, 255), color(5, 0), map(i, 0, height, 0, 1)));
                rect(x, y+i, width, 1);
            }
        };
        var squareSize = 25;
        noStroke();
        background(232, 46, 46);
        image(images.textures[1], 0, 0, 1000, 1000);
        pushMatrix();
        translate(200, 0);
        for(var x=9;x<400/squareSize;x++){
        for(var y=9;y<275/squareSize;y++){
            fill(
                [color(5), color(232, 167, 167)][(x+y)%2]);
            rect(x*squareSize, y*squareSize, squareSize, squareSize);
        }}
        fill(207, 58, 58);
        rect(225, 222, 175, 3);
        rect(225, 275, 175, 10);
        noFill();
        stroke(25);
        strokeWeight(5);
        rect(247, 29, 150, 190);
        rect(46, 29, 176, 367);
        noStroke();
        (fill)(0, 100);
        rect(-200, 0, 600, 400);
        grad(-200, 0, 600, 100);
        var img = get(0, 0, 600, 400);
        background(255);
        fill(0);
        rect(250, 31, 145, 186);
        fill(0);
        rect(49, 32, 171, 362);
        popMatrix();
        var cut = get(0, 0, 600, 400);
        img.mask(cut);
        images.leftDoor = img;
    }, // leftDoor
    function() {
        noBackground();
        pushMatrix();
        translate(300, 200);
        scale(-1, 1);
        imageMode(CENTER);
        image(images.leftDoor, 0, 0);
        imageMode(CORNER);
        popMatrix();
        images.rightDoor = get(0, 0, 600, 400);
    }, // rightDoor
    function() {
        var grad = function(x, y, width, height) {
            for(var i=0; i<=height; i++) {
                fill(lerpColor(color(5, 255), color(5, 0), map(i, 0, height, 0, 1)));
                rect(x, y+i, width, 1);
            }
        };
        var squareSize = 25;
        noStroke();
        background(232, 46, 46);
        image(images.textures[1], 0, 0, 1000, 1000);
        pushMatrix();
        translate(200, 0);
        for(var x=9;x<400/squareSize;x++){
        for(var y=9;y<275/squareSize;y++){
            fill(
                [color(5), color(161, 152, 152)][(x+y)%2]);
            rect(x*squareSize, y*squareSize, squareSize, squareSize);
        }}
        fill(94, 60, 60);
        rect(225, 222, 175, 3);
        rect(225, 275, 175, 10);
        noFill();
        stroke(25);
        strokeWeight(5);
        rect(247, 29, 150, 190);
        rect(46, 29, 176, 367);
        noStroke();
        fill(12, 12, 18, 200);
        rect(-200, 0, 600, 400);
        grad(-200, 0, 600, 400);
        var img = get(0, 0, 600, 400);
        background(255);
        fill(0);
        rect(250, 31, 145, 186);
        fill(0);
        rect(49, 32, 171, 362);
        popMatrix();
        var cut = get(0, 0, 600, 400);
        img.mask(cut);
        images.leftDoorDark = img;
    }, // leftDoorDark
    function() {
        noBackground();
        pushMatrix();
        translate(300, 200);
        scale(-1, 1);
        imageMode(CENTER);
        image(images.leftDoorDark, 0, 0);
        imageMode(CORNER);
        popMatrix();
        images.rightDoorDark = get(0, 0, 600, 400);
    }, // rightDoorDark
    function() {
        var lightColor = color(230);
        var grad = function(x, y, width, height) {
            for(var i=0; i<=height; i++) {
                fill(lerpColor(lightColor, color(lightColor, 0), map(i, 0, height, 0, 1)));
                rect(x, y+i, width, 1);
            }
            for(var i=0; i<width*height/3; i++) {
                var X = random(width);
                var Y = random(height);
                var w = random(1, 2.5);
                var h = random(1, 2.5);
                (fill)(lightColor, map(y, 0, height, 0, 1));
                ellipse(X+x, Y+y, w, h);
            }
        };
        (background)(0, 0);
        fill(50);
        rect(12, 270, 105, 80);
        fill(10);
        rect(0, 250, 400, 20);
        rect(0, 250, 12, 150);
        rect(388, 250, 12, 150);
        rect(12, 270, 100, 75);
        image(images.speakers, 250, 270, 80, 128);
        grad(0, 250, 400, 10);
        for(var i=12; i<=112; i++) {
            grad(i, 270, 1, sin(map(i, 12, 112, 0, 90))*20);
        }
        images.desk = get(0, 0, 400, 400);
    },
    function() {
        var lightColor = color(230);
        var grad = function(x, y, width, height) {
            for(var i=0; i<=height; i++) {
                fill(lerpColor(lightColor, color(lightColor, 0), map(i, 0, height, 0, 1)));
                rect(x, y+i, width, 1);
            }
            for(var i=0; i<width*height/3; i++) {
                var X = random(width);
                var Y = random(height);
                var w = random(1, 2.5);
                var h = random(1, 2.5);
                (fill)(lightColor, map(y, 0, height, 0, 1));
                ellipse(X+x, Y+y, w, h);
            }
        };
        (background)(0, 0);
        image(images.desk, 0, 0);
        for(var i=12; i<=112; i++) {
            grad(i, 308, 1, sin(map(i, 12, 112, 0, 90))*20);
        }
        for(var i=12; i<120; i++) {
            (fill)(0, map(i, 12, 120, 255, 0));
            rect(i, 269, 1, 75);
        }
        fill(50);
        rect(38, 285, 40, 5, 5);
        rect(38, 323, 40, 5, 5);
        images.desk = get(0, 0, 400, 400);
    }, // desk
    function() {
        var lightColor = color(101, 104, 133);
        var grad = function(x, y, width, height) {
            for(var i=0; i<=height; i++) {
                fill(lerpColor(lightColor, color(lightColor, 0), map(i, 0, height, 0, 1)));
                rect(x, y+i, width, 1);
            }
            for(var i=0; i<width*height/3; i++) {
                var X = random(width);
                var Y = random(height);
                var w = random(1, 2.5);
                var h = random(1, 2.5);
                (fill)(lightColor, map(y, 0, height, 0, 1));
                ellipse(X+x, Y+y, w, h);
            }
        };
        (background)(0, 0);
        fill(15);
        rect(12, 270, 105, 80);
        fill(10);
        rect(0, 250, 400, 20);
        rect(0, 250, 12, 150);
        rect(388, 250, 12, 150);
        rect(12, 270, 100, 75);
        image(images.darkSpeakers, 250, 270, 80, 128);
        grad(0, 250, 400, 10);
        for(var i=12; i<=112; i++) {
            grad(i, 270, 1, sin(map(i, 12, 112, 0, 90))*20);
        }
        images.deskDark = get(0, 0, 400, 400);
    },
    function() {
        var lightColor = color(101, 104, 133);
        var grad = function(x, y, width, height) {
            for(var i=0; i<=height; i++) {
                fill(lerpColor(lightColor, color(lightColor, 0), map(i, 0, height, 0, 1)));
                rect(x, y+i, width, 1);
            }
            for(var i=0; i<width*height/3; i++) {
                var X = random(width);
                var Y = random(height);
                var w = random(1, 2.5);
                var h = random(1, 2.5);
                (fill)(lightColor, map(y, 0, height, 0, 1));
                ellipse(X+x, Y+y, w, h);
            }
        };
        (background)(0, 0);
        image(images.deskDark, 0, 0);
        for(var i=12; i<=112; i++) {
            grad(i, 308, 1, sin(map(i, 12, 112, 0, 90))*20);
        }
        for(var i=12; i<120; i++) {
            (fill)(0, map(i, 12, 120, 255, 0));
            rect(i, 269, 1, 75);
        }
        fill(50);
        rect(38, 285, 40, 5, 5);
        rect(38, 323, 40, 5, 5);
        images.deskDark = get(0, 0, 400, 400);
    }, // deskDark
    /*
    function() {
        noBackground();
        fill(255, 77, 0, 50);
        ellipse(50, 50, 100, 100);
        fill(255, 77, 0, 50);
        ellipse(50, 50, 80, 80);
        fill(255);
        ellipse(50, 50, 25, 25);
        images.officeLight = get(0, 0, 100, 100);
    }, // officeLight
    */
    function() {
        var grad = function(x, y, width, height) {
            for(var i=0; i<=height; i++) {
                fill(lerpColor(color(5, 255), color(5, 0), map(i, 0, height, 0, 1)));
                rect(x, y+i, width, 1);
            }
        };
        image(images.textures[1], 0, 0, 1000, 1000);
        (fill)(0, 100);
        rect(0, 0, 400, 400);
        fill(5);
        rect(0, 250, 400, 125);
        image(images.CELEBRATE, 25, 5, 350/2, 400/2);
        grad(0, 0, 400, 100);
        images.officeBack = get(0, 0, 400, 400);
    }, // officeBack
    function() {
        var grad = function(x, y, width, height) {
            for(var i=0; i<=height; i++) {
                fill(lerpColor(color(5, 255), color(5, 0), map(i, 0, height, 0, 1)));
                rect(x, y+i, width, 1);
            }
        };
        image(images.textures[1], 0, 0, 1000, 1000);
        (fill)(0, 100);
        rect(0, 0, 400, 400);
        fill(5);
        rect(0, 250, 400, 125);
        image(images.CELEBRATE, 25, 5, 350/2, 400/2);
        fill(12, 12, 18, 200);
        rect(0, 0, 400, 600);
        grad(0, 0, 400, 100);
        images.officeBackDark = get(0, 0, 400, 400);
    }, // officeBackDark
    function() {
        background(25);
        images.deskTop = get(0, 0, 600, 600);
    }, // deskTop
    /*
    function() {
        background(100);
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(300, 200, color(0, 0), color(0, 255), 600, 400, 100, 0);
        images.officeWall = get(0, 0, 600, 400);    
    }, // officeWall
    */
    /*
    function() {
        images.fanPic = [];
        for(var i=0; i<34; i++) {
            noBackground();
            images.fan.update(i);
            image(images.fan, 0, 0);
            images.fanPic.push(get(0, 0, 200, 200));
        }
    }, // Fan Stuff
    function() {
        images.fanPicDark = [];
        powerOut = true;
        for(var i=0; i<34; i++) {
            noBackground();
            images.fan.update(i);
            image(images.fan, 0, 0);
            images.fanPicDark.push(get(0, 0, 200, 200));
        }
        powerOut = false;
    }, // Dark Fan Stuff
    */
    function() {
        fill(50);
        rect(0, 0, 100, 250);
        rectMode(CENTER);
        fill(235, 0, 0);
        rect(50, 50, 75, 75);
        fill(200);
        rect(50, 165, 75, 75);
        fill(240);
        rect(10, 165, 5, 75);
        rect(10, 50, 5, 75);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("DOOR", 50, 107.5);
        text("LIGHT", 50, 225);
        rectMode(CORNER);
        images.lightSwitchOO = get(0, 0, 100, 250);
    }, // lightSwitchOO
    function() {
        fill(50);
        rect(0, 0, 100, 250);
        rectMode(CENTER);
        fill(0, 235, 0);
        rect(50, 50, 75, 75);
        fill(200);
        rect(50, 165, 75, 75);
        fill(240);
        rect(10, 165, 5, 75);
        rect(10, 50, 5, 75);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("DOOR", 50, 107.5);
        text("LIGHT", 50, 225);
        rectMode(CORNER);
        images.lightSwitch_O = get(0, 0, 100, 250);
    }, // lightSwitch_O
    function() {
        fill(50);
        rect(0, 0, 100, 250);
        rectMode(CENTER);
        fill(235, 0, 0);
        rect(50, 50, 75, 75);
        fill(200, 200, 255);
        rect(50, 165, 75, 75);
        fill(240);
        rect(10, 165, 5, 75);
        rect(10, 50, 5, 75);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("DOOR", 50, 107.5);
        text("LIGHT", 50, 225);
        rectMode(CORNER);
        images.lightSwitchO_ = get(0, 0, 100, 250);
    }, // lightSwitchO_
    function() {
        fill(50);
        rect(0, 0, 100, 250);
        rectMode(CENTER);
        fill(0, 235, 0);
        rect(50, 50, 75, 75);
        fill(200, 200, 255);
        rect(50, 165, 75, 75);
        fill(240);
        rect(10, 165, 5, 75);
        rect(10, 50, 5, 75);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("DOOR", 50, 107.5);
        text("LIGHT", 50, 225);
        rectMode(CORNER);
        images.lightSwitch__ = get(0, 0, 100, 250);
    }, // lightSwitch__
    function() {
        fill(20);
        rect(0, 0, 100, 250);
        rectMode(CENTER);
        fill(30);
        rect(50, 50, 75, 75);
        rect(50, 165, 75, 75);
        fill(50);
        rect(10, 165, 5, 75);
        rect(10, 50, 5, 75);
        textSize(30);
        rectMode(CORNER);
        images.lightSwitchOut = get(0, 0, 100, 250);
    }, // lightSwitchOut
    function() {
        images.LD = images.leftDoor;
    }, // LD
    function() {
        images.RD = images.rightDoor;
    }, // RD
    function() {
        var grad = function(x, y, width, height) {
            for(var i=0; i<=height; i++) {
                fill(lerpColor(color(5, 255), color(5, 0), map(i, 0, height, 0, 1)));
                rect(x, y+i, width, 1);
            }
        };
        image(images.textures[1], 0, 0, 1000, 1000);
        noFill();
        stroke(10);
        strokeWeight(5);
        rect(112, 29, 176, 367);
        noStroke();
        (fill)(0, 100);
        rect(0, 0, 400, 400);
        grad(0, 0, 400, 100);
        var img = get(0, 0, 400, 400);
        background(255);
        fill(0);
        rect(115, 32, 171, 362);
        var cut = get(0, 0, 400, 400);
        img.mask(cut);
        images.backDoor = img;
    }, // backDoor
    function() {
        image(images.textures[0], 0, 0, 1000, 1000);
        var hinge = function(x, y) {
            pushMatrix();
            translate(x, y);
            fill(255, 215, 0);
            ellipse(0, 0, 15, 37.5);
            ellipse(0, 0, 20, 20);
            fill(235, 195, 0);
            ellipse(3, -6, 5, 5);
            ellipse(3, 6, 5, 5);
            popMatrix();
        };
        hinge(0, 75);
        hinge(0, 287);
        fill(50);
        ellipse(135, 181, 37.5, 37.5);
        fill(40);
        ellipse(135, 181, 25, 25);
        (fill)(0, 125);
        rect(0, 0, 171, 362);
        images.woodenDoor = get(0, 0, 171, 362);
    }, // woodenDoor
    function() {
        var wallSpacing = 0;
        var cutBox = function(x, y, w, h, sides){
            if(sides[0]){
                line(x, y, x+w-1, y);
            } if(sides[1]){
                line(x+1, y+h, x+w-1, y+h);
            } if(sides[2]){
                line(x, y+1, x, y+h-1);
            } if(sides[3]){
                line(x+w, y+1, x+w, y+h-1);
            }
        };
        var hallway = function(pos1, pos2){
            var p;
            if(pos1[0] === pos2[0]){
                p = pos1[0]+wallSpacing;
                line(p, pos1[1], p, pos2[1]);
                p = pos1[0]-wallSpacing;
                line(p, pos1[1], p, pos2[1]);
            } else if(pos1[1] === pos2[1]){
                p = pos1[1]+wallSpacing;
                line(pos1[0], p, pos2[0], p);
                p = pos1[1]-wallSpacing;
                line(pos1[0], p, pos2[0], p);
                
            } else {
                line(pos1[0], pos1[1], pos2[0], pos2[1]);
            }
        };
        var miniMap = function() {
            noFill();
            stroke(255);
            strokeWeight(2);
            // Showstage
            rect(100, 10, 60, 25);
            // Dining Area
            rect(70, 35, 120, 60);
            // Backstage
            rect(50, 40, 15, 35);
            // Spare Room
            rect(195, 60, 10, 35);
            // Supply Closet
            rect(70, 100, 50, 20);
            // Furnace Room
            rect(100, 155, 50, 35);
            // Kitchen
            cutBox(155, 100, 50, 70, [true, false, true, true]);
            cutBox(155, 170, 30, 20, [false, true, true, true]);
            cutBox(185, 170, 20, 20, [true, false, true, false]);
            // Kitchen Tools
            rect(190, 175, 15, 15);
            // Office
            rect(100, 195, 30, 40);
            strokeWeight(1);
            point(96, 198);
            point(98, 198);
            point(98, 207);
            point(96, 207);
            point(131, 198);
            point(133, 198);
            point(131, 207);
            point(133, 207);
            strokeWeight(2);
            // Bowling Alley
            rect(35, 240, 100, 60);
            // Arcade
            rect(135, 215, 100, 85);
            // South Hall
            rect(135, 195, 70, 15);
            rect(205, 197.5, 5, 10);
            // Changing Area
            rect(240, 35, 30, 60);
            rect(275, 35, 30, 60);
            rect(240, 100, 65, 20);
            // Squid Reef
            rect(310, 35, 70, 85);
            // Lazer Tag Preparatory
            rect(240, 170, 30, 30);
            // Lazer Tag
            cutBox(240, 125, 35, 40, [true, true, true, false]);
            cutBox(275, 125, 105, 75, [true, false, false, true]);
            cutBox(275, 165, 105, 35, [false, true, true, false]);
            // Wast Hall
            cutBox(125, 95, 25, 30, [false, false, true, true]);
            cutBox(125, 125, 25, 25, [false, true, false, true]);
            cutBox(95, 125, 30, 25, [true, true, false, false]);
            cutBox(70, 125, 25, 25, [true, false, true, false]);
            cutBox(70, 150, 25, 65, [false, true, true, true]);
            // East Hall
            cutBox(210, 55, 25, 160, [false, false, true, true]);
            cutBox(190, 35, 20, 20, [true, true, false, false]);
            cutBox(210, 35, 25, 20, [true, false, false, true]);
            // Bathrooms {
            //cutBox(235, 235, 10, 45, [true, true, false, false]);
            //cutBox(245, 235, 45, 20, [false, true, true, true]);
            //cutBox(245, 235, 45, 20, [false, true, true, true]);}
            hallway([235, 250], [237, 250]);
            hallway([235, 265], [237, 265]);
            rect(240, 205, 45, 50);
            rect(240, 260, 45, 50);
            // Doorways
            hallway([65, 50], [67, 50]);
            hallway([80, 123], [80, 120]);
            hallway([125, 154], [125, 151]);
            hallway([115, 236], [115, 237]);
            hallway([115, 236], [115, 237]);
            hallway([198, 170], [198, 173]);
            hallway([170, 190], [170, 194]);
            hallway([170, 95], [170, 99]);
            hallway([193, 65], [192, 65]);
            hallway([255, 96], [255, 98]);
            hallway([290, 96], [290, 98]);
            hallway([308, 109], [305, 109]);
            hallway([239, 185], [237, 185]);
            hallway([273, 185], [272, 185]);
            hallway([256, 167], [256, 168]);
            hallway([240, 110], [235, 110]);
            // Dun dun dun!
            /*get*///rect(155, 175, 30, 15); // Haha! Get rect!(wrecked)
            noStroke();
        };
        noBackground();
        pushMatrix();
        translate(175, 250);
        miniMap();
        popMatrix();
        images.minimap = get(0, 0, 600, 600);
    }, // minimap
    function() {
        noBackground();
        fill(100);
        rect(0, 0, 600, 600, 50);
        fill(25);
        rect(50, 50, 500, 500);
        fill(227, 15, 0);
        ellipse(25, 75, 25, 25);
        fill(227, 227, 0);
        ellipse(25, 125, 25, 25);
        images.monitor = get(0, 0, 600, 600);
    }, // monitor
    function() {
        image(getImage("space/background"), -random(200), -random(200), 500, 500);
        (fill)(0, 100);
        rect(0, 0, width, height);
        drawAnimatronicWinston(50, 50, 170, 75, 10, 0, 0, 0, 0.20);
        images.win = get(0, 0, 100, 100);
    }, // win
    function() {
        image(getImage("space/background"), -random(200), -random(200), 500, 500);
        (fill)(0, 100);
        rect(0, 0, width, height);
        drawAnimatronicHopper(50, 150, 0, 20, 7, 0, 0, [0, 0], [0, 0], [0, 0], [0, 0], 0, 0, 0.20);
        images.hopps = get(0, 0, 100, 100);
    }, // hopps
    function() {
        image(getImage("space/background"), -random(200), -random(200), 500, 500);
        (fill)(0, 100);
        rect(0, 0, width, height);
        drawAnimatronicOhNoes(50, 50, 300, 0, 30, 0, 0, 0, 0.20);
        images.ohnoes = get(0, 0, 100, 100);
    }, // ohnoes
    function() {
        image(getImage("space/background"), -random(200), -random(200), 500, 500);
        (fill)(0, 100);
        rect(0, 0, width, height);
        drawAnimatronicSquidical(50, 75, 100, 0, 20, 0, [0, 0], [0, 0], 0, 0, 0.20);
        images.squid = get(0, 0, 100, 100);
    }, // squid
    function() {
        image(getImage("space/background"), -random(200), -random(200), 500, 500);
        (fill)(0, 100);
        rect(0, 0, width, height);
        drawHal(50, 120, 0, [0, 0], [0, 0], 0, 0, 0, 0.20);
        images.hal = get(0, 0, 100, 100);
    }, // hal
    function() {
        image(getImage("space/background"), -random(200), -random(200), 500, 500);
        (fill)(0, 100);
        rect(0, 0, width, height);
        drawMrPanteater(50, 100, 200, 0, 0, 10, 0, 0, -160, 160, 0.20);
        images.pant = get(0, 0, 100, 100);
    }, // pant
    function() {
        image(getImage("space/background"), -random(200), -random(200), 500, 500);
        (fill)(0, 100);
        rect(0, 0, width, height);
        animatronicSam(50, 50, 100, 0, [0,1,0,1,0,0,0], 0.20);
        images.sam = get(0, 0, 100, 100);
    }, // sam
    function() {
        image(getImage("space/background"), -random(200), -random(200), 500, 500);
        (fill)(0, 100);
        rect(0, 0, width, height);
        drawFuzzy(50, 50, 180, random(360), 0, 0.00, 0, 1);
        images.fuzz = get(0, 0, 100, 100);
    }, // fuzz
    /*
    function() {
        background(100, 50, 60);
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(300, 200, color(0, 0), color(0, 255), 600, 400, 100, 0);
        images.officeWall = get(0, 0, 600, 400);
        images.officeWall2 = get(0, 0, 600, 400);
    }, // officeWall
    */
    /*
    function() {
        var squareSize = 50;
        for(var x=0;x<200/squareSize;x++){
        for(var y=0;y<600/squareSize;y++){
            fill(
                [color(5), color(210, 211, 219)][(x+y)%2]);
            rect(x*squareSize, y*squareSize, squareSize, squareSize);
        }}
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(100, 300, color(0, 255), color(0, 0), 600, 200, 150/2, 90);
        images.officeFloor2 = get(0, 0, 200, 600);
        images.officeFloor22 = get(0, 0, 200, 600);
    }, // officeFloor2
    */
    /*function() {
        images.progress.train = createGraphics(600, 600, P3D);
        images.progress.train.update = function() {
                    this.noStroke();
                    this.background(0, 0);
                    this.fill(255);
                    this.ambientLight(255, 255, 255);
                    this.textureMode(IMAGE);
                    this.pushMatrix();
                    this.translate(300, 300, 0);
                    this.translate(105, 25, 200);
                    this.rotateY(-0.7);
                    
                    this.texture(images.officeFloor2);
                    this.beginShape();
                    this.vertex(-400, 200, -200-200, 0, 0);
                    this.vertex(-200, 200, -200-200, 200, 0);
                    this.vertex(-200, 200, 400-200, 200, 600);
                    this.vertex(-400, 200, 400-200, 0, 600);
                    this.endShape();
                    
                    this.texture(images.officeWall);
                    this.beginShape();
                    this.vertex(-400, -200, 400-200, 0, 0);
                    this.vertex(-400, 200, 400-200, 0, 400);
                    this.vertex(-400, 200, -200-200, 600, 400);
                    this.vertex(-400, -200, -200-200, 600, 0);
                    this.endShape();
                    
                    this.popMatrix();
                    this.noLights();
        };
        images.progress.train.update();
    },
    function() {
        images.progress.treelava = createGraphics(600, 600, P3D);
        images.progress.treelava.update = function() {
                    this.noStroke();
                    this.background(0, 0);
                    this.fill(255);
                    this.ambientLight(255, 255, 255);
                    this.textureMode(IMAGE);
                    this.pushMatrix();
                    this.translate(300, 300, 0);
                    this.translate(-105, 25, 200);
                    this.rotateY(0.7);
                    
                    this.texture(images.officeFloor22);
                    this.beginShape();
                    this.vertex(-400+600, 200, -200-200, 0, 0);
                    this.vertex(-200+600, 200, -200-200, 200, 0);
                    this.vertex(-200+600, 200, 400-200, 200, 600);
                    this.vertex(-400+600, 200, 400-200, 0, 600);
                    this.endShape();
                    
                    this.texture(images.officeWall2);
                    this.beginShape();
                    this.vertex(400, -200, 400-200, 0, 0);
                    this.vertex(400, 200, 400-200, 0, 400);
                    this.vertex(400, 200, -200-200, 600, 400);
                    this.vertex(400, -200, -200-200, 600, 0);
                    this.endShape();
                    
                    this.popMatrix();
                    this.noLights();
        };
        images.progress.treelava.update();
    },
    function() {
        images.leftOut = images.progress.train.get(0, 0, 600, 600);
        images.rightOut = images.progress.treelava.get(0, 0, 600, 600);
    },*/
    function() {
    // {
    var squareSize = 30;
    background(196, 186, 161);
    for(var x=0;x<600/squareSize;x++){
    for(var y=0;y<370/squareSize;y++){
        fill(
            [color(208, 198, 173), color(200, 192, 163), color(187, 181, 159)][floor(random(3))]);
        rect(x*squareSize+2, y*squareSize+2, squareSize-4, squareSize-4, 5);
    }}
    image(images.textures[2], 0, 0, 1000, 1000);
    images.progress.wallImg = get(0, 0, 600, 400);
    background(255);
    fill(0);
    rect(198, 175, 155, 225);
    images.progress.wallImg.mask(get(0, 0, 600, 400));
    background(25);
    image(images.progress.wallImg, 0, 0);
    noFill();
    stroke(200, 255, 255, 25);
    strokeWeight(25);
    rect(210, 187, 130, 225);
    stroke(200);
    strokeWeight(5);
    rect(200, 177, 150, 225);
    rect(220, 197, 110, 205);
    noStroke();
    linearGrad(300, 200, color(0, 0), color(0, 200), 600, 400, 100, 0);
    linearGrad(300, 150, color(0, 100), color(0, 0), 300, 600, 75, 90);
    (fill)(0, 100);
    rect(0, 0, 600, 600);
    images.progress.wallImg = get(0, 0, 600, 400);
    // } progress.wallImg
    },
    function() {
    // {
    var squareSize = 15;
    noStroke();
    background(196, 186, 161);
    for(var x=0;x<600/squareSize;x++){
    for(var y=0;y<150/squareSize;y++){
        fill(
            [color(158, 189, 191), color(86, 139, 155), color(58, 115, 144)][floor(random(3))]);
        rect(x*squareSize+1, y*squareSize+1, squareSize-2, squareSize-2, 2.5);
    }}
    image(images.textures[2], 0, 0, 1000, 1000);
    linearGrad(300, 75, color(0, 0), color(0, 200), 600, 150, 100, 0);
    linearGrad(300, 75, color(0, 0), color(0, 50), 150, 600, 75, 90);
    (fill)(0, 100);
    rect(0, 0, 600, 150);
    (fill)(0, 100);
    rect(0, 0, 600, 600);
    images.progress.floorImg = get(0, 0, 600, 150);
    // } floorImg
    },
    function() {
    // {
    var squareSize = 15;
    background(196*0.75, 186*0.75, 161*0.75);
    for(var x=0;x<600/squareSize;x++){
    for(var y=0;y<50/squareSize;y++){
        fill(
            [color(158, 189, 191), color(86, 139, 155), color(58, 115, 144)][floor(random(3))]);
        rect(x*squareSize+1, y*squareSize+1, squareSize-2, squareSize-2, 2.5);
    }}
    image(images.textures[2], 0, 0, 1000, 1000);
    linearGrad(300, 25, color(0, 0), color(0, 200), 600, 50, 50, 0);
    linearGrad(300, 25, color(0, 0), color(0, 200), 50, 600, 50, 90);
    image(images.textures[2], 0, 0, 1000, 1000);
    (fill)(0, 150);
    rect(0, 0, 600, 150);
    fill(0, 100, 100, 50);
    rect(0, 15, 600, 25);
    (fill)(0, 100);
    rect(0, 0, 600, 600);
    images.progress.poolWallImg = get(0, 0, 600, 50);
    // } poolWallImg
    },
    function() {
    // {
    fill(120);
    rect(0, 0, 105, 200);
    fill(200);
    ellipse(89.6, 99.8, 10, 10);
    fill(100);
    ellipse(90, 100, 10, 10);
    image(images.textures[2], 0, 0, 1000, 1000);
    linearGrad(52.5, 50, color(0, 50), color(0, 0), 100, 105, 25, 90);
    (fill)(0, 100);
    rect(0, 0, 600, 600);
    images.progress.doorImg = get(0, 0, 105, 200);
    images.progress.doorImg2 = get(0, 0, 105, 200);
    images.progress.doorImg3 = get(0, 0, 105, 200);
    // } doorImg
    },
    function() {
    images.squidReef = createGraphics(800, 600, P3D);
    images.squidReef.update = function(rot) {
        this.background(0);
        this.textureMode(IMAGE);
        this.ambientLight(255, 255, 255);
        this.noStroke();
        this.pushMatrix();
        this.translate(450, 200, 165);
        this.rotateY(0.27);
        this.fill(255);
        this.texture(images.progress.wallImg);
        this.beginShape();
        this.vertex(-300, -200, 0, 0, 0);
        this.vertex(300, -200, 0, 600, 0);
        this.vertex(300, 200, 0, 600, 400);
        this.vertex(-300, 200, 0, 0, 400);
        this.endShape();
        this.texture(images.progress.floorImg);
        this.beginShape();
        this.vertex(-300, 200, 0, 0, 0);
        this.vertex(300, 200, 0, 600, 0);
        this.vertex(300, 200, 150, 600, 150);
        this.vertex(-300, 200, 150, 0, 150);
        this.endShape();
        this.texture(images.progress.poolWallImg);
        this.beginShape();
        this.vertex(-300, 200, 150, 0, 0);
        this.vertex(300, 200, 150, 600, 0);
        this.vertex(300, 250, 150, 600, 50);
        this.vertex(-300, 250, 150, 0, 50);
        this.endShape();
        this.popMatrix();
        this.noLights();
    };
    images.squidReefDoor = createGraphics(800, 600, P3D);
    images.squidReefDoor.update = function(rot) {
        this.background(0, 0);
        this.textureMode(IMAGE);
        this.ambientLight(255, 255, 255);
        this.noStroke();
        this.pushMatrix();
        this.translate(450, 200, 165);
        this.rotateY(0.27);
        this.fill(255);
        this.texture(images.progress.doorImg);
        this.beginShape();
        this.vertex(-77, 0, 0, 0, 0);
        this.vertex(-77+cos(rot)*105, 0, sin(rot)*105, 105, 0);
        this.vertex(-77+cos(rot)*105, 200, sin(rot)*105, 105, 200);
        this.vertex(-77, 200, 0, 0, 200);
        this.endShape();
        this.noLights();
    };
    images.squidReefDoor2 = createGraphics(800, 600, P3D);
    images.squidReefDoor2.update = function(rot) {
        this.background(0, 0);
        this.textureMode(IMAGE);
        this.ambientLight(255, 255, 255);
        this.noStroke();
        this.pushMatrix();
        this.translate(450, 200, 165);
        this.rotateY(0.27);
        this.fill(255);
        this.texture(images.progress.doorImg2);
        this.beginShape();
        this.vertex(-77, 0, 0, 0, 0);
        this.vertex(-77+cos(rot)*105, 0, sin(rot)*105, 105, 0);
        this.vertex(-77+cos(rot)*105, 200, sin(rot)*105, 105, 200);
        this.vertex(-77, 200, 0, 0, 200);
        this.endShape();
        this.noLights();
    };
    images.squidReefDoor3 = createGraphics(800, 600, P3D);
    images.squidReefDoor3.update = function(rot) {
        this.background(0, 0);
        this.textureMode(IMAGE);
        this.ambientLight(255, 255, 255);
        this.noStroke();
        this.pushMatrix();
        this.translate(450, 200, 165);
        this.rotateY(0.27);
        this.fill(255);
        this.texture(images.progress.doorImg3);
        this.beginShape();
        this.vertex(-77, 0, 0, 0, 0);
        this.vertex(-77+cos(rot)*105, 0, sin(rot)*105, 105, 0);
        this.vertex(-77+cos(rot)*105, 200, sin(rot)*105, 105, 200);
        this.vertex(-77, 200, 0, 0, 200);
        this.endShape();
        this.noLights();
    };
    images.squidReef.update(20);
    },
    function() {
    images.squidReefDoor.update(0);
    },
    function() {
    images.squidReefDoor2.update(20);
    },
    function() {
    images.squidReefDoor3.update(160);
    },
    function() {
    images.squidReef = images.squidReef.get(0, 0, 800, 600);
    },
    function() {
    images.squidReefDoor = images.squidReefDoor.get(0, 0, 800, 600);
    },
    function() {
    images.squidReefDoor2 = images.squidReefDoor2.get(0, 0, 800, 600);
    },
    function() {
    images.squidReefDoor3 = images.squidReefDoor3.get(0, 0, 800, 600);
    }, // squidReef
    function() {
        // {
        var squareSize = 50;
        background(100);
        for(var x=0;x<400/squareSize;x++){
        for(var y=0;y<600/squareSize;y++){
            fill(
                [color(0), color(100)][(x+y)%2]);
            rect(x*squareSize, y*squareSize, squareSize, squareSize);
        }}
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(200, 150, color(0, 255), color(0, 200), 300, 400, 100, 90);
        linearGrad(200, 450, color(0, 200), color(0, 100), 300, 400, 100, 90);
        images.progress.floorImg = get(0, 0, 400, 600);
        // } floorImg
    },
    function() {
        // {
        var squareSize = 50;
        background(50);
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(150, 200, color(0, 100), color(0, 200), 300, 400, 100, 0);
        linearGrad(450, 200, color(0, 200), color(0, 255), 300, 400, 100, 0);
        images.progress.wallImg = get(0, 0, 600, 400);
        // } wallImg
    },
    function() {
        var eastHall2 = createGraphics(600, 600, P3D);
        eastHall2.update = function() {
            this.background(0);
            this.textureMode(IMAGE);
            this.ambientLight(255, 255, 255);
            this.noStroke();
            this.pushMatrix();
            this.translate(300, 200, 0);
            this.rotateX(-0.5);
            this.fill(255);
            this.texture(images.progress.floorImg);
            this.beginShape();
            this.vertex(-200, 200, -300, 0, 0);
            this.vertex(200, 200, -300, 400, 0);
            this.vertex(200, 200, 300, 400, 600);
            this.vertex(-200, 200, 300, 0, 600);
            this.endShape();
            this.texture(images.progress.wallImg);
            this.beginShape();
            this.vertex(-200, -200, 300, 0, 0);
            this.vertex(-200, -200, -300, 600, 0);
            this.vertex(-200, 200, -300, 600, 400);
            this.vertex(-200, 200, 300, 0, 400);
            this.endShape();
            this.texture(images.progress.wallImg);
            this.beginShape();
            this.vertex(200, -200, 300, 0, 0);
            this.vertex(200, -200, -300, 600, 0);
            this.vertex(200, 200, -300, 600, 400);
            this.vertex(200, 200, 300, 0, 400);
            this.endShape();
            this.popMatrix();
            this.noLights();
        };
        eastHall2.update();
        images.eastHall2 = eastHall2.get(0, 0, 600, 600);
    }, // eastHall2
    function() {
        image(getImage("space/background"), 0, 0, 1000, 1000);
        var squareSize = 50;
        for(var x=0;x<600/squareSize;x++){
        for(var y=250/squareSize;y<350/squareSize;y++){
            fill(
                [color(0), color(150)][(x+y)%2]);
            rect(x*squareSize, y*squareSize, squareSize, squareSize);
        }}
        fill(0);
        rect(0, 230, 600, 20);
        rect(0, 350, 600, 20);
        image(images.textures[2], 0, 0, 1000, 1000);
        (fill)(0, 200);
        rect(0, 0, 600, 600);
        linearGrad(300, 300, color(0, 0), color(0, 150), 600, 600, 100, 0);
        images.progress.showstage1 = get(0, 0, 600, 600);
    }, // progress.showstage1
    function() {
        image(getImage("space/background"), 0, 0, 1000, 1000);
        var squareSize = 50;
        for(var x=0;x<600/squareSize;x++){
        for(var y=250/squareSize;y<350/squareSize;y++){
            fill(
                [color(0), color(100)][(x+y)%2]);
            rect(x*squareSize, y*squareSize, squareSize, squareSize);
        }}
        fill(0);
        rect(0, 230, 600, 20);
        rect(0, 350, 600, 20);
        image(images.textures[2], 0, 0, 1000, 1000);
        (fill)(0, 200);
        rect(0, 0, 600, 600);
        linearGrad(300, 300, color(0, 150), color(0, 0), 600, 600, 100, 0);
        images.progress.showstage2 = get(0, 0, 600, 600);
    }, // progress.showstage2
    function() {
        image(images.textures[0], 0, 0, 1000, 1000);
        image(images.textures[2], 0, 0, 1000, 1000);
        (fill)(0, 230);
        rect(0, 0, 600, 600);
        images.progress.showstage3 = get(0, 0, 600, 600);
    }, // progress.showstage3
    function() {
        images.progress.showstage = createGraphics(800, 600, P3D);
        images.progress.showstage.update = function() {
            this.background(0);
            this.noStroke();
            this.ambientLight(255, 255, 255);
            this.fill(255);
            this.textureMode(IMAGE);
        };
        images.progress.showstage.update();
    },
    function() {
        images.progress.showstage.update = function() {
            this.translate(400, 325, 300);
            this.rotateX(-0.125);
            this.rotateY(-0.5);
            this.texture(images.progress.showstage1);
            this.beginShape();
            this.vertex(-300, 300, -300, 0, 0);
            this.vertex(-300, 300, 300, 600, 0);
            this.vertex(-300, -300, 300, 600, 600);
            this.vertex(-300, -300, -300, 0, 600);
            this.endShape();
        };
        images.progress.showstage.update();
    },
    function() {
        images.progress.showstage.update = function() {
            this.texture(images.progress.showstage2);
            this.beginShape();
            this.vertex(-300, -300, -300, 0, 0);
            this.vertex(300, -300, -300, 600, 0);
            this.vertex(300, 300, -300, 600, 600);
            this.vertex(-300, 300, -300, 0, 600);
            this.endShape();
        };
        images.progress.showstage.update();
    },
    function() {
        images.progress.showstage.update = function() {
            this.texture(images.progress.showstage3);
            this.beginShape();
            this.vertex(-300, 300, -300, 0, 0);
            this.vertex(-300, 300, 300, 600, 0);
            this.vertex(300, 300, 300, 600, 600);
            this.vertex(300, 300, -300, 0, 600);
            this.endShape();
            
            this.noLights();
        };
        images.progress.showstage.update();
    },
    function() {
        images.showStage = images.progress.showstage.get(0, 0, 800, 600);
    }, // showStage
    function() {
        var squareSize = 30;
        for(var x=0;x<600/squareSize;x++){
        for(var y=0;y<400/squareSize;y++){
            fill(
                [color(0, 0, 255/4), color(255/4, 0, 0)][(x+y)%2]);
            rect(x*squareSize, y*squareSize, squareSize, squareSize);
        }}
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(300, 200, color(0, 255), color(0, 0), 400, 600, 100, 90); 
        images.progress.diningFloor = get(0, 0, 600, 400);
    }, // progress.diningFloor
    function() {
        background(100);
        fill(200);
        rect(0, 0, 600, 50);
        image(images.textures[2], 0, 0, 1000, 1000);
        var img = get(0, 0, 600, 100);
        background(255);
        fill(0);
        rect(10, 50, 580, 50);
        var cut = get(0, 0, 600, 100);
        img.mask(cut);
        images.progress.tableFront1 = img;
    }, // progress.tableFront1
    function() {
        noBackground();
        fill(75);
        rect(0, 50, 10, 150);
        rect(90, 50, 10, 150);
        rect(0, 125, 100, 10);
        fill(90);
        rect(10, 135, 80, 20);
        rect(10, 50, 80, 20);
        stroke(75);
        strokeWeight(10);
        arc(50, 50, 90, 90, -180, 0);
        noStroke();
        images.progress.chair1 = get(0, 0, 100, 200);
    }, // progress.chair1
    function() {
        noBackground();
        image(images.progress.tableFront1, 0, 100);
        for(var i=20; i<=500; i+=115) {
            image(images.progress.chair1, i, 0);
        }
        images.progress.tableFrontwChairs1 = get(0, 0, 600, 200);
    }, // progress.tableFrontwChairs1
    function() {
        background(200);
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(300, 50, color(0, 100), color(0, 0), 100, 600, 100, 90);
        images.progress.tableTop1 = get(0, 0, 600, 100);
    }, // progress.tableTop1
    function() {
        background(100/2);
        fill(200/2);
        rect(0, 0, 600, 50);
        image(images.textures[2], 0, 0, 1000, 1000);
        var img = get(0, 0, 600, 100);
        background(255);
        fill(0);
        rect(10, 50, 580, 50);
        var cut = get(0, 0, 600, 100);
        img.mask(cut);
        images.progress.tableFront2 = img;
    }, // progress.tableFront2
    function() {
        noBackground();
        fill(75/2);
        rect(0, 50, 10, 150);
        rect(90, 50, 10, 150);
        rect(0, 125, 100, 10);
        fill(90/2);
        rect(10, 135, 80, 20);
        rect(10, 50, 80, 20);
        stroke(75/2);
        strokeWeight(10);
        arc(50, 50, 90, 90, -180, 0);
        noStroke();
        images.progress.chair2 = get(0, 0, 100, 200);
    }, // progress.chair2
    function() {
        noBackground();
        image(images.progress.tableFront2, 0, 100);
        for(var i=20; i<=500; i+=115) {
            image(images.progress.chair2, i, 0);
        }
        images.progress.tableFrontwChairs2 = get(0, 0, 600, 200);
    }, // progress.tableFrontwChairs2
    function() {
        background(200/2);
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(300, 50, color(0, 100), color(0, 0), 100, 600, 100, 90);
        images.progress.tableTop2 = get(0, 0, 600, 100);
    }, // progress.tableTop2
    function() {
        background(100/2/2);
        fill(200/2/2);
        rect(0, 0, 600, 50);
        image(images.textures[2], 0, 0, 1000, 1000);
        var img = get(0, 0, 600, 100);
        background(255);
        fill(0);
        rect(10, 50, 580, 50);
        var cut = get(0, 0, 600, 100);
        img.mask(cut);
        images.progress.tableFront3 = img;
    }, // progress.tableFront3
    function() {
        noBackground();
        fill(75/2/2);
        rect(0, 50, 10, 150);
        rect(90, 50, 10, 150);
        rect(0, 125, 100, 10);
        fill(90/2/2);
        rect(10, 135, 80, 20);
        rect(10, 50, 80, 20);
        stroke(75/2/2);
        strokeWeight(10);
        arc(50, 50, 90, 90, -180, 0);
        noStroke();
        images.progress.chair3 = get(0, 0, 100, 200);
    }, // progress.chair2
    function() {
        noBackground();
        image(images.progress.tableFront3, 0, 100);
        for(var i=20; i<=500; i+=115) {
            image(images.progress.chair3, i, 0);
        }
        images.progress.tableFrontwChairs3 = get(0, 0, 600, 200);
    }, // progress.tableFrontwChairs2
    function() {
        background(200/2/2);
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(300, 50, color(0, 255), color(0, 0), 100, 600, 100, 90);
        images.progress.tableTop3 = get(0, 0, 600, 100);
    }, // progress.tableTop2
    function() {
        images.progress.diningArea = createGraphics(800, 600, P3D);
        images.progress.diningArea.update = function() {
            this.background(0);
            this.noStroke();
            this.ambientLight(255, 255, 255);
            this.fill(255);
            this.textureMode(IMAGE);
            this.translate(400, -50, -200);
            this.rotateX(-0.5);
        };
        images.progress.diningArea.update();
    },
    function() {
        images.progress.diningArea2 = createGraphics(800, 600, P3D);
        images.progress.diningArea2.update = function() {
            this.background(0, 0);
            this.noStroke();
            this.ambientLight(255, 255, 255);
            this.fill(255);
            this.textureMode(IMAGE);
            this.translate(400, -50, -200);
            this.rotateX(-0.5);
        };
        images.progress.diningArea2.update();
    },
    function() {
        images.progress.diningArea3 = createGraphics(800, 600, P3D);
        images.progress.diningArea3.update = function() {
            this.background(0, 0);
            this.noStroke();
            this.ambientLight(255, 255, 255);
            this.fill(255);
            this.textureMode(IMAGE);
            this.translate(400, -50, -200);
            this.rotateX(-0.5);
        };
        images.progress.diningArea3.update();
    },
    function() {
        images.progress.diningArea4 = createGraphics(800, 600, P3D);
        images.progress.diningArea4.update = function() {
            this.background(0, 0);
            this.noStroke();
            this.ambientLight(255, 255, 255);
            this.fill(255);
            this.textureMode(IMAGE);
            this.translate(400, -50, -200);
            this.rotateX(-0.5);
        };
        images.progress.diningArea4.update();
    },
    function() {
        images.progress.diningArea.update = function() {
            this.texture(images.progress.diningFloor);
            this.beginShape();
            this.vertex(-750, 500, -500, 0, 0);
            this.vertex(750, 500, -500, 600, 0);
            this.vertex(750, 500, 500, 600, 400);
            this.vertex(-750, 500, 500, 0, 400);
            this.endShape();
        };
        images.progress.diningArea.update();
    },
    function() {
        images.progress.diningArea2.update = function() {
            this.texture(images.progress.tableTop1);
            this.beginShape();
            this.vertex(-600-5, 400, 200, 0, 0);
            this.vertex(0-5, 400, 200, 600, 0);
            this.vertex(0-5, 400, 300, 600, 200);
            this.vertex(-600-5, 400, 300, 0, 200);
            this.endShape();
            this.texture(images.progress.tableTop1);
            this.beginShape();
            this.vertex(0+5, 400, 200, 0, 0);
            this.vertex(600+5, 400, 200, 600, 0);
            this.vertex(600+5, 400, 300, 600, 200);
            this.vertex(0+5, 400, 300, 0, 200);
            this.endShape();
        };
        images.progress.diningArea2.update();
    },
    function() {
        images.progress.diningArea3.update = function() {
            this.texture(images.progress.tableTop2);
            this.beginShape();
            this.vertex(-600-5, 400, 200-250, 0, 0);
            this.vertex(0-5, 400, 200-250, 600, 0);
            this.vertex(0-5, 400, 300-250, 600, 200);
            this.vertex(-600-5, 400, 300-250, 0, 200);
            this.endShape();
            this.texture(images.progress.tableTop2);
            this.beginShape();
            this.vertex(0+5, 400, 200-250, 0, 0);
            this.vertex(600+5, 400, 200-250, 600, 0);
            this.vertex(600+5, 400, 300-250, 600, 200);
            this.vertex(0+5, 400, 300-250, 0, 200);
            this.endShape();
        };
        images.progress.diningArea3.update();
    },
    function() {
        images.progress.diningArea4.update = function() {
            this.texture(images.progress.tableTop3);
            this.beginShape();
            this.vertex(-600-5, 400, 200-250-250, 0, 0);
            this.vertex(0-5, 400, 200-250-250, 600, 0);
            this.vertex(0-5, 400, 300-250-250, 600, 200);
            this.vertex(-600-5, 400, 300-250-250, 0, 200);
            this.endShape();
            this.texture(images.progress.tableTop3);
            this.beginShape();
            this.vertex(0+5, 400, 200-250-250, 0, 0);
            this.vertex(600+5, 400, 200-250-250, 600, 0);
            this.vertex(600+5, 400, 300-250-250, 600, 200);
            this.vertex(0+5, 400, 300-250-250, 0, 200);
            this.endShape();
        };
        images.progress.diningArea4.update();
    },
    function() {
        images.progress.diningArea2.update = function() {
            this.texture(images.progress.tableFrontwChairs1);
            this.beginShape();
            this.vertex(-600-5, 300, 300, 0, 0);
            this.vertex(0-5, 300, 300, 600, 0);
            this.vertex(0-5, 500, 300, 600, 200);
            this.vertex(-600-5, 500, 300, 0, 200);
            this.endShape();
            this.texture(images.progress.tableFrontwChairs1);
            this.beginShape();
            this.vertex(0+5, 300, 300, 0, 0);
            this.vertex(600+5, 300, 300, 600, 0);
            this.vertex(600+5, 500, 300, 600, 200);
            this.vertex(0+5, 500, 300, 0, 200);
            this.endShape();
        };
        images.progress.diningArea2.update();
    },
    function() {
        images.progress.diningArea3.update = function() {
            this.texture(images.progress.tableFrontwChairs2);
            this.beginShape();
            this.vertex(-600-5, 300, 300-250, 0, 0);
            this.vertex(0-5, 300, 300-250, 600, 0);
            this.vertex(0-5, 500, 300-250, 600, 200);
            this.vertex(-600-5, 500, 300-250, 0, 200);
            this.endShape();
            this.texture(images.progress.tableFrontwChairs2);
            this.beginShape();
            this.vertex(0+5, 300, 300-250, 0, 0);
            this.vertex(600+5, 300, 300-250, 600, 0);
            this.vertex(600+5, 500, 300-250, 600, 200);
            this.vertex(0+5, 500, 300-250, 0, 200);
            this.endShape();
        };
        images.progress.diningArea3.update();
    },
    function() {
        images.progress.diningArea4.update = function() {
            this.texture(images.progress.tableFrontwChairs3);
            this.beginShape();
            this.vertex(-600-5, 300, 300-250-250, 0, 0);
            this.vertex(0-5, 300, 300-250-250, 600, 0);
            this.vertex(0-5, 500, 300-250-250, 600, 200);
            this.vertex(-600-5, 500, 300-250-250, 0, 200);
            this.endShape();
            this.texture(images.progress.tableFrontwChairs3);
            this.beginShape();
            this.vertex(0+5, 300, 300-250-250, 0, 0);
            this.vertex(600+5, 300, 300-250-250, 600, 0);
            this.vertex(600+5, 500, 300-250-250, 600, 200);
            this.vertex(0+5, 500, 300-250-250, 0, 200);
            this.endShape();
        };
        images.progress.diningArea4.update();
    },
    function() {
        images.diningArea = images.progress.diningArea.get(0, 0, 800, 600);
    }, // diningArea
    function() {
        images.diningArea2 = images.progress.diningArea2.get(0, 0, 800, 600);
    }, // diningArea2
    function() {
        images.diningArea3 = images.progress.diningArea3.get(0, 0, 800, 600);
    }, // diningArea3
    function() {
        images.diningArea4 = images.progress.diningArea4.get(0, 0, 800, 600);
    }, // diningArea4
    function() {
        var squareSize = 50;
        background(100);
        for(var x=0;x<600/squareSize;x++){
        for(var y=0;y<600/squareSize;y++){
            fill(
                [color(0), color(100)][(x+y)%2]);
            rect(x*squareSize, y*squareSize, squareSize, squareSize);
        }}
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(300, 150, color(0, 255), color(0, 200), 300, 600, 100, 90);
        linearGrad(300, 450, color(0, 200), color(0, 100), 300, 600, 100, 90);
        linearGrad(50, 450, color(0, 255), color(0, 200), 100, 600, 50, 0);
        linearGrad(150, 450, color(0, 200), color(0, 0), 100, 600, 50, 0);
        images.progress.floor1 = get(0, 0, 600, 600);
    }, // progress.floor1
    function() {
        var squareSize = 50;
        background(50);
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(150, 200, color(0, 100), color(0, 200), 300, 400, 100, 0);
        linearGrad(450, 200, color(0, 200), color(0, 255), 300, 400, 100, 0);
        images.progress.wallT = get(0, 0, 600, 400);
    }, // progress.wallT
    function() {
        image(images.progress.wallT, 0, 0, 600, 400);
        var img = get(0, 0, 600, 400);
        background(255);
        fill(0);
        rect(50, 0, 400, 400);
        var cut = get(0, 0, 600, 400);
        img.mask(cut);
        noBackground();
        image(img, 0, 0);
        images.progress.wallT2 = get(0, 0, 600, 400);
    }, // progress.wallT2
    function() {
        background(10);
        linearGrad(100, 200, color(0, 255), color(0, 0), 200, 400, 100, 0);
        images.progress.wallT3 = get(0, 0, 200, 400);
    }, // progress.wallT3
    function() {
        images.progress.eastHall3 = createGraphics(700, 600, P3D);
        images.progress.eastHall3.update = function() {
            this.background(0);
            this.textureMode(IMAGE);
            this.ambientLight(255, 255, 255);
            this.noStroke();
            this.pushMatrix();
            this.translate(350, 200, 50);
            this.rotateX(-0.5);
            this.rotateY(-0.125);
            this.fill(255);
            this.texture(images.progress.floor1);
            this.beginShape();
            this.vertex(-400, 200, -300, 0, 0);
            this.vertex(200, 200, -300, 600, 0);
            this.vertex(200, 200, 300, 600, 600);
            this.vertex(-400, 200, 300, 0, 600);
            this.endShape();
            this.texture(images.progress.wallT);
            this.beginShape();
            this.vertex(200, -200, 300, 0, 0);
            this.vertex(200, -200, -300, 600, 0);
            this.vertex(200, 200, -300, 600, 400);
            this.vertex(200, 200, 300, 0, 400);
            this.endShape();
            this.texture(images.progress.wallT3);
            this.beginShape();
            this.vertex(-400, -200, -150, 0, 0);
            this.vertex(-200, -200, -150, 200, 0);
            this.vertex(-200, 200, -150, 200, 200);
            this.vertex(-400, 200, -150, 0, 200);
            this.endShape();
            this.popMatrix();
            this.noLights();
        };
    },
    function() {
        images.progress.eastHall3.update();
    },
    function() {
        images.eastHall3 = images.progress.eastHall3.get(0, 0, 700, 600);
    },
    function() {
        images.southHall = createGraphics(800, 600, P2D);
        images.southHall.update = function() {
            this.noStroke();
            this.background(75);
            this.image(images.textures[2], 0, 0, 2000, 2000);
            var w = 5;
            for(var i=0; i<this.width; i+=w) {
                this.fill(0, map(i, 0, this.width, 230, 0));
                this.rect(i, 0, w, this.height);
            }
        };
        images.southHall.update();
        images.southHall = images.southHall.get(0, 0, 800, 600);
    }, // southHall
    function() {
        image(images.textures[0], 0, 0, 1000, 1000);
        fill(100);
        ellipse(25, 200, 25, 25);
        fill(255, 187, 0);
        rect(180, 100, 20, 40);
        rect(180, 260, 20, 40);
        fill(227, 163, 0);
        ellipse(190, 110, 5, 5);
        ellipse(190, 270, 5, 5);
        ellipse(190, 130, 5, 5);
        ellipse(190, 290, 5, 5);
        image(images.textures[2], 0, 0, 1000, 1000);
        (fill)(0, 200);
        rect(0, 0, 200, 400);
        images.door2 = get(0, 0, 200, 400);
    },
    function() {
        background(50);
        strokeWeight(10);
        stroke(25);
        fill(75);
        rect(50-5, 100-5, 200+10, 400+10);
        noStroke();
        image(images.door2, 60, 100, 190, 400);
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(300, 250, color(0, 0), color(0, 150), 600, 500, 100, 0);
        images.progress.wall = get(0, 0, 600, 500);
    },
    function() {
        var squareSize = 50;
        for(var x=0;x<600/squareSize;x++){
        for(var y=0;y<600/squareSize;y++){
            fill(
                [color(0), color(100)][(x+y)%2]);
            rect(x*squareSize, y*squareSize, squareSize, squareSize);
        }}
        image(images.textures[2], 1000, 1000);
        linearGrad(300, 450, color(0, 200), color(0, 0), 300, 600, 100, 90);
        linearGrad(300, 150, color(0, 255), color(0, 200), 300, 600, 100, 90);
        images.progress.floor = get(0, 0, 600, 600);
    },
    function() {
        images.northHall = createGraphics(1000, 600, P2D);
        images.northHall.update = function() {
            this.background(0);
            this.image(images.progress.floor, 0, 400, 1000, 200);
            this.image(images.progress.wall, 0, 0, 600, 500);
        };
        images.northHall.update();
        
        images.northHall = images.northHall.get(0, 0, 1000, 600);
    }, // North Hall
    /*
    function() {
        images.progress.eastHall32 = createGraphics(700, 600, P3D);
        images.progress.eastHall32.update = function() {
            this.background(0, 0);
            this.textureMode(IMAGE);
            this.ambientLight(255, 255, 255);
            this.noStroke();
            this.pushMatrix();
            this.translate(350, 200, 50);
            this.rotateX(-0.5);
            this.rotateY(-0.125);
            this.fill(255);
            this.texture(images.progress.wallT2);
            this.beginShape();
            this.vertex(-200, -200, 300, 0, 0);
            this.vertex(-200, -200, -300, 600, 0);
            this.vertex(-200, 200, -300, 600, 400);
            this.vertex(-200, 200, 300, 0, 400);
            this.endShape();
            this.popMatrix();
            this.noLights();
        };
    },
    function() {
        images.progress.eastHall32.update();
    },
    function() {
        images.eastHall32 = images.progress.eastHall32.get(0, 0, 700, 600);
    },
    */
    function() {
        images.westHall = createGraphics(800, 600, P2D);
        images.westHall.update = function() {
            this.noStroke();
            this.background(75);
            this.image(images.textures[2], 0, 0, 2000, 2000);
            var w = 5;
            for(var i=0; i<this.width; i+=w) {
                this.fill(0, map(i, 0, this.width, 0, 230));
                this.rect(i, 0, w, this.height);
            }
        };
        images.westHall.update();
        images.westHall = images.westHall.get(0, 0, 800, 600);
    }, // westHall
    function() {
        noBackground();
        fill(43, 0, 0);
        rect(0, 75, 300, 425);
        for(var i=300; i<450; i+=15) {
            fill(255, 77, 0);
            fill(lerpColor(color(0), color(255, 77, 0), map(i, 300, 450, 0.2, 1)));
            rect(40, i, 100, 10);
            rect(160, i, 100, 10);
        }
        fill(5, 0, 0);
        rect(100, 0, 100, 75);
        images.progress.furnace = get(0, 0, 300, 500);
    },
    function() {
        image(images.textures[1], 0, 0, 1000, 1000);
        linearGrad(300, 300, color(0, 255), color(0, 0), 600, 600, 100, 90);
        fill(50, 0, 0, 150);
        rect(0, 0, 1000, 1000);
        images.progress.floor = get(0, 0, 600, 600);
    },
    function() {
        image(images.textures[1], 0, 0, 1000, 1000);
        linearGrad(300, 300, color(0, 255), color(25, 0, 0, 100), 600, 600, 100, 90);
        fill(50, 0, 0, 150);
        rect(0, 0, 1000, 1000);
        images.progress.wall = get(0, 0, 600, 600);
    },
    function() {
        images.furnaceRoom = createGraphics(800, 600, P2D);
        images.furnaceRoom.update = function() {
            this.image(images.progress.wall, 0, 0, 800, 600);
            this.image(images.progress.floor, 0, 450, 800, 150);
            this.image(images.progress.furnace, 0, 0);
            this.image(images.progress.furnace, 500, 0);
        };
        images.furnaceRoom.update();
        
        images.furnaceRoom = images.furnaceRoom.get(0, 0, 800, 600);
    }, // furnaceRoom
    function() {
        var squareSize = 70;
        for(var x=0;x<600/squareSize;x++){
        for(var y=0;y<600/squareSize;y++){
            fill(
                [color(0), color(100)][(x+y)%2]);
            rect(x*squareSize, y*squareSize, squareSize, squareSize);
        }}
        image(images.textures[2], 0, 0, 1000, 1000);
        images.supplyCloset = get(0, 0, 600, 600);
    },
    function() {
        noBackground();
        noFill();
        strokeWeight(1);
        for(var i=0; i<=255; i+=0.5) {
            (stroke)(0, i);
            var num = map(i, 0, 255, 300, 600);
            ellipse(200, 400, num, num);
        }
        strokeWeight(300);
        ellipse(200, 400, 900, 900);
        stroke(0);
        strokeWeight(5);
        line(8, 602, 214, 341);
        noStroke();
        fill(255);
        ellipse(94, 438, 200, 200);
        noFill();
        strokeWeight(1);
        for(var i=0; i<=255; i+=25) {
            (stroke)(255, i);
            var num = map(i, 255, 0, 200, 210);
            ellipse(94, 438, num, num);
        }
        stroke(0);
        strokeWeight(15);
        line(0, 567, 94, 438);
        noStroke();
        fill(0);
        ellipse(214, 341, 10, 10);
        images.supplyClosetTop = get(0, 0, 600, 600);
    }, // supplyCloset
    function() {
        background(50);
        images.progress.wall = get(0, 0, 600, 600);
    },
    function() {
        noBackground();
        linearGrad(300, 300, color(0, 0), color(0, 255), 600, 600, 100, 0);
        images.progress.grad = get(0, 0, 600, 600);
    },
    function() {
        images.spareRoom = createGraphics(900, 600, P2D);
        images.spareRoom.update = function() {
            this.noStroke();
            this.image(images.progress.wall, 0, 0, 900, 600);
            this.image(images.textures[2], 0, 0, 1000, 1000);
            this.pushMatrix();
            this.translate(900, 500);
            this.rotate(PI/2);
            this.image(images.textures[0], 0, 0, 100, 900);
            this.popMatrix();
            this.fill(0, 150);
            this.rect(0, 500, 900, 100);
            this.image(images.progress.grad, 0, 0, 1000, 1000);
        };
        images.spareRoom.update();
        images.spareRoom = images.spareRoom.get(0, 0, 900, 600);
    }, // spareRoom
    function() {
        noBackground();
        drawAnimatronicHopper(457, 343, -100, 0, 30, 0, 0, [0, 0], [0, 0], [0, 0], [0, 0], 0, 0, 0, 0);
        pushMatrix();
        translate(184, 133);
        rotate(0);
        fill(129, 30, 25);
        arc(0, 45, 145, 200, -179, 0);
        fill(255);
        rect(-21, -53, 20, 30);
        rect(3, -53, 20, 30);
        noFill();
        stroke(158, 201, 147);
        strokeWeight(5);
        arc(0, 45, 145, 200, -179, 0);
        line(-72.5, 45, 72.5, 45);
        noStroke();
        popMatrix();
        fill(200);
        rect(0, 180, 600, 20);
        images.progress.shelf1 = get(0, 0, 600, 200);
    },
    function() {
        noBackground();
        pushMatrix();
        translate(220, 134);
        rotate(random(360));
        drawAnimatronicWinston(0, 0, 230, 75, 50, 0, 0, 0, 0, 0);
        popMatrix();
        pushMatrix();
        translate(308, 134);
        rotate(random(360));
        drawAnimatronicWinston(0, 0, 230, 75, 50, 0, 0, 0, 0, 0);
        popMatrix();
        pushMatrix();
        translate(264, 53);
        rotate(random(360));
        drawAnimatronicWinston(0, 0, 230, 75, 50, 0, 0, 0, 0, 0);
        popMatrix();
        fill(200);
        rect(0, 180, 600, 20);
        rect(0, 0, 20, 200);
        rect(580, 0, 20, 200);
        images.progress.shelf2 = get(0, 0, 600, 200);
    },
    function() {
        noBackground();
        drawAnimatronicSquidical(423, 135, 0, 0, 140, 0, [0, 0], [0, 0], 0, 0, 0, 0);
        fill(200);
        rect(0, 0, 20, 200);
        rect(580, 0, 20, 200);
        images.progress.shelf3 = get(0, 0, 600, 150);
    },
    function() {
        image(images.textures[1], 0, 0, 1000, 1000);
        image(images.progress.shelf1, 0, 0);
        image(images.progress.shelf2, 0, 200);
        image(images.progress.shelf3, 0, 400);
        image(images.textures[2], 0, 0, 1000, 1000);
        pushMatrix();
        translate(0, 550);
        scale(1, 0.125);
        var squareSize = 70;
        for(var x=0;x<600/squareSize;x++){
        for(var y=0;y<600/squareSize;y+=1){
            fill(
                [color(0), color(250)][(x+y)%2]);
            rect(x*squareSize, y*squareSize, squareSize, squareSize);
        }}
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(300, 300, color(0, 255), color(0, 0), 600, 600, 200, 90);
        popMatrix();
        (fill)(0, 200);
        rect(0, 0, 600, 600);
        linearGrad(300, 300, color(0, 200), color(0, 0), 600, 600, 200, 0);
        images.backstage = get(0, 0, 600, 600);
    }, // backstage
    function() {
        background(100);
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(300, 300, color(0, 0), color(0, 255), 600, 600, 100, 270);
        images.progress.wall1 = get(0, 0, 600, 600);
    },
    function() {
        background(20);
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(300, 400, color(0, 0), color(0, 255), 400, 600, 200, 270);
        images.progress.wall2 = get(0, 0, 600, 600);
    },
    function() {
        var squareSize = 100;
        for(var x=0;x<600/squareSize;x++){
        for(var y=0;y<600/squareSize;y+=1){
            fill(
                [color(0), color(20)][(x+y)%2]);
            rect(x*squareSize, y*squareSize, squareSize, squareSize);
        }}
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(300, 300, color(0, 0), color(0, 255), 600, 600, 200, 270);
        images.progress.floor = get(0, 0, 600, 600);
    },
    function() {
        background(255, 0, 0);
        imageMode(CENTER);
        pushMatrix();
        translate(300, 623);
        scale(1, 0.3);
        rotate(40);
        image(images.progress.floor, 0, 0, 800, 800);
        popMatrix();
        pushMatrix();
        translate(12, 212);
        scale(1, 1.6);
        rotate(77.4);
        image(images.progress.wall1, 0, 0, 400, 400);
        popMatrix();
        pushMatrix();
        translate(559, 234);
        rotate(45);
        scale(1.7, 1.2);
        rotate(53);
        image(images.progress.wall2, 0, 0, 500, 500);
        popMatrix();
        imageMode(CORNER);
        images.eastHall1 = get(0, 0, 600, 600);
    }, // East Hall 1
    function() {
        noBackground();
        linearGrad(300, 300, color(0, 0), color(0, 255), 600, 600, 100, 0);
        images.progress.grad = get(0, 0, 600, 600);
    },
    function() {
        images.changingRooms = createGraphics(800, 600, P2D);
        images.changingRooms.update = function() {
            this.noStroke();
            this.background(75);
            this.strokeWeight(10);
            this.stroke(25);
            this.fill(75);
            this.rect(50-5, 100-5, 200*1.125+10, 400*1.125+10);
            this.image(images.door2, 50, 100, 200*1.125, 400*1.125);
            this.rect(50-5+500, 100-5, 200*1.125+10, 400*1.125+10);
            this.image(images.door2, 50+500, 100, 200*1.125, 400*1.125);
            this.noStroke();
            this.image(images.textures[2], 0, 0, 1000, 1000);
            this.pushMatrix();
            this.translate(0, 550);
            this.scale(1, 0.125);
            var squareSize = 70;
            for(var x=0;x<800/squareSize;x++){
            for(var y=0;y<600/squareSize;y+=1){
                this.fill([color(0), color(100)][(x+y)%2]);
                this.rect(x*squareSize, y*squareSize, squareSize, squareSize);
            }}
            this.image(images.textures[2], 0, 0, 1000, 1000);
            // linearGrad(300, 300, color(0, 255), color(0, 0), 600, 600, 200, 90);
            this.popMatrix();
            this.image(images.progress.grad, 0, 0, 800, 600);
        };
        images.changingRooms.update();
        background(100);
        images.changingRooms = images.changingRooms.get(0, 0, 800, 600);
    }, // changingRooms
    function() {
        noBackground();
        linearGrad(150, 300, color(0, 0), color(0, 255), 300, 600, 100, 0);
        linearGrad(450, 300, color(0, 255), color(0, 0), 300, 600, 100, 0);
        images.progress.grad = get(0, 0, 600, 600);
    },
    function() {
        images.laserTagPP = createGraphics(700, 600, P2D);
        images.laserTagPP.update = function() {
            this.door = function(x, y) {
                this.strokeWeight(10);
                this.stroke(25);
                this.fill(0);
                this.rect(x-5, y-5, 300+10, 600+10);
                this.image(images.door2, x, y, 300, 600);
                this.noStroke();
            };
            this.background(75);
            this.pushMatrix();
            this.translate(350, 0);
            this.scale(0.7, 1);
            this.door(-600, 0);
            this.door(300, 0);
            this.popMatrix();
            this.image(images.textures[2], 0, 0, 1000, 1000);
            this.image(images.progress.grad, 0, 0, 700, 600);
        };
        images.laserTagPP.update();
        background(100);
        images.laserTagPP = images.laserTagPP.get(0, 0, 700, 600);
    }, // laserTagPP
    function() {
        background(75);
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(300, 300, color(0, 0), color(0, 255), 600, 600, 100, 0);
        var img = get(0, 0, 600, 600);
        background(255);
        fill(0);
        pushMatrix();
        scale(6/11, 1);
        translate(550, 0);
        rect(-500, 100, 450, 450);
        rect(50, 100, 450, 450);
        popMatrix();
        rect(0, 550, 600, 50);
        var cut = get(0, 0, 600, 600);
        img.mask(cut);
        images.progress.grad = img;
    },
    function() {
        var squareSize = 50;
        for(var x=0;x<600/squareSize;x++){
        for(var y=0;y<600/squareSize;y++){
            fill(
                [color(0), color(100)][(x+y)%2]);
            rect(x*squareSize, y*squareSize, squareSize, squareSize);
        }}
        image(images.textures[2], 0, 0, 1000, 1000);
        linearGrad(300, 300, color(0, 0), color(0, 255), 600, 600, 200, 0);
        linearGrad(300, 225, color(0, 0), color(0, 255), 450, 600, 225, -90);
        images.progress.floor = get(0, 0, 600, 600);
    },
    function() {
        images.bathrooms = createGraphics(1100, 600, P2D);
        images.bathrooms.update = function() {
            this.noStroke();
            this.door = function(x, y) {
                this.fill(0);
                this.rect(x, y, 450, 450);
            };
            this.background(0);
            this.pushMatrix();
            this.translate(500, 0);
            this.door(-500, 100);
            this.door(50, 100);
            this.popMatrix();
            this.image(images.progress.floor, 0, 400, 1100, 200);
            this.image(images.progress.grad, 0, 0, 1100, 600);
        };
        images.bathrooms.update();
        background(100);
        images.bathrooms = images.bathrooms.get(0, 0, 1100, 600);
    }, // bathrooms
    function() {
        var x = 150;
        var y = 0;
        image(images.textures[1], 0, 0, 1000, 1000);
        strokeWeight(10);
        stroke(25);
        fill(255);
        rect(x-5-1, y-5-1, 300+10+2, 600+10+2);
        noStroke();
        images.kitchenTools = get(0, 0, 600, 600);
    }, // kitchenTools
    function() {
        noBackground();
        fill(25);
        rect(10, 0, 180, 100);
        fill(0);
        rect(10+10, 0+10, 180-20, 100-20);
        fill(50);
        quad(10, 100, 190, 100, 200, 120, 0, 120);
        fill(30);
        rect(0, 120, 200, 180);
        for(var i=0; i<=5; i++) {
            fill(50, 10, 0);
            ellipse(100-15, 105+i, 20, 10);
        }
        fill(82, 16, 0);
        ellipse(100-15, 105, 20, 10);
        for(var i=0; i<=5; i++) {
            fill(0, 10, 50);
            ellipse(100+15, 105+i, 20, 10);
        }
        fill(0, 16, 82);
        ellipse(100+15, 105, 20, 10);
        images.progress.arcade = get(0, 0, 200, 300);
    },
    function() {
        var squareSize = 50;
        for(var x=0;x<600/squareSize;x++){
        for(var y=0;y<600/squareSize;y++){
            fill(
                [color(0), color(100)][(x+y)%2]);
            rect(x*squareSize, y*squareSize, squareSize, squareSize);
        }}
        linearGrad(300, 300, color(0, 0), color(0, 255), 600, 600, 100, -90);
        linearGrad(300, 300, color(0, 0), color(0, 255), 600, 600, 100, 0);
        images.progress.floor = get(0, 0, 600, 600);
    },
    function() {
        images.arcade = createGraphics(1000, 600, P2D);
        images.arcade.update = function() {
            this.noStroke();
            this.background(0);
            this.image(images.progress.floor, 0, 475, 1000, 125);
            for(var i=0; i<1; i+=0.01) {
                this.fill(lerpColor(color(80), color(20), i));
                this.rect(map(i, 0, 1, 0, 600), 0, 600/100, 500);
            }
            for(var i=0; i<600; i+=225) {
                this.image(images.progress.arcade, i-90, 250);
            }
            return this.get(0, 0, 1000, 600);
        };
        images.arcade = images.arcade.update();
    }, // arcade
];
var fnafFont = {};
var fnafFontUncompiled = function(char) {
    var array;
    switch(char) {
        case 'A':
        array = [
        ' %%% ',
        '%   %',
        '%   %',
        '%   %',
        '%%%%%',
        '%   %',
        '%   %'];
        break;
        
        case 'B':
        array = [
        '%%%% ',
        '%   %',
        '%   %',
        '%%%% ',
        '%   %',
        '%   %',
        '%%%% '];
        break;
        
        case 'C':
        array = [
        ' %%% ',
        '%   %',
        '%    ',
        '%    ',
        '%    ',
        '%   %',
        ' %%% '];
        break;
        
        case 'D':
        array = [
        '%%%  ',
        '%  % ',
        '%   %',
        '%   %',
        '%   %',
        '%  % ',
        '%%%  '];
        break;
        
        case 'E':
        array = [
        '%%%%%',
        '%    ',
        '%    ',
        '%%%% ',
        '%    ',
        '%    ',
        '%%%%%'];
        break;

        case 'F':
        array = [
        '%%%%%',
        '%    ',
        '%    ',
        '%%%% ',
        '%    ',
        '%    ',
        '%    '];
        break;
        
        case 'G':
        array = [
        ' %%% ',
        '%   %',
        '%    ',
        '% %%%',
        '%   %',
        '%   %',
        ' %%%%'];
        break;
        
        case 'H':
        array = [
        '%   %',
        '%   %',
        '%   %',
        '%%%%%',
        '%   %',
        '%   %',
        '%   %'];
        break;
        
        case 'I':
        array = [
        ' %%% ',
        '  %  ',
        '  %  ',
        '  %  ',
        '  %  ',
        '  %  ',
        ' %%% '];
        break;
        
        case 'J':
        array = [
        '  %%%',
        '   % ',
        '   % ',
        '   % ',
        '   % ',
        '%  % ',
        ' %%  '];
        break;
        
        case 'K':
        array = [
        '%   %',
        '%  % ',
        '% %  ',
        '%%   ',
        '% %  ',
        '%  % ',
        '%   %'];
        break;
        
        case 'L':
        array = [
        '%    ',
        '%    ',
        '%    ',
        '%    ',
        '%    ',
        '%    ',
        '%%%%%'];
        break;
        
        case 'M':
        array = [
        '%   %',
        '%% %%',
        '% % %',
        '% % %',
        '%   %',
        '%   %',
        '%   %'];
        break;
        
        case 'N':
        array = [
        '%   %',
        '%   %',
        '%%  %',
        '% % %',
        '%  %%',
        '%   %',
        '%   %'];
        break;
        
        case 'O':
        array = [
        ' %%% ',
        '%   %',
        '%   %',
        '%   %',
        '%   %',
        '%   %',
        ' %%% '];
        break;
        
        case 'P':
        array = [
        '%%%% ',
        '%   %',
        '%   %',
        '%%%% ',
        '%    ',
        '%    ',
        '%    '];
        break;
        
        case 'Q':
        array = [
        ' %%% ',
        '%   %',
        '%   %',
        '%   %',
        '% % %',
        '%  % ',
        ' %% %'];
        break;
        
        case 'R':
        array = [
        '%%%% ',
        '%   %',
        '%   %',
        '%%%% ',
        '% %  ',
        '%  % ',
        '%   %'];
        break;
        
        case 'S':
        array = [
        ' %%%%',
        '%    ',
        '%    ',
        ' %%% ',
        '    %',
        '    %',
        '%%%% '];
        break;
        
        case 'T':
        array = [
        '%%%%%',
        '  %  ',
        '  %  ',
        '  %  ',
        '  %  ',
        '  %  ',
        '  %  '];
        break;
        
        case 'U':
        array = [
        '%   %',
        '%   %',
        '%   %',
        '%   %',
        '%   %',
        '%   %',
        ' %%% '];
        break;
        
        case 'V':
        array = [
        '%   %',
        '%   %',
        '%   %',
        '%   %',
        ' % % ',
        ' % % ',
        '  %  '];
        break;
        
        case 'W':
        array = [
        '%   %',
        '%   %',
        '%   %',
        '% % %',
        '% % %',
        '% % %',
        ' % % '];
        break;
        
        case 'X':
        array = [
        '%   %',
        '%   %',
        ' % % ',
        '  %  ',
        ' % % ',
        '%   %',
        '%   %'];
        break;
        
        case 'Y':
        array = [
        '%   %',
        '%   %',
        '%   %',
        ' % % ',
        '  %  ',
        '  %  ',
        '  %  '];
        break;
        
        case 'Z':
        array = [
        '%%%%%',
        '    %',
        '   % ',
        '  %  ',
        ' %   ',
        '%    ',
        '%%%%%'];
        break;
        
        case ' ':
        array = [
        '   ',
        '   ',
        '   ',
        '   ',
        '   ',
        '   ',
        '   '];
        break;
        
        case 'a':
        array = [
        '     ',
        '     ',
        ' %%% ',
        '    %',
        ' %%%%',
        '%   %',
        ' %%%%'];
        break;
        
        case 'b':
        array = [
        '%    ',
        '%    ',
        '% %% ',
        '%%  %',
        '%   %',
        '%   %',
        '%%%% '];
        break;
        
        case 'c':
        array = [
        '     ',
        '     ',
        ' %%% ',
        '%    ',
        '%    ',
        '%   %',
        ' %%% '];
        break;
        
        case 'd':
        array = [
        '    %',
        '    %',
        ' %% %',
        '%  %%',
        '%   %',
        '%   %',
        ' %%%%'];
        break;
        
        case 'e':
        array = [
        '     ',
        '     ',
        ' %%% ',
        '%   %',
        '%%%%%',
        '%    ',
        ' %%% '];
        break;
        
        case 'f':
        array = [
        '  %% ',
        ' %  %',
        ' %   ',
        '%%%  ',
        ' %   ',
        ' %   ',
        ' %   '];
        break;
        
        case 'g':
        array = [
        '     ',
        ' %%%%',
        '%   %',
        '%   %',
        ' %%%%',
        '    %',
        ' %%% '];
        break;
        
        case 'h':
        array = [
        '%    ',
        '%    ',
        '% %% ',
        '%%  %',
        '%   %',
        '%   %',
        '%   %'];
        break;
        
        case 'i':
        array = [
        '  %  ',
        '     ',
        ' %%  ',
        '  %  ',
        '  %  ',
        '  %  ',
        '%%%%%'];
        break;
        
        case 'j':
        array = [
        '   % ',
        '     ',
        '  %% ',
        '   % ',
        '   %',
        '%  % ',
        ' %%  '];
        break;
        
        case 'k':
        array = [
        '%    ',
        '%    ',
        '%  % ',
        '% %  ',
        '%%   ',
        '% %  ',
        '%  % '];
        break;
        
        case 'l':
        array = [
        ' %%  ',
        '  %  ',
        '  %  ',
        '  %  ',
        '  %  ',
        '  %  ',
        '%%%%%'];
        break;
        
        case 'm':
        array = [
        '     ',
        '     ',
        '%% % ',
        '% % %',
        '% % %',
        '%   %',
        '%   %'];
        break;
        
        case 'n':
        array = [
        '     ',
        '     ',
        '% %% ',
        '%%  %',
        '%   %',
        '%   %',
        '%   %'];
        break;
        
        case 'o':
        array = [
        '     ',
        '     ',
        ' %%% ',
        '%   %',
        '%   %',
        '%   %',
        ' %%% '];
        break;
        
        case 'p':
        array = [
        '     ',
        '     ',
        '%%%% ',
        '%   %',
        '%%%% ',
        '%    ',
        '%    '];
        break;
        
        case 'q':
        array = [
        '     ',
        '     ',
        ' %% %',
        '%  %%',
        ' %%%%',
        '    %',
        '    %'];
        break;
        
        case 'r':
        array = [
        '     ',
        '     ',
        '% %% ',
        '%%  %',
        '%    ',
        '%    ',
        '%    '];
        break;
        
        case 's':
        array = [
        '     ',
        '     ',
        ' %%% ',
        '%    ',
        ' %%% ',
        '    %',
        '%%%% '];
        break;
        
        case 't':
        array = [
        ' %   ',
        ' %   ',
        '%%%  ',
        ' %   ',
        ' %   ',
        ' %  %',
        '  %% '];
        break;
        
        case 'u':
        array = [
        '     ',
        '     ',
        '%   %',
        '%   %',
        '%   %',
        '%  %%',
        ' %% %'];
        break;
        
        case 'v':
        array = [
        '     ',
        '     ',
        '%   %',
        '%   %',
        '%   %',
        ' % % ',
        '  %  '];
        break;
        
        case 'w':
        array = [
        '     ',
        '     ',
        '%   %',
        '%   %',
        '%   %',
        '% % %',
        ' % % '];
        break;
        
        case 'x':
        array = [
        '     ',
        '     ',
        '%   %',
        ' % % ',
        '  %  ',
        ' % % ',
        '%   %'];
        break;
        
        case 'y':
        array = [
        '     ',
        '     ',
        '%   %',
        '%   %',
        ' %%%%',
        '    %',
        ' %%% '];
        break;
        
        case 'z':
        array = [
        '     ',
        '     ',
        '%%%%%',
        '   % ',
        '  %  ',
        ' %   ',
        '%%%%%'];
        break;
        
        case '1':
        array = [
        '  %  ',
        ' %%  ',
        '  %  ',
        '  %  ',
        '  %  ',
        '  %  ',
        ' %%% '];
        break;
        
        case '2':
        array = [
        ' %%% ',
        '%   %',
        '    %',
        '   % ',
        '  %  ',
        ' %   ',
        '%%%%%'];
        break;
        
        case '3':
        array = [
        '%%%%%',
        '   % ',
        '  %  ',
        '   % ',
        '    %',
        '%   %',
        ' %%% '];
        break;
        
        case '4':
        array = [
        '   % ',
        '  %% ',
        ' % % ',
        '%  % ',
        '%%%%%',
        '   % ',
        '   % '];
        break;
        
        case '5':
        array = [
        '%%%%%',
        '%    ',
        '%%%% ',
        '    %',
        '    %',
        '%   %',
        ' %%% '];
        break;
        
        case '6':
        array = [
        '  %% ',
        ' %   ',
        '%    ',
        '%%%% ',
        '%   %',
        '%   %',
        ' %%% '];
        break;
        
        case '7':
        array = [
        '%%%%%',
        '    %',
        '   % ',
        '  %  ',
        ' %   ',
        ' %   ',
        ' %   '];
        break;
        
        case '8':
        array = [
        ' %%% ',
        '%   %',
        '%   %',
        ' %%% ',
        '%   %',
        '%   %',
        ' %%% '];
        break;
        
        case '9':
        array = [
        ' %%% ',
        '%   %',
        '%   %',
        ' %%%%',
        '    %',
        '   % ',
        ' %%  '];
        break;
        
        case '0':
        array = [
        ' %%% ',
        '%   %',
        '%  %%',
        '% % %',
        '%%  %',
        '%   %',
        ' %%% '];
        break;
        
        case ':':
        array = [
        '   ',
        '%% ',
        '%% ',
        '   ',
        '%% ',
        '%% ',
        '   '];
        break;
        
        case '%':
        array = [
        '    ',
        '   ',
        '    ',
        '%  %',
        '  % ',
        ' %  ',
        '%  %'];
        break;
        
        case '-':
        array = [
        '     ',
        '     ',
        '     ',
        '%%%%%',
        '     ',
        '     ',
        '     '];
        break;
        
        case '⬚':
        array = [
        '%%%%%',
        '%   %',
        '%   %',
        '%   %',
        '%   %',
        '%   %',
        '%%%%%'];
        break;
    }
    return array;
};
var fnafFontChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz1234567890:%-⬚";
var fontCounter = 0;
var fnafFontMaker = function() {
    noBackground();
    fill(255);
    var list = fnafFontUncompiled(fnafFontChars[fontCounter]);
    var maxWidth = 0;
    for(var y = 0; y<list.length; y++) {
        maxWidth = max(maxWidth, list[y].length);
        for(var x = 0; x<list[y].length; x++) {
            if(list[y][x] !== " ") {
                rect(x*25, y*25, 25, 25);
            }
        }
    }
    fnafFont[fnafFontChars[fontCounter]] = get(0, 0, maxWidth*25, 7*25);
    background(255);
    image(fnafFont[fnafFontChars[fontCounter]], 0, 0, 100, 100);
    fontCounter++;
};
var fnafText = function(txt, x, y, s) {
    s = s || 10;
    s = constrain(s, 1, 25);
    var nx = x;
    var ny = y;
    for(var i = 0; i < txt.length; i++) {
        if(txt[i] === "\n") {
            nx = x;
            ny += s*10;
            continue;
        }
        var symbol = fnafFont[txt[i]] || fnafFont["⬚"];
        image(symbol, nx, ny, symbol.width/25*s, symbol.height/25*s);
        nx += (symbol.width/25+1)*s;
    }
};
var fnafTextCenter = function(txt, x, y, s) {
    s = s || 10;
    s = constrain(s, 1, 25);
    var nx = x;
    var ny = y;
    var cT = split(txt, "\n");
    var findLen = function(txt) {
        var nx = 0;
        for(var i = 0; i < txt.length; i++) {
            var symbol = fnafFont[txt[i]] || fnafFont["⬚"];
            nx += (symbol.width/25+1)*s;
        }
        return nx;
    };
    var CT = [];
    for(var i=0; i<cT.length; i++) {
        CT[i] = findLen(cT[i]);
    }
    pushMatrix();
    translate(-cT/2-x, -7*s);
    for(var i=0; i<cT.length; i++) {
        for(var j = 0; j < cT[i].length; j++) {
            var symbol = fnafFont[cT[i][j]] || fnafFont["⬚"];
            image(symbol, nx-CT[i]/2, ny-(CT.length*10*s-3*s)/2, symbol.width/25*s, symbol.height/25*s);
            nx += (symbol.width/25+1)*s;
        }
        ny += s*10;
        nx = x;
    }
    popMatrix();
};
var loadingLimit = noiseCount+textures.length*200/3+IGF.length+fnafFontChars.length;
var loadingMode = "Noise";
var gameOn = false;
var doneLoading = false;
// }
var BACK = false;
var scenes;
var samGlitch = {
    glitch: [false, false, false, false, false, false, false],
    glitchTimer: 0,
    glitchTimer2: 0,
    glitchTimerLimit: random(50, 100),
    glitchTimerLimit2: random(0, 5),
    Glitch: function() {
        this.glitchTimer = 0;
        this.glitchTimerLimit = random(50, 100);
        this.glitchTimerLimit2 = random(50, 100);
        for(var i=0; i<this.glitch.length; i++) {
            this.glitch[i] = [true, false][floor(random(2))];
        }
        
    },
    run: function() {
        this.glitchTimer+=spf*60;
        this.glitchTimer2+=spf*60;
        if(this.glitchTimer>this.glitchTimerLimit2){
            this.glitch = [false, false, false, false, false, false, false];
        }
        if(this.glitchTimer>this.glitchTimerLimit) {
            this.Glitch();
            this.glitchTimerLimit2 = sq(random(0, 1))*25;
            this.glitchTimer2 = 0;
        }
    },
};
var rooms = {}; // Rooms & Office {
/*
rooms.office = createGraphics(600, 600, P3D);
rooms.office.configure = function() {
    this.monitorUp = 0;
    this.textureMode(IMAGE);
    this.noStroke();
    this.smooth();
    this.rot = 0;
    this.back = false;
};
rooms.office.configure();
rooms.office.update = function() {
    this.background(5);
    this.ambientLight(255, 255, 255);
    this.pushMatrix();
    if(mouseX>300) {
        this.rot+=0.2;
    }
    if(mouseX<300) {
        this.rot-=0.2;
    }
    this.rot = constrain(this.rot, -0.65, 0.65);
    if(!this.back) {
        this.translate(300-this.rot*150, 325, 200);
    } else {
        this.rot = PI;
        this.translate(300, 325, 500);
    }
    this.rotateY(this.rot);
    this.pushMatrix();
    //this.translate(0, 0, 250);
    this.fill(255);
    if(!powerOut) {
        this.texture(images.officeBack);
        this.beginShape();
        this.vertex(-200, -200, -200, 0, 0);
        this.vertex(-200, 200, -200, 0, 400);
        this.vertex(200, 200, -200, 400, 400);
        this.vertex(200, -200, -200, 400, 0);
        this.endShape();
        this.texture(images.leftDoor);
        this.beginShape();
        this.vertex(-200, -200, 400, 0, 0);
        this.vertex(-200, 200, 400, 0, 400);
        this.vertex(-200, 200, -200, 600, 400);
        this.vertex(-200, -200, -200, 600, 0);
        this.endShape();
        this.texture(images.rightDoor);
        this.beginShape();
        this.vertex(200, -200, -200, 0, 0);
        this.vertex(200, 200, -200, 0, 400);
        this.vertex(200, 200, 400, 600, 400);
        this.vertex(200, -200, 400, 600, 0);
        this.endShape();
        this.texture(images.leftDoor);
        this.beginShape();
        this.vertex(200, -200, -200, 0, 0);
        this.vertex(200, 200, -200, 0, 400);
        this.vertex(200, 200, 400, 600, 400);
        this.vertex(200, -200, 400, 600, 0);
        this.endShape();
        this.texture(images.officeFloor);
        this.beginShape();
        this.vertex(-200, 200, -200, 0, 0);
        this.vertex(200, 200, -200, 600, 0);
        this.vertex(200, 200, 400, 600, 400);
        this.vertex(-200, 200, 400, 0, 400);
        this.endShape();
        /*
        this.pushMatrix();
        this.translate(0, -1, -125);
        this.rotateY(-PI/16);
        //this.image(images.fanPic[frameCount%(images.fanPic.length)], 0, 0, 0);
        this.texture(images.fanPic[frameCount%(images.fanPic.length)]);println(frameCount%(images.fanPic.length));
        this.beginShape();
        this.vertex(-50, -50, 0, 0, 0);
        this.vertex(50, -50, 0, 200, 0);
        this.vertex(50, 50, 0, 200, 200);
        this.vertex(-50, 50, 0, 0, 200);
        this.endShape();
        this.popMatrix();
        *//*
        this.texture(images.desk);
        this.beginShape();
        this.vertex(-200, 50, -100, 0, 250);
        this.vertex(-200, 200, -100, 0, 400);
        this.vertex(200, 200, -100, 400, 400);
        this.vertex(200, 50, -100, 400, 250);
        this.endShape();
        this.fill(25);
        this.beginShape();
        this.vertex(-200, 50, -200);
        this.vertex(200, 50, -200);
        this.vertex(200, 50, -100);
        this.vertex(-200, 50, -100);
        this.endShape();
        /*
        this.texture(images.lightSwitch__);
        this.beginShape();//224, 200, 32, 80
        this.vertex(-199, 24, 0, 0, 0);
        this.vertex(-199, 24, 0+80, 0, 100);
        this.vertex(-199, 24+32, 0+80, 250, 100);
        this.vertex(-199, 24+32, 0, 250, 0);
        this.endShape();
        *//*
        this.noLights();
    }
    else if(powerOut) {
        this.texture(images.officeBackDark);
        this.beginShape();
        this.vertex(-200, -200, -200, 0, 0);
        this.vertex(-200, 200, -200, 0, 400);
        this.vertex(200, 200, -200, 400, 400);
        this.vertex(200, -200, -200, 400, 0);
        this.endShape();
        this.texture(images.leftDoorDark);
        this.beginShape();
        this.vertex(-200, -200, 400, 0, 0);
        this.vertex(-200, 200, 400, 0, 400);
        this.vertex(-200, 200, -200, 400, 400);
        this.vertex(-200, -200, -200, 400, 0);
        this.endShape();
        this.texture(images.rightDoorDark);
        this.beginShape();
        this.vertex(200, -200, -200, 0, 0);
        this.vertex(200, 200, -200, 0, 400);
        this.vertex(200, 200, 400, 400, 400);
        this.vertex(200, -200, 400, 400, 0);
        this.endShape();
        this.endShape();
        this.texture(images.officeFloorDark);
        this.beginShape();
        this.vertex(-200, 200, -200, 0, 0);
        this.vertex(200, 200, -200, 600, 0);
        this.vertex(200, 200, 400, 600, 400);
        this.vertex(-200, 200, 400, 0, 400);
        this.endShape();
        this.texture(images.deskDark);
        this.beginShape();
        this.vertex(-200, 50, -100, 0, 250);
        this.vertex(-200, 200, -100, 0, 400);
        this.vertex(200, 200, -100, 400, 400);
        this.vertex(200, 50, -100, 400, 250);
        this.endShape();
        this.fill(10);
        this.beginShape();
        this.vertex(-200, 50, -200);
        this.vertex(200, 50, -200);
        this.vertex(200, 50, -100);
        this.vertex(-200, 50, -100);
        this.endShape();
        this.noLights();
    }
    this.popMatrix();
    this.popMatrix();
};
*/
var Room = function(bkColor) {
    this.surfaces = [];
    this.bkColor = bkColor;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.rotX = 0;
    this.rotY = 0;
    this.rotZ = 0;
    this.addSurface = function(draw, IF) {
        var img = createGraphics(width, height, P3D);
        img.draw = draw;
        img.IF = IF;
        this.surfaces.push(img);
    };
    this.draw = function() {
        (fill)(this.bkColor, alpha(this.bkColor));
        rect(0, 0, width, height);
        for(var i=0; i<this.surfaces.length; i++) {
            if(!this.surfaces[i].IF()) { continue; }
            this.surfaces[i].noStroke();
            this.surfaces[i].background(0, 0);
            this.surfaces[i].fill(255);
            this.surfaces[i].ambientLight(255, 255, 255);
            this.surfaces[i].textureMode(IMAGE);
            this.surfaces[i].pushMatrix();
            this.surfaces[i].translate(300, 300, 0);
            this.surfaces[i].translate(this.x, this.y, this.z);
            this.surfaces[i].rotateY(this.rotY);
            this.surfaces[i].rotateX(this.rotX);
            this.surfaces[i].rotateZ(this.rotZ);
            this.surfaces[i].draw();
            (image)(this.surfaces[i]);
            this.surfaces[i].popMatrix();
            this.surfaces[i].noLights();
        }
    };
};
rooms.office = new Room(color(5, 0));
rooms.office.doorRot = 1.5;
rooms.office.doorShut = false;
rooms.office.doorShutSound = false;
rooms.office.update = function() {
    if(!BACK) {
        if(mouseX>300) {
            this.rotY+=0.1;
        }
        if(mouseX<300) {
            this.rotY-=0.1;
        }
        this.rotY = constrain(this.rotY, -0.7, 0.7);
        this.x = -this.rotY*150;
        this.y = 25;
        this.z = 200;
        this.doorRot = 1.5;
    } else {
        this.rotY = PI;
        this.z = 500;
        this.x = 0;
        this.doorShut = mouseIsPressed && mouseX>193 && mouseX<193+212 && mouseY>123 && mouseY<123+448;
        if(!this.doorShut && this.doorRot === 0) {
            addSound("rpg/door-open", {volume: normVol(0.1), PBR: 1.5});
        }
        if(mouseWasPressed && this.doorRot !== 0) {
            this.doorShutSound = true;
        }
        if(this.doorRot === 0 && this.doorShutSound) {
            addSound("retro/hit2", {time: 0, start: 0.1, stop: 0.2, volume: normVol(0.3)});
            addSound("retro/hit2", {time: 75, start: 0.05, stop: 1, volume: normVol(0.5)});
            this.doorShutSound = false;
        }
    }
    this.doorRot+=0.15;
    if(this.doorShut) {
        this.doorRot-=0.3;
    }
    this.doorRot = constrain(this.doorRot, 0, 1.5);
    if(scenes.game.GW) {
        this.rotY = 0;
    }
    var cc = scenes.game.aniIn;
    if((cc === "hopps" || cc === "ohnoes" || cc === "win" || cc === "fuzzy" || cc === "sam") && scenes.game.camRot > 0) {
        this.rotY = 0;
    } else if(cc === "squid") {
        this.rotY = 0.7;
    }
};
/*
rooms.office.addSurface(function() {
    if(scenes.game.leftWall.light || scenes.game.rightWall.light) {
        if(rooms.office.rotY < 0) {
            this.texture(images.officeFloor2);
            this.beginShape();
            this.vertex(-400, 200, -200-200, 0, 0);
            this.vertex(-200, 200, -200-200, 200, 0);
            this.vertex(-200, 200, 400-200, 200, 600);
            this.vertex(-400, 200, 400-200, 0, 600);
            this.endShape();
            this.texture(images.officeWall);
            this.beginShape();
            this.vertex(-400, -200, 400-200, 0, 0);
            this.vertex(-400, 200, 400-200, 0, 400);
            this.vertex(-400, 200, -200-200, 600, 400);
            this.vertex(-400, -200, -200-200, 600, 0);
            this.endShape();
        }
        if(rooms.office.rotY > 0) {
            this.texture(images.officeFloor22);
            this.beginShape();
            this.vertex(-400+600, 200, -200-200, 0, 0);
            this.vertex(-200+600, 200, -200-200, 200, 0);
            this.vertex(-200+600, 200, 400-200, 200, 600);
            this.vertex(-400+600, 200, 400-200, 0, 600);
            this.endShape();
            
            this.texture(images.officeWall2);
            this.beginShape();
            this.vertex(400, -200, 400-200, 0, 0);
            this.vertex(400, 200, 400-200, 0, 400);
            this.vertex(400, 200, -200-200, 600, 400);
            this.vertex(400, -200, -200-200, 600, 0);
            this.endShape();
        }
    }
});
*/
rooms.office.addSurface(function() {
    var e = rooms.office.rotY;
    if(e>-2.75 && e<0.22 || BACK) {
        this.texture(images.LD);
        this.beginShape();
        this.vertex(-200, -200, 400, 0, 0);
        this.vertex(-200, 200, 400, 0, 400);
        this.vertex(-200, 200, -200, 600, 400);
        this.vertex(-200, -200, -200, 600, 0);
        this.endShape();
    }
}, function() {
    var e = rooms.office.rotY;
    return (e>-2.75 && e<0.22 || BACK);
});
rooms.office.addSurface(function() {
    var e = rooms.office.rotY;
    if(e>-0.22 && e<2.75 || BACK) {
        this.texture(images.RD);
        this.beginShape();
        this.vertex(200, -200, -200, 0, 0);
        this.vertex(200, 200, -200, 0, 400);
        this.vertex(200, 200, 400, 600, 400);
        this.vertex(200, -200, 400, 600, 0);
        this.endShape();
    }
}, function() {
    var e = rooms.office.rotY;
    return (e>-0.22 && e<2.75 || BACK);
});
rooms.office.addSurface(function() {
    var e = rooms.office.rotY;
    if(e>-1.29 && e<1.29 && !BACK) {
        this.texture(powerOut ? images.officeBackDark : images.officeBack);
        this.beginShape();
        this.vertex(-200, -200, -200, 0, 0);
        this.vertex(-200, 200, -200, 0, 400);
        this.vertex(200, 200, -200, 400, 400);
        this.vertex(200, -200, -200, 400, 0);
        this.endShape();
    }
    this.texture(powerOut ? images.officeFloorDark : images.officeFloor);
    this.beginShape();
    this.vertex(-200, 200, -200, 0, 0);
    this.vertex(200, 200, -200, 600, 0);
    this.vertex(200, 200, 400, 600, 400);
    this.vertex(-200, 200, 400, 0, 400);
    this.endShape();
    if(e>-1.49 && e<1.49 && !BACK) {
        this.texture(powerOut ? images.deskDark : images.desk);
        this.beginShape();
        this.vertex(-200, 50, -100, 0, 250);
        this.vertex(-200, 200, -100, 0, 400);
        this.vertex(200, 200, -100, 400, 400);
        this.vertex(200, 50, -100, 400, 250);
        this.endShape();
    }
    if(e>-1.49 && e<1.49 && !BACK) {
        this.fill(powerOut ? 10 : 25);
        this.beginShape();
        this.vertex(-200, 50, -200);
        this.vertex(200, 50, -200);
        this.vertex(200, 50, -100);
        this.vertex(-200, 50, -100);
        this.endShape();
    }
    if(BACK) {
        this.texture(images.backDoor);
        this.beginShape();
        this.vertex(-200, -200, 400, 0, 0);
        this.vertex(-200, 200, 400, 0, 400);
        this.vertex(200, 200, 400, 400, 400);
        this.vertex(200, -200, 400, 400, 0);
        this.endShape();
    }
}, function() {
    return true;
});
rooms.office.addSurface(function() {
    if(BACK) {
        this.pushMatrix();
        this.translate(86, -168, 400);
        this.rotateY(-rooms.office.doorRot);
        this.texture(images.woodenDoor);
        this.beginShape();
        this.vertex(0, 0, 0, 0, 0);
        this.vertex(0, 362, 0, 0, 400);
        this.vertex(-171, 362, 0, 400, 400);
        this.vertex(-171, 0, 0, 400, 0);
        this.endShape();
        this.popMatrix();
    }
}, function() {
    return BACK;
});


var NormRoom = function(img) {
    this.img = img;
    this.x = -50;
    this.dir = true;
    this.move = function(s) {
        var w = images[this.img].width;
        this.x += this.dir ? s : -s;
        if(this.x > w-550) {
            this.dir = false;
        } else if(this.x < -50) {
            this.dir = true;
        }
    };
    this.draw = function(v) {};
    this.display = function(v) {
        var w = images[this.img].width;
        image(images[this.img], -constrain(this.x, 0, w-600), 0);
        pushMatrix();
        translate(-constrain(this.x, 0, w-600), 0);
        this.draw(v);
        popMatrix();
    };
};
rooms["Squid Reef"] = new NormRoom("squidReef");
rooms["Squid Reef"].draw = function(v) {
    if(v <= 2) {
        image(images.squidReefDoor, 0, 0);
    }
    if(v === 1) {
        drawAnimatronicSquidical(283, 723, -100, 90, 0, 0, [60, -55], [88, -40], 10, -10, 0.85);
    }
    if(v === 2) {
        drawAnimatronicSquidical(300, 350, -50, -30, 141, 0, [-30, 0], [-30, 0], -14, 0, 0.75);
    }
    if(v === 3) {
        drawAnimatronicSquidical(515, 300, 0, 90, 141, 0, [50, 0], [-51, 0], -14, 0, 0.75);
        image(images.squidReefDoor2, 0, 0);
    }
    if(v === 4) {
        image(images.squidReefDoor3, 0, 0);
    }
};

rooms["East Hall 2"] = new NormRoom("eastHall2");
rooms["East Hall 2"].draw = function(v) {
    if(v.win.room === "East Hall 2") {
        fill(255);
        ellipse(300-10, 200, 3, 3);
        ellipse(300+10, 200, 3, 3);
    }
    var t = millis();
    var sp = map(v.squid, 100, 175, 0, 1);
    var sqs = map(sp, 0, 2, 200, -400);
    if(v.squid >= 100 && v.squid <= 175) {
    drawAnimatronicSquidical(300, map(pow(sp, 3), 0, 1, 175, 850)+sin(t*0.5)*sp*5, sqs, 0, 0, 0,
    [sin(t*0.75)*10, -cos(t*0.75)*10], [-sin(t*0.75)*10, cos(t*0.75)*10], t*0.4, 0, 1-sp*0.5);
    }
    else if(v.ohnoes.room === "East Hall 2" || v.hal.room === "East Hall 2") {
        if(v.hal.room === "East Hall 2" && floor(v.hal.mode) === 0) {
            drawHal(250, 180, 100, [-60, -10], [-60, -10], 0, 0, 5, 0.90);
        }
        if(v.ohnoes.room === "East Hall 2" && floor(v.ohnoes.mode) === 0) {
            drawAnimatronicOhNoes(217, 243, 200, 7, 18, 10, 0, -5, 0.80, 50);
        }
        if(v.hal.room === "East Hall 2" && floor(v.hal.mode) === 1) {
            drawHal(350, 240, 0, [-60, -10], [-60, -10], 0, 0, 0, 0.70);
        }
        if(v.ohnoes.room === "East Hall 2" && floor(v.ohnoes.mode) === 1) {
            drawAnimatronicOhNoes(330, 219, 600, 7, 18, 10, 75, -5, 0.95, 100);
        }
        if(v.ohnoes.room === "East Hall 2" && floor(v.ohnoes.mode) === 2) {
            drawAnimatronicOhNoes(430, 350, 0, 10, 80, 60, 50, -3, 0.60, 150);
        }
        if(v.hal.room === "East Hall 2" && floor(v.hal.mode) === 2) {
            drawHal(300, 700, -150, [-60, -10], [-60, -10], 0, 0, 15, 0.70);
        }
    }
};

rooms["Show Stage"] = new NormRoom("showStage");
rooms["Show Stage"].draw = function(v) {
    if(v.win.room === "Show Stage") {
        if(v.win.mode < 0.25) {
            drawAnimatronicWinston(650, 500, -75, 75, 5, 0, 0, 0, 0.80, 0);
        } else {
            drawAnimatronicWinston(650, 500, -75, 75, 50, 0, 15, 0, 0.80, 0);
        }
    }
    if(v.ohnoes.room === "Show Stage") {
        if(v.ohnoes.mode < 0.25) {
            drawAnimatronicOhNoes(300, 500, 0, 0, 10, 0, 0, 0, 0.80, 0);
        } else {
            drawAnimatronicOhNoes(300, 500, 0, 0, 140, 0, 0, 15, 0.80, 0);
        }
    }
    if(v.hopps.room === "Show Stage") {
        if(v.hopps.mode < 0.25) {
            drawAnimatronicHopper(100, 300, -50, 10, 2, 0, 0, [30, 0], [30, 0], [0, 0], [0, 0], 15, 0, 0.80, 0);
        } else {
            drawAnimatronicHopper(100, 300, -50, 5, 30, 0, 15, [30, 0], [30, 0], [0, 0], [0, 0], 15, 0, 0.80, 0);
        }
    }
};

rooms["Dining Area"] = new NormRoom("diningArea");
rooms["Dining Area"].draw = function(v) {
    var hop = false;
    var win = false;
    var oh = false;
    var hal = false;
    if(v.hopps.room === "Dining Area") {
        hop = true;
    }
    if(v.win.room === "Dining Area") {
        win = true;
    }
    if(v.ohnoes.room === "Dining Area") {
        oh = true;
    }
    if(v.hal.room === "Dining Area") {
        hal = true;
    }
    if(hal && floor(v.hal.mode) === 0) {
        drawHal(700, 200, 200, [-90, 0], [-90, 0], 0, 0, 5, 0.98);
    }
    if(win) {
        fill(255);
        ellipse(v.win.mode*200-10+100, 200, 3, 3);
        ellipse(v.win.mode*200+10+100, 200, 3, 3);
    }
    if(hop && floor(v.hopps.mode) === 0) {
        drawAnimatronicHopper(300, 200, 300, 0, 5, 10, 10, [20, 5], [20, 5], [0, 0], [0, 0], 0, -180, 0.90, 50);
    }
    if(oh && floor(v.ohnoes.mode) === 0) {
        drawAnimatronicOhNoes(500, 220, 800, 0, 80, 10, 10, 0, 0.90, 50);
    }
    image(images.diningArea4, 0, 0);
    if(hal && floor(v.hal.mode) === 1) {
        drawHal(500, 200, 50, [50, -30], [50, -30], 0, 0, 2, 0.85);
    }
    if(oh && floor(v.ohnoes.mode) === 1) {
        drawAnimatronicOhNoes(400, 280, 500, 180, 40, -20, 30, 0, 0.90, 75);
    }
    image(images.diningArea3, 0, 0);
    if(hal && floor(v.hal.mode) === 2) {
        pushMatrix();
        translate(300, 380);
        rotate(-86);
        drawHal(0, 0, 50, [-80, 0], [-120, 0], 0, -30, 0, 0.70);
        popMatrix();
    }
    if(hop && floor(v.hopps.mode) === 2) {
        drawAnimatronicHopper(500, 275, 50, 0, 10, -5, 0, [30, 5], [30, 5], [0, 0], [0, 0], 0, -180, 0.80, 75);
    }
    image(images.diningArea2, 0, 0);
    if(hop && floor(v.hopps.mode) === 1) {
        drawAnimatronicHopper(100, 300, -100, 0, 30, 0, 0, [30, 5], [30, 5], [0, 0], [0, 0], 0, -180, 0.98, 0);
    }
    if(oh && floor(v.ohnoes.mode) === 2) {
        drawAnimatronicOhNoes(600, 500, 0, 0, 40, -20, 90, 90, 0.98, 0);
    }
};

rooms["East Hall 3"] = new NormRoom("eastHall3");
rooms["East Hall 3"].draw = function(v) {
    // image(images.eastHall32, 0, 0);
    // image(images.eHImgs[constrain(frameCount%(images.eHImgs.length+100), 0, images.eHImgs.length-1)], 0, 0);
    var hop = false;
    var win = false;
    var oh = false;
    var hal = false;
    if(v.win.room === "East Hall 3") {
        win = true;
    }
    if(v.ohnoes.room === "East Hall 3") {
        oh = true;
    }
    if(v.hal.room === "East Hall 3") {
        hal = true;
    }
    if(hal && floor(v.hal.mode) === 0) {
        drawHal(400-(win ? 75 : 0), 200, 200, [-70, 0], [-70, 0], 0, 0, 10, 0.98);
    }
    if(win) {
        fill(255);
        ellipse(400+10, 200, 3, 3);
        ellipse(400-10, 200, 3, 3);
    }
    if(oh && floor(v.ohnoes.mode) === 0) {
        drawAnimatronicOhNoes(350, 210, 800, 40, 40, 10, 10, 0, 0.90, 170);
    }
    if(hal && floor(v.hal.mode) === 1) {
        drawHal(300, 200, 150, [-70, 0], [-70, 0], 0, 0, 5, 0.90);
    }
    if(hal && floor(v.hal.mode) === 2) {
        drawHal(450, 180, 125, [-60, 0], [-70, 110, 50], 0, 0, 0, 0.85);
    }
    if(oh && floor(v.ohnoes.mode) === 1) {
        drawAnimatronicOhNoes(400, 280, 250, -60, 10, -20, 0, 0, 0.80, 100);
    }
    if(oh && floor(v.ohnoes.mode) === 2) {
        drawAnimatronicOhNoes(200, 400, 100, 170, 84, 0, 80, 0, 0.60, 120);
    }
};

rooms["South Hall"] = new NormRoom("southHall");
rooms["South Hall"].draw = function(v) {
    var win = false;
    var oh = false;
    var hal = false;
    var fuz = false;
    if(v.win.room === "South Hall") {
        win = true;
    }
    if(v.ohnoes.room === "South Hall") {
        oh = true;
    }
    if(v.hal.room === "South Hall") {
        hal = true;
    }
    if(v.fuzz.room === "South Hall") {
        fuz = true;
    }
    if(oh) {
        if(hal){
            drawHal(650, 600, -150, [0, 0, 0], [0, 0, 0], 0, 0, 10, 0.90);
        }
        if(win) {
            drawAnimatronicWinston(700, 700, -130, 50, 50, 0, 0, 0, 0.90, 0);
        }
        if(fuz) {
            drawFuzzy(700, 700, -90, 0, 0, 0.90, 20, 0);
        }
        drawAnimatronicOhNoes(300, 400, -120, 0, 30, 0, 50, 0, 0.90, 100);
    }
    else if(win) {
        if(hal){
            drawHal(650, 600, -150, [0, 0, 0], [0, 0, 0], 0, 0, 10, 0.90);
        }
        if(fuz) {
            drawFuzzy(700, 700, -90, 0, 0, 0.90, 20, 0);
        }
        drawAnimatronicWinston(300, 300, -150, 50, 51, 0, 0, 0, 0.90, 240);
    } else if(hal) {
        if(fuz) {
            drawFuzzy(700, 700, -90, 0, 0, 0.90, 20, 0);
        }
        drawHal(300, 1300, -180, [0, 0, 0], [0, 0, 0], 0, 0, 12, 0.90);
    } else if(fuz) {
        drawFuzzy(300, 300, -140, 0, 0, 0.90, 240, 0);
    }
};

rooms["West Hall"] = new NormRoom("westHall");
rooms["West Hall"].draw = function(v) {
    var hop = false;
    var hal = false;
    var sam = false;
    if(v.hopps.room === "West Hall") {
        hop = true;
    }
    if(v.hal.room === "West Hall") {
        hal = true;
    }
    if(v.sam.room === "West Hall") {
        sam = true;
    }
    if(hop) {
        if(hal){
            drawHal(150, 600, -150, [0, 0, 0], [0, 0, 0], 0, 0, 10, 0.90);
        }
        drawAnimatronicHopper(500, 700, -150, 0, 10, 0, 0, [0, 0], [0, 0], [0, 0], [0, 0], 0, 0, 0.90, 100);
        if(sam) {
            animatronicSam(map(v.sam.westHallPos, 0, 1, 0, 800), 850, -150, 0, [0,0,0,0,0,0,0], 0.90);
        }
    }
    else if(hal) {
        if(sam){
            animatronicSam(map(v.sam.westHallPos, 0, 1, 0, 800), 550, -100, 0, [0,0,0,0,0,0,0], 0.90);
        }
        drawHal(500, 1300, -180, [0, 0, 0], [0, 0, 0], 0, 0, 12, 0.90);
    } else if(sam) {
        animatronicSam(map(v.sam.westHallPos, 0, 1, 0, 800), 400, -150, 0, [0,0,0,0,0,0,0], 0.90);
    }
};

rooms.Kitchen = new NormRoom("westHall");
rooms.Kitchen.draw = function(v) {
    background(0);
};

rooms["North Hall"] = new NormRoom("northHall");
rooms["North Hall"].draw = function(v) {
    var hop = false;
    var hal = false;
    var sam = false;
    if(v.hopps.room === "North Hall") {
        hop = true;
    }
    if(v.hal.room === "North Hall") {
        hal = true;
    }
    if(v.sam.room === "North Hall") {
        sam = true;
    }
    if(hal && floor(v.hal.mode) === 0) {
        drawHal(700, 300, 100, [-45, -85, 40], [-45, -85, 40], 0, 0, 5, 0.97);
    }
    if(hop && floor(v.hopps.mode) === 1) {
        drawAnimatronicHopper(900, 290, 100, 0, 0, 0, 0, [40, 0], [40, 0], [0, 0], [0, 0], 0, 0, 0.95, 200);
    }
    if(sam && v.sam.pos === 0) {
        animatronicSam(800, 350, 0, 0, samGlitch.glitch, 0.95);
    }
    if(hop && floor(v.hopps.mode) === 2) {
        drawAnimatronicHopper(750, 300, 0, 0, 10, 10, 5, [-10, -55], [10, 20], [0, 0], [0, 0], 0, 10, 0.80, 100);
    }
    if(hop && floor(v.hopps.mode) === 0) {
        drawAnimatronicHopper(300, 300, -25, 30, 5, -10, -5, [-10, 0], [10, 20], [0, 0], [0, 0], 0, -10, 0.80, 100);
    }
    if(sam && v.sam.pos === 1) {
        animatronicSam(400, 450, -50, 0, samGlitch.glitch, 0.80);
    }
    if(hal && floor(v.hal.mode) === 1) {
        pushMatrix();
        translate(200, -100);
        rotate(180);
        drawHal(0, 0, -100, [-90, 0, 0], [-90, 0, 0], 0, 0, 0, 0.50);
        popMatrix();
    }
    if(hal && floor(v.hal.mode) === 2) {
        pushMatrix();
        translate(1000, 500);
        rotate(-20);
        drawHal(0, 0, -100, [-45, -85, 40], [-45, -85, 40], 0, 0, 0, 0.50);
        popMatrix();
    }
};

rooms["Furnace Room"] = new NormRoom("furnaceRoom");
rooms["Furnace Room"].draw = function(v) {
    var hop = false;
    var hal = false;
    if(v.hopps.room === "Furnace Room") {
        hop = true;
    }
    if(v.hal.room === "Furnace Room") {
        hal = true;
    }
    if(hal && floor(v.hal.mode) === 1) {
        drawHal(400, 300, 10, [-45, -85, 40], [-45, -85, 40], 0, 0, 5, 0.95);
    }
    if(hal && floor(v.hal.mode) === 2) {
        drawHal(400, 300, -50, [-45, -85, 40], [-45, -85, 40], 0, 0, 5, 0.95);
    }
    if(hop && floor(v.hopps.mode) === 1) {
        drawAnimatronicHopper(600, 290, 0, 0, 15, 0, 0, [40, 0], [40, 0], [0, 0], [0, 0], 0, 0, 0.90, 200);
    }
    if(hop && floor(v.hopps.mode) === 2) {
        drawAnimatronicHopper(300, 290, 0, 0, 15, 0, 0, [40, 0], [40, 0], [0, 0], [0, 0], 0, 0, 0.90, 200);
    }
    if(hop && floor(v.hopps.mode) === 0) {
        drawAnimatronicHopper(100, 290, 0, 0, 15, 0, 0, [40, 0], [40, 0], [0, 0], [0, 0], 0, 0, 0.90, 200);
    }
    if(hal && floor(v.hal.mode) === 0) {
        drawHal(400, 600, -150, [-45, -85, 40], [-45, -85, 40], 0, 0, 5, 0.40);
    }
};

rooms["Supply Closet"] = new NormRoom("supplyCloset");
rooms["Supply Closet"].draw = function(v) {
    if(v.room === "Supply Closet" && v.mode > 0.5) {
        if(v.mode > 1.75) {
            pushMatrix();
            translate(172, -215);
            rotate(-190);
            drawAnimatronicHopper(0, 0, -150, 0, 10, 0, 0, [0, 0], [0, 0], [0, 0], [0, 0], 0, 0, 0.90, 100);
            popMatrix();
        }
        else if(v.mode > 0.5) {
            pushMatrix();
            translate(848, 462);
            rotate(-80);
            drawAnimatronicHopper(0, 0, -150, 0, 10, 0, 0, [0, 0], [0, 0], [0, 0], [0, 0], 0, 0, 0.90, 100);
            popMatrix();
        }
    }
    image(images.supplyClosetTop, 0, 0);
    if(v.room === "Supply Closet" && v.mode <= 0.5) {
        drawAnimatronicHopper(300, 1000, -170, 0, 40, 0, 0, [0, 0], [0, 0], [0, 0], [0, 0], 0, 0, 0.90, 240);
    }
};

rooms["Spare Room"] = new NormRoom("spareRoom");
rooms["Spare Room"].draw = function(v) {
    if(v.hopps.room === "Spare Room") {
        drawAnimatronicHopper(map(v.hopps.mode, 0, 3, 50, 800), 230, -50, 0, 10, 0, 0, [0, 0], [0, 0], [0, 0], [0, 0], 0, 0, map(v.hopps.mode, 0, 3, 0.6, 0.90), map(v.hopps.mode, 0, 3, 200, 50));
    }
    if(v.ohnoes.room === "Spare Room") {
        drawAnimatronicOhNoes(map(v.ohnoes.mode, 0, 3, 50, 800), 400, 0, 0, 25, 0, 0, 0, map(v.ohnoes.mode, 0, 3, 0.6, 0.90), map(v.ohnoes.mode, 0, 3, 200, 50));
    }
};

rooms.Backstage = new NormRoom("backstage");
rooms.Backstage.draw = function(v) {
    if(v.room === "Backstage") {
        if(floor(v.mode) === 0) {
            drawAnimatronicHopper(400, 226, -75, 0, 20, 0, 0, [25, 50], [25, 50], [0, 0], [0, 0], 0, 0, 0.90, 100);
        }
        else if(floor(v.mode) === 1) {
            pushMatrix();
            translate(-198, 462);
            rotate(48);
            drawAnimatronicHopper(0, 0, -150, 0, 10, 0, 0, [0, 0], [0, 0], [0, 0], [0, 0], 0, 0, 0.90, 100);
            popMatrix();
        }
        else if(floor(v.mode) === 2) {
            pushMatrix();
            translate(300, 499);
            rotate(-90);
            drawAnimatronicHopper(0, 0, -30, 0, 2, 0, 0, [45, 0], [45, 0], [0, 0], [0, 0], 0, 0, 0.90, 100);
            popMatrix();
        }
    }
};

rooms["East Hall 1"] = new NormRoom("eastHall1");
rooms["East Hall 1"].draw = function(v) {
    if(v.win.room === "East Hall 1") {
        drawAnimatronicWinston(213, 378, -50, 90, 50, 0, 15, 0, 0.96, 0);
    }
    if(v.ohnoes.room === "East Hall 1") {
        drawAnimatronicOhNoes(map(v.ohnoes.mode, 0, 3, 50, 550), 465, 0, 0, 15, map(v.ohnoes.mode, 0, 3, -20, 20), 0, map(v.ohnoes.mode, 0, 3, -10, 10), 0.85, 100);
    }
    if(v.hal.room === "East Hall 1") {
        pushMatrix();
        translate(map(v.hal.mode, 0, 3, 50, 550), -145);
        rotate(180);
        drawHal(0, 0, -120, [-90, 0, 0], [-90, 0, 0], 0, 0, 0, 0.80);
        popMatrix();
    }
};

rooms["Changing Rooms"] = new NormRoom("changingRooms");
rooms["Changing Rooms"].draw = function(v) {
    if(v.hal.room === "Changing Rooms") {
        pushMatrix();
        translate(map(v.hal.mode, 0, 3, 50, 550), 345);
        rotate(0);
        drawHal(0, 0, -50, [40, 0, 0], [40, 0, 0], 0, 0, 0, map(v.hal.mode, 0, 3, 0.75, 0.99));
        popMatrix();
    }
    if(v.ohnoes.room === "Changing Rooms") {
        drawAnimatronicOhNoes(map(v.ohnoes.mode, 0, 3, 50, 550), 465, 0, 0, 15, 0, 0, 0, map(v.ohnoes.mode, 0, 3, 0.75, 0.99), 100);
    }
};

rooms["Laser Tag Preparatory"] = new NormRoom("laserTagPP");
rooms["Laser Tag Preparatory"].draw = function(v) {
    if(v.hal.room === "Laser Tag Preparatory") {
        drawHal(map(v.hal.mode, 0, 3, 50, 550), 275, -125, [-40, -40, -40], [-40, -40, -40], 0, 0, 0, 0.85);
    }
    if(v.ohnoes.room === "Laser Tag Preparatory") {
        drawAnimatronicOhNoes(map(v.ohnoes.mode, 0, 3, 50, 550), 465, -75, 139, 52, 64, 77, 0, 0.85, 100);
    }
};

rooms.Bathrooms = new NormRoom("bathrooms");
rooms.Bathrooms.draw = function(v) {
    var hal = false;
    var oh = false;
    if(v.hal.room === "Bathrooms") {
        hal = true;
    }
    if(v.ohnoes.room === "Bathrooms") {
        oh = true;
    }
    if(hal && floor(v.hal.mode) === 0) {
        drawHal(300, 313, 125, [-40, -40, -40], [-40, -40, -40], 0, 0, 10, 0.99);
    }
    if(oh && floor(v.ohnoes.mode) === 2) {
        drawAnimatronicOhNoes(900, 401, 250, 0, 80, 40, 5, 0, 0.97, 57);
    }
    if(hal && floor(v.hal.mode) === 1) {
        drawHal(710, 350, 50, [-40, -40, 40], [-40, -40, 40], 0, 0, 5, 0.95);
    }
    if(oh && floor(v.ohnoes.mode) === 1) {
        drawAnimatronicOhNoes(300, 424, 100, -10, 50, 20, -15, 0, 0.90, 100);
    }
    if(hal && floor(v.hal.mode) === 2) {
        drawHal(550, 350, -50, [40, -40, -40], [40, -40, -40], 0, 0, 0, 0.75);
    }
    if(oh && floor(v.ohnoes.mode) === 0) {
        drawAnimatronicOhNoes(600, 465, 0, 10, 50, -20, 15, 0, 0.85, 100);
    }
};

rooms["Kitchen Tools"] = new NormRoom("kitchenTools");
rooms["Kitchen Tools"].draw = function(v) {
    var x = 150;
    var y = 0;
    if(v.room === "Lab") {
        image(images.door2, x, y, 300, 600);
        (fill)(0, 240);
        rect(0, 0, 600, 600);
        strokeWeight(0.75);
        stroke(200);
        noFill();
        rect(x-5-1, y-5-1, 300+10+2, 600+10+2);
        noStroke();
    } else {
        (fill)(0, 200);
        rect(0, 0, 600, 600);
        if(v.room === "Kitchen Tools") {
            drawFuzzy(200, 500, -100, 6, 0, 1.00, 0, 5);
        }
        image(images.door2, x+50, y, 300-50, 600);
    }
};

rooms.Arcade = new NormRoom("arcade");
rooms.Arcade.draw = function(v) {
    if(v.ohnoes.room === "East Hall 3" && v.ohnoes.mode === 2) {
        drawAnimatronicOhNoes(660, 400, 500, 170, 84, 0, 80, 0, 0.98, 20);
    }
    if(v.hal.room === "Arcade") {
        if(v.hal.activated) {
            drawHal(map(v.hal.mode, 0, 3, 50, 900), 400, -75, [-40, -20, -10], [-40, -20, -10], 0, 0, 5, 0.70);
        } else {
            drawHal(map(v.hal.mode, 0, 3, 100, 400), 540, -75, [-90, 90, 0], [-90, 90, 0], 90, 90, 0, 0.70);
            
        }
    }
};
// }
var winMusic = {
    sounds: [],
    volume: 1,
    addSound: function(sound, s) {
        sounds[sound].ended = false;
        var time = s.time+millis() || millis();
        var vol = s.volume || normVol(1);
        var start = s.start || 0;
        var stop = s.stop || 1;
        var PBR = s.PBR || 1;
        this.sounds.push([time, sound, start, stop, vol, PBR]);
        this.sounds.sort(function(a, b) {return a[0]-b[0];});
    },
    audio: function(speed, volume) {
        var one  = function(t) {
            t *= speed;
            winMusic.addSound("retro/laser2", {time: t, volume: normVol(0.5*volume)});
            winMusic.addSound("retro/laser1", {time: 1000*speed+t, volume: normVol(0.5*volume)});
            winMusic.addSound("retro/laser2", {time: 2000*speed+t, volume: normVol(0.5*volume)});
            winMusic.addSound("retro/laser1", {time: 2750*speed+t, volume: normVol(0.5*volume)});
            winMusic.addSound("retro/laser1", {time: 3000*speed+t, volume: normVol(0.5*volume)});
        };
        var two  = function(t) {
            t *= speed;
            winMusic.addSound("retro/hit1", {time: t, volume: normVol(1*volume)});
            winMusic.addSound("retro/hit2", {time: 250*speed+t, volume: normVol(1*volume)});
            winMusic.addSound("retro/hit1", {time: 500*speed+t, volume: normVol(1*volume)});
        };
        var three  = function(t) {
            t *= speed;
            winMusic.addSound("retro/hit1", {time: t, volume: normVol(1*volume)});
            winMusic.addSound("retro/hit1", {time: 750*speed+t, volume: normVol(1*volume)});
            winMusic.addSound("retro/hit2", {time: 1000*speed+t, volume: normVol(1*volume)});
            winMusic.addSound("retro/hit1", {time: 2250*speed+t, volume: normVol(1*volume)});
            winMusic.addSound("retro/hit1", {time: 2750*speed+t, volume: normVol(1*volume)});
            winMusic.addSound("retro/hit2", {time: 3000*speed+t, volume: normVol(1*volume)});
        };
        var four  = function(t) {
            t *= speed;
            winMusic.addSound("retro/rumble", {time: t, volume: normVol(0.25*volume)});
            winMusic.addSound("retro/whistle1", {time: 500*speed+t, volume: normVol(0.5*volume), PBR: 0.5});
        };
        var five  = function(t) {
            t *= speed;
            winMusic.addSound("rpg/hit-thud", {time: t, volume: normVol(0.25*volume)});
            winMusic.addSound("rpg/hit-thud", {time: 250*speed+t, volume: normVol(0.25*volume)});
            winMusic.addSound("rpg/hit-thud", {time: 500*speed+t, volume: normVol(0.25*volume)});
            winMusic.addSound("rpg/hit-thud", {time: 750*speed+t, volume: normVol(0.25*volume)});
            winMusic.addSound("rpg/hit-thud", {time: 1000*speed+t, volume: normVol(0.25*volume)});
            winMusic.addSound("rpg/hit-thud", {time: 1250*speed+t, volume: normVol(0.25*volume)});
            winMusic.addSound("rpg/hit-thud", {time: 1500*speed+t, volume: normVol(0.25*volume)});
            winMusic.addSound("rpg/hit-thud", {time: 1750*speed+t, volume: normVol(0.25*volume)});
            winMusic.addSound("rpg/hit-thud", {time: 2000*speed+t, volume: normVol(0.25*volume)});
            winMusic.addSound("rpg/hit-thud", {time: 2250*speed+t, volume: normVol(0.25*volume)});
            winMusic.addSound("rpg/hit-thud", {time: 2500*speed+t, volume: normVol(0.25*volume)});
            winMusic.addSound("rpg/hit-thud", {time: 2750*speed+t, volume: normVol(0.25*volume)});
            winMusic.addSound("rpg/hit-thud", {time: 3000*speed+t, volume: normVol(0.25*volume)});
            winMusic.addSound("rpg/hit-thud", {time: 3250*speed+t, volume: normVol(0.25*volume)});
            winMusic.addSound("rpg/hit-thud", {time: 3500*speed+t, volume: normVol(0.25*volume)});
            winMusic.addSound("rpg/hit-thud", {time: 3750*speed+t, volume: normVol(0.25*volume)});
        };
        var six  = function(t) {
            t *= speed;
            winMusic.addSound("rpg/hit-clop", {time: t, volume: normVol(0.25*volume)});
            winMusic.addSound("rpg/battle-swing", {time: 500*speed+t, volume: normVol(1*volume)});
            winMusic.addSound("rpg/hit-whack", {time: 750*speed+t, volume: normVol(0.25*volume)});
            winMusic.addSound("rpg/step-heavy", {time: 1250*speed+t, volume: normVol(1*volume), stop: 0.2});
        };
        var seven = function(t) {
            t*=speed;
            winMusic.addSound("retro/boom1", {time: t, volume: normVol(0.5*volume), PBR: 0.5});
            winMusic.addSound("retro/laser3", {time: 7250*speed+t, volume: normVol(0.25*volume), stop: 0.2});
            winMusic.addSound("retro/laser3", {time: 7500*speed+t, volume: normVol(0.25*volume), stop: 0.2});
            winMusic.addSound("retro/laser3", {time: 7750*speed+t, volume: normVol(0.25*volume), stop: 0.2});
        };
        
        one(0);
        
        one(4000);
        two(7250);
        
        one(8000);
        three(8000);
        five(8000);
        
        one(12000);
        two(15250);
        three(12000);
        four(12000);
        five(12000);
        
        one(16000);
        three(16000);
        five(16000);
        six(16000);
        seven(16000);
        
        one(20000);
        two(23250);
        three(20000);
        five(20000);
        
        one(24000);
        three(24000);
        five(24000);
        six(24000);
        seven(24000);
        
        one(28000);
        two(31250);
        three(28000);
        five(28000);
        
        one(32000);
        three(32000);
        five(32000);
        six(32000);
        seven(32000);
        
        one(36000);
        two(39250);
        three(36000);
        five(36000);
        
        one(40000);
        three(40000);
        five(40000);
        six(40000);
        seven(40000);
        
        one(44000);
        two(47250);
        three(44000);
        five(44000);
        winMusic.addSound("retro/hit1", {time: 48000*speed, volume: normVol(1*volume)});
        winMusic.addSound("retro/boom2", {time: 48000*speed, volume: normVol(0.5*volume)});
},
    timer: new Timer(),
    stop: function() {
        this.timer.stop();
        this.sounds = [];
    },
    run: function() {
        if(this.timer.paused) {
            this.timer.start();
            this.audio(0.7, 1);
        }
        if(this.timer.getTime() > 36) {
            this.timer.reset();
            this.audio(0.7, 1);
        }
        for(var i=0; i<this.sounds.length; i++) {
            if(millis() > this.sounds[i][0]) {
                var s = this.sounds[i];
                for(var j=0; j<s[4].length; j++) {
                    s[4][j] *= this.volume;
                }
                soundTPList.push(s);
                this.sounds.splice(i, 1);
            } else {
                break;
            }
        }
        soundTPList.sort(function(a, b) {return a[0]-b[0];});
    },
};
var halMusic = {
    sounds: [],
    volume: 1,
    addSound: function(sound, s) {
        sounds[sound].ended = false;
        var time = s.time+millis() || millis();
        var vol = s.volume || normVol(1);
        var start = s.start || 0;
        var stop = s.stop || 1;
        var PBR = s.PBR || 1;
        this.sounds.push([time, sound, start, stop, vol, PBR]);
        this.sounds.sort(function(a, b) {return a[0]-b[0];});
    },
    audio: function(speed, vol) {
        halMusic.addSound("retro/jump1", {time: 0*speed, volume: normVol(vol)});
        halMusic.addSound("retro/jump2", {time: 400*speed, volume: normVol(vol)});
        halMusic.addSound("retro/jump1", {time: 800*speed, volume: normVol(vol)});
        halMusic.addSound("retro/jump2", {time: 1200*speed, volume: normVol(vol)});
        halMusic.addSound("retro/jump1", {time: 1600*speed, volume: normVol(vol)});
        halMusic.addSound("retro/jump2", {time: 1800*speed, volume: normVol(vol)});
        halMusic.addSound("retro/jump1", {time: 2000*speed, volume: normVol(vol)});
        halMusic.addSound("retro/jump2", {time: 2200*speed, volume: normVol(vol)});
        halMusic.addSound("retro/jump1", {time: 2400*speed, volume: normVol(vol)});
        halMusic.addSound("retro/jump2", {time: 2800*speed, volume: normVol(vol)});
},
    timer: new Timer(),
    stop: function() {
        this.timer.stop();
        this.sounds = [];
    },
    run: function() {
        if(this.timer.paused) {
            this.timer.start();
            this.audio(1, 1);
        }
        if(this.timer.getTime() > 3.2*2) {
            this.timer.reset();
            this.audio(1, 1);
        }
        for(var i=0; i<this.sounds.length; i++) {
            if(millis() > this.sounds[i][0]) {
                var s = this.sounds[i];
                for(var j=0; j<s[4].length; j++) {
                    s[4][j] *= this.volume;
                }
                soundTPList.push(s);
                this.sounds.splice(i, 1);
            } else {
                break;
            }
        }
        soundTPList.sort(function(a, b) {return a[0]-b[0];});
    },
};
var Animatronic = function(room) {
    this.level = 0;
    this.roomStart = room;
    this.room = this.roomStart;
    this.moveTimer = new Timer();
    this.modeTimer = new Timer();
    this.leaveTimer = new Timer();
    this.move = function() {};
    this.update = function() {};
    this.reset = function() {};
};
var ani = {};
// Hopper {
ani.hopps = new Animatronic("Show Stage"); 
ani.hopps.reset = function() {
    this.level = nights[Cnight-1].hopps;
    this.room = this.roomStart;
    this.wait = map(pow(this.level/20, 0.25)*20, 0, 20, random(90, 160), 1) + random(-(20-this.level)+5, (10/((this.level+1)/5)));
    this.moveTimer.start();
    this.modeTimer.start();
    this.modeLimit = random(20, 35);
    this.mode = random(3);
    this.leaveTimer.stop();
};
ani.hopps.move = function() {
    this.moveTimer.reset();
    this.wait = map(this.level, 0, 20, 30, 5) +
    random(10/(this.level+1));
    if(scenes.game.camOn === this.room && scenes.game.camRot === 0 && !scenes.game.camDisabled) {
        scenes.game.disableCams();
    }
    if(this.room === "Show Stage") {
        this.room = chance(
            [100-this.level*4, "Dining Area"],
            [50-this.level*2, "Backstage"],
            [this.level*2, "North Hall"]
        );
    } else if(this.room === "Dining Area") {
        this.room = chance(
            [25-this.level, "Backstage"],
            [12.5-this.level/2, "Spare Room"],
            [25+this.level/2, "North Hall"],
            [25-this.level/4, "Supply Closet"],
            [12.5+this.level, "West Hall"],
            [this.level*2, "Left Door"]
        );
    } else if(this.room === "North Hall") {
        this.room = chance(
            [25-this.level, "Supply Closet"],
            [25-this.level, "Furnace Room"],
            [25+this.level, "West Hall"],
            [25-this.level, "Dining Area"],
            [this.level*2, "Left Door"]
        );
    } else if(this.room === "Supply Closet") {
        this.room = chance(
            [25-this.level, "Furnace Room"],
            [25, "North Hall"], 
            [25+this.level, "West Hall"],
            [12.5-this.level/2, "Dining Area"],
            [12.5+this.level*2, "Left Door"]
        );
    } else if(this.room === "Furnace Room") {
        this.room = chance(
            [25-this.level, "Supply Closet"],
            [25, "North Hall"], 
            [25+this.level, "West Hall"],
            [12.5-this.level/2, "Dining Area"],
            [12.5+this.level*2, "Left Door"]
        );
    } else if(this.room === "West Hall") {
        this.room = chance(
            [120+this.level*2, "Left Door"],
            [50-this.level*2, "North Hall"]
        );
    } else if(this.room === "Spare Room") {
        this.room = chance(
            [50-this.level, "Dining Area"],
            [25+this.level*2, "North Hall"],
            [25-this.level, "Backstage"]
        );
    } else if(this.room === "Backstage") {
        this.room = chance(
            [50-this.level, "Dining Area"],
            [25+this.level*2, "North Hall"],
            [25-this.level, "Spare Room"]
        );
    } else if(this.room === "Left Door") {
        this.room = chance(
            [25, "West Hall"],
            [25, "North Hall"],
            [25, "Supply Closet"],
            [25, "Furnace Room"]
        );
    }
    
    if(this.room === "Left Door") {
        if(scenes.game.leftWall.light) {
            this.move();
            return;
        }
        // this.enterTime = map(this.level, 0, 20, 10, 5) + random(20-this.level/5);
        this.enterTime = (this.wait*1.5 + random(20-this.level/5)) / (2.5-this.level/50);
        // this.leaveTime = map(this.level, 0, 20, 0, 5) + random(20-this.level/5);
        this.leaveTime = (this.wait*2 + random(20-this.level/5)) / (2.5-this.level/50);
        scenes.game.leftWall.light = false;
    }
    if(scenes.game.camOn === this.room && scenes.game.camRot === 0 && !scenes.game.camDisabled) {
        scenes.game.disableCams();
    }
};
ani.hopps.update = function() {
    if(this.room === "office") {
        return;
    }
    if(this.modeTimer.getTime() > 25 && (scenes.game.camOn !== this.room || scenes.game.camDisabled)) {
        this.mode = random(3);
        this.modeTimer.reset();
        this.modeLimit = random(20, 35);
    }
    if(this.room !== "Left Door") {
        this.leaveTimer.stop();
        if(this.moveTimer.getTime() > this.wait) {
            this.move();
        }
    } else {
        if(this.leaveTimer.paused) {
            this.leaveTimer.start();
        }
        if(this.moveTimer.getTime() > this.enterTime && !scenes.game.leftWall.door) {
            if(!scenes.game.leftWall.broken) {
                this.moveTimer.reset();
                scenes.game.leftWall.break();
            } else {
                this.move();
            }
            this.leaveTimer.stop();
            this.leaveTimer.start();
        }
        if(this.leaveTimer.getTime() > this.leaveTime && (scenes.game.leftWall.door || scenes.game.leftWall.broken)) {
            if(!scenes.game.leftWall.light) {
                this.move();
            }
        }
    }
};
// }
// Oh Noes {
ani.ohnoes = new Animatronic("Show Stage"); 
ani.ohnoes.soundTimer = new Timer();
ani.ohnoes.STL = random(1, 5); // SoundTimerLimit
ani.ohnoes.reset = function() {
    this.level = nights[Cnight-1].ohnoes;
    this.room = this.roomStart;
    this.wait = map(pow(this.level/20, 0.25)*20, 0, 20, random(90, 160), 1) + random(-(20-this.level)+5, (10/((this.level+1)/5)));
    this.moveTimer.start();
    this.modeTimer.start();
    this.modeLimit = random(20, 35);
    this.mode = random(3);
    this.leaveTimer.stop();
    this.soundTimer.stop();
    this.soundTimer.start();
};
ani.ohnoes.move = function() {
    this.moveTimer.reset();
    this.wait = map(this.level, 0, 20, 30, 7) +
    random(-5, 10/(this.level+1));
    if(scenes.game.camOn === this.room && scenes.game.camRot === 0 && !scenes.game.camDisabled && scenes.game.camOn !== "Kitchen") {
        scenes.game.disableCams();
    }
    if(scenes.game.camOn === "Arcade" && scenes.game.camRot === 0 && !scenes.game.camDisabled && floor(this.mode) === 2 && this.room === "East Hall 3") {
        scenes.game.disableCams();
    }
    if(this.room === "Show Stage") {
        this.room = "Dining Area";
    } else if(this.room === "Dining Area") {
        this.room = chance(
            [30+this.level/4, "East Hall 1"],
            [50+this.level*3, "Kitchen"],
            [21-this.level, "Spare Room"]
        );
    } else if(this.room === "Spare Room") {
        this.room = "Dining Area";
    } else if(this.room === "East Hall 1") {
        this.room = chance(
            [30-this.level, "Dining Area"],
            [35-this.level, "Changing Rooms"],
            [35+this.level*2, "East Hall 2"]
        );
    } else if(this.room === "East Hall 2") {
        this.room = chance(
            [50-this.level*2, "East Hall 1"],
            [50+this.level*2, "East Hall 3"]
        );
    } else if(this.room === "Changing Rooms") {
        this.room = "East Hall 2";
    } else if(this.room === "East Hall 3") {
        this.room = chance(
            [25-this.level*2, "East Hall 2"],
            [25+this.level*2, "South Hall"],
            [25-this.level*2, "Laser Tag Preparatory"],
            [25-this.level*2, "Bathrooms"]
        );
    } else if(this.room === "Bathrooms") {
        this.room = "East Hall 3";
    } else if(this.room === "Laser Tag Preparatory") {
        this.room = "East Hall 3";
    } else if(this.room === "South Hall") {
        this.room = chance(
            [75+this.level, "Right Door"],
            [25-this.level/2, "Kitchen"],
            [25-this.level/2, "East Hall 3"]
        );
    } else if(this.room === "Kitchen") {
        this.room = chance(
            [50+this.level*2, "South Hall"],
            [50-this.level*2, "Dining Area"]
        );
    } else if(this.room === "Right Door") {
        this.room = "South Hall";
    }
    if(this.room === "East Hall 2" && ani.squid.run) {
        this.move();
    }
    if(this.room === "Right Door") {
        if(scenes.game.rightWall.light) {
            this.move();
            return;
        }
        // this.enterTime = map(this.level, 0, 20, 10, 5) + random(20-this.level/5);
        this.enterTime = (this.wait*1.5 + random(20-this.level/5)) / (2.5-this.level/50);
        // this.leaveTime = map(this.level, 0, 20, 5, 20) + random(20-this.level/2.5);
        this.leaveTime = (this.wait*2.5 + random(20-this.level/2.5)) / (2.5-this.level/50);
        scenes.game.rightWall.light = false;
    }
    if(scenes.game.camOn === this.room && scenes.game.camRot === 0 && !scenes.game.camDisabled && scenes.game.camOn !== "Kitchen") {
        scenes.game.disableCams();
    }
    if(scenes.game.camOn === "Arcade" && scenes.game.camRot === 0 && !scenes.game.camDisabled && floor(this.mode) === 2 && this.room === "East Hall 3") {
        scenes.game.disableCams();
    }
};
ani.ohnoes.update = function() {
    if(this.soundTimer.getTime() > this.STL && this.room === "Kitchen") {
        var vol;
        if(scenes.game.camOn === "Kitchen" && scenes.game.camRot === 0) {
            vol = 0.125;
        } else {
            vol = 0.03125;
        }
        var num = floor(random(4));
        switch(num) {
            case 0: addSound("rpg/metal-clink", {time: 0, volume: normVol(vol)}); break;
            case 1: addSound("rpg/metal-chime", {time: 0, volume: normVol(vol), PBR: 0.75}); break;
            case 2: addSound("rpg/hit-whack", {time: 0, volume: normVol(vol*0.25)}); break;
            case 3: addSound("rpg/hit-clop", {time: 0, volume: normVol(vol*0.5)}); break;
        }
        this.soundTimer.reset();
        this.STL = random(1, 5);
    }
    if(this.room === "office") {
        return;
    }
    if(this.modeTimer.getTime() > 25 && (scenes.game.camOn !== this.room || scenes.game.camDisabled)) {
        this.mode = random(3);
        this.modeTimer.reset();
        this.modeLimit = random(20, 35);
    }
    if(this.room !== "Right Door") {
        this.leaveTimer.stop();
        if(this.moveTimer.getTime() > this.wait) {
            this.move();
        }
    } else {
        if(this.leaveTimer.paused) {
            this.leaveTimer.start();
        }
        if(this.moveTimer.getTime() > this.enterTime && !scenes.game.rightWall.door) {
            if(!scenes.game.rightWall.broken) {
                this.moveTimer.reset();
                scenes.game.rightWall.break();
            } else {
                this.move();
            }
            this.leaveTimer.stop();
            this.leaveTimer.start();
        }
        if(this.leaveTimer.getTime() > this.leaveTime && (scenes.game.rightWall.door || scenes.game.rightWall.broken)) {
            if(!scenes.game.rightWall.light) {
                this.move();
            }
        }
    }
    if(ani.squid.runPos >= 100 && ani.squid.runPos <= 175 && scenes.game.camOn === "East Hall 2" && this.room === "East Hall 2") {
        this.move();
    }
};
// }
// Winston {
ani.win = new Animatronic("Show Stage");
ani.win.enterTimer = new Timer();
ani.win.reset = function() {
    this.level = nights[Cnight-1].win;
    this.room = this.roomStart;
    this.wait = map(pow(this.level/20, 0.25)*20, 0, 20, random(90, 160), 1) + random(-(20-this.level)+5, (10/((this.level+1)/5))) + pow(1-this.level/20, 10)*500;
    this.moveTimer.start();
    this.modeTimer.start();
    this.modeLimit = random(20, 35);
    this.mode = random(3);
    this.enterTimer.stop();
    this.enterTimer.start();
};
ani.win.move = function() {
    this.wait = map(20-pow(1-this.level/20, 3)*20, 0, 20, 100, 5) +
    random(10/(this.level+1));
    var move = true;
    var r = this.room;
    if(this.room === "Show Stage") {
        this.room = "Dining Area";
    } else if(this.room === "Dining Area") {
        this.room = chance(
            [50-this.level*2, "East Hall 1"],
            [50+this.level*2, "Kitchen"]
        );
    } else if(this.room === "East Hall 1") {
        this.room = chance(
            [25-this.level, "Dining Area"],
            [75+this.level*3, "East Hall 2"]
        );
    } else if(this.room === "East Hall 2") {
        this.room = chance(
            [25-this.level, "East Hall 1"],
            [75+this.level*3, "East Hall 3"]
        );
    } else if(this.room === "East Hall 3") {
        this.room = chance(
            [75+this.level*3, "South Hall"],
            [25-this.level, "East Hall 2"]
        );
    } else if(this.room === "South Hall") {
        this.room = chance(
            [50, "Kitchen"],
            [50, "East Hall 3"]
        );
    } else if(this.room === "Kitchen") {
        this.room = chance(
            [75+this.level*3, "South Hall"],
            [25-this.level, "Dining Area"]
        );
    }
    if(this.room === scenes.game.camOn && scenes.game.camRot === 0) {
        this.room = r;
        move = false;
    } else {
        this.moveTimer.reset();
    }
    if(this.room === "South Hall") {
        this.enterTime = this.wait*(1-(this.level-5)/15);
    }
    if(move) {
        addSound("rpg/giant-yah", {time: 0, start: 0, stop: 0.2, volume: normVol(0.125)});
        addSound("rpg/giant-yah", {time: 500, start: 0, stop: 0.4, volume: normVol(0.125)});
        addSound("rpg/giant-hyah", {time: 0, start: 0, stop: 0.2, volume: normVol(0.125)});
        addSound("rpg/giant-hyah", {time: 500, start: 0, stop: 0.4, volume: normVol(0.125)});
    }
};
ani.win.update = function() {
    if(this.room === "office") {
        return;
    }
    if(this.modeTimer.getTime() > 25 && (scenes.game.camOn !== this.room || scenes.game.camDisabled || scenes.game.camRot !== 0)) {
        this.mode = random(3);
        this.modeTimer.reset();
        this.modeLimit = random(20, 35);
    }
    if(this.moveTimer.getTime() > this.wait && (scenes.game.camOn !== this.room || scenes.game.camRot !== 0)) {
        if(this.room !== "Show Stage" || (ani.hopps.room !== "Show Stage" && ani.ohnoes.room !== "Show Stage")) {
            this.move();
        }
    }
    if(this.room === "South Hall" && scenes.game.camRot === 0 && !scenes.game.rightWall.door) {
        if(this.enterTimer.getTime() > this.enterTime && scenes.game.aniIn === "") {
            this.room = "office";
            addSound("rpg/giant-yah", {time: 0, start: 0, stop: 0.2, volume: normVol(0.5)});
            addSound("rpg/giant-yah", {time: 500, start: 0, stop: 0.4, volume: normVol(0.5)});
            addSound("rpg/giant-hyah", {time: 0, start: 0, stop: 0.2, volume: normVol(0.5)});
            addSound("rpg/giant-hyah", {time: 500, start: 0, stop: 0.4, volume: normVol(0.5)});
        }
    } else {
        this.enterTimer.reset();
    }
};
// }
// Squidical Old{
ani.squid = {
    anger: 0,
    level: 0,
    danger: 0,
    powerDrain: 0,
    run: false,
    runPos: 0,
    nReset: function() { // Normal Reset
        this.run = false;
        this.runPos = 0;
        this.anger = 0;
        if(this.powerDrain === 0) {
            this.powerDrain++;
        } else if(this.powerDrain>=1) {
            this.powerDrain+=6;
        }
    },
    reset: function() {
        this.nReset();
        this.powerDrain = 0;
        this.level = nights[Cnight-1].squid;
    },
    update: function() {
        if(!this.run) {
            this.anger -= spf;
            this.limit = map(1-pow(1-this.level/20, 1.5), 0, 1, 400, 10);
            if(scenes.game.camOn === "Squid Reef" && scenes.game.camRot === 0) {
                this.anger += spf*5;
            } else {
                if(this.anger > 0) {
                    this.anger = -this.anger;
                }
            }
            this.danger = floor(map(abs(this.anger), 0, this.limit, 0, 4));
            if(this.danger >= 4) {
                this.run = true;
            }
        } else {
            this.runPos += spf*30;
            this.runPos = min(this.runPos, 200);
            if(this.runPos >= 200) {
                if(scenes.game.rightWall.door === false || scenes.game.rightWall.doorY < 300 && !powerOut) {
                    if(scenes.game.aniIn === "" || scenes.game.aniIn === "squid") {
                        scenes.game.squidJumpscare = true;
                    }
                } else {
                    addSound("retro/hit2", {time: 100, start: 0.05});
                    addSound("retro/hit2", {time: 600, start: 0.05});
                    addSound("retro/hit2", {time: 1100, start: 0.05});
                    scenes.game.power -= this.powerDrain;
                    this.nReset();
                }
            }
        }
    }
};
// }
// Squidical{
ani.squid = {
    anger: 0,
    level: 6,
    danger: 0,
    powerDrain: 0,
    run: false,
    runPos: 0,
    c: 0, // Carefullness
    nReset: function() { // Normal Reset
        this.run = false;
        this.runPos = 0;
        this.anger = 0;
        this.c = 0;
        if(this.powerDrain === 0) {
            this.powerDrain++;
        } else if(this.powerDrain>=1) {
            this.powerDrain+=5;
        }
    },
    reset: function() {
        this.nReset();
        this.powerDrain = 0;
        this.level = nights[Cnight-1].squid;
    },
    update: function() {
        if(!this.run) {
            /*
            this.c -= spf*map(this.level, 0, 20, 0.025, 0.5);
            if(scenes.game.camOn === "Squid Reef" && scenes.game.camRot === 0) {
                this.c +=spf*map(this.level, 0, 20, 0.05, 0.5)*4;
            }
            if(abs(this.c) > 4) {
                this.anger += spf*map(this.level, 0, 20, 0.05, 0.2);
            }
            */
            this.c -= spf*map(this.level, 0, 20, 0.07, 0.5);
            if(scenes.game.camOn === "Squid Reef" && scenes.game.camRot === 0) {
                this.c +=spf*map(this.level, 0, 20, 0.07, 0.5)*5;
            }
            if(abs(this.c) > 4) {
                this.anger += spf*map(this.level, 0, 20, 0.017, 0.1);
            }
            this.c = constrain(this.c, -4, 4);
            this.danger = floor(this.anger);
            if(this.danger >= 4) {
                this.run = true;
            }
        } else {
            this.runPos += spf*15;
            this.runPos = min(this.runPos, 200);
            if(this.runPos >= 200 && !scenes.game.GW) {
                if(scenes.game.rightWall.door === false || scenes.game.rightWall.doorY < 300 && !powerOut) {
                    if(scenes.game.aniIn === "" || scenes.game.aniIn === "squid") {
                        scenes.game.squidJumpscare = true;
                    }
                } else {
                    addSound("retro/hit2", {time: 100, start: 0.05});
                    addSound("retro/hit2", {time: 600, start: 0.05});
                    addSound("retro/hit2", {time: 1100, start: 0.05});
                    scenes.game.power -= this.powerDrain;
                    this.nReset();
                }
            }
        }
    }
};
// }
// Mr. Panteater {
ani.pant = {
    timer: new Timer(),
    runPos: -400,
    run: false,
    level: 0,
    setLimit: function() {
        var l = map(pow(1-this.level/20, 3), 1, 0, 200, 15) + pow(1-this.level/20, 10)*350;
        return l+random(200/this.level);
    },
    reset: function() {
        this.level = nights[Cnight-1].pant;
        this.runPos = -400;
        this.run = false;
        this.timer.stop();
        this.timer.start();
        this.limit = this.setLimit();
    },
    update: function() {
        if(!this.run) {
            if(this.timer.getTime() > this.limit) {
                this.limit = this.setLimit();
                this.run = true;
            }
        } else {
            this.runPos += spf*100;
            if(this.runPos >= 50) {
                if(rooms.office.doorRot !== 0) {
                    rooms.office.doorRot += 0.6;
                    rooms.office.doorRot = constrain(rooms.office.doorRot, 0, 1.5);
                } else {
                    addSound("retro/hit2", {time: 0, start: 0.05, PBR: 0.5});
                    addSound("retro/hit1", {time: 200, start: 0.05});
                    this.reset();
                }
            }
            if(this.runPos >= 100 && scenes.game.aniIn === "" && !scenes.game.GW) {
                scenes.game.aniIn = "pant";
            } else {
                if(this.timer.getTime() > 0.1) {
                    this.timer.reset();
                    addSound("rpg/step-heavy", {time: 0, start: 0.35, stop: 0.45, volume: normVol(0.5)});
                }
            }
        }
    },
};
// }
// Hal {
ani.hal = new Animatronic("Arcade");
ani.hal.changeTo = new Timer();
ani.hal.MWPT = new Timer(); // Meddle With Power Timer
ani.hal.MRT = new Timer(); // Meddled Room Timer
ani.hal.songTimer = new Timer();
ani.hal.reset = function() {
    this.level = nights[Cnight-1].hal;
    this.room = this.roomStart;
    this.wait = (map(pow(this.level/20, 0.25)*20, 0, 20, random(90, 160), 1) + random(-(20-this.level)+5, (10/((this.level+1)/5))))/(min(this.level, 1));
    this.moveTimer.start();
    this.modeTimer.start();
    this.modeLimit = random(20, 35);
    this.mode = random(3);
    this.changeTo.stop();
    this.changeTo.start();
    this.changeToTime = random(100, 200);
    this.to = this.level>5 ? RIGHT : LEFT;
    this.MWP = this.level>10; // Meddle With Power
    this.MWPT.stop();
    this.MWPL = 30/this.level+random(-5/this.level, 5);
    this.leaveTimer.stop();
    this.MRT.stop();
    this.meddledRoom = null;
    this.MRTL = random(20, 50); // Meddled Room Timer Limit
    this.activated = false;
    // this.songTimer.stop();
    // this.songTimer.start();
};
ani.hal.move = function() {
    this.activated = true;
    this.moveTimer.reset();
    this.wait = map(this.level, 0, 20, 30, 5) +
    random(10/(this.level+1));
    if(scenes.game.camOn === this.room && scenes.game.camRot === 0 && !scenes.game.camDisabled && scenes.game.camOn !== "Kitchen") {
        scenes.game.disableCams();
    }
    if(this.to === RIGHT) {
        if(this.room === "Arcade") {
            this.room = chance(
                [20+this.level/2, "East Hall 3"],
                [20-this.level, "Bathrooms"],
                [20-this.level, "Laser Tag Preparatory"],
                [20+this.level, "South Hall"],
                [20-this.level, "East Hall 2"]
            );
        } else if(this.room === "Bathrooms") {
            this.room = chance(
                [40-this.level*1.75, "Arcade"],
                [30+this.level*0.25, "East Hall 3"],
                [30+this.level*2, "South Hall"]
            );
        } else if(this.room === "East Hall 3") {
            this.room = chance(
                [25-this.level, "Arcade"],
                [25-this.level, "Kitchen"],
                [25-this.level, "Laser Tag Preparatory"],
                [25-this.level, "East Hall 2"],
                [25-this.level, "Changing Rooms"],
                [25+this.level*5, "South Hall"],
                [25+this.level*10, "Right Door"]
            );
        } else if(this.room === "Right Door") {
            this.room = chance(
                [50, "South Hall"],
                [25+this.level, "Kitchen"],
                [25-this.level, "East Hall 3"]
            );
        } else if(this.room === "Kitchen") {
            this.room = chance(
                [20+this.level, "South Hall"],
                [20-this.level, "Dining Area"]
            );
        } else if(this.room === "Laser Tag Preparatory") {
            this.room = chance(
                [50+this.level, "South Hall"],
                [50+this.level*0.5, "East Hall 3"],
                [50-this.level, "Arcade"]
            );
        } else if(this.room === "South Hall") {
            this.room = chance(
                [25-this.level, "Arcade"],
                [50-this.level, "Kitchen"],
                [25-this.level, "East Hall 3"],
                [25-this.level, "East Hall 2"],
                [50+this.level*3.5, "Right Door"],
                [25-this.level, "Laser Tag Preparatory"]
            );
        } else if(this.room === "East Hall 2") {
            this.room = chance(
                [25-this.level, "Arcade"],
                [25+this.level, "East Hall 3"],
                [20-this.level, "Changing Rooms"],
                [20-this.level, "East Hall 1"],
                [25+this.level*2, "South Hall"]
            );
        } else if(this.room === "Dining Area") {
            this.room = chance(
                [25+this.level*2, "Kitchen"],
                [25+this.level*3, "South Hall"]
            );
        } else if(this.room === "North Hall") {
            this.room = chance(
                [60+this.level*5, "Kitchen"],
                [60, "Dining Area"]
            );
        } else if(this.room === "Furnace Room") {
            this.room = chance(
                [25+this.level, "North Hall"],
                [25+this.level*3, "Dining Area"]
            );
        } else if(this.room === "Left Door") {
            this.room = chance(
                [100+this.level*5, "North Hall"],
                [100+this.level, "West Hall"],
                [100-this.level*5, "Furnace Room"]
            );
        } else if(this.room === "West Hall") {
            this.room = chance(
                [50+this.level, "North Hall"],
                [50-this.level*2, "Furnace Room"],
                [50+this.level*4, "Dining Area"]
            );
        } else if(this.room === "East Hall 1") {
            this.room = chance(
                [50+this.level, "Dining Area"],
                [50, "East Hall 2"]
            );
        } else if(this.room === "Changing Rooms") {
            this.room = chance(
                [50, "East Hall 2"],
                [50-this.level*2, "East Hall 1"],
                [50+this.level*2, "East Hall 3"]
            );
        }
    }

    else if(this.to === LEFT) {
        if(this.room === "Arcade") {
            this.room = chance(
                [20+this.level/2, "East Hall 3"],
                [20-this.level, "Bathrooms"],
                [20-this.level, "Laser Tag Preparatory"],
                [20-this.level, "South Hall"],
                [20+this.level*2, "East Hall 2"]
            );
        } else if(this.room === "Bathrooms") {
            this.room = chance(
                [40-this.level*1.75, "Arcade"],
                [30+this.level*2, "East Hall 3"],
                [30-this.level, "South Hall"]
            );
        } else if(this.room === "East Hall 3") {
            this.room = chance(
                [25-this.level, "Arcade"],
                [25-this.level, "Kitchen"],
                [25-this.level, "Laser Tag Preparatory"],
                [25+this.level*5, "East Hall 2"],
                [25+this.level, "Changing Rooms"],
                [25-this.level, "South Hall"]
            );
        } else if(this.room === "Right Door") {
            this.room = chance(
                [50-this.level*2, "South Hall"],
                [25+this.level*5, "Kitchen"],
                [25+this.level*5, "East Hall 3"]
            );
        } else if(this.room === "Kitchen") {
            this.room = chance(
                [20-this.level, "South Hall"],
                [20+this.level*3, "Dining Area"]
            );
        } else if(this.room === "Laser Tag Preparatory") {
            this.room = chance(
                [50-this.level*2, "South Hall"],
                [50+this.level*2, "East Hall 3"],
                [50+this.level*3, "East Hall 2"],
                [50-this.level*2, "Arcade"]
            );
        } else if(this.room === "South Hall") {
            this.room = chance(
                [25-this.level, "Arcade"],
                [50+this.level*2, "Kitchen"],
                [25-this.level, "East Hall 3"],
                [25-this.level, "East Hall 2"],
                [25-this.level, "Laser Tag Preparatory"]
            );
        } else if(this.room === "East Hall 2") {
            this.room = chance(
                [25-this.level, "Arcade"],
                [25-this.level, "East Hall 3"],
                [20-this.level, "Changing Rooms"],
                [20+this.level*3, "East Hall 1"],
                [25-this.level, "South Hall"]
            );
        } else if(this.room === "Dining Area") {
            this.room = chance(
                [30+this.level*2, "North Hall"],
                [25+this.level*3, "West Hall"],
                [20+this.level, "Furnace Room"]
            );
        } else if(this.room === "North Hall") {
            this.room = chance(
                [60+this.level*3, "West Hall"],
                [60-this.level*2, "Furnace Room"],
                [60+this.level*5, "Left Door"]
            );
        } else if(this.room === "Furnace Room") {
            this.room = chance(
                [25+this.level, "North Hall"],
                [25+this.level*2, "West Hall"],
                [25-this.level, "Dining Area"]
            );
        } else if(this.room === "Left Door") {
            this.room = chance(
                [100+this.level, "North Hall"],
                [50+this.level*3, "West Hall"],
                [100-this.level, "Furnace Room"]
            );
        } else if(this.room === "West Hall") {
            this.room = chance(
                [50-this.level*2, "North Hall"],
                [50-this.level*2, "Furnace Room"],
                [20-this.level, "Dining Area"],
                [60+this.level*4, "Left Door"]
            );
        } else if(this.room === "East Hall 1") {
            this.room = chance(
                [50+this.level*2, "Dining Area"],
                [50-this.level*2, "East Hall 2"]
            );
        } else if(this.room === "Changing Rooms") {
            this.room = chance(
                [50-this.level*2, "East Hall 2"],
                [50+this.level*2, "East Hall 1"],
                [30+this.level*5, "Dining Area"]
            );
        }
    }
    
    if(this.room === "Left Door" || this.room === "Right Door") {
        if(this.room === "Left Door" && scenes.game.leftWall.light) {
            this.move();
            return;
        }
        else if(this.room === "Right Door" && scenes.game.rightWall.light) {
            this.move();
            return;
        }
        // this.enterTime = map(this.level, 0, 20, 10, 5) + random(20-this.level/5);
        this.enterTime = (this.wait*1.5 + random(20-this.level/5)) / (2.5-this.level/50);
        // this.leaveTime = map(this.level, 0, 20, 0, 5) + random(20-this.level/5);
        this.leaveTime = (this.wait*0.5 + random(20-this.level/5)) / (2.5-this.level/50);
    }
    if(scenes.game.camOn === this.room && scenes.game.camRot === 0 && !scenes.game.camDisabled && scenes.game.camOn !== "Kitchen") {
        scenes.game.disableCams();
    }
};
ani.hal.attack = function() {
    var g = scenes.game;
    g.leftWall.break();
    g.rightWall.break();
    g.leftWall.door = false;
    g.rightWall.door = false;
    g.power *= 0.5;
    g.disableCams();
    scenes.game = g;
    if(this.room === "Left Door") {
        this.room = "Right Door";
        this.move();
    }
    if(this.room === "Right Door") {
        this.room = "Left Door";
        this.move();
    }
    addSound("rpg/step-heavy", {time: 0, start: 0.35, stop: 0.45, volume: normVol(1)});
    addSound("rpg/step-heavy", {time: 200, start: 0.35, stop: 0.45, volume: normVol(1)});
    addSound("rpg/step-heavy", {time: 400, start: 0.35, stop: 0.45, volume: normVol(1)});
};
ani.hal.meddle = function() {
    this.MRTL = random(20, 50); // Meddled Room Timer Limit
    this.MRT.start();
    this.meddledRoom = randChoice("East Hall 2", "East Hall 3", "Show Stage", "Dining Area", "South Hall", "West Hall", "Kitchen", "North Hall", "Furnace Room", "Supply Closet", "Spare Room", "Backstage", "East Hall 1", "Changing Rooms", "Laser Tag Preparatory", "Bathrooms", "Kitchen Tools", "Arcade"); // Meddled Room
};
ani.hal.update = function() {
    if(this.room === "Kitchen") {
        if(scenes.game.camOn === "Kitchen" && scenes.game.camRot === 0) {
            halMusic.volume = 0.125;
        } else {
            halMusic.volume = 0.03125;
        }
        halMusic.run();
    } else {
        halMusic.stop();
    }
    // println(this.room + ", ");
    if(!this.MRT.paused) {
        if(this.MRT.getTime() > this.MRTL) {
            this.meddledRoom = null;
            this.MRT.stop();
        }
    }
    if(this.room === "South Hall" && this.MWP) {
        if(this.MWPT.paused) {
            this.MWPT.start();
        }
        if(this.MWPT.getTime() > this.MWPL) {
            this.meddle();
            this.MWPL = 30/this.level+random(-5/this.level, 5);
            this.MWP = false;
        }
    } else {
        this.MWPT.stop();
    }
    if(this.to === LEFT && !this.MWP) {
        this.MWP = true;
    }
    if(this.changeTo.getTime() > this.changeToTime) {
        switch(this.to) {
            case LEFT: this.to = RIGHT; break;
            case RIGHT: this.to = LEFT; break;
        }
        if(this.to === RIGHT) {
            this.MWP = true;
        }
        this.changeToTime = random(100, 200);
        this.changeTo.reset();
    }
    if(this.modeTimer.getTime() > 25 && (scenes.game.camOn !== this.room || scenes.game.camDisabled)) {
        this.mode = random(3);
        this.modeTimer.reset();
        this.modeLimit = random(20, 35);
    }
    if(this.room !== "Left Door" && this.room !== "Right Door") {
        if(this.moveTimer.getTime() > this.wait) {
            this.move();
        }
        this.leaveTimer.stop();
    } else {
        if(this.leaveTimer.paused) {
            this.leaveTimer.start();
        }
        if(this.room === "Left Door") {
            if(this.moveTimer.getTime() > this.enterTime && !scenes.game.leftWall.door) {
                if(!scenes.game.leftWall.broken) {
                    this.moveTimer.reset();
                    scenes.game.leftWall.break();
                } else {
                    this.move();
                }
                scenes.game.leftWall.break();
                this.leaveTimer.stop();
                this.leaveTimer.start();
                if(scenes.game.camRot === 0) {
                    this.attack();
                    this.MWP = true;
                }
            }
            if(this.leaveTimer.getTime() > this.leaveTime && (scenes.game.leftWall.door || scenes.game.leftWall.broken)) {
                if(!scenes.game.leftWall.light) {
                    this.move();
                }
            }
        } else {
            if(this.moveTimer.getTime() > this.enterTime && !scenes.game.rightWall.door) {
                if(!scenes.game.rightWall.broken) {
                    this.moveTimer.reset();
                    scenes.game.rightWall.break();
                } else {
                    this.move();
                }
                this.leaveTimer.stop();
                this.leaveTimer.start();
                if(scenes.game.camRot === 0) {
                    this.attack();
                }
            }
            if(this.leaveTimer.getTime() > this.leaveTime && (scenes.game.rightWall.door || scenes.game.rightWall.broken)) {
                if(!scenes.game.rightWall.light) {
                    this.move();
                }
            }
        }
    }
    if(ani.squid.runPos >= 100 && ani.squid.runPos <= 175 && scenes.game.camOn === "East Hall 2" && this.room === "East Hall 2") {
        this.move();
    }
};
// }
// Fuzzy {
ani.fuzz = new Animatronic("Lab"); 
ani.fuzz.reset = function() {
    this.level = nights[Cnight-1].fuzz;
    this.room = this.roomStart;
    this.wait = 400/this.level;
    this.moveTimer.start();
    this.modeTimer.start();
    this.modeLimit = random(20, 35);
    this.mode = random(3);
    this.dir = true;
};
ani.fuzz.move = function() {
    this.moveTimer.reset();
    this.wait = 100/this.level;
    if(scenes.game.camOn === this.room && scenes.game.camRot === 0 && !scenes.game.camDisabled && scenes.game.camOn !== "Kitchen") {
        scenes.game.disableCams();
    }
    if(this.dir) {
        if(this.room === "Lab") {
            this.room = "Kitchen Tools";
        } else if(this.room === "Kitchen Tools") {
            this.room = "Kitchen";
        } else if(this.room === "Kitchen") {
            this.room = "South Hall";
        } else if(this.room === "South Hall") {
            if(!scenes.game.rightWall.door && scenes.game.camRot === 0) {
                this.room = "office";
            } else {
                this.room = "Kitchen";
                this.dir = false;
            }
        }
    } else {
        if(this.room === "South Hall") {
            this.room = "Kitchen";
        } else if(this.room === "Kitchen") {
            this.room = "Kitchen Tools";
        } else if(this.room === "Kitchen Tools") {
            this.room = "Kitchen";
            this.dir = true;
        }
    }
    if(scenes.game.camOn === this.room && scenes.game.camRot === 0 && !scenes.game.camDisabled && scenes.game.camOn !== "Kitchen") {
        scenes.game.disableCams();
    }
};
ani.fuzz.update = function() {
    if(this.room === "office") {
        return;
    }
    if(this.modeTimer.getTime() > 25 && (scenes.game.camOn !== this.room || scenes.game.camDisabled)) {
        this.mode = random(3);
        this.modeTimer.reset();
        this.modeLimit = random(20, 35);
    }
    if(this.moveTimer.getTime() > this.wait) {
        this.move();
    }
};
// }
// Sam {
ani.sam = new Animatronic("Lab");
ani.sam.jumpscareTimer = new Timer();
ani.sam.reset = function() {
    this.level = nights[Cnight-1].sam;
    this.room = this.roomStart;
    this.wait = (map(pow(this.level/20, 0.25)*20, 0, 20, random(500, 600), 10) + random(-(20-this.level)+5, (10/((this.level+1)/5))))/(min(this.level, 1));
    this.moveTimer.start();
    this.modeTimer.start();
    this.modeLimit = random(20, 35);
    this.mode = random(3);
    this.jumpscareTimer.stop();
    this.jumpscareLimit = random(3, 5);
    this.pos = 0;
};
ani.sam.move = function() {
    this.moveTimer.reset();
    this.wait = map(this.level, 0, 20, 60, 10) +
    random(20/(this.level+1));
    if(scenes.game.camOn === this.room && scenes.game.camRot === 0 && !scenes.game.camDisabled) {
        scenes.game.disableCams();
    }
    if(this.room === "Lab") {
        this.room = "North Hall";
    } else if(this.room === "North Hall") {
        this.pos++;
        if(this.pos > 1) {
            this.room = "West Hall";
            this.pos = 0;
        }
    } else if(this.room === "West Hall") {
        if(!scenes.game.leftWall.door && scenes.game.camRot === 0) {
            this.room = "office";
        } else {
            this.room = "North Hall";
        }
    }
    if(scenes.game.camOn === this.room && scenes.game.camRot === 0 && !scenes.game.camDisabled) {
        scenes.game.disableCams();
    }
};
ani.sam.update = function() {
    if(this.room === "office") {
        if(scenes.game.camRot > 0) {
            if(scenes.game.aniIn === "") {
                scenes.game.aniIn = "sam";
            }
        }
        return;
    } else if(this.room === "West Hall") {
        if(scenes.game.camOn !== "West Hall" || scenes.game.camRot > 0 || scenes.game.camDisabled || ani.hal.meddledRoom === "West Hall") {
            this.westHallPos = map(this.moveTimer.getTime(), 0, this.wait, 0, 1);
        }
    }
    if(this.modeTimer.getTime() > 25 && (scenes.game.camOn !== this.room || scenes.game.camDisabled)) {
        this.mode = random(3);
        this.modeTimer.reset();
        this.modeLimit = random(20, 35);
    }
    if(this.moveTimer.getTime() > this.wait) {
        this.move();
    }
};
// }
var MenuButton = function(TEXT, y, to){
    this.y = y;
    this.text = TEXT;
    this.to = to;
    this.mouseOver = function() {
        return mouseY>this.y && mouseY<this.y+50;
    };
    this.display = function() {
        textAlign(LEFT, CENTER);
        fill(255);
        textSize(25);
        var a = 0;
        if(this.mouseOver()) {
            curs = "pointer";
            a += 50;
            text(">>>", 10, this.y+25);
            if(mouseIsPressed) {
                a += 50;
            }
        }
        (fill)(255, a);
        rect(0, this.y, width, 50);
        fill(255);
        textSize(30);
        text(this.text, 75, this.y+25);
        if(this.text === "Continue") {
            textSize(10);
            text("Night " + (max(night, 1)), 100, this.y+42);
        }
    };
};
var buttonSound = function() {
    addSound("rpg/step-heavy", {start: 0.1, stop: 0.13});
};
// Scene Transition Stuff {
var scB = [];
var sceneChange = function(to) {
    scene = to;
    for(var i=0;i<15;i++) {
        scB.push([random(height), random(50, 150)]);
    }
    resetSounds();
    buttonSound();
};
// }
/*whether
*/
var ODI = {
    imgs: {}, // Images
    choice: function(rot, power, doorMode, leftOrBackDoor, rightDoor) {
        
        // Example: "-0.3 0 etc.
        //             ^  ^
        //            rot |
        //              power
        
        // rot: the rotation of you in the office
        // a range between -0.7 and 0.7 radians
        
        // power: whether the power is on or not.
        // 0: on, 1: off
        
        // doorMode: whether you are looking at the front of the office (right and left doors) or back (back door)
        // 0: back, 1: front
        
        // leftOrBackDoor: leftDoor if doorMode is 1, backDoor if doorMode is 0
        // leftDoor: {doorY, door, light, hopps, hal};
        // backDoor: the rotation of the door;
        
        // rightDoor: {doorY, door, light, ohnoes, hal};
        
        
        var leftDoor = leftOrBackDoor, backDoor = leftOrBackDoor;
        
        var imgFind = "";
        if(doorMode) {
            imgFind += rot.toFixed(2);
            imgFind += " ";
            imgFind += power;
            imgFind += " ";
            imgFind += leftDoor.doorY;
            imgFind += " ";
            imgFind += rightDoor.doorY;
            imgFind += " ";
            if(!power) {
                imgFind += leftDoor.door;
                imgFind += " ";
                imgFind += leftDoor.light;
                imgFind += " ";
                imgFind += leftDoor.hopps;
                imgFind += " ";
                imgFind += leftDoor.hal;
                imgFind += " ";
                imgFind += rightDoor.door;
                imgFind += " ";
                imgFind += rightDoor.light;
                imgFind += " ";
                imgFind += rightDoor.ohnoes;
                imgFind += " ";
                imgFind += rightDoor.hal;
                imgFind += " ";
            } else {
                imgFind += leftDoor.win;
            }
        } else {
            imgFind += backDoor;
        }
        this.imgFind = imgFind;
        return this.imgs[imgFind] !== undefined;
    }, // Chooses either getting an image or used an already ready one instead.
}; // Office Delag Images
var monitor = createGraphics(600, 600, P3D);
monitor.textureMode(IMAGE);
monitor.noStroke();
monitor.update = function(rot) {
    this.background(0, 0, 0, 0);
    this.pushMatrix();
    rot = constrain(rot, 0, 2.0892036732051036);
    this.translate(150, 450+rot*10, 230);
    this.rotateX(rot);
    this.texture(images.monitor);
    this.beginShape();
    this.vertex(-50, 50, 0, 0, 600);
    this.vertex(-50, -350, 0, 0, 0);
    this.vertex(350, -350, 0, 600, 0);
    this.vertex(350, 50, 0, 600, 600);
    this.endShape();
    this.popMatrix();
};
var OfficeButton = function(x, y, w, h) {
    this.choice = false;
    this.change = true;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.mouseOver = function() {
        var up = false;
        if(this.y + this.height/2 < 300) {
            up = true;
        }
        if(up) {
            return mouseX > this.x &&
            mouseX < this.x + this.width &&
            mouseY < this.y + this.height;
        }
        else if(!up) {
            return mouseX > this.x &&
            mouseX < this.x + this.width &&
            mouseY > this.y;
        }
    };
    this.update = function() {
        if(this.mouseOver()) {
            curs = "pointer";
            if(this.change) {
                buttonSound();
                this.choice = !this.choice;
                this.change = false;
            }
        } else {
            this.change = true;
        }
    };
    this.draw = function() {
        (fill)(255, 25);
        (stroke)(255, 200);
        strokeWeight(2.5);
        rect(this.x, this.y, this.width, this.height, 2.5);
    };
};
var drawWin = function(y) {
    y = constrain(y, 0, 200);
    background(0);
    fnafText("6\n5", 125, y+25, 20);
    fnafText("AM", 250, 225, 20);
    stroke(0);
    strokeWeight(200);
    noFill();
    rect(0, 100, 600, 400);
    noStroke();
};
var jumpscareSound = {
    time: new Timer(),
    t: new Timer(),
    volume: 1,
    run: function() {
        if(this.time.paused) {
            this.time.start();
        }
        if(this.t.paused) {
            this.t.start();
        }
        var m = this.time.getTime()/12;
        if(this.t.getTime()>0.05) {
            addSound(/*randChoice(lSounds)*/"retro/laser1", {start: m, stop: m+0.01, volume: normVol(this.volume)});
            addSound(/*randChoice(lSounds)*/"retro/laser2", {start: m, stop: m+0.01, volume: normVol(this.volume)});
            addSound(/*randChoice(lSounds)*/"retro/laser3", {start: m/2+0.5, stop: m/2+0.51, PBR: 0.5, volume: normVol(this.volume)});
            addSound(/*randChoice(lSounds)*/"retro/boom1", {volume: normVol(this.volume)});
            addSound(/*randChoice(lSounds)*/"retro/boom2", {volume: normVol(this.volume)});
            addSound(/*randChoice(lSounds)*/"retro/rumble", {volume: normVol(this.volume)});
            this.t.reset();
        }
    },
    reset: function() {
        this.time.stop();
    },
};
var squidicalJumpscare = {
    timer: new Timer(),
    generate: function() {
        if(this.timer.paused) {
            this.timer.start();
        }
        var f = this.timer.getTime()*300-100;
        noBackground();
        pushMatrix();
        scale(1.5);
        translate(min(-210+f*5, 0), 300);
        rotate(-abs(cos(f*(f/50))*(max(0, 100-f)))/3+30);
        drawAnimatronicSquidical(0, -100, 0, 0, 141, 0, [0, 0], [min(f*2, 100)-100, 0], min(f, 100), 0, 0.50);
        popMatrix();
        if(f>100) {
            this.timer.pause();
        }
        this.img = get(0, 0, 600, 600);
    },
    draw: function() {
        pushMatrix();
        translate(600, 0);
        scale(-1, 1);
        image(this.img, 72, 0);
        popMatrix();
    },
};
var powerOutWinstonJumpscare = {
    timer: new Timer(),
    reset: function() {
        this.timer.stop();
    },
    draw: function() {
        if(this.timer.paused) {
            this.timer.start();
        }
        var delay = 0.5;
        var s = this.timer.getTime();
        s = min(s, delay);
        var t = this.timer.getTime()-delay;
        if(s === delay) {
            pushMatrix();
            translate(300, 300);
            rotate(sin(t*500)*constrain(t*150, 0, 50));
            drawAnimatronicWinston(0, 0, -150-t*2, 75+t*25, 6, 0, 0, pow(t*250, 1.05), 0.01);
            popMatrix();
        } else {
            drawAnimatronicWinston(300, 1000-sin(s*90/delay)*700, -150+100-sin(s*90/delay)*100, sin(s*90/delay)*75, map(sin(s*90/delay), 0, 1, 50, 6), 0, 0, 0, 0.01);
        }
    },
    
};
var Cam = function(name, x, y, text) {
    this.text = text;
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 20;
    this.on = false;
    this.mouseOver = function() {
        return mouseX>this.x&&mouseY>this.y&&mouseX<this.x+this.width&&mouseY<this.y+this.height;
    };
    this.display = function() {
        stroke(255);
        strokeWeight(2);
        if(mouseWasReleased && this.mouseOver()) {
            scenes.game.camOn = this.name;
        }
        this.on = scenes.game.camOn === this.name;
        if(this.on) {
            fill(100, 255, 50);
        } else {
            fill(10, 25, 5);
        }
        rect(this.x, this.y, this.width, this.height);
    };
    this.drawLabel = function() {
        // this.text = split(this.text, "\n");
        fnafText(this.text[0], this.x+2, this.y+2, 1.1);
        fnafText(this.text[1], this.x+2, this.y+10, 1.1);
    };
};
var jumpscareReady = {
    timer: new Timer(),
    pL: random(0.5, 2), // Pulse Limit
    pulseOn: false,
    stop: function() {
        this.timer.stop();
    },
    run: function() {
        if(this.timer.paused) {
            this.timer.start();
        }
        if(this.timer.getTime() > this.pL) {
            this.pulseOn = !this.pulseOn;
            this.pL = random(0.25, 1);
            this.timer.reset();
        }
        if(this.pulseOn) {
            addSound("retro/rumble", {time: 400, start: 0, stop: 0.01, volume: normVol(0.125)});
        }
    }
};
var mrPantJumpscare = {
    draw: function() {
        // p = constrain(mouseX*1.5-100, 0, 600)/6;
        var p = constrain(ani.pant.runPos, 0, 100);
        pushMatrix();
        translate(300, 400+pow(p/100, 3)*120-pow(p/100, 10)*220);
        rotate(sin(millis())*(p/4));
        drawMrPanteater(0, p, 200-p*3.2, sin(millis()*2)*25, sin(millis())*10, 6, 0, 0, -90+sin(millis())*(p/4)+90-p, 90+cos(millis())*(p/4)-90+p,
        constrain(1-p/50, 0, 1));
        popMatrix();
    },
};
var CustomButton = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 40;
    this.dist = 55;
    this.num = 10;
    this.mouseOver = function() {
        if(
            mouseX > this.x-this.dist/2-this.width &&
            mouseX < this.x-this.dist/2 &&
            mouseY > this.y-this.height/2 &&
            mouseY < this.y+this.height/2
        ) {
            return 1;
        } else if(
            mouseX > this.x+this.dist/2 &&
            mouseX < this.x+this.dist/2+this.width &&
            mouseY > this.y-this.height/2 &&
            mouseY < this.y+this.height/2
        ) {
            return 2;
        } else {
            return 0;
        }
    };
    this.display = function() {
        var b = 25;
        var l = ((this.mouseOver() === 1) ? b : 0);
        var r = ((this.mouseOver() === 2) ? b : 0);
        if(l === b && mouseIsClicked) {
            this.num--;
        }
        if(r === b && mouseIsClicked) {
            this.num++;
        }
        this.num = constrain(this.num, 0, 20);
        fill(100+l);
        rect(this.x-this.dist/2-this.width, this.y-this.height/2, this.width, this.height);
        fill(100+r);
        rect(this.x+this.dist/2, this.y-this.height/2, this.width, this.height);
        fill(240);
        textFont(createFont("monospace"));
        textAlign(CENTER, CENTER);
        textSize(min(this.width, this.height));
        text("<", this.x-this.dist/2-this.width/2, this.y);
        text(">", this.x+this.dist/2+this.width/2, this.y);
        textSize(min(this.dist-this.width, this.height)*1.3);
        text(this.num, this.x, this.y);
    };
};
scenes = {
    start: {
        t: new Timer(),
        display: function() {
            background(0);
            fill(255);
            textFont(createFont("monospace"));
            textAlign(CENTER, CENTER);
            textSize(25);
            text("WARNING\nThis game contains flashing\nlights and loads of jumpscares!", 300, 300);
            if(this.t.paused) {
                this.t.start();
            }
            if(this.t.getTime()>0.75) {
                scene = "menu";
                return;
            }
            gameStart();
        },
    },
    getjob: {
        zoom: 600,
        display: function() {
            imageMode(CENTER);
            image(images.wanted, 300, 300, this.zoom, this.zoom);
            imageMode(CORNER);
            this.zoom+=0.0625;
            night = 1;
            if(this.zoom > 625) {
                this.zoom = 600;
                sceneChange("startgame");
            }
        }
    },
    startgame: {
        timer: new Timer(),
        display: function() {
            if(Cnight === null) {
                Cnight = night;
            }
            if(Cnight === 0) {
                Cnight = 1;
            }
            if(this.timer.paused) {
                this.timer.start();
            }
            background(0);
            var t;
            if(Cnight === 1) {
                t = "st";
            } else if (Cnight === 2) {
                t = "nd";
            } else if (Cnight === 3) {
                t = "rd";
            } else {
                t = "th";
            }
            // fnafText(" 12:00 AM\n" + Cnight + t + " Night", 220, 290, 4);
            fnafTextCenter("12:00 AM\n" + Cnight + t + " Night", 300, 300, 4);
            if(this.timer.getTime()>5) {
                this.timer.stop();
                scene = "game";
                scenes.game.startGame();
            }
        },
    },
    sixth: {
        display: function() {
            Cnight = 6;
            scene = "startgame";
            scenes.startgame.display();
        }
    },
    customize: {
        startCheak: false,
        buttons: {
            win: new CustomButton(75, 200),
            hopps: new CustomButton(225, 200),
            ohnoes: new CustomButton(375, 200),
            squid: new CustomButton(525, 200),
            hal: new CustomButton(75, 400),
            pant: new CustomButton(225, 400),
            sam: new CustomButton(375, 400),
            fuzz: new CustomButton(525, 400)
        },
        display: function() {
            background(0);
            textFont(createFont("monospace"));
            textAlign(CENTER, CENTER);
            textSize(50);
            fill(240);
            text("Customize Night", 300, 25);
            textSize(40);
            var rB = ((
                mouseX > 525 - 120/2 &&
                mouseY > 525 - 40/2 &&
                mouseX < 525 + 120/2 &&
                mouseY < 525 + 40/2
            ) ? 25 : 0);
            if(rB === 25 && mouseIsClicked) {
                Cnight = 7;
                sceneChange("startgame");
            }
            fill(100 + rB);
            rectMode(CENTER);
            rect(525, 525, 120, 40);
            fill(240);
            text("READY", 525, 525);
            rB = ((
                mouseX > 150 - 275/2 &&
                mouseY > 525 - 40/2 &&
                mouseX < 150 + 275/2 &&
                mouseY < 525 + 40/2
            ) ? 25 : 0);
            var blah = false;
            if(rB === 25 && mouseIsClicked) {
                for(var i in this.buttons) {
                    this.buttons[i].num = floor(random(21));
                    if(this.startCheak) {
                        nights[6][i] = this.buttons[i].num;
                    }
                }
                if(this.startCheak) {
                    Cnight = 7;
                    rectMode(CORNER);
                    sceneChange("startgame");
                    background(0);
                    return;
                }
            }
            rectMode(CORNER);
            for(var i in this.buttons) {
                this.buttons[i].display();
                nights[6][i] = this.buttons[i].num;
                var t = "";
                switch(i) {
                    case "win": t = "Winston"; break;
                    case "hopps": t = "Hopper"; break;
                    case "ohnoes": t = "Oh Noes"; break;
                    case "squid": t = "Squidical"; break;
                    case "pant": t = "Mr. Panteater"; break;
                    case "hal": t = "Hal"; break;
                    case "sam": t = "Sam"; break;
                    case "fuzz": t = "Fuzzy"; break;
                }
                textSize(constrain(5000/textWidth(t), 15, 25));
                text(t, this.buttons[i].x, this.buttons[i].y-130);
                textSize(20);
                text("A.I. Level", this.buttons[i].x, this.buttons[i].y+35);
                imageMode(CENTER);
                image(images[i], this.buttons[i].x, this.buttons[i].y-70, 90, 90);
                imageMode(CORNER);
            }
            fill(100 + rB);
            rectMode(CENTER);
            rect(150, 525, 275, 40);
            fill(240);
            textSize(40);
            text("RANDOM NIGHT", 150, 525);
            rB = ((
                mouseX > 330 - 20/2 &&
                mouseY > 525 - 20/2 &&
                mouseX < 330 + 20/2 &&
                mouseY < 525 + 20/2
            ) ? 50 : 0);
            if(rB === 50 && mouseIsClicked) {
                this.startCheak = !this.startCheak;
            }
            (fill)(255, 0 + rB);
            stroke(240);
            strokeWeight(2);
            rect(330, 525, 20, 20, 5);
            rectMode(CORNER);
            fill(240);
            if(this.startCheak) {
                textSize(18);
                textFont(createFont("Arial"));
                text("X", 330, 525);
                textFont(createFont("monospace"));
            }
            textSize(20);
            text("(0-2)easy   (3-6)med   (7-12)hard   (13-20)extreme", 300, 575);
            textSize(10);
            text("start on click", 330, 508);
            strokeWeight(5);
            line(0, 250, 600, 250);
            noStroke();
        },
    },
    menu: {
        winImgs: [
            function() {
                // image(getImage("creatures/Winston"), 300, 250, 300, 300);
                drawAnimatronicWinston(450, 400, -50, 75, 10, 0, 0, 0, 0.30);
            },
            function() {
                // pushMatrix();
                // translate(520, 250);
                // scale(-1, 1);
                // popMatrix();
                drawAnimatronicWinston(450, 400, -50, 90, 0, 0, -20, 0, 0.30);
                // image(getImage("creatures/Winston"), 300, 250, 300, 300);
            },
            function() {
                image(images.menu.exo, 380, 300, 180, 280);
            }
        ],
        mt: new Timer(),
        w: 0,
        Bar: function(y, h, s){
            this.y = y;
            this.height = h;
            this.speed = s;
            this.out = false;
            this.display = function() {
                if(this.y>height) {
                    this.out = true;
                }
                this.y+=this.speed;
                (fill)(255, 25);
                rect(0, this.y, width, this.height);
            };
        },
        barTimer: 0,
        barTimerLimit: random(75, 150),
        bars: [],
        buttonOffSound: true,
        buttons: [
            new MenuButton("New Game", 230, "getjob"),
            new MenuButton("Continue", 290, "startgame"),
            new MenuButton("6th Night", 350, "sixth"),
            new MenuButton("Custom Night", 410, "customize"),
        ],
        display: function() {
            this.buttons[0].text = night<1 ? "Play" : "New Game";
            this.barTimer++;
            if(this.barTimer>this.barTimerLimit) {
                this.barTimer = 0;
                this.barTimerLimit = random(1500, 3000);
                this.bars.push(new this.Bar(random(-200, -100), random(7, 100), random(0.1, 0.5)));
            }
            for(var i=0;i<this.bars.length;i++) {
                if(this.bars[i].out === true) {
                    this.bars.splice(i, 1);
                }
            }
            background(0);
            noiseSound.play();
            if(this.mt.paused) {
                menuMusic();
                this.mt.start();
            }
            if(this.mt.getTime()>=8) {
                this.mt.reset();
                menuMusic();
            }
            fill(0);
            if(frameCount%3 === 0) {
                this.w = chance([85, 0], [12, 1], [3, 2]);
            }
            this.winImgs[this.w]();
            (image)(images.menuGrad);
            displayNoise();
            fill(255);
            textAlign(LEFT, CENTER);
            textSize(140);
            text("2", 400, 120);
            textSize(50);
            text("Five Nights \nat Winston's", 60, 120);
            textSize(15);
            textAlign(RIGHT, BOTTOM);
            text("©2017 Jack Gilbert", width-5, height-5);
            for(var i=0;i<this.bars.length;i++) {
                this.bars[i].display();
            }
            var a = false;
            for(var i = 0; i<this.buttons.length; i++) {
                if(Tnight >= i) {
                    this.buttons[i].display();
                    if(this.buttons[i].mouseOver()) {
                        a = true;
                        if(mouseIsClicked) {
                            sceneChange(this.buttons[i].to);
                        }
                    }
                }
            }
            if(a && !this.buttonOffSound) {
                buttonSound();
                this.buttonOffSound = true;
            }
            if(!a) {
                this.buttonOffSound = false;
            }
        }
    },
    game: {
        vol: 3,
        mode: "office",
        camOn: "Show Stage",
        cams: [
            new Cam("Squid Reef", 480, 360, ["Cam", "9"]),
            new Cam("East Hall 2", 382, 386, ["Cam", "4B"]),
            new Cam("East Hall 3", 390, 450, ["Cam", "4C"]),
            new Cam("Show Stage", 265, 250, ["Cam", "1A"]),
            new Cam("Dining Area", 255, 315, ["Cam", "1B"]),
            new Cam("South Hall", 310, 435, ["Cam", "5"]),
            new Cam("West Hall", 235, 410, ["Cam", "2B"]),
            new Cam("Kitchen", 340, 380, ["Cam", "7"]),
            new Cam("North Hall", 265, 385, ["Cam", "2A"]),
            new Cam("Furnace Room", 285, 405, ["Cam", "14"]),
            new Cam("Supply Closet", 242, 345, ["Cam", "3"]),
            new Cam("Spare Room", 359, 320, ["Cam", "12"]),
            new Cam("Backstage", 215, 311, ["Cam", "6"]),
            new Cam("East Hall 1", 375, 290, ["Cam", "4A"]),
            new Cam("Changing Rooms", 430, 360, ["Cam", "13"]),
            new Cam("Laser Tag Preparatory", 410, 430, ["Cam", "15"]),
            new Cam("Bathrooms", 374, 498, ["Cam", "10"]),
            new Cam("Kitchen Tools", 357, 430, ["Cam", "8"]),
            new Cam("Arcade", 330, 485, ["Cam", "11"])
        ],
        camDisableTimer: new Timer(),
        camDisableTimerLimit: random(3, 5),
        camDisabled: false,
        disableCams: function() {
            this.camDisabled = true;
            this.camDisableTimer.start();
            this.camDisableTimerLimit = random(3, 5);
            addSound("rpg/step-heavy", {time: 0, start: 0.35, stop: 0.45, volume: normVol(0.25)});
            addSound("rpg/step-heavy", {time: 200, start: 0.35, stop: 0.45, volume: normVol(0.25)});
            addSound("rpg/step-heavy", {time: 400, start: 0.35, stop: 0.45, volume: normVol(0.25)});
        },
        aniIn: "",
        leftWall: {
            aniAtDoorSurprise: true,
            door: false,
            doorY: 0,
            light: false,
            breakTimer: new Timer(),
            break: function() {
                this.broken = true;
                this.breakTimer.reset();
                this.breakTimer.start();
            },
            update: function() {
                for(var i in ani) {
                    if(ani[i].room === "Left Door" && this.light && this.aniAtDoorSurprise) {
                        addSound("retro/whistle1", {start: 0, stop: 1, volume: addFade(normVol(0.5), [0, 0], [100, 1])});
                        addSound("retro/boom1", {start: 0, stop: 1, volume: addFade(normVol(0.5), [0, 0], [100, 1])});
                        addSound("retro/boom2", {start: 0, stop: 1, volume: addFade(normVol(0.2), [0, 0], [100, 0.2])});
                        addSound("retro/rumble", {start: 0, stop: 1, volume: addFade(addFade(normVol(0), [0, 0], [50, 0.5]), [50, 0.5], [100, 0]), PBR: 2});
                        addSound("retro/thruster-long", {start: 0, stop: 1, volume: addFade(addFade(normVol(0), [0, 0], [50, 0.1]), [50, 0.1], [100, 0]), PBR: 2});
                        this.aniAtDoorSurprise = false;
                    }
                }
                var gone = true;
                for(var i in ani) {
                    if(ani[i].room === "Left Door") {
                        gone = false;
                    }
                }
                if(gone) {
                    this.aniAtDoorSurprise = true;
                }
                if(this.broken) {
                    this.light = false;
                    this.door = false;
                    if(Cnight !== 5 && Cnight !== 6) {
                        if(this.breakTimer.getTime() > Cnight*10) {
                            this.broken = false;
                        }
                    }
                }
                // println("Left Door " + (Cnight*10 - this.breakTimer.getTime()));
                var doorY = this.doorY;
                if(this.door) {
                    this.doorY+=25;
                    this.train = RIGHT;
                } else {
                    this.doorY-=25;
                }
                this.doorY = constrain(this.doorY, 0, 367);
                if(rooms.office.rotY<=-0.7 && !powerOut) {
                    if(mouseX>6 && mouseX<6+50 && mouseY>279 && mouseY<279+50) {
                        if(!this.broken) {
                            curs = "pointer";
                            if(mouseWasReleased) {
                                addSound("retro/rumble", {start: 0, stop: 1, PBR: 2.75, volume: addFade(normVol(0.05*scenes.game.vol), [0, 0.05*scenes.game.vol], [100, 0])});
                                addSound("retro/thruster-short", {start: 0, stop: 1, PBR: 1.25, volume: addFade(normVol(0.005*scenes.game.vol), [0.005*scenes.game.vol, 0], [100, 0])});
                                addSound("retro/hit2", {start: 0, stop: 0.1, PBR: 1, volume: normVol(0.05*scenes.game.vol)});
                                addSound("retro/hit1", {time: 150, start: 0, stop: 0.1, PBR: 1, volume: normVol(0.1*scenes.game.vol)});
                                this.door = !this.door;
                                if(this.door) {
                                    switch("Left Door") {
                                        case ani.hopps.room: // {
                                            ani.hopps.leaveTimer.reset();
                                            break; // }
                                        case ani.hal.room: // {
                                            ani.hal.leaveTimer.reset();
                                            break; // }
                                    }
                                }
                            }
                        } else {
                            curs = "no-drop";
                        }
                    }
                    if(mouseX>7 && mouseX<7+50 && mouseY>339 && mouseY<339+50) {
                        if(!this.broken) {
                            curs = "pointer";
                            if(mouseWasReleased) {
                                addSound("rpg/hit-whack", {start: 0.1, stop: 0.13, volume: normVol(0.01*scenes.game.vol)});
                                this.light = !this.light;
                            }
                            } else {
                                curs = "no-drop";
                            }
                    }
                } else if(rooms.office.rotY !== -0.7) {
                    this.light = false;
                }
                if(powerOut) {
                    this.light = false;
                    this.door = false;
                }
                /*
                var pizza = this.chang.toString();
                println("RORROROROROROOR");
                //(change ? function() {this.draw();} : function() {})();
                println(this.doorY !== doorY || rooms.office.rotY<=-0.7 && mouseWasReleased && (mouseX>6 && mouseX<6+50 && mouseY>279 && mouseY<279+50 || mouseX>7 && mouseX<7+50 && mouseY>339 && mouseY<339+50));
                
                if(this.doorY !== doorY || rooms.office.rotY<=-0.7 && mouseWasReleased && (mouseX>6 && mouseX<6+50 && mouseY>279 && mouseY<279+50 || mouseX>7 && mouseX<7+50 && mouseY>339 && mouseY<339+50)) {
                    println("YAYAYAYAYAYAY!");
                }
                */
            },
            draw: function() {
                background((this.light ? color(255, 100) : color(0, 255)));
                if(!powerOut) {
                    if(ani.hopps.room === "Left Door" && this.light) {
                        drawAnimatronicHopper(331, 187, 10, 4, 7, 0, -3, [22, 12], [8, 12], [0, 0], [0, 0], 0, 18, 0.10);
                        (fill)(0, 100);
                        rect(0, 0, 600, 600);
                    }
                    if(ani.hal.room === "Left Door" && this.light) {
                        
                        drawHal(525, 209, -50, [-80, 0], [80, 10], 0, 0, 2, 0.50);
                    }
                    image(images.door, 246, -338+this.doorY, 176, 367);
                    image(images.leftDoor, 0, 0);
                    if(!this.light && !this.door) {
                        imageMode(CENTER);
                        image(images.lightSwitchOO, 224, 200, 32, 80);
                        imageMode(CORNER);
                    }
                    else if(!this.light && this.door) {
                        imageMode(CENTER);
                        image(images.lightSwitch_O, 224, 200, 32, 80);
                        imageMode(CORNER);
                    }
                    else if(this.light && !this.door) {
                        imageMode(CENTER);
                        image(images.lightSwitchO_, 224, 200, 32, 80);
                        imageMode(CORNER);
                    }
                    else if(this.light && this.door) {
                        imageMode(CENTER);
                        image(images.lightSwitch__, 224, 200, 32, 80);
                        imageMode(CORNER);
                    }
                } else {
                    if(scenes.game.POW === 1) {
                        if(scenes.game.POWL) {
                        drawAnimatronicWinston(530, 125, 0, 75, 12, 0, 0, 0, 0.90);
                        } else {
                            drawAnimatronicWinston(530, 125, 0, 75, 12, 0, 90, 0, 1.00);  
                        }
                    }
                    image(images.doorDark, 246, -338+this.doorY, 176, 367);
                    image(images.leftDoorDark, 0, 0);
                    imageMode(CENTER);
                    image(images.lightSwitchOut, 224, 200, 32, 80);
                    imageMode(CORNER);
                }//image(images.door, 246, -338+this.doorY, 176, 367);
                this.img = get(0, 0, 600, 400);
            }
        },
        rightWall: {
            aniAtDoorSurprise: true,
            door: false,
            doorY: 0,
            light: false,
            breakTimer: new Timer(),
            break: function() {
                this.broken = true;
                this.breakTimer.stop();
                this.breakTimer.start();
            },
            update: function() {
                for(var i in ani) {
                    if(ani[i].room === "Right Door" && this.light && this.aniAtDoorSurprise) {
                        addSound("retro/whistle1", {start: 0, stop: 1, volume: addFade(normVol(0.5), [0, 0], [100, 1])});
                        addSound("retro/boom1", {start: 0, stop: 1, volume: addFade(normVol(0.5), [0, 0], [100, 1])});
                        addSound("retro/boom2", {start: 0, stop: 1, volume: addFade(normVol(0.2), [0, 0], [100, 0.2])});
                        addSound("retro/rumble", {start: 0, stop: 1, volume: addFade(addFade(normVol(0), [0, 0], [50, 0.5]), [50, 0.5], [100, 0]), PBR: 2});
                        addSound("retro/thruster-long", {start: 0, stop: 1, volume: addFade(addFade(normVol(0), [0, 0], [50, 0.1]), [50, 0.1], [100, 0]), PBR: 2});
                        this.aniAtDoorSurprise = false;
                    }
                }
                var gone = true;
                for(var i in ani) {
                    if(ani[i].room === "Right Door") {
                        gone = false;
                    }
                }
                if(gone) {
                    this.aniAtDoorSurprise = true;
                }
                if(this.broken) {
                    this.light = false;
                    this.door = false;
                    if(Cnight !== 5 || Cnight !== 6) {
                        if(this.breakTimer.getTime() > Cnight*10) {
                            this.broken = false;
                        }
                    }
                }
                // println("Right Door " + (Cnight*10 - this.breakTimer.getTime()));
                var doorY = this.doorY;
                if(this.door) {
                    this.doorY+=25;
                } else {
                    this.doorY-=25;
                }
                this.doorY = constrain(this.doorY, 0, 367);
                if(rooms.office.rotY>=0.7 && !powerOut) {
                    if(mouseX>542 && mouseX<542+50 && mouseY>278 && mouseY<278+50) {
                        if(!this.broken) {
                            curs = "pointer";
                            if(mouseWasReleased) {
                                addSound("retro/rumble", {start: 0, stop: 1, PBR: 2.75, volume: addFade(normVol(0.05*scenes.game.vol), [0, 0.05*scenes.game.vol], [100, 0])});
                                addSound("retro/thruster-short", {start: 0, stop: 1, PBR: 1.25, volume: addFade(normVol(0.005*scenes.game.vol), [0.005*scenes.game.vol, 0], [100, 0])});
                                addSound("retro/hit2", {start: 0, stop: 0.1, PBR: 1, volume: normVol(0.05*scenes.game.vol)});
                                addSound("retro/hit1", {time: 150, start: 0, stop: 0.1, PBR: 1, volume: normVol(0.1*scenes.game.vol)});
                                this.door = !this.door;
                                if(this.door) {
                                    switch("Right Door") {
                                        case ani.ohnoes.room: // {
                                            ani.ohnoes.leaveTimer.reset();
                                            break; // }
                                        case ani.hal.room: // {
                                            ani.hal.leaveTimer.reset();
                                            break; // }
                                    }
                                }
                            }
                        } else {
                            curs = "no-drop";
                        }
                    }
                    if(mouseX>542 && mouseX<542+50 && mouseY>339 && mouseY<339+50) {
                        if(!this.broken) {
                            curs = "pointer";
                            if(mouseWasReleased) {
                                addSound("rpg/hit-whack", {start: 0.1, stop: 0.13, volume: normVol(0.01*scenes.game.vol)});
                                this.light = !this.light;
                            }
                        } else {
                            curs = "no-drop";
                        }
                    }
                } else if(rooms.office.rotY !== 0.7) {
                    this.light = false;
                }
                if(powerOut) {
                    this.light = false;
                    this.door = false;
                }
            },
            draw: function() {
                background((this.light ? color(255, 100) : color(0, 255)));
                if(!powerOut) {
                    if(ani.ohnoes.room === "Right Door" && this.light) {
                        pushMatrix();
                        translate(68, 150);
                        rotate(20);
                        drawAnimatronicOhNoes(0, 0, 103, 180, 0, 8, 47, 2, 0.00);
                        popMatrix();
                        (fill)(0, 100);
                        rect(0, 0, 600, 600);
                    }
                    if(ani.hal.room === "Right Door" && this.light) {
                        drawHal(266, 194, -50, [-26, 8, 17], [29, 0, 0], 0, 0, 2, 0.50);
                    }
                    image(images.door, 600-246-176, -338+this.doorY, 176, 367);
                    image(images.rightDoor, 0, 0);
                    if(!this.light && !this.door) {
                        imageMode(CENTER);
                        image(images.lightSwitchOO, 600-224, 200, 32, 80);
                        imageMode(CORNER);
                    }
                    else if(!this.light && this.door) {
                        imageMode(CENTER);
                        image(images.lightSwitch_O, 600-224, 200, 32, 80);
                        imageMode(CORNER);
                    }
                    else if(this.light && !this.door) {
                        imageMode(CENTER);
                        image(images.lightSwitchO_, 600-224, 200, 32, 80);
                        imageMode(CORNER);
                    }
                    else if(this.light && this.door) {
                        imageMode(CENTER);
                        image(images.lightSwitch__, 600-224, 200, 32, 80);
                        imageMode(CORNER);
                    }
                } else {
                    image(images.doorDark, 600-246, -338+this.doorY, 176, 367);
                    image(images.rightDoorDark, 0, 0);
                    imageMode(CENTER);
                    image(images.lightSwitchOut, 600-224, 200, 32, 80);
                    imageMode(CORNER);
                }//image(images.door, 246, -338+this.doorY, 176, 367);
                this.img = get(0, 0, 600, 400);
            }
        },
        backButton: new OfficeButton(150, 25, 300, 25),
        camButton: new OfficeButton(150, 550, 300, 25),
        gameTimer: new Timer(),
        power: 100,
        POW: 0, // Power Out Winston Mode
        POWC: new Timer(), // Power Out Winston Come
        POWTL: 0, // Power Out Winston Timer Limit
        WFT: new Timer(), // Winston Flicker Timer
        WFTL: 0, // Winston Flicker Timer Limit
        POWL: true, // Power Out Winston Light
        camRot: 2.0892036732051036,
        camImg: {},
        fSqLev: 0, // Fake Squidical Level
        squidJumpscare: false,
        JWT: new Timer(), // Jumpscare Wait Timer
        JWL: random(5, 10), // Jumpscare Wait Limit
        GWT: new Timer(),
        startGame: function() {
            this.GWTT = false; // Golden Winston Toggle Thing
            this.GW = false; // Golden Winston
            this.GWwC = random(5) < 1; // Golden Winston will Come
            this.GWCT = random(516); // Golden Winston Come Time
            this.GWD = random(10, 20); // Golden Winston Death
            this.GWDe = false; // Golden Winston Dead
            this.GWT.stop();
            this.GWT.start();
            this.backButton.change = false;
            this.camButton.change = false;
            this.POWTL = random(6, 12);
            this.POW = 0;
            this.POWC.stop();
            powerOutWinstonJumpscare.reset();
            squidicalJumpscare.timer.stop();
            this.aniIn = "";
            this.squidJumpscare = false;
            this.mode = "office";
            this.camOn = "Show Stage";
            this.gameTimer.stop();
            this.gameTimer.start();
            this.power = 125;
            this.fSqLev = 0;
            powerOut = false;
            rooms.office.rotY = 0;
            this.leftWall.light = false;
            this.leftWall.door = false;
            this.leftWall.doorY = false;
            this.leftWall.broken = false;
            this.rightWall.door = false;
            this.rightWall.doorY = false;
            this.rightWall.light = false;
            this.rightWall.broken = false;
            rooms.office.doorShut = false;
            this.camRot = 2.0892036732051036;
            this.camButton.choice = false;
            this.backButton.choice = false;
            noBackground();
            rooms.office.draw();
            BACK = true;
            rooms.office.update();
            rooms.office.draw();
            rooms.office.draw();
            BACK = false;
            background(0);
            this.gameStarted = true;
        },
        display: function() {
            for(var i in rooms) {
                if(i !== "office") {
                    rooms[i].move(spf*(images[rooms[i].img].width/15));
                }
            }
            samGlitch.run();
            if(mouseX<10 && mouseY<10 && mouseIsPressed) {
                
            }
            if(this.gameStarted) {
                for(var i in ani) {
                    ani[i].reset();
                }
                this.gameStarted = false;
            }
            if(this.power < 0 && (this.aniIn === "" || this.camRot === 0) && !this.squidJumpscare) {
                powerOut = true;
            }
            if(!powerOut) {
                if(ani.win.room === "Kitchen" && this.camRot === 0 && this.camOn === "Kitchen") {
                    winMusic.volume = 0.25;
                    winMusic.run();
                } else if(ani.win.room === "Kitchen") {
                    winMusic.volume = 0.0625;
                    winMusic.run();
                } else {
                    winMusic.stop();
                }
            }
            if(powerOut) {
                if(this.POWC.paused) {
                    this.POWC.start();
                }
                if(this.WFT.paused) {
                    this.POWL = true;
                    if(random(100) < 5) {
                        this.WFT.start();
                        this.WFTL = random(0.2, 0.05);
                    }
                } else {
                    this.POWL = false;
                    if(this.WFT.getTime() > this.WFTL) {
                        this.WFT.stop();
                    }
                }
                if(this.POW === 0) {
                    if(this.POWC.getTime() > this.POWTL) {
                        this.POWC.reset();
                        this.POW++;
                        this.POWTL = random(10, 40);
                    }
                } else if(this.POW === 1) {
                    winMusic.volume = 0.5;
                    winMusic.run();
                    if(this.POWC.getTime() > this.POWTL) {
                        this.POWC.reset();
                        this.POW++;
                        this.POWTL = random(10, 30);
                        winMusic.stop();
                        resetSounds();
                    }
                } else if(this.POW === 2) {
                    if(this.POWC.getTime() > this.POWTL) {
                        this.POWC.reset();
                        this.POW++;
                        this.POWTL = 1.5;
                    }
                
                } else if(this.POW === 3) {
                    if(this.POWC.getTime() > this.POWTL) {
                        jumpscareSound.reset();
                        resetSounds();
                        background(0);
                        scene = "lost";
                        return;
                    }
                }
            }
            var ttttt = true;
            for(var i in ani) {
                if(ani.room === "office") {
                    ttttt = false;
                }
            }
            if(this.GWT.getTime() > this.GWCT && this.GWwC && !this.GWTT && this.camRot === 0 && !powerOut) {
                this.GWTT = true;
            }
            if(this.GWTT && this.camRot > 0 && !this.GW && this.GWwC && this.aniIn === "" && ttttt && !powerOut) {
                this.GWTT = false;
                this.GW = true;
                this.GWT.reset();
            }
            if(this.GW && this.camRot === 0) {
                this.GW = false;
                this.GWwC = false;
            }
            if(this.GW && this.camRot > 0 && this.GWT.getTime() > this.GWD) {
                this.GWDe = true;
            }
            if(!this.camDisabled && ani.squid.danger >= 4 && this.fSqLev < 4 && this.camOn === "Squid Reef" && this.camRot === 0) {
                this.disableCams();
            }
            if(!this.camDisabled && ani.squid.danger < 4 && this.fSqLev >= 4 && this.camOn === "Squid Reef" && this.camRot === 0) {
                this.disableCams();
            }
            if(!powerOut) {
                if(this.camDisabled) {
                    if(this.camDisableTimer.getTime() > this.camDisableTimerLimit) {
                        this.camDisabled = false;
                    }
                }
                for(var i in ani) {
                    ani[i].update();
                }
            }
            if(this.camDisabled || this.camOn !== "Squid Reef" || this.camRot > 0 || ani.hal.meddledRoom === "Squid Reef") {
                this.fSqLev = ani.squid.danger;
            }
            this.time = (floor(this.gameTimer.getTime()/86)+11)%12+1;
            if(this.time === 6 && ((this.aniIn === "" || (this.aniIn === "sam" && ani.sam.jumpscareTimer.getTime <= ani.sam.jumpscareLimit)) || this.camRot === 0) && !this.squidJumpscare) {
                scene = "win";
                background(0);
                return;
                }
            if(powerOut) {
                BACK = false;
            }
            if(!powerOut && !(this.aniIn !== "" && this.camRot > 0)) {
                this.camButton.update();
                this.mode = this.camButton.choice ? "camera" : "office";
            }
            this.camRot += (this.camButton.choice && !powerOut) ? -0.25 : 0.25;
            if(this.GWDe) {
                this.camRot = 2.0892036732051036;
            }
            this.camRot = constrain(this.camRot, 0, 2.0892036732051036);
            if(this.camImg[this.camRot.toString()] === undefined) {
                noBackground();
                monitor.update(this.camRot);
                image(monitor, 0, 0);
                this.camImg[this.camRot.toString()] = get(0, 0, 600, 600);
            }
            monitor.update(this.camRot);
            if(this.squidJumpscare) {
                this.rightWall.door = false;
                this.rightWall.light = false;
                this.aniIn = "squid";
                this.camButton.choice = false;
                rooms.office.rotY = 0.7;
                BACK = false;
                this.backButton.choice = false;
                squidicalJumpscare.generate();
            }
            if(!powerOut && this.camRot === 2.0892036732051036 && this.aniIn === "") {
                if(!this.GW) {
                    this.backButton.update();
                    BACK = this.backButton.choice;
                } else {
                    this.backButton.choice = false;
                    BACK = false;
                }
            }
            if(this.aniIn === "pant") {
                this.camButton.choice = false;
            }
            if(this.aniIn === "fuzz") {
                this.camButton.choice = false;
            }
            this.leftWall.update();
            this.rightWall.update();
            if(this.camRot > 0) {
                if(this.aniIn !== "") {
                    if(this.aniIn === "hopps" || this.aniIn === "ohnoes" || this.aniIn === "win" || this.aniIn === "sam") {
                        BACK = false;
                        rooms.office.rotY = 0;
                    } else if(this.aniIn === "pant") {
                        BACK = true;
                    } else if(this.squidJumpscare) {
                        rooms.office.rotY = 0.7;
                    }
                }
                if(this.POW < 2) {
                    rooms.office.update();
                    if(this.aniIn === "hopps" || this.aniIn === "ohnoes" || this.aniIn === "win" || this.aniIn === "sam") {
                        BACK = false;
                        rooms.office.rotY = 0;
                    }
                    if(this.squidJumpscare) {
                        rooms.office.rotY = 0.7;
                    }
                }
                // {
                    var was_a_cat = 0;
                    if(this.POW === 1) {
                        was_a_cat = this.POWL ? 1 : 2;
                    }
                    var choice = ODI.choice(rooms.office.rotY,
                    (powerOut ? 1 : 0), !BACK,
                    (BACK ? rooms.office.doorRot : {doorY: this.leftWall.doorY, door: this.leftWall.door,  light: this.leftWall.light, hopps: (ani.hopps.room === "Left Door" && this.leftWall.light), hal: (ani.hal.room === "Left Door" && this.leftWall.light), win: was_a_cat}),
                    {doorY: this.rightWall.doorY, door: this.rightWall.door,  light: this.rightWall.light, ohnoes: (ani.ohnoes.room === "Right Door" && this.rightWall.light), hal: (ani.hal.room === "Right Door" && this.rightWall.light)}
                    );
                    // } Important For Delag‼
                if(!choice) {
                    this.leftWall.draw();
                    images.LD = this.leftWall.img;
                    this.rightWall.draw();
                    images.RD = this.rightWall.img;
                }
                if(!choice) {
                    noBackground();
                    rooms.office.draw();
                    ODI.imgs[ODI.imgFind] = get(0, 0, 600, 600);
                }
                if(this.aniIn === "") {
                    background(0);
                    if(BACK && ani.pant.runPos < 50 && ani.pant.runPos >= 0) {
                        mrPantJumpscare.draw();
                    }
                    image(ODI.imgs[ODI.imgFind], 0, 0);
                    if(BACK && ani.pant.runPos >= 50) {
                        mrPantJumpscare.draw();
                    }
                    if(!powerOut && this.camRot > 0 && !this.GW) {
                        this.backButton.draw();
                        noStroke();
                        textFont(createFont("Arial Black"));
                        textSize(15);
                        fill(255);
                        textAlign(CENTER, CENTER);
                        text("BACK", 300, 37.5);
                    }
                    if(this.GWDe) {
                        goldenWinston(300, 300, 800);
                        throw{message: "Golden Winston crashed this program!"};
                    }
                    if(this.GW) {
                        goldenWinston(300, 400, 400);
                    }
                } else {
                    if(this.aniIn === "hopps" || this.aniIn === "ohnoes" || this.aniIn === "win" || this.aniIn === "fuzz" || this.aniIn === "sam") {
                        BACK = false;
                        rooms.office.rotY = 0;
                        background(0);
                    } else if(this.aniIn === "pant") {
                        BACK = true;
                        background(0);
                        
                    } else if(this.squidJumpscare) {
                        rooms.office.rotY = 0.7;
                        background(0);
                        image(ODI.imgs[ODI.imgFind], 0, 0);
                        squidicalJumpscare.draw();
                    }
                    if(this.aniIn === "hopps") {
                        pushMatrix();
                        translate(300 + noise((millis()/16)/5)*50 - 25, 300 + noise((millis()/16)/5+1000)*50 - 25);
                        rotate(noise((millis()/16)/5)*25-12.5);
                        imageMode(CENTER);
                        image(ODI.imgs[ODI.imgFind], 0, 0, 700, 700);
                        imageMode(CORNER);
                        popMatrix();
                        
                        pushMatrix();
                        scale(1.5);
                        translate(200 + noise((millis()/16)/5)*25 - 12.5, 200 + noise((millis()/16)/5+1000)*25 - 12.5);
                        rotate(13+sin((millis()/16)*15)*10-5 + noise((millis()/16)/5)*25 - 12.5);
                        drawAnimatronicHopper(0, 225, -125-sin((millis()/16)*15)*12, sin((millis()/16)*15)*30+30, 2, 0, 0, [sin((millis()/16)*15)*20, 0], [cos((millis()/16)*15)*20, 0], [0, 0], [0, 0], 0, 0, 0.17);
                        popMatrix();
                    } else if(this.aniIn === "ohnoes") {
                        pushMatrix();
                        translate(300 + noise((millis()/16)/5)*50 - 25, 300 + noise((millis()/16)/5+1000)*50 - 25);
                        rotate(noise((millis()/16)/5)*25-12.5);
                        imageMode(CENTER);
                        image(ODI.imgs[ODI.imgFind], 0, 0, 700, 700);
                        imageMode(CORNER);
                        popMatrix();
                        
                        popMatrix();
                        pushMatrix();
                        scale(1.5);
                        translate(200 + noise((millis()/16)/5)*25 - 12.5, 200 + noise((millis()/16)/5+1000)*25 - 12.5);
                        rotate(-21+sin((millis()/16)*7.5*1.25)*28-7 + noise((millis()/16)/5)*15 - 12.5);
                        drawAnimatronicOhNoes(0, 0, -44 + sin((millis()/16)*20)*30, cos((millis()/16)*15)*30 + sin((millis()/27)*15)*180, 10, 0, sin((millis()/16)*15)*30+60, 0, 0.25);
                        popMatrix();
                    
                    } else if(this.aniIn === "win") {
                        pushMatrix();
                        translate(300 + noise((millis()/16)/5)*50 - 25, 300 + noise((millis()/16)/5+1000)*50 - 25);
                        rotate(noise((millis()/16)/5)*25-12.5);
                        imageMode(CENTER);
                        image(ODI.imgs[ODI.imgFind], 0, 0, 700, 700);
                        imageMode(CORNER);
                        popMatrix();
                        
                        popMatrix();
                        pushMatrix();
                        translate(300 + noise((millis()/16)/5)*25 - 12.5, 300 + noise((millis()/16)/5+1000)*25 - 12.5);
                        rotate(sin(millis()*0.7)*50);
                        drawAnimatronicWinston(0, 0, -150, 100, 50, 0, 0, millis()*-0.5, 0.5);
                        popMatrix();
                    } else if(this.aniIn === "pant") {
                        pushMatrix();
                        translate(300 + noise((millis()/16)/5)*50 - 25, 300 + noise((millis()/16)/5+1000)*50 - 25);
                        rotate(noise((millis()/16)/5)*25-12.5);
                        imageMode(CENTER);
                        image(ODI.imgs[ODI.imgFind], 0, 0, 700, 700);
                        imageMode(CORNER);
                        popMatrix();
                        
                        mrPantJumpscare.draw();
                    } else if(this.aniIn === "fuzz") {
                        pushMatrix();
                        translate(300 + noise((millis()/16)/5)*50 - 25, 300 + noise((millis()/16)/5+1000)*50 - 25);
                        rotate(noise((millis()/16)/5)*25-12.5);
                        imageMode(CENTER);
                        image(ODI.imgs[ODI.imgFind], 0, 0, 700, 700);
                        imageMode(CORNER);
                        popMatrix();
                        
                        pushMatrix();
                        translate(300, 300);
                        rotate(-20+sin(millis())*20);
                        drawFuzzy(0, 0, -150+cos(millis())*20, millis()/10, sin(millis()/2)*20, 0.00, 255, 5);
                        popMatrix();
                    }
                    if(this.camRot > 1.750 && this.aniIn !== "sam") {
                        jumpscareSound.run();
                        if(jumpscareSound.time.getTime() > 1.5) {
                            jumpscareSound.reset();
                            resetSounds();
                            scene = "lost";
                        }
                    }
                    if(this.aniIn === "sam") {
                        jumpscareReady.run();
                        if(ani.sam.jumpscareTimer.paused) {
                            ani.sam.jumpscareTimer.start();
                            }
                        // println(ani.sam.jumpscareTimer.getTime());
                        image(ODI.imgs[ODI.imgFind], 0, 0);
                        animatronicSam(300, 400, -90, 0, samGlitch.glitch, 0.00);
                        if(ani.sam.jumpscareTimer.getTime() > ani.sam.jumpscareLimit) {
                            jumpscareSound.run();
                            if(jumpscareSound.time.getTime() > 1.5) {
                                jumpscareSound.reset();
                                resetSounds();
                                scene = "lost";
                            }
                            jumpscareReady.stop();
                            pushMatrix();
                            translate(300 + noise((millis()/16)/5)*50 - 25, 300 + noise((millis()/16)/5+1000)*50 - 25);
                            rotate(noise((millis()/16)/5)*25-12.5);
                            imageMode(CENTER);
                            image(ODI.imgs[ODI.imgFind], 0, 0, 700, 700);
                            imageMode(CORNER);
                            popMatrix();
                            
                            pushMatrix();
                            translate(300, 300);
                            rotate(noise(millis()/100)*320-160);
                            animatronicSam(0, 0, -140+noise(millis()/100)*160-80, 0, [floor(random(2)),floor(random(2)),floor(random(2)),floor(random(2)),floor(random(2)),floor(random(2)),floor(random(2))], 0.00);
                            popMatrix();
                        }
                    }
                }
                //fill(255, 0, 0, 100);println(mouseX + ", " + mouseY);
                //rect(mouseX, mouseY, 50, 50); 
                // fill(255, 0, 0, 100);
                // rect(mouseX, mouseY, 50, 50);
                // println(mouseX + ', ' + mouseY);
            }
            this.powerUsage = 1;
            if(!powerOut) {
                image(this.camImg[this.camRot.toString()], 0, 0);
                if(this.camRot === 0) {
                    rooms.office.roorRot = 0;
                    if(this.aniIn === "" || (this.aniIn === "sam" && this.camRot === 0)) {
                        if(ani.hopps.room === "Left Door" && this.leftWall.broken) {
                            ani.hopps.room = "office";
                            this.aniIn = "hopps";
                        } else if(ani.ohnoes.room === "Right Door" && this.rightWall.broken) {
                            ani.ohnoes.room = "office";
                            this.aniIn = "ohnoes";
                        } else if(ani.win.room === "office") {
                            this.aniIn = "win";
                        } else if(ani.fuzz.room === "office") {
                            this.aniIn = "fuzz";
                        }
                    }
                    if(this.aniIn === "hopps" || this.aniIn === "ohnoes" || this.aniIn === "win") {
                        jumpscareReady.run();
                        if(this.JWT.paused) {
                            this.JWT.start();
                        }
                        if(this.JWT.getTime() > this.JWL) {
                            this.camButton.choice = false;
                        }
                    } else {
                        jumpscareReady.stop();
                        this.JWT.stop();
                    }
                    this.powerUsage++;
                    this.leftWall.light = false;
                    this.rightWall.light = false;
                    background(0);
                    if(!this.camDisabled) {
                        var eee;
                        switch(this.camOn) {
                            case "Squid Reef": eee = this.fSqLev; break;
                            case "East Hall 2": eee = {squid: ani.squid.runPos, ohnoes: ani.ohnoes, win: ani.win, hal: ani.hal}; break;
                            case "Show Stage": eee = ani; break;
                            case "Dining Area": eee = ani; break;
                            case "East Hall 3": eee = ani; break;
                            case "South Hall": eee = ani; break;
                            case "West Hall": eee = ani; break;
                            case "North Hall": eee = ani; break;
                            case "Furnace Room": eee = ani; break;
                            case "Supply Closet": eee = ani.hopps; break;
                            case "Spare Room": eee = ani; break;
                            case "Backstage": eee = ani.hopps; break;
                            case "East Hall 1": eee = ani; break;
                            case "Changing Rooms": eee = ani; break;
                            case "Laser Tag Preparatory": eee = ani; break;
                            case "Bathrooms": eee = ani; break;
                            case "Kitchen Tools": eee = ani.fuzz; break;
                            case "Arcade": eee = ani; break;
                        }
                        if(ani.hal.meddledRoom !== this.camOn) {
                            rooms[this.camOn].display(eee);
                        }
                    }
                    displayNoise();
                    if(this.camOn === "Kitchen") {
                        fnafTextCenter("-CAMERA DISABLED-\nAUDIO ONLY", 300, 50, 3);
                    }
                    image(images.minimap, 0, 0);
                    fill(255,
                        constrain(255-floor(millis()/16/10)%15*255, 0, 255)
                    );
                    rect(285, 465, 10, 10);
                    noFill();
                    stroke(255);
                    strokeWeight(2);
                    rect(15, 15, 570, 570);
                    fnafText("YOU", 282, 454, 1);
                    rect(500, 500, 30, 20);
                    fnafText("DIE", 500+3, 500+4, 1.5);
                    if(mouseIsClicked && mouseX > 500+3 && mouseX < 500+3+30 && mouseY > 500+4 && mouseY < 500+4+20) {
                        this.aniIn = "hopps";
                        this.camButton.choice = false;
                    }
                    noStroke();
                    fill([
                        color(255, 0, 0),
                        color(0)
                        ]
                        [floor(millis()/16/100)%2],
                        (floor(millis()/16/100+1)%2)*255
                    );
                    ellipse(60, 60, 30, 30);
                    var b = this.camOn === "Laser Tag Preparatory";
                    fnafText(this.camOn, 250-(b ? 50 : 0), 225, 3);
                    for(var i=0; i<this.cams.length; i++) {
                        this.cams[i].display();
                    }
                    image(this.camLabels, 0, 0);
                }
                if(!powerOut && !(this.aniIn !== "" && this.camRot > 0)) {
                    this.camButton.draw();
                    (stroke)(255, 200);
                    strokeWeight(2.5);
                    strokeCap(SQUARE);
                    line(250, 565, 300, 570);
                    line(350, 565, 300, 570);
                    line(250, 555, 300, 560);
                    line(350, 555, 300, 560);
                    strokeCap(ROUND);
                    noStroke();
                }
                // (fill)(255, 25);
                // (stroke)(255, 200);
                // strokeWeight(2.5);
                // rect(150, 550, 300, 25, 2.5);
                if(this.camRot > 0 || this.aniIn === "") {
                    if(this.leftWall.light) {
                        this.powerUsage++;
                    }
                    if(this.leftWall.door) {
                        this.powerUsage++;
                    }
                    if(this.rightWall.light) {
                        this.powerUsage++;
                    }
                    if(this.rightWall.door) {
                        this.powerUsage++;
                    }
                    if(this.powerUsage === 1) {
                        this.power-=spf/random(9, 10);
                    } else if(this.powerUsage === 2) {
                        this.power-=spf/random(5, 6);
                    } else if(this.powerUsage === 3) {
                        this.power-=spf/4;
                    } else if(this.powerUsage === 4) {
                        this.power-=spf/random(2, 3);
                    }
                }
                var tp = 0;
                tp = this.time.toString().length*18;
                fnafText(this.time + " AM", 530-tp, 20, 3);
                for(var i = 0; i<2; i++) {
                    fnafText("Night " + Cnight, 510+i/2, 50, 1.3);
                    fnafText("Usage:", 20+i/2, 570, 1.5);
                    fnafText("Power left:", 20+i/2, 540, 1.5);
                }
                fnafText(floor(this.power*0.8)+1 + "%", 115, 537, 2);
                drawPowerUsage(80, 560, this.powerUsage);
                if(false) {
                    // Debugging {
                    textSize(10);
                    fill(255);
                    textAlign(CENTER, CENTER);
                    text("hopps: " + ani.hopps.room + "\n" +
                    ani.hopps.level + "\n" +
                    (ani.hopps.wait-ani.hopps.moveTimer.getTime()).toFixed(2),
                    75, 25);
                    text("ohnoes: " + ani.ohnoes.room + "\n" +
                    ani.ohnoes.level + "\n" +
                    (ani.ohnoes.wait-ani.ohnoes.moveTimer.getTime()).toFixed(2),
                    200, 25);// println(ani.squid.c);
                    text("squid: " + ani.squid.level + "\n" + ani.squid.c.toFixed(2) + "\n" + ani.squid.anger.toFixed(2),
                    325, 25);
                    text("win: " + ani.win.room + "\n" +
                    ani.win.level + "\n" +
                    (ani.win.wait-ani.win.moveTimer.getTime()).toFixed(2),
                    450, 25);
                    text("pant: " + ani.pant.level + "\n" +
                    (ani.pant.limit-ani.pant.timer.getTime()).toFixed(2) + "\n" +
                    ani.pant.runPos.toFixed(2),
                   75, 75);
                    text("hal: " + ani.hal.room + "\n" +
                    ani.hal.level + "\n" +
                    (ani.hal.wait-ani.hal.moveTimer.getTime()).toFixed(2) + "\n" + ani.hal.MWP,
                   200, 75);
                    text("fuzz: " + ani.fuzz.room + "\n" +
                    ani.fuzz.level + "\n" +
                    (ani.fuzz.wait-ani.fuzz.moveTimer.getTime()).toFixed(2),
                   325, 75);
                    text("sam: " + ani.sam.room + "\n" +
                    ani.sam.level + "\n" +
                    ani.sam.pos + "\n" +
                    (ani.sam.wait-ani.sam.moveTimer.getTime()).toFixed(2),
                   450, 75);
                // }
                }
                    //text("win: " + ani.win.room + "\n" +
                    //ani.win.level + "\n" +
                    //(ani.win.wait-ani.win.moveTimer.getTime()).toFixed(2),
                    //450, 25);
            }
            if(this.POW >= 2) {
                background(0);
                if(this.POW >= 3) {
                    jumpscareSound.run();
                    powerOutWinstonJumpscare.draw();
                }
            }
        },
    },
    win: {
        y: -10,
        display: function() {
            drawWin(this.y);
            this.y+=0.5;
            if(this.y > 250) {
                this.y = -10;
                var tt = false;
                if(Cnight === 6 || Cnight === 7) {
                    tt = true;
                }
                Cnight = null;
                if(night < 5) {
                    night++;
                    scene = "startgame";
                    scenes.game.startGame();
                } else if(night >= 5) {
                    night = 0;
                    Tnight = 3;
                    scene = "menu";
                }
                if(night > 0 && Tnight === 0) {
                    Tnight = 1;
                }
                if(Cnight === null) {
                    Cnight = night;
                }
                if(Cnight === 0) {
                    Cnight = 1;
                }
                if(tt) {
                    scene = "menu";
                }
            }
        }
    },
    lost: {
        timer: new Timer(),
        display: function() {
            Cnight = null;
            if(night > 0 && Tnight === 0) {
                Tnight = 1;
            }
            if(this.timer.paused) {
                this.timer.start();
            }
            background(0);
            for(var i=0; i<20; i++) {
                image(randChoice(images.noise), 0, 0, width, height);
            }
            if(this.timer.getTime() < 2) {
                gameStart();
            }
            noiseSound.play();
            if(this.timer.getTime() > 5) {
                this.timer.stop();
                sceneChange("menu");
            }
        }
    }
};
/*
                switch(texCount) {
                    case 0:
                        createTexture([color(156, 81, 6), color(245, 209, 110)], [0.1, 0.01], 5, texTime, 5, 5);break;
                    case 1:
                        createTexture([color(0), color(255)], [0.05, 0.05], 7, texTime, 3, 5);break;
                    case 2:
                        createTexture([(color)(255, 50), (color)(0, 100)], [0.01, 0.01], 1, texTime, 25, 3);break;
                }
*/
var Button = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.mouseOver = function() {
        return mouseX>this.x && mouseX<this.x + this.width && mouseY>this.y && mouseY < this.y + this.height;
    };
    this.display = function() {
        var o = 10;
        if(this.mouseOver()) {
            curs = "pointer";
            o+=10;
            if(mouseIsPressed) {
                o += 50;
            }
        }
        (fill)(0, o);
        rect(this.x, this.y, this.width, this.height, 10);
    };
};
var loadingButton = new Button(175, 375, 250, 100);
var camThing = false;
// {
spf = 0;
s = millis();
//} Timestepping Variables
draw = function() {
    cursor(curs);
    curs = "default";
    // {
    spf = (millis()-s)/1000;
    s = millis();
    //} The Use Of The Timestepping Variables
    // println((1/spf).toFixed(0) + " " + mouseX + ", " + mouseY);
    background(255);
    if(!gameOn) {
        if(loadingMode !== "Done") {
            curs = "wait";
        }
        if(loadingDone>=loadingLimit) {
            loadingMode = "Done";
        }
        else if(loadingDone>=loadingLimit-fnafFontChars.length) {
            loadingMode = "Font";
            fnafFontMaker();
        }
        else if(loadingDone>=loadingLimit-fnafFontChars.length-IGF.length) {
            loadingMode = "Images";
            IGF[IGFC]();
            IGFC++;
        }
        else if(loadingDone>=loadingLimit-fnafFontChars.length-IGF.length-textures.length*200/3) {
            loadingMode = "Textures";
            if(textureProgress === null) {
                noBackground();
                textureProgress = get(0, 0, 200, 200);
            }
            if(texCount<textures.length) {
                if(texTime<=200) {
                    for(var i=0; i<min(201-texTime, 4); i++) {
                        createTexture(textures[texCount][0], textures[texCount][1], textures[texCount][2], texTime, textures[texCount][4], textures[texCount][5], textures[texCount][6]);
                        (image)(textureProgress);
                        textureProgress = get(0, 0, 200, 200);
                        texTime++;
                    }
                } else {
                    images.textures.push(textureProgress);
                    noBackground();
                    textureProgress = get(0, 0, width, height);
                    texCount++;
                    texTime = 0;
                }
            }
            background(255);
            image(textureProgress, 0, 0, 100, 100);
        }
        else if(loadingDone>=0) {
            loadingMode = "Noise";
            images.noise.push(generateNoise());
            fill(0);
            rect(0, 0, 100, 100);
            image(images.noise[loadingDone], 0, 0, 100, 100);
        }
        loadingDone++;
        fill(255);
        rect(0, 0, width, height);
        if(loadingMode === "Done") {
            curs = "default";
            loadingDone = loadingLimit;
            loadingButton.display();
            fill(0);
            textAlign(CENTER, CENTER);
            textSize(50);
            textFont(createFont("Arial Black"));
            text("PLAY", 300, 425);
            // fnafText("PLAY", 220, 397.5, 7);
            // fnafText("Hi! This font is working\nThe time is: " + (hour()%13) + ":" + (minute()<10 ? "0" : "") + minute() + (hour()<12 ? "am" : "pm"), 200, 200, 2);
            if(loadingButton.mouseOver() && mouseIsClicked) {
                gameOn = true;
            }
        }
        noFill();
        stroke(0, 140, 255, 200);
        strokeWeight(20);
        var lc = map(loadingLimit-loadingDone, loadingLimit, 0, 0, 360);
        var lt = map(loadingLimit-loadingDone, loadingLimit, 0, 0, 100);
        arc(width/2, height/2, 100, 100, lc/2-90, lc*1.5-90);
        noStroke();
        textFont(createFont("monospace"));
        (fill)(0, 200);
        textSize(25);
        textFont(createFont("Arial Bold"));
        textAlign(CENTER, CENTER);
        text(floor(lt)+"%", width/2, height/2);
        doneLoading = loadingDone>loadingLimit;
        textSize(35);
        text("Loading " + loadingMode, width/2, height*0.875);
        mouseIsClicked = false;
        return;
    }
    if(!camThing) {
        noBackground();
        for(var i = 0; i<scenes.game.cams.length; i++) {
            scenes.game.cams[i].drawLabel();
        }
        scenes.game.camLabels = get(0, 0, 600, 600);
        camThing = true;
        return;
    }
    textFont(createFont("monospace"));
    scenes[scene].display();
    scB.pop();
    for(var i=0;i<scB.length;i++) {
        fill(255);
        rect(0, scB[i][0], width, scB[i][1]);
    }
    mouseIsClicked = false;
    runSounds();
    if(false) {
        background(255);
        fill(0, 89, 255);
        textSize(31);
        text("What does Winston say?", 10, 41);
        image(getImage("creatures/Winston"), 100, 100);
        mouseClicked = function() {
            playSound(getSound("rpg/giant-hyah"));
        };
    }
    mouseWasReleased = false;
    mouseWasPressed = false;
    mouseIsClicked = false;
};
// }
