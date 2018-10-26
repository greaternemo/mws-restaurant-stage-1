// util.js
// a place for me to put utility functions to share between
// main.js and restaurant_info.js

let util = {};

util.addImgAlt = function (img) {
  const descriptions = {
    '/img/1.jpg': 'A well-lit and crowded dining area with a central brass chandelier',
    '/img/2.jpg': 'A stone-fired cheese pizza with lightly-charred edges',
    '/img/3.jpg': 'A dining area furnished in finished wood and stainless steel',
    '/img/4.jpg': 'A fish-eye view of an old-style deli from the street corner outside',
    '/img/5.jpg': 'A darker crowded dining area with a smiling man behind a counter',
    '/img/6.jpg': 'A rustic dining area furnished with rough wood and folding chairs',
    '/img/7.jpg': 'A monochrome photo of two men walking a dog past a busy dive',
    '/img/8.jpg': 'An upward shot of "the DUTCH" sign on a wall over an awning',
    '/img/9.jpg': 'A monochrome photo of a dining room full of young adults eating ramen',
    '/img/10.jpg': 'A bright, modern dining area, furnished in white with steel accents',
  };
  
  for (let path of Object.keys(descriptions)) {
    if (img.src.endsWith(path)) {
      //console.log(`added alt to ${path}`);
      img.alt = descriptions[path];
      break;
    }
  }
};