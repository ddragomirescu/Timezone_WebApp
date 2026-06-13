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
+-- templates/
|   +-- index.html
+-- static/
    +-- styles.css
    +-- clock.js
```

## Requirements

- Python 3
- Flask
- pytz

Install dependencies:

```bash
pip install flask pytz
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

## How It Works

`testingFlask.py` defines the list of timezones and sends the initial timezone data to the page.

`templates/index.html` renders the main clock, timezone selector, and table.

`static/clock.js` updates the central clock and table values every second in the browser.

`static/styles.css` contains the page styling.

## Purpose

This is a beginner-friendly sample project for learning Flask, templates, static files, and basic time tracking across different regions.
