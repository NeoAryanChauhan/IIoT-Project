from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017")

# Create database
db = client["iiot_db"]

# Create collection
sensor_collection = db["sensor_data"]
