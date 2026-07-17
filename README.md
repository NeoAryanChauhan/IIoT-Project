# IIoT-Based Predictive Maintenance System

## Overview

This project presents an Industrial Internet of Things (IIoT) based predictive maintenance system designed to monitor machine health in real time using multi-sensor data and analytical models.

The system captures operational parameters such as temperature, current, and vibration, processes them through a data pipeline, and estimates machine health to enable early detection of potential failures.

-----

## Objectives

* Monitor machine condition using real-time sensor data
* Detect abnormal behavior and potential faults
* Provide a unified health score for system status
* Enable scalable integration with machine learning models

---

## Key Features

* Real-time monitoring of temperature, current, and vibration
* Health score computation (0–100 scale)
* Fault classification (overheating, overload, imbalance)
* Interactive dashboard with live data visualization
* Modular architecture supporting ML integration
* Simulated data pipeline for development and testing

---

## System Architecture

Sensors → Edge Device (NodeMCU) → Backend API → Data Processing / ML → Dashboard

---

## Technology Stack

### Frontend

* Next.js
* React
* Tailwind CSS
* Charting libraries (Chart.js / Recharts)

### Backend (Planned / Partial)

* Node.js / FastAPI
* RESTful APIs

### Machine Learning

* Rule-based model (current implementation)
* Isolation Forest (planned for anomaly detection)

### Hardware

* NodeMCU (ESP8266)
* DHT11 (Temperature Sensor)
* ACS712 (Current Sensor)
* MPU6050 / Piezo Sensor (Vibration)

---

## Dashboard Capabilities

* Health score visualization using gauge indicators
* Real-time sensor data charts
* Alert system for abnormal conditions
* Machine status overview and operating mode display

---

## Current Implementation Status

* Dashboard UI implemented
* Simulated data generation integrated
* Basic rule-based fault detection implemented
* Git-based project version control configured

---

## Future Work

* Integration with real sensor hardware
* Backend data storage and time-series database
* Advanced machine learning model integration
* Cloud deployment and remote monitoring
* MQTT-based communication for scalability

---

## Project Scope

This project demonstrates an end-to-end IIoT pipeline, including data acquisition, processing, and visualization. It is designed to be extendable toward industrial-scale predictive maintenance systems.
