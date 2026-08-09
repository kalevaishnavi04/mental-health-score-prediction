# 🧠 Mental Health Score Prediction

> **Can student social-media habits and lifestyle factors predict mental health scores? This project trains a regression model to estimate a student's Mental Health Score from social media usage, academic level, sleep, physical activity, and stress-related factors.**

🌐 **Live Demo:** Add your deployed frontend URL
⚙️ **API:** Add your deployed FastAPI URL
💻 **GitHub:** https://github.com/kalevaishnavi04/mental-health-score-prediction

---

# 1. Business Context

Students' mental well-being can be influenced by several lifestyle and behavioral factors, including social media usage, sleep, physical activity, academic pressure, and stress. This project explores whether these measurable factors can be used to estimate a student's mental health score using machine learning. I developed the project as an end-to-end ML application, from exploratory data analysis and model training to serving predictions through a FastAPI backend and a web-based frontend. The key decision was to build a regression-based prediction system that could transform multiple lifestyle inputs into a single estimated mental health score.

### Problem

Student well-being can be influenced by multiple interacting factors:

```text
Social Media Usage
        +
Academic Level
        +
Sleep
        +
Physical Activity
        +
Stress
        ↓
Mental Health Score
```

Instead of examining each factor independently, the project uses a machine-learning model to estimate the combined relationship between these variables and the target score.

### Project Objective

The objective is to build a system that can:

* Accept student lifestyle information
* Process the input using the trained ML pipeline
* Predict a Mental Health Score
* Expose the model through a REST API
* Provide predictions through a simple web interface

> **Important:** This project is an educational prediction system and is **not a medical diagnostic tool**.

---

# 2. Data Source & Dataset

## Data Source

The project uses the dataset:

```text
Student Social Media And Mental Health Impact.csv
```

The dataset contains student-level information related to social media usage, lifestyle, academic factors, stress, and mental health.

---

## Data Grain

The primary data grain is:

> **One row = one student observation.**

Each record represents the available characteristics and mental-health-related score for an individual student.

---

## Time Span

The dataset's available time span depends on the original source and metadata included with the CSV.

The project does not assume a time range that is not explicitly present in the dataset.

---

## Data Volume

The exact number of records and columns should be taken from the CSV used in the repository rather than manually estimated.

You can inspect the dataset using:

```python
import pandas as pd

df = pd.read_csv(
    "Student Social Media And Mental Health Impact.csv"
)

print("Rows:", df.shape[0])
print("Columns:", df.shape[1])
print(df.info())
```

---

## Schema

The dataset contains student and lifestyle-related variables used for prediction.

| Category          | Example Information       | Purpose                                   |
| ----------------- | ------------------------- | ----------------------------------------- |
| Social Media      | Usage/habits              | Measures social-media-related behavior    |
| Academic          | Academic level            | Represents student's academic context     |
| Sleep             | Sleep-related information | Represents rest/sleep behavior            |
| Physical Activity | Activity level            | Represents physical lifestyle             |
| Stress            | Stress-related measure    | Represents psychological/lifestyle stress |
| Mental Health     | Mental Health Score       | Prediction target                         |

> The exact column names should be kept consistent with the CSV and preprocessing code in `ML_Project.ipynb`.

---

# 3. Methodology

## 3.1 Data Loading

The dataset is loaded using Pandas.

```python
import pandas as pd

df = pd.read_csv(
    "Student Social Media And Mental Health Impact.csv"
)
```

The initial analysis includes:

* Dataset dimensions
* Data types
* Missing values
* Duplicate records
* Statistical summaries
* Feature distributions

---

# 3.2 Exploratory Data Analysis

Exploratory analysis is used to understand relationships between lifestyle variables and the target.

The analysis can include:

* Distribution analysis
* Correlation analysis
* Feature comparison
* Outlier investigation
* Target distribution

### Why EDA?

Before training a regression model, it is important to understand:

```text
What does the data look like?
        ↓
Are values missing?
        ↓
Are variables numerical/categorical?
        ↓
Which features may influence the target?
        ↓
Which preprocessing is required?
```

EDA helps prevent blindly applying a model to unsuitable data.

---

# 3.3 Data Preprocessing

The preprocessing workflow prepares raw student information for machine learning.

Typical steps include:

