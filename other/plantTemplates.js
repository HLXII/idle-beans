/**
 * This script file is to convert all the Plant images into Vue components.
 * This uses a modified version of the script from Pixels.svg (https://codepen.io/shshaw/full/XbxvNj)
 * Run in the command line using 'node plantTemplate.js'
 */

const { createCanvas, loadImage } = require('canvas')
const fs = require('fs');
const handlebars = require('handlebars');

const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')

//#region Conversion code (https://codepen.io/shshaw/full/XbxvNj)

function each(obj,fn) {
  const length = obj.length;
  const likeArray = ( length === 0 || ( length > 0 && (length - 1) in obj ) );
  let i = 0;

  if ( likeArray ) {
    for ( ; i < length; i++ ) { if ( fn.call( obj[ i ], i, obj[ i ] ) === false ) { break; } }
  } else {
    for (i in obj) { if ( fn.call( obj[ i ], i, obj[ i ] ) === false ) { break; } }
  }
}

function convertImage(plantName, img, tabs){
  "use strict";

  function each(obj,fn) {
    const length = obj.length;
    const likeArray = ( length === 0 || ( length > 0 && (length - 1) in obj ) );
    let i = 0;

    if ( likeArray ) {
      for ( ; i < length; i++ ) { if ( fn.call( obj[ i ], i, obj[ i ] ) === false ) { break; } }
    } else {
      for (i in obj) { if ( fn.call( obj[ i ], i, obj[ i ] ) === false ) { break; } }
    }
  }


  function componentToHex(c) {
    const hex = parseInt(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function getColor(r,g,b,a){
    a = parseInt(a);
    if ( a === undefined || a === 255 ) { return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b); }
    if ( a === 0 ) { return false; }
    return 'rgba('+r+','+g+','+b+','+(a/255)+')';
  }

  // Optimized for horizontal lines
  function makePathData(x,y,w) { return ('M'+x+' '+y+'h'+w+''); }
  function makePath(color,data) { return '\t\t{ stroke: "'+color+'", d: "'+data+'" },'; }

  function colorsToPaths(colors){

    const output = []; 

    // Loop through each color to build paths
    each(colors,function(color,values){
      color = getColor.apply(null,color.split(','));

      if ( color === false ) { return; }

      const paths = [];
      let curPath;
      let w = 1;

      // Loops through each color's pixels to optimize paths
      each(values,function() {  

        if ( curPath && this[1] === curPath[1] && this[0] === (curPath[0] + w) ) {
          w++;
        } else {
          if ( curPath ) {
            paths.push(makePathData(curPath[0],curPath[1],w));
            w = 1;
          }
          curPath = this;
        }

      });

      paths.push(makePathData(curPath[0],curPath[1],w)); // Finish last path
      output.push(makePath(color,paths.join('')));
    });

    return output;
  }

  const getColors = function(img) {
    const colors = {};
    const data = img.data;
    const len = data.length;
    const w = img.width;
    let x = 0;
    let y = 0;
    let i = 0;
    let color;

    for (; i < len; i+= 4) {
      if ( data[i+3] > 0 ) {
        color = data[i]+','+data[i+1]+','+data[i+2]+','+data[i+3];
        colors[color] = colors[color] || [];
        x = (i / 4) % w;
        y = Math.floor((i / 4) / w);
        colors[color].push([x,y]);
      }                      
    }

    return colors;
  }

  const colors = getColors(img);
  const paths = colorsToPaths(colors);
  const output = [];
  output.push(`"${plantName}": {`);
  output.push(`\tviewBox: "0 -0.5 ${img.width} ${img.height}",`);
  output.push(`\tpaths: [`);
  output.push(...paths);
  output.push(`\t],`);
  output.push(`},`);

  const tabStr = Array(tabs).fill('\t').join('');
  const outputWithTabs = output.map((line) => tabStr + line);

  const content = outputWithTabs.join('\n');

  // Send message back to the main script
  return content.replace(/\t/g, '    ');

}

// Convert image to canvas ImageData
function imageToData(img) {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img,0,0);
  return ctx.getImageData(0,0,img.width,img.height);
}

async function convert(plantName, fileName, tabs){
  const image = await loadImage(fileName);

  const imgData = imageToData(image);
  const converted = convertImage(plantName, imgData, tabs);
  return converted;
}

//#endregion

async function convertDirectory(path) {
  const images = [];

  // Going over all images
  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir) {
    // Ignoring non-image files
    if (dirent.name.slice(dirent.name.length - 4) != '.png') {
      continue;
    }

    console.log(`Converting ${dirent.name}`);

    const name = dirent.name.slice(0,-4);
    const fullPath = path + dirent.name;
    const image = await convert(name, fullPath, 1);

    images.push(image);
  }

  return images.join('\n');
}

async function buildImages() {
  console.log('Converting plant images...');

  // Loading template
  const templateString = fs.readFileSync('./PlantImages.ts', 'utf8');
  const template = handlebars.compile(templateString);

  // Going over all plant images
  const plantImages = await convertDirectory('../src/assets/images/plants/images/');
  // Going over all plant icons
  const plantIcons = await convertDirectory('../src/assets/images/plants/icons/');

  const contents = template({IMAGES: plantImages, ICONS: plantIcons});

  // Writing to file
  fs.writeFile(`../src/scripts/plant/PlantImages.ts`, contents, function(err) {
    if (err) throw err;
    console.log('Succesfully wrote file!');
  });
}

buildImages().catch(console.error);

