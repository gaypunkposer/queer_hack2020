import Phaser from 'phaser';
import images from './assets/*.png'
import map from './assets/map.json'

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
}

function update() {

}