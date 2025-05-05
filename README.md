# Automobile Auto Parts & Accessories Store | Inventory Control System

This project is an Inventory Control System for an Automobile Auto Parts & Accessories Store, built with **Flask** (backend) and **React with Tailwind CSS** (frontend). Follow the instructions below to set up and run the project on **Mac** or **Windows**.

## Prerequisites

Ensure you have the following installed:
- **Python 3.8+** (for Flask backend)
- **Node.js and npm** (for React frontend)
- **Git** (optional, for cloning the repository)
- A code editor like **VS Code**

## Project Setup

### 1. Clone the Repository (Optional)
If the project is hosted in a repository, clone it:
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Set Up the Backend (Flask)

#### Create and Activate a Virtual Environment
The backend uses Python and Flask. Create a virtual environment to manage dependencies.

**On Mac/Linux:**
```bash
python3 -m venv myenv
source myenv/bin/activate
```

**On Windows:**
```bash
python -m venv myenv
myenv\Scripts\activate
```

When the virtual environment is activated, you’ll see `(myenv)` in your terminal.

#### Install Backend Dependencies
With the virtual environment activated, install the required Python packages listed in `requirements.txt`:
```bash
pip3 install -r requirements.txt
```

The `requirements.txt` file includes the following dependencies:
```
blinker==1.9.0
click==8.1.8
colorama==0.4.6
Flask==3.1.0
Flask-Cors==5.0.0
iniconfig==2.0.0
itsdangerous==2.2.0
Jinja2==3.1.5
MarkupSafe==3.0.2
numpy==2.2.1
packaging==24.2
pandas==2.2.3
pluggy==1.5.0
pytest==8.3.4
python-dateutil==2.9.0.post0
python-dotenv==1.0.1
pytz==2024.2
six==1.17.0
tzdata==2024.2
Werkzeug==3.1.3
```

### 3. Set Up the Frontend (React with Tailwind CSS)

The frontend is built with **React** and styled using **Tailwind CSS**.

#### Navigate to the Frontend Directory
```bash
cd frontend
```

#### Install Frontend Dependencies
Install the required Node.js packages:
```bash
npm install
```

Ensure that **Tailwind CSS** is configured in your React project. If not, follow these steps to set it up:
1. Install Tailwind CSS and its dependencies:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
2. Update `tailwind.config.js` to include your React components:
   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```
3. Add Tailwind directives to your `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### 4. Run the Application

#### Start the Backend (Flask)
In the root project directory, with the virtual environment activated, run the Flask server:
```bash
flask run
```
By default, the Flask server runs on `http://127.0.0.1:5000`. Ensure **Flask-Cors** is configured if the frontend makes API requests to the backend.

#### Start the Frontend (React)
In a new terminal, navigate to the `frontend` directory and start the React development server:
```bash
cd frontend
npm start
```
The React app will run on `http://localhost:3000` by default.

### 5. Access the Application
- Open your browser and go to `http://localhost:3000` to view the frontend.
- The frontend will communicate with the Flask backend at `http://127.0.0.1:5000` for API requests.

## Troubleshooting

- **Python version issues**: Ensure you’re using Python 3.8 or higher. Run `python3 --version` (Mac) or `python --version` (Windows) to check.
- **Node.js issues**: Verify Node.js is installed by running `node -v` and `npm -v`. Update npm if needed: `npm install -g npm`.
- **Port conflicts**: If port `3000` or `5000` is in use, specify a different port:
  - For Flask: `flask run --port=5001`
  - For React: `PORT=3001 npm start`
- **Missing dependencies**: If you encounter errors, ensure all packages in `requirements.txt` are installed and that `npm install` completed successfully.

## Notes
- The backend uses **Flask-Cors** to handle cross-origin requests from the React frontend. Ensure your Flask app is configured to allow requests from `http://localhost:3000`.
- If you modify the frontend or backend code, the development servers will automatically reload (React) or may require a manual restart (Flask).

For further assistance, contact the project maintainer or refer to the official documentation for [Flask](https://flask.palletsprojects.com/), [React](https://reactjs.org/), or [Tailwind CSS](https://tailwindcss.com/).