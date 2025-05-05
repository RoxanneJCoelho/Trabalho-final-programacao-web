const calendarBody = document.getElementById("calendarBody");
const monthYear = document.getElementById("monthYear");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedCell = null;

const renderCalendar = (month, year) => {
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = (firstDay === 0) ? 6 : firstDay - 1;

  calendarBody.innerHTML = "";
  monthYear.textContent = new Date(year, month).toLocaleString('pt-BR', {
    month: 'long',
    year: 'numeric'
  });

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("td");

      if (i === 0 && j < startDay) {
        cell.textContent = "";
      } else if (date > daysInMonth) {
        break;
      } else {
        const cellDate = new Date(year, month, date);
        const cellTimestamp = cellDate.setHours(0, 0, 0, 0);
        const todayTimestamp = new Date().setHours(0, 0, 0, 0);

        cell.textContent = date;

        if (cellTimestamp < todayTimestamp) {
          cell.classList.add("disabled");
        } else {
          cell.addEventListener("click", () => {
            if (selectedCell) selectedCell.classList.remove("selected-day");
            cell.classList.add("selected-day");
            selectedCell = cell;
          });
        }

        date++;
      }

      row.appendChild(cell);
    }

    calendarBody.appendChild(row);
  }
};

prevMonth.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextMonth.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

renderCalendar(currentMonth, currentYear);