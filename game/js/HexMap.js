/*jshint esversion: 6 */

class HexMap {
    constructor(scene, tileSize, xOffset, yOffset, file){
        this.tileSize = tileSize;
        this.scene = scene;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.tileGroup = null;  //holds the names of each tile specified in the json file, the index of each element corresponds to the numbers in the map of the json file
        this.jsonMap = null;
        this.map = null;
        this.width = null;
        this.length = null;
        this.loaded = this.loadMap(file, this);       //holds a promise to be able to call functions that require the map to be loaded
    }

    loadTiles(tileList, hexMap) {
        let tileGroup = [];
        tileList.forEach(element => {
            hexMap.scene.load.image(element.name, element.link);
            tileGroup.push(element.name);
        });
        return tileGroup;
    }

    loadMap(file, hexMap) {
        return fetch(file)
         .then(response => response.json())
         .then(function(json){
             hexMap.tileGroup = hexMap.loadTiles(json.tiles, hexMap);
             hexMap.width = json.size.width;
             hexMap.length = json.size.length;
             hexMap.jsonMap = JSON.parse( localStorage.getItem("map") );
             if (!hexMap.jsonMap) {
                 hexMap.jsonMap = hexMap.generateDefaultMap();
             } else if (hexMap.width != hexMap.jsonMap.length || hexMap.length != hexMap.jsonMap[hexMap.jsonMap.length - 1].length) {
                 hexMap.jsonMap = hexMap.generateDefaultMap();
             }
             
         });
     }

     generateMap() {
        let tileWidth = Math.sqrt(3) / 2 * this.tileSize;
        let tileHeight = 2 * (this.tileSize/3);
        let map = [];

        for (let xIndex = 0; xIndex < this.width; xIndex++) {
            map[xIndex] = [];
            for (let yIndex = 0; yIndex < this.length; yIndex++) {
                let xSpacing = tileWidth * xIndex;
                let ySpacing = tileHeight * 0.75 * yIndex;
                if (yIndex%2 == 0) {
                    map[xIndex][yIndex] = new Tile(this.tileGroup[this.jsonMap[xIndex][yIndex]], this.scene, xSpacing + this.xOffset, ySpacing + this.yOffset, this.oddrToCube(xIndex, yIndex), this.tileSize);
                } else {
                    map[xIndex][yIndex] = new Tile(this.tileGroup[this.jsonMap[xIndex][yIndex]], this.scene, (xSpacing + tileWidth / 2) + this.xOffset, ySpacing + this.yOffset, this.oddrToCube(xIndex, yIndex), this.tileSize);
                }
            }
        }
        this.map = map;
    }

    cubeToOddr(cubePosition){
        var collum = cubePosition.x + (cubePosition.z - (cubePosition.z&1)) / 2;
        var row = cubePosition.z;
        return {x: collum, y: row};
    }

    oddrToCube(collum, row) {
        var x = collum - (row - (row&1)) / 2;
        var z = row;
        var y = -x-z;
        return {x: x, y: y, z: z};
    }

    selectTile(x,y) {
        this.map[x][y].setTexture(this.selectedTileTexture);
    }

    unselectTile(x,y) {
        this.map[x][y].setTexture(this.tileTexture);
    }

    getTile(position) {
        if (position.x < this.width && position.y < this.length && position.x >= 0 && position.y >= 0){
            return this.map[position.x][position.y];
        } else {
            console.log("out of bounds");
            return null;
        }
    }

    //will return a jsonMap with the width and length specified in the constructor
    generateDefaultMap(){
        let hexMap = this;
        let map = Array.apply(null, {length: hexMap.width}).map(Number.call, Number);
        map.forEach(function(element) {
            map[element] = Array.apply(null, {length: hexMap.length}).map(Number.call, function(){return 0;});
        });
        console.log(map);
        return map;
    }
}