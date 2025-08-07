function switchTab(tabId) {
  document
    .querySelectorAll(".converter")
    .forEach((div) => div.classList.remove("active"));
  document
    .querySelectorAll(".tab-button")
    .forEach((btn) => btn.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  event.target.classList.add("active");
}

// function calculateTransfer() {
//   const Newvalue =parseFloat(document.getElementById("value").value);
//   const size = parseFloat(document.getElementById("fileSize").value);
//   const speed = parseFloat(document.getElementById("speed").value);
//   if (!size || !speed || !Newvalue)
//     return (document.getElementById("fileResult").textContent =
//       "Please enter valid numbers");
//   const seconds = size / speed;
//   const h = Math.floor(seconds / 3600);
//   const m = Math.floor((seconds % 3600) / 60);
//   const s = Math.floor(seconds % 60);
//   document.getElementById("fileResult").textContent = `${h}h ${m}m ${s}s`;
// }

//Temperature Converter
function convertTemp() {
  const c = parseFloat(document.getElementById("celsius").value);
  if (isNaN(c))
    return (document.getElementById("tempResult").textContent =
      "Please enter a number");
  const f = (c * 9) / 5 + 32;
  document.getElementById("tempResult").textContent = `${f.toFixed(2)} °F`;
}

//Scientific Converter
function convertToScientific() {
  const num = parseFloat(document.getElementById("normalNum").value);
  if (isNaN(num))
    return (document.getElementById("sciResult").textContent =
      "Please enter a number");
  document.getElementById("sciResult").textContent = num.toExponential(4);
}
//Metrics Converter
function convertMetric() {
  const value = parseFloat(document.getElementById("metricVal").value);
  const from = parseFloat(document.getElementById("fromUnit").value);
  const to = parseFloat(document.getElementById("toUnit").value);
  if (!value || !from || !to)
    return (document.getElementById("metricResult").textContent =
      "Invalid input");
  const result = (value * from) / to;
  document.getElementById("metricResult").textContent = `${result}`;
}

// file Converter

const fileUnit = document.getElementById("fileSize");
const fileValue = document.getElementById("value");
const speed = document.getElementById("speed");
const speedUnit = document.getElementById("SpeedSize");
const calculateBtn = document.getElementById("calculateBtn");
const estimatedTime = document.getElementById("estimated-time");

calculateBtn.addEventListener("click", () => {
  const _fileSize = parseFloat(fileValue.value.trim());
  const _fileUnit = fileUnit.value.trim();
  const _speed = parseFloat(speed.value.trim());
  const _speedUnit = speedUnit.value.trim();

  if (isNaN(_fileSize) || isNaN(_speed)) {
    estimatedTime.textContent = "Please enter valid numeric values.";
    return;
  }

  const time = calcEstimatedTime(_fileSize, _fileUnit, _speed, _speedUnit);
  estimatedTime.textContent = time;
});

function convertToKB(size, unit) {
  if (unit === "MB") return size * 1024;
  if (unit === "GB") return size * 1024 * 1024;
  return size; // KB
}

function convertToKBps(speed, unit) {
  if (unit === "Mbps") return speed * 1024;
  if (unit === "Gbps") return speed * 1024 * 1024;
  return speed; // Kbps
}

function timeConverter(secs) {
  if (secs < 60) return `${secs} Seconds`;
  if (secs < 3600) {
    const mins = Math.floor(secs / 60);
    secs = secs % 60;
    return `${mins} Minutes ${secs} Seconds`;
  } else {
    const hrs = Math.floor(secs / 3600);
    secs = secs % 3600;
    const mins = Math.floor(secs / 60);
    secs = secs % 60;
    return `${hrs} Hours ${mins} Minutes ${secs} Seconds`;
  }
}

function calcEstimatedTime(size, size_unit, speed, speed_unit) {
  const sizeKB = convertToKB(size, size_unit);
  const speedKBps = convertToKBps(speed, speed_unit);
  const timeSec = Math.round(sizeKB / speedKBps);
  return timeConverter(timeSec);
}
