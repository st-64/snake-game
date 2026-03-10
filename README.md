# 🐍 Snake Game Pro

A modern, highly optimized, and feature-rich classic Snake Game built entirely with Vanilla JavaScript, HTML5, and CSS3. 

## 🌟 Features

* **Classic Gameplay with a Twist:** Eat the green food to grow, but watch out for the walls and your own tail!
* **Dynamic Difficulty (Level Up System):** The game gets faster and more challenging! Every 50 points, you level up, and the snake's speed increases.
* **Persistent High Score:** Your highest score is securely saved in the browser's `localStorage`, so it's always there when you return.
* **Immersive Audio:** Features background music that loops perfectly, alongside crisp sound effects for eating, leveling up, and game over.
* **Modern UI/UX:** * Clean, dark-themed UI built with a custom CSS variable design system.
  * Custom modal pop-ups for "Game Over" and "Level Up" instead of boring browser alerts.
* **Highly Optimized Engine:** * Uses CSS Grid dynamically calculated by JavaScript for flawless, responsive grid generation.
  * Optimized DOM manipulation using `DocumentFragment` and targeted repaints (clearing only the snake's previous position rather than the whole board).

## 🚀 Live Demo

[🎮 Play Snake Game Pro Here](https://st-64.github.io/snake-game/) 

## 🛠️ Technologies Used

* **HTML5:** Semantic structure.
* **CSS3:** Custom properties (variables), Flexbox, CSS Grid, Modals, and Transitions.
* **JavaScript (ES6+):** Game logic, collision detection, state management, interval handling, and audio processing.

## 📂 Folder Structure

\`\`\`text
📦 snake-game
 ┣ 📂 Sounds
 ┃ ┣ 🎵 bgm.mp3
 ┃ ┣ 🎵 dead.mp3
 ┃ ┣ 🎵 eat.mp3
 ┃ ┣ 🎵 levelup.mp3
 ┃ ┗ 🎵 start.mp3
 ┣ 📜 index.html
 ┣ 📜 style.css
 ┗ 📜 script.js
\`\`\`

## 💻 How to Run Locally

Since this is a vanilla web project, you don't need any complex build tools or package managers!

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/st-64/snake-game.git
   \`\`\`
2. **Navigate to the folder:**
   \`\`\`bash
   cd snake-game
   \`\`\`
3. **Open the game:**
   Simply double-click on the `index.html` file to open it in your default web browser. 
   *(Alternatively, use an extension like VS Code Live Server for the best experience).*

## 🎮 Controls

* **Arrow Up (↑):** Move Up
* **Arrow Down (↓):** Move Down
* **Arrow Left (←):** Move Left
* **Arrow Right (→):** Move Right
* **Enter:** Restart the game after Game Over

---
*Built with ❤️ and JavaScript by [st-64](https://github.com/st-64).*
