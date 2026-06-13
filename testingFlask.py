from flask import Flask, jsonify, render_template
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
        times.append(get_timezone_time(config))

    return times  


def get_timezone_time(config):
    """Return current time details for one timezone config."""
    tz = timezone(config["timezone"])
    dt = datetime.now(tz)

    return {
        "city": config["city"],
        "date": dt.strftime("%Y-%m-%d"),
        "time": dt.strftime("%H:%M:%S"),
        "day_of_week": dt.strftime("%A"),
        "utc_offset": dt.strftime("UTC%z")[:-2] + ":" + dt.strftime("%z")[-2:],
        "timezone_name": config["timezone"],
    }


def find_timezone_config(search_value):
    """Find a timezone config by city or timezone name."""
    normalized_search = search_value.strip().lower()

    for config in TIMEZONES_CONFIG:
        if config["city"].lower() == normalized_search:
            return config

        if config["timezone"].lower() == normalized_search:
            return config

    return None


@app.route('/')
def home():
    timezone_times = get_timezone_times()
    return render_template('index.html', timezone_times=timezone_times)

@app.route('/about')
def about():
    return "<h1>About Us</h1>" \
    "<p>I'm testing Flask today!</p>"


@app.route('/api/timezones')
def api_timezones():
    return jsonify(get_timezone_times())


@app.route('/api/timezone/<path:timezone_name>')
def api_timezone_by_name(timezone_name):
    config = find_timezone_config(timezone_name)

    if config is None:
        return jsonify({
            "error": "Timezone not found",
            "available_timezones": [item["timezone"] for item in TIMEZONES_CONFIG],
        }), 404

    return jsonify(get_timezone_time(config))


@app.route('/api/area/<area_name>')
def api_timezone_by_area(area_name):
    config = find_timezone_config(area_name)

    if config is None:
        return jsonify({
            "error": "Area not found",
            "available_areas": [item["city"] for item in TIMEZONES_CONFIG],
        }), 404

    return jsonify(get_timezone_time(config))


if __name__ == '__main__':
    #  Run the development server (debug mode enabled)
    app.run(debug=True, host='0.0.0.0', port=5001)
