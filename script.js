'use strict';

// Kurzschreibweise für querySelector
const $ = (qs) => document.querySelector(qs);

// Funktion, die die Bilder mischt
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


// Array: Bilder
const images = [
    'images/1.png',
    'images/2.png',
    'images/3.png',
    'images/4.png',
    'images/5.png',
    'images/6.png',
    'images/7.png',
    'images/8.png',
];


// Kopie der Bilder erstellen + mischen
const pairs = shuffle(images.concat(images));


let ersteKarte = null;

let gesperrt = false;




// Karte (divs/ img) aufbauen
pairs.forEach((bild) => {
    const karte = document.createElement('div');
    karte.classList.add('karte');
    const karteInner = document.createElement('div');
    karteInner.classList.add('karte-inner');
    karte.appendChild(karteInner);
    const rueckseite = document.createElement('div');
    rueckseite.classList.add('seite', 'rueckseite');
    karteInner.appendChild(rueckseite);
    const vorderseite = document.createElement('div');
    vorderseite.classList.add('seite', 'vorderseite');
    const image = document.createElement('img');
    image.src = bild;
    vorderseite.appendChild(image);
    karteInner.appendChild(vorderseite);

karte.addEventListener('click', () => {
    if (gesperrt) return;

    if (karte.classList.contains('aufgedeckt')) return;


    karte.classList.toggle('aufgedeckt');
if (ersteKarte === null) {
    ersteKarte = karte;
} else {
    gesperrt = true;
    if (ersteKarte.querySelector('img').src === karte.querySelector('img').src) {
        setTimeout(() => {
            ersteKarte.classList.add('versteckt');
            karte.classList.add('versteckt');
            gesperrt = false;
            ersteKarte = null;
        }, 800);
        
        
    } else {
        setTimeout(() => {
            karte.classList.remove('aufgedeckt');
            ersteKarte.classList.remove('aufgedeckt');
            gesperrt = false;
            ersteKarte = null;
        }, 1000);
    }
}
});

    $('#grid').appendChild(karte);
});



