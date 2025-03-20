import { renderMonthlyCalender, renderWeeklyCalender } from "./utils.js";

const themeToggleBtn = document.getElementById("theme-toggle");
const root = document.documentElement; // This gets the :root element
const allTimeRangeBtns = document.querySelectorAll(".time-range button");
const timelineContainer = document.querySelector(".timeline-container");

// This function will format the date to dd/mm/yyyy
const formateDate = (date) => {
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

// defined enum for time range
let timeRange = {
  DAY_WISE: "day-wise",
  WEEK_WISE: "week-wise",
  MONTH_WISE: "month-wise",
};

// rendering for DAY_WISE initially
let currTimeRange = timeRange.DAY_WISE;

// main function to initialize the project for different time ranges
function initializeProject() {
  if (currTimeRange === timeRange.DAY_WISE) {
    timelineContainer.innerHTML = `
        <i class="fa fa-arrow-left control" id="prev-btn"></i>
        <i class="fa fa-arrow-right control" id="next-btn"></i>
        <div class="day-wise">
          <h1 id="date">March 3, 2025</h1>
          <p id="attached-emoji">😊</p>
        </div>
      `;
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const dateElement = document.getElementById("date");
    const emojiElement = document.getElementById("attached-emoji");
    let activeDate = new Date();
    activeDate.setHours(0, 0, 0, 0);

    const moods = JSON.parse(localStorage.getItem("mood_tracker_moods")) || [];

    const moodForCurrDay = moods.find((mood) => {
      const moodDate = new Date(mood.date).getTime();
      console.log(moodDate === activeDate.getTime());
      return moodDate == activeDate.getTime();
    });

    console.log(moodForCurrDay);
    dateElement.innerText = formateDate(activeDate);
    emojiElement.innerText = moodForCurrDay?.emoji || "";

    prevBtn.addEventListener("click", () => {
      activeDate.setDate(activeDate.getDate() - 1);
      dateElement.innerText = formateDate(activeDate);

      const moodForCurrDay = moods.find((mood) => {
        const moodDate = new Date(mood.date).getTime();
        return moodDate === activeDate.getTime();
      });
      emojiElement.innerText = moodForCurrDay?.emoji || "";
    });

    nextBtn.addEventListener("click", () => {
      activeDate.setDate(activeDate.getDate() + 1);
      dateElement.innerText = formateDate(activeDate);

      const moodForCurrDay = moods.find((mood) => {
        const moodDate = new Date(mood.date).getTime();
        return moodDate == activeDate.getTime();
      });
      emojiElement.innerText = moodForCurrDay?.emoji || "";
    });
  }

  // rendering for WEEK_WISE
  if (currTimeRange === timeRange.WEEK_WISE) {
    timelineContainer.innerHTML = `
         <i class="fa fa-arrow-left control" id="prev-btn"></i>
          <i class="fa fa-arrow-right control" id="next-btn"></i>
          <div class="week-wise">
            <span class="week-range">
              <p id="start-date">2023-10-01</p>
              -
              <p id="end-date">2023-10-07</p>
            </span>
            <div class="internal-container">
              <div class="week-day">
                <p>Sunday</p>
                <p class="attached-emoji">😊</p>
              </div>
              <div class="week-day">
                <p>Monday</p>
                <p class="attached-emoji">😊</p>
              </div>
              <div class="week-day">
                <p>Tuesday</p>
                <p class="attached-emoji">😊</p>
              </div>
              <div class="week-day">
                <p>Wednesday</p>
                <p class="attached-emoji">😊</p>
              </div>
              <div class="week-day">
                <p>Thursday</p>
                <p class="attached-emoji">😊</p>
              </div>
              <div class="week-day">
                <p>Friday</p>
                <p class="attached-emoji">😊</p>
              </div>
              <div class="week-day">
                <p>Saturday</p>
                <p class="attached-emoji">😊</p>
              </div> 
            </div>
          </div>
      `;

    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    let currWeek = todayDate.getDay();

    const attachedEmojiContainers =
      document.querySelectorAll(".attached-emoji");
    const startDateElement = document.getElementById("start-date");
    const endDateElement = document.getElementById("end-date");

    renderWeeklyCalender(
      currWeek,
      todayDate,
      startDateElement,
      endDateElement,
      attachedEmojiContainers,
      formateDate
    );

    prevBtn.addEventListener("click", () => {
      currWeek += 7;

      renderWeeklyCalender(
        currWeek,
        todayDate,
        startDateElement,
        endDateElement,
        attachedEmojiContainers,
        formateDate
      );
    });

    nextBtn.addEventListener("click", () => {
      currWeek -= 7;

      renderWeeklyCalender(
        currWeek,
        todayDate,
        startDateElement,
        endDateElement,
        attachedEmojiContainers,
        formateDate
      );
    });
  }

  // rendering for MONTH_WISE
  if (currTimeRange === timeRange.MONTH_WISE) {
    timelineContainer.innerHTML = `
        <i class="fa fa-arrow-left control" id="prev-btn"></i>
          <i class="fa fa-arrow-right control" id="next-btn"></i>
          <div class="month-wise">
            <div class="month">March, 2025</div>
            <div class="internal-container">
              <div class="day-name">Mon</div>
              <div class="day-name">Tue</div>
              <div class="day-name">Wed</div>
              <div class="day-name">Thu</div>
              <div class="day-name">Fri</div>
              <div class="day-name">Sat</div>
              <div class="day-name">Sun</div>
            </div>
          </div>
        `;

    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const monthNameDisplay = document.querySelector(".month");
    const internalContainer = document.querySelector(".internal-container");

    let todayDate = new Date();
    let currMonth = todayDate.getMonth();
    let currYear = todayDate.getFullYear();

    renderMonthlyCalender(
      currMonth,
      currYear,
      monthNameDisplay,
      internalContainer
    );

    prevBtn.addEventListener("click", () => {
      currMonth -= 1;
      if (currMonth < 0) {
        currMonth = 11;
        currYear -= 1;
      }
      renderMonthlyCalender(
        currMonth,
        currYear,
        monthNameDisplay,
        internalContainer
      );
    });

    nextBtn.addEventListener("click", () => {
      currMonth += 1;
      if (currMonth > 11) {
        currMonth = 0;
        currYear += 1;
      }
      renderMonthlyCalender(
        currMonth,
        currYear,
        monthNameDisplay,
        internalContainer
      );
    });
  }
}

// adding event listeners to all the time range buttons for switching between them
allTimeRangeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    allTimeRangeBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    currTimeRange = e.target.id;
    initializeProject();
  });
});

