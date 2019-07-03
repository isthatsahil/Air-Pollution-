window.addEventListener('load',()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let cityHumidity = document.querySelector('.humidity');
    let cityVisibility = document.querySelector('.visibility');
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position =>{
         long = 77.225;
         lat= 28.6353;
        
         const proxy = `https://cors-anywhere.herokuapp.com/`;
         const api = `${proxy}https://api.darksky.net/forecast/5033dc8cfdd06d9333da833a053425a7/${lat},${long}`;

         fetch(api)
          .then(response => {
              return response.json();
          })  //.then only works when we get a response from fetch
          .then(data => {
            console.log(data);
            const {temperature, summary, icon, humidity, visibility} = data.currently;
            //Set DOM Elements from API
             cityHumidity.textContent = humidity;
             temperatureDegree.textContent = temperature;
             temperatureDescription.textContent = summary;
             cityVisibility.textContent = visibility;
            //Set Icons
            setIcons(icon, document.querySelector('.icon'));

          });
      });
      
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase(); 
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
