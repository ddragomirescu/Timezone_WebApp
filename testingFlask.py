from flask import Flask, render_template
from datetime import datetime
from pytz import timezone

# Create a Flask application
app = Flask(__name__)

TIMEZONES_CONFIG = [
    {"city": "UTC", "timezone": "UTC"},
    {"city": "Bucharest", "timezone": "Europe/Bucharest"},
    {"city": "New York", "timezone": "America/New_York"},
    {"city": "Los Angeles", "timezone": "America/Los_Angeles"},
    {"city": "London", "timezone": "Europe/London"},
    {"city": "Paris", "timezone": "Europe/Paris"},
    {"city": "Berlin", "timezone": "Europe/Berlin"},
    {"city": "Dubai", "timezone": "Asia/Dubai"},
    {"city": "Mumbai", "timezone": "Asia/Kolkata"},
    {"city": "Seoul", "timezone": "Asia/Seoul"},
    {"city": "Singapore", "timezone": "Asia/Singapore"},
    {"city": "Tokyo", "timezone": "Asia/Tokyo"},
    {"city": "Sydney", "timezone": "Australia/Sydney"},
]

def get_timezone_times():
    """Return the current time for several areas around the world."""
    times = []
    for config in TIMEZONES_CONFIG:
        tz = timezone(config["timezone"])
        dt = datetime.now(tz)
        times.append({
            "city": config["city"],
            "date": dt.strftime("%Y-%m-%d"),
            "time": dt.strftime("%H:%M:%S"),
            "day_of_week": dt.strftime("%A"),
            "utc_offset": dt.strftime("UTC%z")[:-2] + ":" + dt.strftime("%z")[-2:],
            "timezone_name": config["timezone"],
        })

    return times  


@app.route('/')
def home():
    timezone_times = get_timezone_times()
    return render_template('index.html', timezone_times=timezone_times)

@app.route('/about')
def about():
    return "<h1>About Us</h1>" \
    "<p>I'm testing Flask today!</p>"


if __name__ == '__main__':
    #  Run the development server (debug mode enabled)
    app.run(debug=True, port=5001)
