# 🧠 Mental Health Score Prediction

A production-ready Machine Learning web application that predicts an individual's **Mental Health Score** based on demographic, academic, lifestyle, and social media usage patterns.

The project demonstrates an **end-to-end machine learning workflow**, including data preprocessing, feature engineering, model training, REST API development with FastAPI, frontend integration, and cloud deployment.

**🌐 Live Demo:**
https://mental-health-score-prediction-1-jdjx.onrender.com/

---

# 📌 Project Overview

This application accepts user inputs related to social media habits, academic background, physical activity, sleep patterns, and stress levels, then processes the data through a trained Machine Learning pipeline to predict a mental health score in real time.

The backend exposes a REST API built with FastAPI, while the frontend communicates with the API asynchronously using JavaScript Fetch API.

---

# 🚀 Features

* End-to-End Machine Learning Pipeline
* Real-time Mental Health Score Prediction
* FastAPI REST API Backend
* Interactive & Responsive User Interface
* Feature Validation using Pydantic
* Machine Learning Model Serialization with Joblib
* REST API Integration using Fetch API
* Cross-Origin Resource Sharing (CORS) Support
* Error Handling & Input Validation
* Cloud Deployment on Render

---

# 🛠️ Technology Stack

### Machine Learning

* Python
* Scikit-learn
* Pandas
* NumPy
* Joblib

### Backend

* FastAPI
* Uvicorn
* Pydantic
* CORS Middleware

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* Fetch API

### Deployment

* Render

---

# ⚙️ Machine Learning Workflow

* Data Collection
* Data Cleaning & Preprocessing
* Exploratory Data Analysis (EDA)
* Feature Engineering
* Categorical Encoding
* Feature Scaling
* Model Training
* Model Evaluation
* Model Serialization using Joblib
* REST API Integration
* Cloud Deployment

---

# 📁 Project Structure

```text
mental-health-score-prediction/
│
├── ML_Project.ipynb                 # Complete ML workflow
├── Mental_Health_Model.pkl          # Trained Machine Learning model
├── main.py                          # FastAPI backend
├── index.html                       # Frontend
├── style.css                        # Styling
├── script.js                        # API Integration
├── requirements.txt                 # Project dependencies
├── Student Social Media And Mental Health Impact.csv
├── .gitignore
└── README.md
```

---

# 🔄 API Workflow

```text
User Input
      │
      ▼
Frontend (HTML + CSS + JavaScript)
      │
      ▼
FastAPI REST API
      │
      ▼
Input Validation (Pydantic)
      │
      ▼
Pre-trained ML Model (.pkl)
      │
      ▼
Prediction Generated
      │
      ▼
JSON Response
      │
      ▼
Frontend Displays Result
```

---

# 📡 API Endpoint

### Predict Mental Health Score

```http
POST /predict
```

Example Response

```json
{
  "predicted_mental_health_score": 7.84
}
```

---

# 💻 Running the Project Locally

Clone the repository

```bash
git clone https://github.com/harshalgit2005/mental-health-score-prediction.git
```

Navigate into the project

```bash
cd mental-health-score-prediction
```

Install dependencies

```bash
pip install -r requirements.txt
```

Start the FastAPI server

```bash
uvicorn main:app --reload
```

Open your browser

```
http://127.0.0.1:8000/docs
```

---

# 🎯 Key Learning Outcomes

* Building production-ready Machine Learning applications
* Developing REST APIs with FastAPI
* Creating data validation pipelines using Pydantic
* Integrating Machine Learning models with backend services
* Consuming REST APIs using JavaScript Fetch API
* Deploying full-stack ML applications to the cloud
* Managing project versions using Git and GitHub

---

# 👨‍💻 Author

**Harshal Saudagar**

🎓 AI & Machine Learning Enthusiast | Data Science | FastAPI | Python

### 🌐 Connect with Me

* **LinkedIn:** https://www.linkedin.com/in/harshalsaudagar/
* **Portfolio:** https://harshalsaudagar.netlify.app/
* **GitHub:** https://github.com/harshalgit2005

---

⭐ If you found this project interesting, consider giving it a **Star** on GitHub. Feedback and contributions are always welcome!
