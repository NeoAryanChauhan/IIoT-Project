import time
import random
import requests

API_URL = "http://127.0.0.1:8000/sensor-data"

while True:
    data = {
        "temperature": round(random.uniform(20, 40), 2),
        "humidity": round(random.uniform(30, 80), 2),
        "footfall": random.randint(0, 20)
    }

    try:
        response = requests.post(API_URL, json=data)
        print("Sent:", data)
        print("Response:", response.json())
    except Exception as e:
        print("Error:", e)

    print("-" * 40)
    time.sleep(2)   # send data every 2 seconds