```text
Raw Dataset
     ↓
Missing-Value Handling
     ↓
Categorical Encoding
     ↓
Feature Selection
     ↓
Train/Test Split
     ↓
Model Training
```

Categorical variables need to be transformed into numerical representations before they can be used by most regression algorithms.

---

# 3.4 Feature Engineering

The model uses lifestyle and student-related characteristics as predictive features.

The general relationship is:

```text
X = Student Lifestyle & Academic Features

             ↓

       Regression Model

             ↓

y = Mental Health Score
```

The goal is to allow the model to learn relationships between multiple input variables rather than relying on a single factor.

---

# 3.5 Regression Model

Because the target is a numerical **Mental Health Score**, the project treats the problem as a regression task.

```text
Input Features
      ↓
Regression Model
      ↓
Predicted Mental Health Score
```

### Why Regression?

A classification model would divide students into predefined categories.

However, the project target is a numerical score.

Regression is therefore appropriate when the goal is to estimate the actual value of the target rather than only predict a category.

---

# 3.6 Model Evaluation

The trained model should be evaluated using regression metrics such as:

### MAE — Mean Absolute Error

Measures the average absolute difference between predicted and actual scores.

```text
MAE = Average |Actual - Predicted|
```

Lower MAE indicates smaller prediction errors.

---

### MSE — Mean Squared Error

Penalizes larger errors more heavily.

```text
MSE = Average (Actual - Predicted)²
```

Lower MSE indicates better prediction performance.

---

### R² Score

Measures how much of the target variation is explained by the model.

```text
R² = 1 - Error / Total Variation
```

Higher R² generally indicates a better fit.

> The final README should report the actual values generated in `ML_Project.ipynb` rather than inventing evaluation numbers.

---

# 3.7 Model Serialization

After training, the model is saved as:

```text
Mental_Health_Model.pkl
```

Joblib is used to serialize the trained model.

```text
Training
   ↓
Trained Model
   ↓
Joblib
   ↓
Mental_Health_Model.pkl
```

This allows the FastAPI backend to load the trained model without retraining it for every request.

---

# 3.8 FastAPI Prediction API

The trained model is served through FastAPI.

### Endpoint

```http
POST /predict
```

The frontend sends student information to the API.

```text
Frontend
   ↓
POST /predict
   ↓
FastAPI
   ↓
Loaded ML Model
   ↓
Prediction
   ↓
JSON Response
```

### Example Response

```json
{
  "predicted_mental_health_score": 7.84
}
```

The displayed value above is an **example response format**, not a claim about the model's actual prediction for a specific student.

---

# 3.9 Frontend

The frontend is implemented using:

* HTML
* CSS
* JavaScript
* Fetch API

The user enters the required student information.

```text
User Input
    ↓
JavaScript
    ↓
Fetch API
    ↓
FastAPI
    ↓
ML Model
    ↓
Prediction
    ↓
Web Interface
```

---

# 4. Key Findings

> **Important:** Actual numerical findings should be taken from the dataset analysis and model evaluation in `ML_Project.ipynb`. The README does not invent statistical relationships or model-performance values that have not been verified.

## Finding 1 — Mental Health Score Can Be Framed as a Regression Problem

The target is a numerical Mental Health Score, making regression an appropriate machine-learning formulation.

```text
Multiple Student Factors
          ↓
     Regression
          ↓
Mental Health Score
```

This allows the model to estimate a continuous score instead of assigning students to only predefined categories.

---

## Finding 2 — Multiple Lifestyle Variables Are Considered Together

The prediction system does not rely on a single input.

It considers a combination of factors such as:

* Social media habits
* Academic level
* Sleep
* Physical activity
* Stress

This allows the model to learn interactions across multiple dimensions of student lifestyle.

---

## Finding 3 — The Model Can Be Used Through a REST API

The trained model is separated from the training notebook and exposed through:

```http
POST /predict
```

This transforms the ML workflow from a notebook-only experiment into an application that can receive real-time prediction requests.

---

## Finding 4 — The Model Can Be Integrated With a Web Interface

The project connects three layers:

```text
Machine Learning
      ↓
FastAPI
      ↓
Web Frontend
```

This demonstrates an end-to-end machine-learning deployment workflow rather than stopping at model training.

---

## Finding 5 — Prediction Results Should Be Interpreted Carefully

