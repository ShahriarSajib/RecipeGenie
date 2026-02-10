# 🧑‍🍳 RecipeGenie - Your AI-Powered Kitchen Assistant

Welcome to **RecipeGenie**! This project is a React-based web application that I built to learn the fundamentals of modern web development. It uses Google's powerful Gemini AI to turn a list of ingredients into delicious, personalized recipes.

![RecipeGenie App](src/assets/RecipeGenie.jpg)

## 🚀 Why I Built This

I created RecipeGenie to practice and solidify my understanding of **React**. My goal was to move beyond simple tutorials and build a functional, interactive application that solves a real-world problem: *"What can I cook with what I have?"*

Through this project, I learned how to:
- Structure a React application with components.
- Manage state effectively.
- Integrate with an external AI API (Google Gemini).
- Persist data in the browser (LocalStorage).
- Create a responsive and polished user interface with raw CSS.

## 🌟 Features

*   **🛒 Ingredient Management**: Easily add ingredients to your pantry list.
*   **🤖 AI Recipe Generation**: Uses standard ingredients to generate complete recipes including titles, descriptions, and step-by-step instructions.
*   **🥦 Dietary & Cuisine Preferences**: Filter recipes by diet (Vegetarian, Vegan, Gluten-Free, Keto, Paleo) and cuisine type (Italian, Mexican, Asian, etc.).
*   **👥 Serving Size Adjustments**: Customize portions for 1 to 6+ people.
*   **❤️ Favorites System**: Save your best recipes to a "Favorites" list for quick access later.
*   **📜 History Tracking**: Automatically keeps a history of recently generated recipes so you don't lose them.
*   **🖨️ Print & PDF Ready**: A clean, printer-friendly layout to take your recipes into the kitchen.
*   **💾 Local Storage**: Your ingredients, history, and favorites are saved automatically, so they're waiting for you when you come back.

## 🛠️ Tech Stack

*   **Core**: [React](https://react.dev/) (v19)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **AI Power**: [Google Gemini API](https://ai.google.dev/) (`@google/generative-ai`)
*   **Styling**: Vanilla CSS (Responsive & Print-optimized)
*   **Markdown Rendering**: `react-markdown`

## 🧠 What I Learned

This project was a deep dive into several key React concepts:

1.  **State Management (`useState`)**:
    *   Used for tracking the ingredient list, current recipe, loading states, and user preferences (dietary, cuisine).
    *   Learned how to update arrays and objects in state immutably.

2.  **Side Effects (`useEffect`)**:
    *   Implemented `useEffect` to save and load data from `localStorage`.
    *   This ensures the user's history and favorites persist even after a page refresh.

3.  **Form Handling**:
    *   Used standard HTML forms and the `FormData` API to handle ingredient submissions cleanly.

4.  **API Integration**:
    *   Learned `async/await` patterns to fetch data from the Gemini AI.
    *   Handled loading states to show a "Thinking..." animation and error states for robust user experience.

5.  **Conditional Rendering**:
    *   Dynamically showing user feedback (e.g., "Add 3 more ingredients to unlock") and toggling between views (Recipe vs. History).

## 🏃‍♂️ How to Run Locally

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/RecipeGenie.git
    cd RecipeGenie
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up the API Key**:
    *   Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   Create a `.env.local` file in the root directory.
    *   Add your key:
        ```
        VITE_GEMINI_API_KEY=your_api_key_here
        ```

4.  **Start the dev server**:
    ```bash
    npm run dev
    ```

5.  **Open in Browser**:
    Visit `http://localhost:5173` to start cooking!

---

*This project is part of my journey to learning React. Feel free to explore the code and see how it works!* 👨‍🍳✨
