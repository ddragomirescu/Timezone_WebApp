function formatTime(date, timeZone) {
    return new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(date);
}

function formatDate(date, timeZone) {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}

function formatDay(date, timeZone) {
    return new Intl.DateTimeFormat("en-US", {
        timeZone,
        weekday: "long",
    }).format(date);
}

function formatOffset(date, timeZone) {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone,
        timeZoneName: "shortOffset",
    }).formatToParts(date);
    const offset = parts.find((part) => part.type === "timeZoneName");

    if (!offset || offset.value === "GMT") {
        return "UTC+00:00";
    }

    return offset.value.replace("GMT", "UTC");
}

function updateMainClock(now) {
    const clock = document.querySelector(".hero-clock");
    const time = document.querySelector("[data-main-time]");
    const date = document.querySelector("[data-main-date]");

    if (!clock || !time || !date) {
        return;
    }

    const timeZone = clock.dataset.clockTimezone;
    time.textContent = formatTime(now, timeZone);
    date.textContent = `${formatDay(now, timeZone)}, ${formatDate(now, timeZone)}`;
}

function updateSelectedTimezone() {
    const clock = document.querySelector(".hero-clock");
    const label = document.querySelector("[data-main-label]");
    const picker = document.querySelector("[data-timezone-picker]");

    if (!clock || !label || !picker) {
        return;
    }

    const selectedOption = picker.options[picker.selectedIndex];
    clock.dataset.clockTimezone = picker.value;
    label.textContent = selectedOption.dataset.city;
    updateMainClock(new Date());
}

function updateTimezoneRows(now) {
    document.querySelectorAll("[data-timezone]").forEach((row) => {
        const timeZone = row.dataset.timezone;
        row.querySelector('[data-field="date"]').textContent = formatDate(now, timeZone);
        row.querySelector('[data-field="time"]').textContent = formatTime(now, timeZone);
        row.querySelector('[data-field="day"]').textContent = formatDay(now, timeZone);
        row.querySelector('[data-field="offset"]').textContent = formatOffset(now, timeZone);
    });
}

function updateClocks() {
    const now = new Date();
    updateMainClock(now);
    updateTimezoneRows(now);
}

updateClocks();
setInterval(updateClocks, 1000);

document
    .querySelector("[data-timezone-picker]")
    ?.addEventListener("change", updateSelectedTimezone);
