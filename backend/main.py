
from fastapi import FastAPI
from database import sensor_collection
from datetime import datetime

app = FastAPI()

def analyze_window(window):
    temps = [d["temperature"] for d in window]
    hums = [d["humidity"] for d in window]
    foots = [d["footfall"] for d in window]

    avg_temp = sum(temps) / len(temps)
    avg_hum = sum(hums) / len(hums)
    avg_foot = sum(foots) / len(foots)

    return {
        "avg_temperature": avg_temp,
        "avg_humidity": avg_hum,
        "avg_footfall": avg_foot,
        "max_temperature": max(temps),
        "min_temperature": min(temps)
    }

def risk_level(avg_temp, avg_footfall):
    if avg_temp > 35 or avg_footfall > 15:
        return "HIGH"
    elif avg_footfall > 8:
        return "MEDIUM"
    return "LOW"


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

@app.get("/sensor/window")
def get_sensor_window(window_size: int = 5):
    cursor = (
        sensor_collection
        .find()
        .sort("_id", -1)
        .limit(window_size)
    )

    window = []
    for doc in cursor:
        doc["_id"] = str(doc["_id"])
        window.append(doc)

    window.reverse()  # oldest → newest
    return window

@app.get("/sensor/window/analysis")
def analyze_sensor_window(window_size: int = 5):
    cursor = (
        sensor_collection
        .find()
        .sort("_id", -1)
        .limit(window_size)
    )

    window = list(cursor)

    if len(window) < window_size:
        return {"message": "Not enough data for analysis"}

    analysis = analyze_window(window)

    analysis["risk"] = risk_level(
        analysis["avg_temperature"],
        analysis["avg_footfall"]
    )


    return {
        "window_size": window_size,
        "analysis": analysis
    }
