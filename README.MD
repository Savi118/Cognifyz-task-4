# 🧠 QuizX — Interactive Quiz Web App

An engaging, full-stack **quiz platform** built with **Node.js, Express, MongoDB, EJS, and Tailwind CSS**.  
Users can register, log in, play quizzes across different levels, and track scores on a leaderboard.

---

## 🚀 Features

✅ **User Authentication** — Signup, Login, and Logout using sessions.  
✅ **Dynamic Quiz System** — Fetches questions by difficulty (Beginner, Intermediate, Advanced).  
✅ **Leaderboard** — Tracks and displays top players with name, score, and date.  
✅ **MongoDB Database** — Stores users, quiz questions, and results.  
✅ **Responsive UI** — Built with TailwindCSS for sleek and mobile-friendly design.  
✅ **EJS Templates** — Dynamic rendering for pages based on login state.

---

## 🗂️ Project Structure

```

📁 QuizX/
│
├── 📄 server.js              # Main server entry file
│
├── 📁 controllers/           # Handles app logic
│   ├── authController.js
│   └── homeController.js
│
├── 📁 models/                # MongoDB Schemas
│   ├── user.js
│   ├── question.js
│   └── results.js
│
├── 📁 routes/                # Route definitions
│   ├── authRoute.js
│   └── homeRoute.js
│
├── 📁 views/                 # EJS template files (frontend)
│   ├── pages/
│   │   ├── home.ejs
│   │   ├── play.ejs
│   │   ├── signup.ejs
│   │   ├── login.ejs
│   │   ├── results.ejs
│   │   └── about.ejs
│   └── partials/
│       ├── head.ejs
│       ├── navbar.ejs
│       └── footer.ejs
│
├── 📁 public/                # Static assets (CSS, JS, images)
│   ├── js/script.js
│   ├── output.css
│   └── images/
│
├── 📁 src/                   # Tailwind source CSS
│   └── input.css
│
├── 📄 package.json
└── 📄 .env

```

---

## ⚙️ Tech Stack

| Category              | Technology                  |
| --------------------- | --------------------------- |
| Backend               | Node.js, Express.js         |
| Frontend              | EJS Templates, Tailwind CSS |
| Database              | MongoDB + Mongoose          |
| Session Store         | connect-mongo               |
| Authentication        | express-session             |
| Styling               | Tailwind CSS                |
| Environment Variables | dotenv                      |

---

## ⚡ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/quizx.git
cd quizx
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

### 4️⃣ Build Tailwind (for production)

```bash
npx @tailwindcss/cli -i ./src/input.css -o ./public/output.css
```

### 5️⃣ Run the App (Development Mode)

```bash
npm run dev
```

or manually:

```bash
npm run server
npm run tailwind
```

### 6️⃣ Open in Browser

Visit:

```
http://localhost:3000
```

---

## 🧩 How It Works

### ▶️ Authentication Flow

- Users can **register** via `/auth/signup`.
- Credentials are stored in MongoDB.
- Session is created and saved using `express-session` + `connect-mongo`.
- Users stay logged in until they log out manually.

### 🧠 Quiz Logic

- When logged in, users select quiz difficulty (beginner/intermediate/advanced).
- Questions are fetched dynamically from MongoDB.
- User scores are calculated on the frontend and stored via `/results/save`.

### 🏆 Leaderboard

- Fetches recent results sorted by date.
- Displays usernames, levels, scores, and submission dates.
- Logged-in user’s row is highlighted.

---

## 💾 MongoDB Models

### 🧍‍♂️ `User`

```js
{
  name: String,
  email: String,
  password: String
}
```

### ❓ `Question`

```js
{
  level: String, // beginner | intermediate | advanced
  question: String,
  options: [String],
  answer: Number
}
```

### 🏁 `Result`

```js
{
  user: String,
  level: String,
  score: Number,
  date: Date
}
```

---

## 📜 Scripts

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `npm start`        | Runs production server             |
| `npm run dev`      | Runs dev server + Tailwind watcher |
| `npm run server`   | Starts server with Nodemon         |
| `npm run tailwind` | Watches & compiles Tailwind CSS    |

---

## 🌐 Deployment Guide (Render / Railway)

1. Push code to **GitHub**.
2. Connect your repository to **Render.com**.
3. Set environment variables in Render’s dashboard:

   - `MONGO_URL`
   - `SESSION_SECRET`
   - `PORT=10000` _(Render assigns automatically, so `process.env.PORT` works fine)_

4. Set **Start Command** to:

   ```
   npm start
   ```

5. Deploy 🎉

---

## 💡 Future Enhancements

- 🔐 Password hashing (bcrypt)
- 🎯 Question difficulty scoring logic
- 🧾 User profiles with history
- 🌍 Public leaderboard API
- 🧠 Category-based quizzes (e.g., JS, HTML, CSS)

---

## 🧑‍💻 Author

**Saksham Viraj**
💼 Web Developer | MERN Enthusiast | Lifelong Learner
🌐 [Portfolio](https://portfolio-one-orpin-f3el83yyf6.vercel.app/)
📧 [sakshamviraj2004@gmail.com](mailto:sakshamviraj2004@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/saksham-viraj-188071285)

---

## 🪪 License

This project is licensed under the **MIT License** — free to use and modify.

```

```
