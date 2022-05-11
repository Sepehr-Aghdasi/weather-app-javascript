const weather = {
      apiKey: "0e8b2c4e5a41d2b3b81897c77b9e4d88",
      fetchWeather: function (city) {
            axios.get(
                  "https://api.openweathermap.org/data/2.5/weather?q=" +
                        city +
                        "&units=metric&appid=" +
                        this.apiKey
            )
                  .then((data) => this.displayWeather(data.data))
                  .catch((error) => console.error(error));
      },
      displayWeather: function (data) {
            //  Get data from api
            const { name } = data;
            const { icon, description } = data.weather[0];
            const { temp, humidity } = data.main;
            const { speed } = data.wind;

            console.log(name, icon, description, temp, humidity, speed);

            document.querySelector(".city").textContent = `Weather in ${name}`;
            document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;

            document.querySelector(".temp").textContent = `${temp}°C`;
            document.querySelector(".description").textContent = `${description}`;
            document.querySelector(".humidity").textContent = `humidity : ${humidity}%`;
            document.querySelector(".wind").textContent = `wind speed : ${description} km/h`;

            document.querySelector(".weather").classList.remove("loading");

            //Get background image from unsplash
            // City photos
            document.body.style.backgroundImage = `url('https://source.unsplash.com/1920x1080/?${name}')`;
      },
      //  Get city from search bar
      search: function () {
            const cityName = document.querySelector(".search-bar").value;
            this.fetchWeather(cityName);
      },

      // Get user location
      getLocation: function () {
            console.log("getLocation Called");
            let bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client";

            navigator.geolocation.getCurrentPosition(
                  (position) => {
                        bdcApi = `${bdcApi}?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`;

                        this.getApi(bdcApi);
                  },
                  (error) => {
                        this.getApi(bdcApi);
                  },
                  {
                        enableHighAccuracy: true,
                        timeout: 1000,
                        maximumAge: 0,
                  }
            );
      },
      getApi: function (bdcApi) {
            axios.get(bdcApi)
                  .then((data) => {
                        const { city } = data.data;

                        weather.fetchWeather(city);
                        console.log("The city :${city}");
                  })
                  .catch((error) => console.error(error));
      },
};

const Http = new XMLHttpRequest();

// Show weather when button is clicked
document.querySelector(".search .search-location").addEventListener("click", () => {
      weather.search();
});

// Show weather when enter is pressed
document.querySelector(".search-bar").addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
            weather.search();
            document.querySelector(".search-bar").value = "";
      }
});

// Get client location
document.querySelector(".search .get-location").addEventListener("click", () => {
      weather.getLocation();
});

// weather.fetchWeather("Mashhad");
weather.fetchWeather("London");