A predicted mental-health score represents a model estimate based on the input variables.

It should not be interpreted as:

* A clinical diagnosis
* A psychological assessment
* A medical recommendation
* A replacement for professional support

The application is intended for **educational and predictive modeling purposes**.

---

# 5. Recommendations

Because this is a machine-learning project, recommendations focus on improving model reliability, usability, and deployment.

| Recommendation                         | KPI / Target                                  | Owner             |
| -------------------------------------- | --------------------------------------------- | ----------------- |
| Improve model validation               | Track MAE, MSE and R² on held-out data        | ML Team           |
| Compare multiple regression algorithms | Select model based on validation performance  | ML Team           |
| Add model monitoring                   | Track prediction requests and failures        | Backend Team      |
| Add input validation                   | Reduce invalid prediction requests            | Backend Team      |
| Add prediction explanations            | Show important contributing features          | ML / Product Team |
| Expand dataset                         | Improve representativeness and generalization | Data Team         |

---

## Priority Recommendation

### Improve Model Validation & Explainability

The next major improvement should be to compare multiple regression approaches and add model explainability.

The workflow could become:

```text
Dataset
   ↓
Multiple Candidate Models
   ↓
Cross-Validation
   ↓
MAE / MSE / R²
   ↓
Best Model
   ↓
Feature Importance / Explainability
   ↓
FastAPI Deployment
```

### Recommended Metrics

Track:

* MAE
* MSE
* RMSE
* R²
* Cross-validation score
* Prediction latency
* API error rate

### Owner

**ML / Data Science Team**

---

# 6. Limitations & Assumptions

## Limitations

### 1. Dataset Representativeness

The model can only learn from the population represented in the training dataset.

If the dataset does not represent different:

* Age groups
* Academic backgrounds
* Geographic regions
* Socioeconomic backgrounds
* Lifestyle patterns

then predictions may not generalize well to those populations.

---

### 2. Correlation Does Not Imply Causation

A relationship between social media usage, stress, sleep, or mental health score does not prove that one variable causes another.

The model estimates statistical relationships rather than causal effects.

---

### 3. Prediction Accuracy Depends on Training Data

Poor-quality, biased, incomplete, or noisy data can negatively affect model performance.

---

### 4. Mental Health Is More Complex Than the Available Features

Mental health can involve many factors that may not be represented in the dataset.

Examples include:

* Personal circumstances
* Family environment
* Financial conditions
* Social relationships
* Previous mental-health history
* Professional support

Therefore, the model should not be treated as a complete assessment.

---

### 5. Not a Medical Diagnostic Tool

The predicted score should not be used to diagnose a mental-health condition or make medical decisions.

---

### 6. Model Drift

Student behavior and social-media patterns can change over time.

A model trained on older data may become less accurate when behavioral patterns change.

---

## Assumptions

The project assumes:

* Input values are provided in the expected format.
* The features used during prediction match the training features.
* The serialized model is compatible with the deployed Python environment.
* The training dataset is representative enough for the intended educational use.
* Users understand that the output is a prediction rather than a clinical assessment.

---

# 7. Repository Guide

## Technology Stack

| Layer                | Technology            |
| -------------------- | --------------------- |
| Programming Language | Python                |
| Data Processing      | Pandas, NumPy         |
| Machine Learning     | Scikit-learn          |
| Model Serialization  | Joblib                |
| Backend              | FastAPI               |
| API Server           | Uvicorn               |
| Validation           | Pydantic              |
| Frontend             | HTML, CSS, JavaScript |
| API Communication    | Fetch API             |
| Backend Deployment   | Render                |
| Frontend Deployment  | Netlify               |

---

# Project Structure

```text
mental-health-score-prediction/
│
├── ML_Project.ipynb
│   └── Data analysis, preprocessing,
│       model training and evaluation
│
├── Mental_Health_Model.pkl
│   └── Serialized trained regression model
│
├── main.py
│   └── FastAPI backend and prediction endpoint
│
├── index.html
│   └── Frontend interface
│
├── style.css
│   └── Frontend styling
│
├── script.js
│   └── Frontend logic and API requests
│
├── requirements.txt
│   └── Python dependencies
│
├── Student Social Media And Mental Health Impact.csv
│   └── Training dataset
│
└── README.md
```

---

# Requirements

