function renderMonthlyCalender(
  currMonth,
  currYear,
  monthNameDisplay,
  internalContainer
) {
  internalContainer.innerHTML = `
              <div class="day-name">Mon</div>
              <div class="day-name">Tue</div>
              <div class="day-name">Wed</div>
              <div class="day-name">Thu</div>
              <div class="day-name">Fri</div>
              <div class="day-name">Sat</div>
              <div class="day-name">Sun</div>
        `;
  // fetching moods from local storage
  let moods = JSON.parse(localStorage.getItem("mood_tracker_moods")) || [];

  // getting the first and last day of the month along with the weekday of the first and last day
  let firstDayOfMonth = new Date(currYear, currMonth, 1);
  let lastDayOfMonth = new Date(currYear, currMonth + 1, 0);
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let weekdayOfLastDay = lastDayOfMonth.getDay();

  // extracting moods for currMonth month and year
  let currMonthMood = moods.filter((mood) => {
    const moodDate = new Date(mood.date);
    return (
      moodDate.getMonth() === currMonth && moodDate.getFullYear() === currYear
    );
  });

  monthNameDisplay.innerText = `${firstDayOfMonth.toLocaleString("default", {
    month: "long",
  })}, ${currYear}`;

  // filling the empty divs for the first week of the month
  // if the first day of the month is not a monday
  for (let i = 1; i < weekdayOfFirstDay; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("month-day");
    emptyDiv.innerHTML = `
                <small class="month-date">-</small>
                <p id="attached-emoji"></p>
      `;
    internalContainer.appendChild(emptyDiv);
  }

  // logic for filling the days of the month with the moods
  let dayIndex = 0;
  let monthDateContainerIndex = 0;

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    let attachedEmoji = "";

    if (
      new Date(currMonthMood[dayIndex]?.date).getDate() ===
      new Date(currYear, currMonth, i).getDate()
    ) {
      attachedEmoji = currMonthMood[dayIndex].emoji;
      if (dayIndex < currMonthMood.length - 1) {
        dayIndex++;
      }
    }

    const monthDayDiv = document.createElement("div");
    monthDayDiv.classList.add("month-day");
    monthDayDiv.innerHTML = `
                <small class="month-date">${i}</small>
                <p id="attached-emoji">${attachedEmoji}</p>
      `;
    internalContainer.appendChild(monthDayDiv);
    monthDateContainerIndex++;
  }

  // filling empty divs for the last week of the month
  // if the last day of the month is not a sunday
  for (let i = weekdayOfLastDay; i < 7; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("month-day");
    emptyDiv.innerHTML = `
                <small class="month-date
                ">-</small>
                <p id="attached-emoji"></p>
      `;
    internalContainer.appendChild(emptyDiv);
  }
}

function renderWeeklyCalender(
  currWeek,
  todayDate,
  startDateElement,
  endDateElement,
  attachedEmojiContainers,
  formateDate
) {
  // setting the start and end date of the week
  const startDate = new Date(
    todayDate.getTime() - currWeek * 24 * 60 * 60 * 1000
  );
  const endDate = new Date(
    todayDate.getTime() + (6 - currWeek) * 24 * 60 * 60 * 1000
  );

  // setting the start and end date of the week
  startDateElement.innerText = formateDate(startDate);
  endDateElement.innerText = formateDate(endDate);

  const moods = JSON.parse(localStorage.getItem("mood_tracker_moods")) || [];

  // filtering the moods for the current week
  const moodForCurrWeek = moods.filter((mood) => {
    const moodDate = new Date(mood.date);
    return moodDate >= startDate && moodDate <= endDate;
  });

  // setting the emojis for the current week
  let moodTrackingIndex = 0;
  attachedEmojiContainers.forEach((attachedEmojiContainer, index) => {
    let tempMoodTrackedDate = new Date(
      moodForCurrWeek[moodTrackingIndex]?.date
    );

    if (tempMoodTrackedDate.getDay() === index) {
      attachedEmojiContainer.innerText =
        moodForCurrWeek[moodTrackingIndex]?.emoji;
      moodTrackingIndex++;
    } else {
      attachedEmojiContainer.innerText = "";
    }
  });
}

export { renderMonthlyCalender, renderWeeklyCalender };
