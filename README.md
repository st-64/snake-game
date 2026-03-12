# 🐍 Snake Game Pro

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

A **modern and highly optimized version of the classic Snake Game** built using **Vanilla JavaScript, HTML5, and CSS3**.

This project focuses on **clean UI design, optimized DOM rendering, smooth gameplay mechanics, and modern frontend practices** such as CSS variables, dynamic CSS Grid layouts, and browser storage.

---

# 🎮 Live Demo

Play the game here:

https://st-64.github.io/snake-game/

---

# 🌟 Features

## 🐍 Classic Snake Gameplay

Control the snake using the arrow keys and eat food to grow longer.

Avoid collisions with:

- Walls
- Your own snake body

The longer the snake grows, the more difficult the game becomes.

---

## ⚡ Dynamic Level System

The game becomes harder as your score increases.

- Every **50 points → Level increases**
- Snake **speed increases automatically**
- Level Up notification appears on screen

This creates a progressively challenging gameplay experience.

---

## ⏱️ Game Timer

A built-in **live timer** tracks how long the player survives in the game.

Timer format:

```
MM-SS
```

Example:

```
02-35
```

---

## 💾 Persistent High Score

The game uses **localStorage** to store the highest score.

This means:

- High score persists after page refresh
- High score persists across browser sessions

Key used:

```
snakeHighScore
```

---

## 🔊 Immersive Audio System

Multiple sound effects enhance the gameplay experience.

Included sounds:

- 🎵 Background music (looped)
- 🍏 Food eating sound
- 🚀 Level up sound
- 💀 Game over sound
- ▶ Game start sound

Includes a **custom Start Screen** to gracefully handle strict browser audio autoplay policies, ensuring music starts seamlessly upon user interaction.

---

## 🎨 Modern UI Design

The interface uses a **dark themed modern UI**.

Design features include:

- CSS custom variables (design system)
- Flexbox layouts
- CSS Grid game board
- Glassmorphism (Frosted Glass) Modals
- Smooth shadows and spacing system

UI components:

- Scoreboard
- Game board
- Interactive Start Screen
- Game Over modal
- Level Up popup

---

# ⚡ Performance Optimizations

This project uses several techniques to improve performance.

## DocumentFragment Rendering

The grid is generated using **DocumentFragment** so all blocks are inserted into the DOM at once.

This reduces DOM reflows and improves loading performance.

---

## Targeted Board Clearing

Instead of clearing the entire board each frame:

- Only the **previous snake positions** are cleared.

This significantly reduces unnecessary DOM updates.

---

## Object-based Grid Lookup

Blocks are stored using an object with coordinate keys:

```
blocks["row-col"]
```

Example:

```
blocks["5-10"]
```

This allows **O(1) lookup** when rendering snake segments or food.

---

## Dynamic CSS Grid

The board automatically calculates rows and columns based on the container size:

```
cols = boardWidth / blockWidth
rows = boardHeight / blockHeight
```

The board is then rendered using:

```
grid-template-columns
grid-template-rows
```

---

# 🛠️ Technologies Used

## HTML5

Provides the **semantic structure** of the game.

Main components:

- Scoreboard
- Game board
- Start screen
- Game Over modal
- Level Up notification

---

## CSS3

Used for modern UI styling including:

- CSS Variables
- Flexbox
- CSS Grid
- Shadows
- Glassmorphism modals
- Responsive spacing system

---

## JavaScript (ES6)

Handles the entire game engine including:

- Game loop
- Snake movement
- Collision detection
- Food generation
- Score system
- Level progression
- Timer system
- Audio handling
- LocalStorage persistence

---

# 📂 Project Structure

```
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
```

---

# 🎮 Game Controls

| Key     | Action               |
| ------- | -------------------- |
| ↑ Arrow | Move Up              |
| ↓ Arrow | Move Down            |
| ← Arrow | Move Left            |
| → Arrow | Move Right           |
| Enter   | Start / Restart Game |

---

# ⚙️ How to Run Locally

This is a **pure Vanilla Web Project**, so no installation or build tools are required.

### 1️⃣ Clone the repository

```
git clone https://github.com/st-64/snake-game.git
```

### 2️⃣ Open the project folder

```
cd snake-game
```

### 3️⃣ Run the game

Open the file:

```
index.html
```

in your browser.

For development, you can use:

**VS Code → Live Server Extension**

---

# 📚 What This Project Demonstrates

This project demonstrates several important frontend development concepts:

- Game loop architecture
- Efficient DOM rendering
- Event handling
- LocalStorage usage
- CSS Grid based layouts
- Modular game state management
- Performance optimization techniques

---

# 🚀 Future Improvements

Possible improvements for this project:

- Mobile touch controls
- Multiplayer mode
- Global leaderboard
- Obstacles or walls
- Power-up items
- Multiple map themes

---

# ⭐ Support

If you like this project:

- ⭐ Star the repository
- 🍴 Fork the project
- 🧠 Try adding new features

---

# 👨‍💻 Author

**st-64**

GitHub  
https://github.com/st-64

---

Built with ❤️ using **HTML, CSS, and JavaScript**
