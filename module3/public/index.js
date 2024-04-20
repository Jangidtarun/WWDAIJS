if ("geolocation" in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
        console.log(position);
        // doSomething(position.coords.latitude, position.coords.longitude);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        document.getElementById('lat').textContent = 'lat: ' + lat.toFixed(4);
        document.getElementById('lng').textContent = 'lng: ' + lng.toFixed(4);


        // const api_url_loc = `/getlockey/${lat},${lng}`;
        // const response_loc = await fetch(api_url_loc);
        // console.log(response_loc);
        // const json_loc = await response_loc.json();
        // console.log(json_loc);

        // const locationkey = json_loc.Key;

        // const api_url = `/weather/${locationkey}`;
        // const response = await fetch(api_url);
        // const json = await response.json();
        // console.log(json);

        const weather_api_url = `/openweather/${lat},${lng}`;
        const weather_response = await fetch(weather_api_url);
        const weather_data = await weather_response.json();
        console.log(weather_data);

        const savedata_button = document.getElementById('savedata');
        savedata_button.addEventListener('click', async event => {
            console.log('save data');

            const data = {lat, lng, weather_data};
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data),
            };
            const response = await fetch('/api', options);
            const json_response = await response.json();
            console.log(json_response);
        })

        document.getElementById('city').textContent = weather_data.name + ' ~ ' + weather_data.sys.country;
        document.getElementById('temperature').textContent = Math.round(weather_data.main.temp - 273);
        document.getElementById('feel').innerHTML = 'Feels like: ' + Math.round(weather_data.main.feels_like - 273) + String.fromCharCode(176) + 'C';
        document.getElementById('humi').innerHTML = 'Humidity: ' + weather_data.main.humidity;
        document.getElementById('wind').innerHTML = 'Wind: ' + weather_data.wind.speed + 'Km/h ' + weather_data.wind.deg + String.fromCharCode(176);

        document.getElementById('wob_dts').innerHTML = new Date().toLocaleString();
        document.getElementById('wob_dcp').innerHTML = weather_data.weather[0].description;
    });
    
    
} else{
    console.log('geolocation not available');
}

