
/*/////////////////////// */
  // -- Allgemeines -- //
/*/////////////////////// */

'use strict';

// Kurzschreibweise für querySelector – spart Tipparbeit bei DOM-Zugriffen
const $ = (qs) => document.querySelector(qs);





/*/////////////////////// */
// -- Bilder mischen -- //
/*/////////////////////// */

// Fisher-Yates-Algorithmus: Geht das Array von hinten durch und
// tauscht jedes Element mit einem zufälligen Element davor (oder sich selbst).
// Ergebnis: gleichmäßig zufällige Reihenfolge
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Zufälliger Index von 0 bis i
    [array[i], array[j]] = [array[j], array[i]];   // Elemente tauschen (Destructuring)
  }
  return array;
};









/*/////////////////////// */
    // -- Konfetti -- //
/*/////////////////////// */

// Startet die Konfetti-Animation wenn der Spieler gewonnen hat
const startConfetti = () => {
    // Standardeinstellungen für alle Konfetti-Explosionen
    const defaults = {
        spread: 360,        // Konfetti fliegt in alle Richtungen (voller Kreis)
        ticks: 100,         // Wie lange jedes Teilchen sichtbar bleibt
        gravity: 0,         // Keine Schwerkraft – Teilchen schweben
        decay: 0.94,        // Wie schnell die Teilchen langsamer werden
        startVelocity: 30,  // Anfangsgeschwindigkeit
    };

    // Hunde-Emojis als benutzerdefinierte Konfetti-Formen erstellen
    const emojiShapes = ['🐕', '🐶', '🐩', '🦮', '🐕‍🦺', '🐾', '🦴'].map(emoji => 
        confetti.shapeFromText({ text: emoji, scalar: 2 }) // scalar = Größe der Emojis
    );

    // Erste kurze Salve: 3 schnelle Schüsse kurz hintereinander
    const shoot = () => {
        confetti({
            ...defaults,
            particleCount: 20, // Anzahl der Teilchen pro Schuss
            scalar: 5,         // Größe der Teilchen
            shapes: emojiShapes,
        });
    };

    setTimeout(shoot, 0);    // Sofort
    setTimeout(shoot, 100);  // Nach 100ms
    setTimeout(shoot, 200);  // Nach 200ms

    // Danach: 15 Sekunden lang Feuerwerk aus beiden Seiten
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration; // Endzeitpunkt berechnen
    const fireworkDefaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval); // Stoppen wenn Zeit abgelaufen

        // Teilchenanzahl nimmt mit der Zeit ab (wird immer weniger)
        const particleCount = 50 * (timeLeft / duration);

        // Linke Seite
        confetti(Object.assign({}, fireworkDefaults, {
            particleCount,
            shapes: emojiShapes,
            origin: { x: Math.random() * 0.2 + 0.1, y: Math.random() - 0.2 }, // x: 0.1–0.3
        }));
        // Rechte Seite
        confetti(Object.assign({}, fireworkDefaults, {
            particleCount,
            shapes: emojiShapes,
            origin: { x: Math.random() * 0.2 + 0.7, y: Math.random() - 0.2 }, // x: 0.7–0.9
        }));
    }, 250); // Alle 250ms eine neue Welle
};









/*/////////////////////// */
 // -- Bildspeicher -- //
/*/////////////////////// */

// Pfade zu allen 8 einzigartigen Kartenbildern
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

// Jedes Bild doppelt vorhanden (Pärchen) + zufällig gemischt
const pairs = shuffle(images.concat(images)); // concat = Array verdoppeln










/*/////////////////////// */
 // -- Setup -- //
/*/////////////////////// */

// Sound-Objekte vorab laden, damit sie ohne Verzögerung abspielbar sind
const wrong = new Audio('sounds/wrong.mp3');
wrong.volume = 0.2;         // Leiser, damit er nicht zu aufdringlich ist
const win = new Audio('sounds/win.mp3');


// Spielzustand – alle wichtigen Variablen auf einen Blick
let ersteKarte = null;      // Speichert die erste aufgedeckte Karte
let gesperrt = false;       // Sperrt Klicks während Karten verglichen werden
let gefundeneKarten = 0;    // Zähler für gefundene Paare (×2 Karten)
let zuege = 0;              // Anzahl der Versuche
let timerLaeuft = false;    // Ob der Timer bereits läuft
let timerInterval;          // Referenz auf das setInterval (zum späteren Stoppen)
let sekunden = 0;           // Verstrichene Zeit in Sekunden







/*/////////////////////// */
  // -- Spiel -- //
/*/////////////////////// */

