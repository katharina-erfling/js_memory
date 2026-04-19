<img width="1144" height="720" alt="Screenshot 2026-04-19 100751" src="https://github.com/user-attachments/assets/1fd661b4-704e-4d44-ae5e-9e9491f52012" />

# 🃏 Memory

Ein browserbasiertes Memory-Spiel mit aufwendigem Casino-Design.

---

## ✨ Besonderheiten

> 🎴 **3D-Kartenanimation rein per CSS** – `transform-style: preserve-3d`, `backface-visibility` und `rotateY(180deg)` erzeugen eine echte Flip-Animation ohne JavaScript

> 🎲 **Fisher-Yates Shuffle** – die Karten werden mit dem effizienten Fisher-Yates-Algorithmus gemischt – faire, gleichmäßige Zufallsverteilung

> 🟩 **Spielmatte & Holztisch rein per CSS** – `repeating-linear-gradient` für Filztextur und Holzmaserung, `inset box-shadow` für die Vertiefung in den Tisch

> 🔒 **Sperrmechanismus** – `gesperrt`-Flag verhindert dass während der Auflöseanimation weitere Karten geklickt werden können

> 🃏 **Dynamischer Kartenaufbau** – alle Karten werden per `createElement` aus dem Bilder-Array generiert, kein HTML hardcoded

---

## 🎮 Spielablauf

Karten aufdecken – finde alle Paare! Zwei aufgedeckte Karten die nicht übereinstimmen werden nach kurzer Zeit wieder umgedreht. Gefundene Paare verschwinden.

---

## 📁 Projektstruktur

```
/
├── index.html
├── script.js
├── css/
│   └── style.css
└── images/
    ├── 1.png
    ├── 2.png
    └── ...
```

---

## 🛠️ Technologien

- **HTML5** – semantisches Markup
- **CSS3** – `transform-style: preserve-3d`, `backface-visibility`, `rotateY`, `repeating-linear-gradient`, `inset box-shadow`, `nth-child`, `perspective`, `cubic-bezier`, CSS Custom Properties
- **JavaScript (ES6+)** – Fisher-Yates Shuffle, `createElement`, `classList`, `setTimeout`, Event Listener, Spread/Concat für Paare

---

## 📚 Kontext

Teil der **Softwareentwicklerin Frontend Javascript Zertifizierung** bei GFN (extern zertifiziert durch WPI), März – Juni 2026.
