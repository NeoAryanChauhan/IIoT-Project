from typing import Dict

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="IIoT Predictive Maintenance API")


class SensorPayload(BaseModel):
    machine_id: str = Field(..., min_length=1)
    vibration_g: float = Field(..., ge=0)
    current_A: float = Field(..., ge=0)
    temperature_C: float = Field(...)


latest_sensor_data: Dict[str, SensorPayload] = {}


@app.post("/sensor-data")
def receive_sensor_data(payload: SensorPayload) -> Dict[str, str]:
    latest_sensor_data[payload.machine_id] = payload
    return {"message": "Sensor data received", "machine_id": payload.machine_id}


def _evaluate_health(payload: SensorPayload) -> Dict[str, str | int]:
    thresholds = {
        "vibration_g": 0.6,
        "current_A": 3.0,
        "temperature_C": 60.0,
    }
    high_flags = {
        "vibration_g": payload.vibration_g >= thresholds["vibration_g"],
        "current_A": payload.current_A >= thresholds["current_A"],
        "temperature_C": payload.temperature_C >= thresholds["temperature_C"],
    }
    high_count = sum(high_flags.values())

    health_score = 100
    if high_count == 1:
        health_score -= 20
    elif high_count >= 2:
        health_score -= 45

    if high_flags["vibration_g"]:
        health_score -= 10
    if high_flags["current_A"]:
        health_score -= 8
    if high_flags["temperature_C"]:
        health_score -= 7

    health_score = max(0, health_score)

    if high_count == 0:
        status = "healthy"
    elif high_count == 1:
        status = "warning"
    else:
        status = "critical"

    reasons = []
    if high_flags["vibration_g"]:
        reasons.append("High vibration")
    if high_flags["current_A"]:
        reasons.append("Elevated current")
    if high_flags["temperature_C"]:
        reasons.append("High temperature")

    reason_text = " and ".join(reasons) if reasons else "All parameters normal"

    return {
        "health_score": health_score,
        "status": status,
        "reason": reason_text,
    }


@app.get("/health")
def get_health(machine_id: str) -> Dict[str, str | int | float]:
    payload = latest_sensor_data.get(machine_id)
    if payload is None:
        raise HTTPException(status_code=404, detail="Machine data not found")

    health = _evaluate_health(payload)
    return {
        "machine_id": machine_id,
        "vibration_g": payload.vibration_g,
        "current_A": payload.current_A,
        "temperature_C": payload.temperature_C,
        **health,
    }
