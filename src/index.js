import Phaser from 'phaser';
import images from './assets/*.png'
import map from './assets/map.json'
import conversations from './assets/conversations.json'

var convoTxt;   //phaser text
const charDelay = 40;   //delay between character typing
const lineDelay = 3000; //delay between each line (todo: on click)
var gameState = "intro"; //possible states? intro, moving, transition(?), convoSpeaking, convoWaiting
var convo = {
    lineArray: "",
    splitLine: "",
    currentLine: "",
    lineIndex: 0,
    charIndex: 0
};

window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    }

    let game = new Phaser.Game(gameConfig);
};

function preload() {
    this.load.tilemapTiledJSON("map", map);
    this.load.image("tiles", images.level_tilesheet);
}

function create() {
    this.map = this.make.tilemap({
        key: "map"
    });
    let tile = this.map.addTilesetImage("Tileset", "tiles");
    this.layer = this.map.createStaticLayer("Tile Layer 1", tile);
    convoTxt = this.make.text({
        x: 0,
        y: 400,
        text: "",
        style: {
            fontSize: "32px",
            fontFamily: "Courier New",
            color: "#ffffff",
            align: "left",  // 'left'|'center'|'right'|'justify'
            wordWrap: { width: 768  }
        },
        padding: {
            left: 32,
            right: 8,
            top: 16,
            bottom: 32
        },
    });

    startConvo.call(this, conversations.z1); //not in update bc it would loop
}

function update() {
}

function startConvo(currentConvo) {
    convo.lineArray = currentConvo;
    convo.lineIndex = 0;
    convo.charIndex = 0;
    convo.splitLine = convo.lineArray["line" + convo.lineIndex].split(""); //splits into chars
    convoTxt.setText("");
    this.time.delayedCall(charDelay, nextChar, [], this); //after a delay, calls nextChar
}

function nextChar() {
    convoTxt.setText(convoTxt.text + convo.splitLine[convo.charIndex]); //concatenates the next char to the end of the current display
    convo.charIndex++;
    if (convo.charIndex >= convo.splitLine.length) {
        convo.lineIndex++;
        if (convo.lineIndex < convo.lineArray.length) {
            this.time.delayedCall(lineDelay, nextLine, [], this);
        }
        return;
    }
    this.time.delayedCall(charDelay, nextChar, [], this);
}

function nextLine() {
    convo.charIndex = 0;
    convo.splitLine = convo.lineArray["line" + convo.lineIndex].split(""); //splits into chars
    convoTxt.setText("");
    this.time.delayedCall(charDelay, nextChar, [], this); //after a delay, calls nextChar
}