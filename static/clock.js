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

const tableSort = {
    field: null,
    direction: "asc",
};

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

function getSortValue(row, field) {
    return row.querySelector(`[data-field="${field}"]`)?.textContent || "";
}

function compareRows(first, second) {
    if (!tableSort.field) {
        return Number(first.dataset.originalOrder) - Number(second.dataset.originalOrder);
    }

    const firstValue = getSortValue(first, tableSort.field);
    const secondValue = getSortValue(second, tableSort.field);
    let result = firstValue.localeCompare(secondValue);

    if (result === 0) {
        result = Number(first.dataset.originalOrder) - Number(second.dataset.originalOrder);
    }

    return tableSort.direction === "asc" ? result : -result;
}

function updateSortIndicators() {
    document.querySelectorAll("[data-sort-indicator]").forEach((indicator) => {
        const field = indicator.dataset.sortIndicator;

        if (field !== tableSort.field) {
            indicator.textContent = "";
            return;
        }

        indicator.textContent = tableSort.direction === "asc" ? "(asc)" : "(desc)";
    });
}

function sortTimezoneRows() {
    const tableBody = document.querySelector("tbody");

    if (!tableBody) {
        return;
    }

    const rows = Array.from(tableBody.querySelectorAll("[data-timezone]"));
    rows.sort(compareRows);
    rows.forEach((row) => tableBody.appendChild(row));
    updateSortIndicators();
}

function handleSortClick(event) {
    const field = event.currentTarget.dataset.sortField;

    if (tableSort.field === field) {
        tableSort.direction = tableSort.direction === "asc" ? "desc" : "asc";
    } else {
        tableSort.field = field;
        tableSort.direction = "asc";
    }

    sortTimezoneRows();
}

function handleSortKeydown(event) {
    if (event.key !== "Enter" && event.key !== " ") {
        return;
    }

    event.preventDefault();
    handleSortClick(event);
}

function updateClocks() {
    const now = new Date();
    updateMainClock(now);
    updateTimezoneRows(now);
    sortTimezoneRows();
}

updateClocks();
setInterval(updateClocks, 1000);

document
    .querySelector("[data-timezone-picker]")
    ?.addEventListener("change", updateSelectedTimezone);

document.querySelectorAll("[data-sort-field]").forEach((header) => {
    header.addEventListener("click", handleSortClick);
    header.addEventListener("keydown", handleSortKeydown);
});
