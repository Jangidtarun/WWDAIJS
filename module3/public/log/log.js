async function getdata(){
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);

    const list_view = document.getElementById('list');

    data.sort((fi, si) => fi.timestamp - si.timestamp);

    const issmap = L.map('map').setView([data[0].lat, data[0].lng], 3);
    const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

    const tiles = L.tileLayer(tileURL, {attribution});
    tiles.addTo(issmap);

    // const marker = L.marker([lat, lng]).addTo(issmap);

    for(item of data){
        console.log(item);
        const marker = L.marker([item.lat, item.lng]).addTo(issmap);
        
        const div1 = document.createElement('div');
        div1.className = 'a3nlad';
        
        const div11 = document.createElement('div');
        div11.className = 'flexy';
        
        const div111 = document.createElement('div');
        div111.className = 'a8nroy3c';
        
        const cityinfo = document.createElement('strong');
        cityinfo.id = 'city';
        cityinfo.textContent = item.weather_data.name + ' ~ ' + item.weather_data.sys.country;
        div111.append(cityinfo);
        
        const _lat = document.createElement('p');
        _lat.id = 'lat';
        _lat.textContent = 'lat: ' + item.lat;
        div111.append(_lat);
        
        const _lng = document.createElement('p');
        _lng.id = 'lng';
        _lng.textContent = 'lng: ' + item.lng;
        div111.append(_lng);
        
        div11.append(div111);
        div1.append(div11);
        
        const div12 = document.createElement('div');
        div12.className = 'ra3cr9n';
        
        const div121 = document.createElement('div');
        div121.className = 'e309sj';
        
        const div1211 = document.createElement('div');
        div1211.className = 'di2938';
        
        const temperature = document.createElement('h1');
        temperature.id = 'temperature';
        temperature.textContent = Math.round(item.weather_data.main.temp - 273);
        div1211.append(temperature);
        
        div1211.append(String.fromCharCode(176) + 'C');
        div121.append(div1211);
        
        const div1212 = document.createElement('div');
        div1212.className = 'di2938';
        
        const feel = document.createElement('div');
        feel.innerHTML = 'Feels like: ' + Math.round(item.weather_data.main.feels_like - 273) + String.fromCharCode(176) + 'C';
        div1212.append(feel);
        
        const humidity = document.createElement('div');
        humidity.innerHTML = 'Humidity: ' + item.weather_data.main.humidity;
        div1212.append(humidity);
        
        const wind = document.createElement('div');
        wind.innerHTML = 'Wind: ' + item.weather_data.wind.speed + 'Km/h ' + item.weather_data.wind.deg + String.fromCharCode(176);
        div1212.append(wind);
        
        div121.append(div1212);
        div12.append(div121);
        
        const div122 = document.createElement('div');
        div122.className = 'e309sjx';
        
        const div1221 = document.createElement('div');
        div1221.id = 'wob_loc';
        div1221.innerHTML = 'Weather';
        div122.append(div1221);
        
        const div1222 = document.createElement('div');
        div1222.id = 'wob_dts';
        div1222.innerHTML = new Date().toLocaleString();
        div122.append(div1222);

        const div1223 = document.createElement('div');
        div1223.id = 'wob_dcp';
        div1223.innerHTML = item.weather_data.weather[0].description;
        div122.append(div1223);
        
        div12.append(div122);
        div1.append(div12);
        list_view.append(div1);
        
        const txt = `Weather at ${item.weather_data.name} on ${new Date(item.timestamp).toLocaleString()} is ${item.weather_data.weather[0].description}`;

        marker.bindPopup(txt);
    }

}

getdata();