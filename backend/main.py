
from fastapi import FastAPI
from database import sensor_collection
from datetime import datetime

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "Backend is running"}

@app.post("/sensor-data")
def sensor_data(data: dict):
    data["timestamp"] = datetime.now()
    sensor_collection.insert_one(data)

    return {
        "message": "Data stored successfully"
    }

@app.get("/sensor/latest")
def get_latest():
    data = sensor_collection.find_one(sort=[("_id", -1)])
    if data:
        data["_id"] = str(data["_id"])
    return data

