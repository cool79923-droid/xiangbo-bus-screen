(function () {
  "use strict";

  const data = window.SHUTTLE_MOCK_DATA;
  const routeList = document.getElementById("route-list");
  const currentTime = document.getElementById("current-time");
  const currentDate = document.getElementById("current-date");
  const lastUpdated = document.getElementById("last-updated");
  const simulationStartedAt = Date.now();
  let lastRenderedMinute = -1;

  const timeFormatter = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long"
  });

  function getCurrentArrivals(route, elapsedMinutes) {
    const arrivals = route.arrivals.map((minute) => minute - elapsedMinutes);
    let nextGenerated = route.arrivals[route.arrivals.length - 1] - elapsedMinutes;

    while (arrivals.filter((minute) => minute > 0).length < 3) {
      nextGenerated += route.intervalMinutes;
      arrivals.push(nextGenerated);
    }

    return arrivals.filter((minute) => minute > 0).slice(0, 3);
  }

  function getAdvice(minutesUntilArrival) {
    if (minutesUntilArrival >= 8) {
      return {
        label: "慢走",
        labelEn: "Take it easy",
        icon: "→",
        color: "#64e6a8",
        state: "ample"
      };
    }

    if (minutesUntilArrival >= 5) {
      return {
        label: "快走",
        labelEn: "Walk quickly",
        icon: "»",
        color: "#ffbd57",
        state: "leave"
      };
    }

    if (minutesUntilArrival >= 2) {
      return {
        label: "跑步",
        labelEn: "Run",
        icon: "!",
        color: "#ff6f6a",
        state: "missed"
      };
    }

    return {
      label: "建议等待下班车",
      labelEn: "Wait for next bus",
      icon: "⌛",
      color: "#8fa9c4",
      state: "wait"
    };
  }

  function routeCardTemplate(route, arrivals) {
    const advice = getAdvice(arrivals[0]);
    const followingTimes = arrivals
      .slice(1)
      .map((minute) => `<span class="time-chip">${minute} 分钟</span>`)
      .join("");

    return `
      <article class="route-card" style="--route-color: ${route.color}; --advice-color: ${advice.color};">
        <div class="route-main">
          <div class="route-overview">
            <div class="route-identity">
              <div class="route-number" aria-hidden="true">${route.number}</div>
              <div class="route-name">
                <h3>${route.nameZh}</h3>
                <p>${route.nameEn}</p>
                <span class="demo-badge">模拟数据 · Demo data</span>
              </div>
            </div>
            <div class="direction-row">
              <span class="direction-line" aria-hidden="true"></span>
              <div class="direction-copy">
                <span>书院站出发</span>
                <strong>前往${route.destinationZh}</strong>
                <small>${route.destinationEn}</small>
              </div>
            </div>
          </div>

          <div class="arrival-panel">
            <span class="arrival-label">下一班 · Next arrival</span>
            <div class="arrival-content">
              <div class="next-arrival">
                <strong>${arrivals[0]}</strong>
                <span>分钟<br /><small>min</small></span>
              </div>
              <div class="following-block">
                <span class="following-label">后续 · Following</span>
                <div class="following-times">${followingTimes}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="advice advice-${advice.state}">
          <div class="advice-copy">
            <span class="advice-icon" aria-hidden="true">${advice.icon}</span>
            <span>出发建议 · Advice</span>
            <strong>${advice.label} · ${advice.labelEn}</strong>
          </div>
        </div>
      </article>
    `;
  }

  function renderRoutes(elapsedMinutes) {
    routeList.innerHTML = data.routes
      .map((route) => routeCardTemplate(route, getCurrentArrivals(route, elapsedMinutes)))
      .join("");

    lastUpdated.textContent = new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(new Date());
  }

  function updateScreen() {
    const now = new Date();
    const elapsedMinutes = Math.floor((Date.now() - simulationStartedAt) / 60000);

    currentTime.textContent = timeFormatter.format(now);
    currentDate.textContent = dateFormatter.format(now);

    if (elapsedMinutes !== lastRenderedMinute) {
      renderRoutes(elapsedMinutes);
      lastRenderedMinute = elapsedMinutes;
    }
  }

  updateScreen();
  window.setInterval(updateScreen, 1000);
})();
