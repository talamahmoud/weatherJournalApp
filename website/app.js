/* Global Variables */
const Button = document.createElement("generate");
const apiKey = "532d4775e57b16f78cfc495edde732ce&units=imperial";
Button.addEventListener("click", async (e) => {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  const weather = await getWeather(apiKey, zipCode);
  console.log(weather);
  await postData("http://localhost:8000/add", {
    temperature: weather.main.temp,
    date: newDate,
    feelings: feelings,
  }).then(updateUI());
});

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const getWeather = async (apiKey, zipCode) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`
  );
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async () => {
  const request = await fetch("http://localhost:8000/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temperature;
    document.getElementById("content").innerHTML = allData.feelings;
  } catch (error) {
    console.log("error", error);
  }
};
