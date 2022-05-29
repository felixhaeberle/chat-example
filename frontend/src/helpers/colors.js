export function getSimilarColors (color) {
  let base_colors=["660000","990000","cc0000","cc3333","ea4c88","993399","663399","333399","0066cc","0099cc","66cccc","77cc33","669900","336600","666600","999900","cccc33","ffff00","ffcc33","ff9900","ff6600","cc6633","996633","663300","000000","999999","cccccc","ffffff"];

  //Convert to RGB, then R, G, B
  let color_rgb = hex2rgb(color);
  let color_r = color_rgb.split(',')[0];
  let color_g = color_rgb.split(',')[1];
  let color_b = color_rgb.split(',')[2];

  //Create an emtyp array for the difference betwwen the colors
  let differenceArray=[];

  //Function to find the smallest value in an array
  Array.min = function( array ){
    return Math.min.apply( Math, array );
  };


  //Convert the HEX color in the array to RGB colors, split them up to R-G-B, then find out the difference between the "color" and the colors in the array
  base_colors.forEach((value, index) => {
    let base_color_rgb = hex2rgb(value);
    let base_colors_r = base_color_rgb.split(',')[0];
    let base_colors_g = base_color_rgb.split(',')[1];
    let base_colors_b = base_color_rgb.split(',')[2];

    //Add the difference to the differenceArray
    differenceArray.push(Math.sqrt((color_r-base_colors_r)*(color_r-base_colors_r)+(color_g-base_colors_g)*(color_g-base_colors_g)+(color_b-base_colors_b)*(color_b-base_colors_b)));
  })

  //Get the lowest number from the differenceArray
  let lowest = Array.min(differenceArray);

  //Get the index for that lowest number
  let index = differenceArray.indexOf(lowest);

  //Function to convert HEX to RGB
  function hex2rgb( colour ) {
      let r,g,b;
      if ( colour.charAt(0) === '#' ) {
          colour = colour.substr(1);
      }

      r = colour.charAt(0) + colour.charAt(1);
      g = colour.charAt(2) + colour.charAt(3);
      b = colour.charAt(4) + colour.charAt(5);

      r = parseInt( r,16 );
      g = parseInt( g,16 );
      b = parseInt( b ,16);
      return r+','+g+','+b;
  }

  //Return the HEX code
  return base_colors[index];
}

export const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '';
  for (let x = 0; x < 3; x++) {
    let value = (hash >> (x * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}