async function getdata(){
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);

    const list_view = document.getElementById('list');

    for(item of data){
        console.log(item);
        const location = document.createElement('h4');
        location.textContent = `Latitude: ${item.lat}, Longitude: ${item.lng}`;
        const timestamp = document.createElement('h5')
        timestamp.textContent = new Date(item.timestamp).toLocaleTimeString();
        const mood = document.createElement('h5');
        mood.textContent = item.mood;
        const image = document.createElement('img');
        image.src = item.image64;

        const _div = document.createElement('div');
        _div.append(location);
        _div.append(timestamp);
        _div.append(mood);
        _div.append(image);
        list_view.append(_div);
        const hrline = document.createElement('hr');
        list_view.append(hrline);
    }
}

getdata()