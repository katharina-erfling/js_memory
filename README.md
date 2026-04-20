<img width="1405" height="836" alt="Screenshot 2026-04-20 134404" src="https://github.com/user-attachments/assets/f06fc3a9-8900-436f-b44a-c800d6257aae" />

# 🃏 Memory

Ein browserbasiertes Memory-Spiel mit aufwendigem Casino-Design.

---

## ✨ Besonderheiten

> 🎴 **3D-Kartenanimation rein per CSS** – `transform-style: preserve-3d`, `backface-visibility` und `rotateY(180deg)` erzeugen eine echte Flip-Animation ohne JavaScript

> 🎲 **Fisher-Yates Shuffle** – die Karten werden mit dem effizienten Fisher-Yates-Algorithmus gemischt – faire, gleichmäßige Zufallsverteilung

> 🟩 **Spielmatte & Holztisch rein per CSS** – `repeating-linear-gradient` für Filztextur und Holzmaserung, `inset box-shadow` für die Vertiefung in den Tisch

> 🔒 **Sperrmechanismus** – `gesperrt`-Flag verhindert dass während der Auflöseanimation weitere Karten geklickt werden können

> 🐾 **Emoji-Konfetti mit abnehmender Dichte** – Hunde-Emojis fliegen 15 Sekunden lang aus beiden Seiten, die Teilchenanzahl nimmt dabei proportional zur verbleibenden Zeit ab

> ⏱️ **Live-Timer & Zugzähler** – Timer startet beim ersten Klick, beide Werte werden live im Spielfeld und im Gewinnscreen angezeigt

> 🔊 **Sound-Feedback** – Kartengeräusch, Treffer-Sound und Gewinn-Sound – Sounds werden per `new Audio()` bei jedem Klick neu erstellt damit sie sich überlappen können

> 🏆 **Gewinnscreen mit Animation** – Panel fährt per `cubic-bezier` federnd herein, zeigt Züge und Endzeit an

---

## 🎮 Spielablauf

Karten aufdecken – finde alle 8 Paare! Zwei aufgedeckte Karten die nicht übereinstimmen werden nach kurzer Zeit wieder umgedreht. Gefundene Paare verschwinden. Timer und Züge werden mitgezählt.

---

## 📁 Projektstruktur

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── confetti.js
├── images/
│   ├── 1.png
│   ├── 2.png
│   └── ...
└── sounds/
    ├── card.mp3
    ├── correct.mp3
    ├── wrong.mp3
    └── win.mp3
```

---

## 🛠️ Technologien

- **HTML5** – semantisches Markup
- **CSS3** – `transform-style: preserve-3d`, `backface-visibility`, `rotateY`, `repeating-linear-gradient`, `inset box-shadow`, `nth-child`, `perspective`, `cubic-bezier`, Keyframe-Animationen
- **JavaScript (ES6+)** – Fisher-Yates Shuffle, `createElement`, `classList`, `setTimeout`, `setInterval`, `clearInterval`, Event Listener, `Audio`, `confetti`-Library, Spread Operator


