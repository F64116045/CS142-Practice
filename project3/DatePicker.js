class DatePicker {
    constructor(id, callback) {
      this.container = document.getElementById(id); // 綁定到指定的 div
      this.callback = callback; // 選擇日期時的回調函數
      this.currentDate = new Date(); // 預設顯示當前月份
    }
  
    render(date) {
      this.currentDate = new Date(date); // 設置顯示的月份
      this.container.innerHTML = ""; // 清空 div 內容
      const calendar = this.createCalendar(this.currentDate); // 建立日曆 HTML
      this.container.appendChild(calendar); // 插入日曆
    }
  
    createCalendar(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
  
      
      const calendar = document.createElement("div");
      calendar.className = "datepicker-calendar";
  
      // 添加標題行（月份名稱與年份 + 控制按鈕）
      const header = document.createElement("div");
      header.className = "datepicker-header";
  
      const prevButton = document.createElement("button");
      prevButton.textContent = "<";
      prevButton.onclick = () => this.changeMonth(-1);
  
      const nextButton = document.createElement("button");
      nextButton.textContent = ">";
      nextButton.onclick = () => this.changeMonth(1);
  
      const title = document.createElement("div");
      title.className = "datepicker-title";
      title.textContent = `${this.getMonthName(month)} ${year}`;
  
      header.appendChild(prevButton);
      header.appendChild(title);
      header.appendChild(nextButton);
      calendar.appendChild(header);
  
      // 添加星期標題
      const daysHeader = document.createElement("div");
      daysHeader.className = "datepicker-days-header";
      ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].forEach((day) => {
        const dayElement = document.createElement("div");
        dayElement.className = "datepicker-day-name";
        dayElement.textContent = day;
        daysHeader.appendChild(dayElement);
      });
      calendar.appendChild(daysHeader);
  
      // 添加日期
      const daysContainer = document.createElement("div");
      daysContainer.className = "datepicker-days-container";
  
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
  
      const startDay = firstDay.getDay(); // 本月第一天是星期幾
      const totalDays = lastDay.getDate(); // 本月天數
  
      // 計算日曆顯示的範圍（包括前一月與下一月的日期）
      const prevMonthDays = new Date(year, month, 0).getDate(); // 前一月的天數
      const daysBefore = startDay; // 前一月需要顯示的天數
  
      // 創建每一天的元素
      const totalCells = Math.ceil((daysBefore + totalDays) / 7) * 7;
      for (let i = 0; i < totalCells; i++) {
        const dayElement = document.createElement("div");
        dayElement.className = "datepicker-day";
  
        let dayNumber;
        if (i < daysBefore) {
          // 前一月
          dayNumber = prevMonthDays - daysBefore + 1 + i;
          dayElement.classList.add("datepicker-day-outside");
        } else if (i < daysBefore + totalDays) {
          // 當月
          dayNumber = i - daysBefore + 1;
          dayElement.classList.add("datepicker-day-current");
          dayElement.onclick = () => this.selectDate(year, month, dayNumber);
        } else {
          // 下一月
          dayNumber = i - daysBefore - totalDays + 1;
          dayElement.classList.add("datepicker-day-outside");
        }
  
        dayElement.textContent = dayNumber;
        daysContainer.appendChild(dayElement);
      }
  
      calendar.appendChild(daysContainer);
      return calendar;
    }
  
    changeMonth(offset) {
      const newDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + offset,
        1
      );
      this.render(newDate); // 重新渲染新的月份
    }
  
    selectDate(year, month, day) {
      // 呼叫回調函數
      this.callback(this.container.id, {
        year: year,
        month: month + 1, // JavaScript 的月份從 0 開始
        day: day,
      });
    }
  
    getMonthName(month) {
      return [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ][month];
    }
  }
  