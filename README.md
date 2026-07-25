🧠 Mental Health Score Prediction

An ML-powered web app that predicts a person's Mental Health Score based on their social media habits, academic level, sleep, physical activity, and stress — using a trained regression model served via a FastAPI backend.

🌐 Live Demo: add your deployed link here

🛠️ Tech Stack
ML: Python, Scikit-learn, Pandas, NumPy, Joblib
Backend: FastAPI, Uvicorn, Pydantic
Frontend: HTML, CSS, JavaScript (Fetch API)
Deployment: Render (backend) + Netlify (frontend)
📁 Project Structure
├── ML_Project.ipynb        # ML training workflow
├── Mental_Health_Model.pkl # Trained model
├── main.py                 # FastAPI backend
├── index.html / style.css / script.js  # Frontend
├── requirements.txt
└── Student Social Media And Mental Health Impact.csv
📡 API
http
POST /predict

Response:

json
{ "predicted_mental_health_score": 7.84 }
💻 Run Locally
bash
git clone https://github.com/kalevaishnavi04/mental-health-score-prediction.git
cd mental-health-score-prediction
pip install -r requirements.txt
uvicorn main:app --reload

Open API docs: http://127.0.0.1:8000/docs

For frontend, serve it (don't open the file directly):

bash
python -m http.server 5500

Then visit http://127.0.0.1:5500/index.html

👩‍💻 Author

Vaishnavi Kale GitHub: kalevaishnavi04 · Portfolio: kalevaishnavi04.github.io

⭐ Star this repo if you found it useful!