// Für jedes Bild im gemischten Array eine Karte ins DOM einfügen
pairs.forEach((bild) => {

    // Äußeres Karten-Element
    const karte = document.createElement('div');
    karte.classList.add('karte');

    // Inneres Element – wird per CSS für den 3D-Flip-Effekt verwendet
    const karteInner = document.createElement('div');
    karteInner.classList.add('karte-inner');
    karte.appendChild(karteInner);

    // Rückseite der Karte (sichtbar im Ausgangszustand)
    const rueckseite = document.createElement('div');
    rueckseite.classList.add('seite', 'rueckseite');
    karteInner.appendChild(rueckseite);

    // Vorderseite der Karte mit dem eigentlichen Bild
    const vorderseite = document.createElement('div');
    vorderseite.classList.add('seite', 'vorderseite');
    const image = document.createElement('img');
    image.src = bild; // Bildpfad aus dem Array zuweisen
    vorderseite.appendChild(image);
    karteInner.appendChild(vorderseite);


    // --- Klick-Event für jede Karte ---
    karte.addEventListener('click', () => {

        if (gesperrt) return; // Klick ignorieren wenn Spiel gerade "sperrt"
        if (karte.classList.contains('aufgedeckt')) return; // Bereits aufgedeckte Karte ignorieren

        // Timer beim ersten Klick starten
        if (timerLaeuft === false) {
            timerLaeuft = true;
            timerInterval = setInterval(() => {
                sekunden += 1;
                const minuten = Math.floor(sekunden / 60);
                const sek = sekunden % 60;
                const sekAnzeige = sek < 10 ? '0' + sek : sek; // Führende Null bei einstelligen Sekunden
                $('#timer').innerHTML = minuten + ':' + sekAnzeige;
            }, 1000); // Jede Sekunde aktualisieren
        }

        // Karte umdrehen (CSS-Klasse löst den Flip-Effekt aus)
        karte.classList.toggle('aufgedeckt');

        // Klick-Sound abspielen (jedes Mal neu erstellt, damit er sich überlappen kann)
        const cardSound = new Audio('sounds/card.mp3');
        cardSound.volume = 0.3;
        cardSound.play();

        if (ersteKarte === null) {
            // Erste Karte des Zuges – merken und auf zweite warten
            ersteKarte = karte;
        } else {
            // Zweite Karte aufgedeckt – Zug auswerten
            gesperrt = true; // Weitere Klicks sperren während ausgewertet wird
            zuege += 1;
            $('#zuege-zahl').innerHTML = zuege; // Anzeige im Spielfeld aktualisieren
            $('#zuege').innerHTML = zuege;      // Anzeige im Gewinnscreen aktualisieren

            // Vergleich: Haben beide Karten dasselbe Bild? (src-Vergleich)
            if (ersteKarte.querySelector('img').src === karte.querySelector('img').src) {

                // ✅ Treffer – Karten als gefunden markieren
                setTimeout(() => {
                    ersteKarte.classList.add('gefunden');
                    karte.classList.add('gefunden');
                    gefundeneKarten += 2;

                    if (gefundeneKarten === pairs.length) {
                        // 🎉 Alle Paare gefunden – Spiel gewonnen!
                        clearInterval(timerInterval); // Timer stoppen
                        const minuten = Math.floor(sekunden / 60);
                        const sek = sekunden % 60;
                        const sekAnzeige = sek < 10 ? '0' + sek : sek;
                        $('#timer_ende').innerHTML = minuten + ':' + sekAnzeige; // Endzeit anzeigen
                        win.play();
                        startConfetti();
                        $('#gewinnscreen').style.display = 'flex'; // Gewinnscreen einblenden
                    } else {
                        // Noch nicht fertig – Treffer-Sound spielen
                        const rightSound = new Audio('sounds/correct.mp3');
                        rightSound.volume = 0.8;
                        rightSound.play();
                    }

                    // Karten kurz nach dem Treffer verstecken (CSS-Übergang abwarten)
                    setTimeout(() => {
                        ersteKarte.classList.add('versteckt');
                        karte.classList.add('versteckt');
                        gesperrt = false;  // Spiel wieder freigeben
                        ersteKarte = null; // Zurücksetzen für nächsten Zug
                    }, 800);

                }, 550); // Kurze Pause damit der Spieler beide Karten sehen kann

            } else {
                // ❌ Kein Treffer – Karten wieder umdrehen
                setTimeout(() => {
                    wrong.play();
                    karte.classList.remove('aufgedeckt');
                    ersteKarte.classList.remove('aufgedeckt');
                    gesperrt = false;  // Spiel wieder freigeben
                    ersteKarte = null; // Zurücksetzen für nächsten Zug
                }, 1000); // Etwas länger warten damit der Spieler die Karten einprägen kann
            }
        }
    });

    // Fertige Karte ins Spielfeld einfügen
    $('#grid').appendChild(karte);
});






/*/////////////////////// */
  // -- Neues Spiel -- //
/*/////////////////////// */


// Neues Spiel: Seite einfach neu laden – setzt alles zurück
$('#new_game').addEventListener('click', () => {
    location.reload();
});