function setup(){
    noCanvas();
    const capture = createCapture(VIDEO, {flipped: true});
    capture.size(200,200);

    if('geolocation' in navigator){
        console.log('gelolocation available');
        navigator.geolocation.getCurrentPosition(async position => {
            console.log(position);
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            document.getElementById('lat').innerHTML = 'Latitude: ' + lat;
            document.getElementById('lon').innerHTML = 'Longitude: ' + lng;

            const button = document.getElementById('savedata');
            button.addEventListener("click", (event) => {

                savedata(lat,lng);
            });
            showonmap(lat,lng);

        });
        
    } else{
        console.log('gelolocation not available');
    }

    async function savedata(lat,lng){
        const mood = document.getElementById('mood').value;
    
        capture.loadPixels();
        const image64 = capture.canvas.toDataURL();
    
        const data = {lat, lng, mood, image64};
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        
        const response = await fetch('/api', options);
        const json_data = await response.json();
    
        console.log('printing data from index.html')
        console.log(json_data);
    }

}





function showonmap(lat,lng){
    const issmap = L.map('map').setView([lat, lng], 10);
    const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

    const tiles = L.tileLayer(tileURL, {attribution});
    tiles.addTo(issmap);

    const marker = L.marker([lat, lng]).addTo(issmap);
}