Before running the project, install:

* Python 3
* pip
* Git
* FastAPI
* Uvicorn
* Pandas
* NumPy
* Scikit-learn
* Joblib
* Pydantic

All Python dependencies are available through:

```text
requirements.txt
```

---

# 8. Reproduce the Project

## Step 1 — Clone Repository

```bash
git clone https://github.com/kalevaishnavi04/mental-health-score-prediction.git
```

```bash
cd mental-health-score-prediction
```

---

## Step 2 — Create Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS / Linux

```bash
python -m venv venv
source venv/bin/activate
```

---

## Step 3 — Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Run the FastAPI Backend

Start the API:

```bash
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

---

# API Documentation

FastAPI automatically provides interactive API documentation.

Open:

```text
http://127.0.0.1:8000/docs
```

---

# Prediction Endpoint

### Request

```http
POST /predict
```

The request body should contain the input features expected by the model.

### Response

```json
{
  "predicted_mental_health_score": 7.84
}
```

> The value shown is only an example of the response format.

---

# Run the Frontend

Do not open `index.html` directly from the file system.

Start a simple local server:

```bash
python -m http.server 5500
```

Then open:

```text
http://127.0.0.1:5500/index.html
```

The frontend uses JavaScript's Fetch API to send prediction requests to the FastAPI backend.

---

# End-to-End Workflow

```text
Student Inputs
      ↓
Frontend Form
      ↓
JavaScript Fetch API
      ↓
POST /predict
      ↓
FastAPI
      ↓
Pydantic Validation
      ↓
Trained ML Model
      ↓
Prediction
      ↓
JSON Response
      ↓
Frontend
      ↓
Mental Health Score
```

---

# Model Development Workflow

```text
CSV Dataset
     ↓
Pandas
     ↓
Data Cleaning
     ↓
EDA
     ↓
Feature Preparation
     ↓
Train/Test Split
     ↓
Regression Model
     ↓
Model Evaluation
     ↓
Joblib Serialization
     ↓
Mental_Health_Model.pkl
     ↓
FastAPI
     ↓
Web Application
```

---

# Deployment

## Backend

The FastAPI backend can be deployed using **Render**.

Typical start command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

## Frontend

The static frontend can be deployed using **Netlify**.

Update the API URL in `script.js` to point to the deployed FastAPI backend.

Example:

```javascript
const API_URL = "YOUR_DEPLOYED_FASTAPI_URL";
```

---

# Live Demo

🌐 **Frontend:**
Add your Netlify deployment URL here.

⚙️ **Backend API:**
Add your Render deployment URL here.

📚 **API Documentation:**
`YOUR_DEPLOYED_FASTAPI_URL/docs`

---

# Future Improvements

* 📊 Add interactive data visualizations
* 🔍 Add model explainability
* 🧠 Compare multiple regression algorithms
* 🔄 Add cross-validation
* 📈 Add model performance dashboard
* 🧪 Add automated model testing
* 🚀 Add CI/CD pipeline
* 📦 Containerize FastAPI with Docker
* 📊 Add prediction history
* 🔐 Add API authentication
* 📱 Improve mobile responsiveness
* 🌐 Add multilingual support
* ♻️ Implement model retraining pipeline
* 📉 Add model drift monitoring

---

# Project Highlights

This project demonstrates practical experience with:

* Machine Learning
* Regression
* Exploratory Data Analysis
* Data preprocessing
* Feature engineering
* Model evaluation
* Scikit-learn
* Pandas
* NumPy
* Joblib
* FastAPI
* REST APIs
* Pydantic
* JavaScript Fetch API
* ML model deployment
* Render
* Netlify
* End-to-end ML application development

---

# 👩‍💻 Author

## Vaishnavi Kale

**B.E. Information Technology | Data Science**

Interested in:

* Machine Learning
* Data Science
* Python Development
* Data Analytics
* Backend Development
* AI/ML
* Cloud & DevOps

### GitHub

https://github.com/kalevaishnavi04

### Portfolio

https://kalevaishnavi04.github.io

---

# 📄 Disclaimer

This project is developed for **educational and portfolio purposes**.

The predicted Mental Health Score is a machine-learning estimate based on the available dataset and input features. It is **not a medical diagnosis, psychological assessment, or substitute for professional mental-health advice**.

---

# ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.
