var colors = {
  0: '#FFFFFF',
  1: '#E4E4E4',
  2: '#888888',
  3: '#222222',
  4: '#FFA7D1',
  5: '#E50000',
  6: '#E59500',
  7: '#A06A42',
  8: '#E5D900',
  9: '#94E044',
  A: '#02BE01',
  B: '#00D3DD',
  C: '#0083C7',
  D: '#0000E4',
  E: '#CF6EE4',
  F: '#820080'
};

var Jimp = require("jimp");
var nearestColor = require('nearest-color').from(colors);

nearestColor('#800'); // => { name: 'red', value: '#f00', rgb: { r: 255, g: 0, b: 0 } }
nearestColor('#ffe'); // => { name: 'yellow', value: '#ff0', rgb: { r: 255, g: 255, b: 0 } }

Jimp.read("Tux.png", function (err, image) {
    if (err) throw err;
    str = '';
    count = 0;
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        // x, y is the position of this pixel on the image
        // idx is the position start position of this rgba tuple in the bitmap Buffer
        // this is the image

        var r   = this.bitmap.data[ idx + 0 ];
        var g = this.bitmap.data[ idx + 1 ];
        var b  = this.bitmap.data[ idx + 2 ];
        var a = this.bitmap.data[ idx + 3 ];

        function rgba2hex(r, g, b, a) {
            if (r > 255 || g > 255 || b > 255 || a > 255)
                throw "Invalid color component";
            return (256 + r).toString(16).substr(1) +((1 << 24) + (g << 16) | (b << 8) | a).toString(16).substr(1);
        }

        var hex = '#' + rgba2hex(r,g,b,255)
        near = nearestColor(hex.substring(0, hex.length - 2))
        str += near.name;
        if (x === image.bitmap.width - 1) {
          str += ',\n'
        }

        // rgba values run from 0 - 255
        // e.g. this.bitmap.data[idx] = 0; // removes red from this pixel
    });
    console.log(str)
    console.log(image.bitmap.height)
});
