# Project Setup

Follow these instructions to get the project running on your local machine.

---

## ✅ Prerequisites

Install **Expo Go** app (**version 49**)

---

## Add .env file.
**Server -> .env**
```bash
    MONGODB_URI = ''
    JWT_SECRET = ''
    PORT = 5000
    
    CLOUDINARY_CLOUD_NAME = ''
    CLOUDINARY_API_KEY = ''
    CLOUDINARY_API_SECRET = ""
    FOLDER_NAME = ''
```
    
## ⚙️ Installation

1.  **Install Backend Dependencies:** Navigate to the server directory and install the required packages.
    ```bash
    cd server
    npm install
    ```

2.  **Install Frontend Dependencies:** Navigate back out and into the client directory to install its packages.
    ```bash
    cd ../client
    npm install
    ```

---

## ▶️ Running the Application

You'll need to run the backend and frontend in two separate terminals.

### 1. Start the Backend Server

In your first terminal, navigate to the `server` directory and start the server.

```bash
cd server
npm run dev
```
### 2. Start the Frontend

In your second terminal, navigate to the `client` directory and start the client.

```bash
cd client
npm run start
```
