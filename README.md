# World Timezones Flask App

A small Flask sample app for viewing and tracking the current time across multiple timezones.

The app shows a live central clock, a dropdown for choosing which timezone is displayed in the main clock, and a table with the current date, time, day, UTC offset, and timezone name for several cities around the world.

## Features

- Live central clock that updates every second
- Dropdown to choose the displayed timezone
- Timezone table with:
  - Area
  - Date
  - Time
  - Day
  - UTC offset
  - Timezone name
- Sample regions across America, Europe, Asia, and Australia
- Separate HTML, CSS, and JavaScript files

## Included Timezones

- UTC
- Europe/Bucharest
- America/New_York
- America/Los_Angeles
- Europe/London
- Europe/Paris
- Europe/Berlin
- Asia/Dubai
- Asia/Kolkata
- Asia/Seoul
- Asia/Singapore
- Asia/Tokyo
- Australia/Sydney

## Project Structure

```text
.
+-- testingFlask.py
+-- requirements.txt
+-- Dockerfile
+-- docker-compose.yml
+-- .dockerignore
+-- templates/
|   +-- index.html
+-- static/
    +-- styles.css
    +-- clock.js
```

## Requirements

- Python 3
- Flask
- Gunicorn
- pytz

Install dependencies:

```bash
pip install -r requirements.txt
```

## Run Locally

Start the Flask development server:

```bash
python testingFlask.py
```

Then open:

```text
http://127.0.0.1:5001/
```

## Run With Docker Compose

This is the easiest way to run the app because the port mapping is already configured.

```bash
docker compose up --build
```

Then open:

```text
http://127.0.0.1:5001/
```

Stop the app with:

```bash
docker compose down
```

## Run With Docker

Build the Docker image:

```bash
docker build -t world-timezones-flask .
```

Run the container:

```bash
docker run --rm -p 5001:5001 world-timezones-flask
```

The Docker container runs the Flask app with Gunicorn:

```bash
gunicorn --bind 0.0.0.0:5001 --access-logfile - --error-logfile - testingFlask:app
```

Follow container logs while the app is running:

```bash
docker logs -f <container-name>
```

Gunicorn access logs are written to Docker stdout, so requests appear in the logs with method, path, status code, and response time.

Then open:

```text
http://127.0.0.1:5001/
```

## API Endpoints

Get all configured timezone records:

```bash
curl http://127.0.0.1:5001/api/timezones
```

Get one timezone by timezone name:

```bash
curl http://127.0.0.1:5001/api/timezone/Europe/London
curl http://127.0.0.1:5001/api/timezone/America/New_York
curl http://127.0.0.1:5001/api/timezone/Asia/Tokyo
```

Get one timezone by area/city name:

```bash
curl http://127.0.0.1:5001/api/area/London
curl http://127.0.0.1:5001/api/area/Mumbai
curl http://127.0.0.1:5001/api/area/Sydney
```

Example response:

```json
{
  "city": "London",
  "date": "2026-06-13",
  "day_of_week": "Saturday",
  "time": "19:30:00",
  "timezone_name": "Europe/London",
  "utc_offset": "UTC+01:00"
}
```

## How It Works

`testingFlask.py` defines the list of timezones and sends the initial timezone data to the page.

`templates/index.html` renders the main clock, timezone selector, and table.

`static/clock.js` updates the central clock and table values every second in the browser.

`static/styles.css` contains the page styling.

## Purpose

This is a beginner-friendly sample project for learning Flask, templates, static files, and basic time tracking across different regions.
