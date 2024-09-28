const clockElement = document.getElementById("clock");
const addReminderBtn = document.getElementById("addReminderBtn");
const remindersUl = document.getElementById("remindersUl");
const alertSound = document.getElementById("alertSound");

let lastAlertTimes = {};

// Update clock every second
setInterval(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;

    checkReminders(hours, minutes);
}, 1000);

// Check if current time matches any reminders
function checkReminders(currentHour, currentMinute) {
    const reminders = document.querySelectorAll('.reminder');
    reminders.forEach((reminder, index) => {
        const checkbox = reminder.querySelector('input[type="checkbox"]');
        const hour = reminder.querySelector('input[name="hour"]').value;
        const minute = reminder.querySelector('input[name="minute"]').value;
        const note = reminder.querySelector('input[name="note"]').value;

        if (checkbox.checked && hour === currentHour && minute === currentMinute) {
            const reminderKey = `reminder_${index}`;
            const lastAlertTime = lastAlertTimes[reminderKey];

            const currentTime = new Date();
            if (!lastAlertTime || (currentTime - lastAlertTime) >= 24 * 60 * 60 * 1000) {
                alertSound.play();
                alert(note);
                lastAlertTimes[reminderKey] = currentTime;
            }
        }
    });
}

// Add a new reminder
addReminderBtn.addEventListener("click", () => {
    const reminderDiv = document.createElement("div");
    reminderDiv.classList.add("reminder");

    const activeDiv = document.createElement("div");
    activeDiv.classList.add("active-checkbox");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const label = document.createElement("label");
    label.textContent = "Activer";

    activeDiv.appendChild(checkbox);
    activeDiv.appendChild(label);
    reminderDiv.appendChild(activeDiv);

    // Create input fields for reminder
    const hourInput = document.createElement("input");
    hourInput.type = "number";
    hourInput.name = "hour";
    hourInput.min = 0;
    hourInput.max = 23;
    hourInput.placeholder = "HH";

    const minuteInput = document.createElement("input");
    minuteInput.type = "number";
    minuteInput.name = "minute";
    minuteInput.min = 0;
    minuteInput.max = 59;
    minuteInput.placeholder = "MM";

    const noteInput = document.createElement("input");
    noteInput.type = "text";
    noteInput.name = "note";
    noteInput.placeholder = "Note";

    reminderDiv.appendChild(hourInput);
    reminderDiv.appendChild(minuteInput);
    reminderDiv.appendChild(noteInput);

    // Create the remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "−";
    removeBtn.classList.add("removeBtn");
    removeBtn.onclick = () => reminderDiv.remove();

    reminderDiv.appendChild(removeBtn);
    remindersUl.appendChild(reminderDiv);
});