// theme toggle button
themeToggleBtn.addEventListener("click", () => {
  const isDark =
    getComputedStyle(root).getPropertyValue("--bg-color").trim() ===
    "rgb(0, 0, 0)";

  if (isDark) {
    // changing value of css variables
    root.style.setProperty("--bg-color", "rgb(255, 255, 255)");
    root.style.setProperty("--text-color", "rgb(0, 0, 0)");
    themeToggleBtn.classList.remove("fa-sun");
    themeToggleBtn.classList.add("fa-moon");
  } else {
    root.style.setProperty("--bg-color", "rgb(0, 0, 0)");
    root.style.setProperty("--text-color", "rgb(255, 255, 255)");
    themeToggleBtn.classList.remove("fa-moon");
    themeToggleBtn.classList.add("fa-sun");
  }
});

// adding event listeners to all the emoji buttons for adding moods
document.querySelectorAll(".emoji-input").forEach((emojiInput) => {
  emojiInput.addEventListener("click", (e) => {
    const emoji = e.target.innerText;
    let currDate = new Date();
    currDate.setHours(0, 0, 0, 0);

    let moods = JSON.parse(localStorage.getItem("mood_tracker_moods") || "[]");

    if (moods[moods.length - 1]?.date === currDate.getTime()) {
      moods.pop();
    }

    const mood = {
      date: currDate.getTime(),
      emoji,
    };

    moods.push(mood);

    moods = moods.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    localStorage.setItem("mood_tracker_moods", JSON.stringify(moods));
    console.log(moods);
    initializeProject();
  });
});

initializeProject();
