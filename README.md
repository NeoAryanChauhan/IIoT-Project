# IIoT-Project
Predictive Maintenance System using IIoT + ML

## Quick start

### Backend
1. Create a virtual environment and install dependencies:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Run the API:

```bash
uvicorn main:app --reload
```

### Frontend
Open `frontend/index.html` in a browser. The dashboard polls the backend at `http://localhost:8000/health`.

### Sample sensor payload
Send sensor data from ESP32 or a simulator:

```json
{
  "machine_id": "M01",
  "vibration_g": 0.82,
  "current_A": 2.6,
  "temperature_C": 58
}
```
