// OnInstalled eventListener.
// Setting up intial preferences and Image.

const openWeatherAPIKey = '052a3a2ef2c0b893bccd3227227326a5';
chrome.runtime.onInstalled.addListener(() => {
    console.log('onInstalled...');
    // Check for Geolocation API permissions
    let geoSuccess = position => {
        console.log(position)
        const { latitude, longitude } = position.coords;
        chrome.storage.sync.set({ location: { latitude: latitude, longitude: longitude } })
    }
    let geoError = (error) => {
        console.log(error)
    }
    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
    } else {
        console.log('Locating…');
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    }
    chrome.storage.sync.set({
        preferences: [
            {
                name: "Forest",
                prefer: true,
            },
            {
                name: "Nature",
                prefer: true,
            },
            {
                name: "Tropical",
                prefer: true,
            },
            {
                name: "WaterFalls",
                prefer: true,
            },
            {
                name: "Wallpapers",
                prefer: true,
            },
            {
                name: "Night",
                prefer: true,
            },
            {
                name: "Sky",
                prefer: true,
            },
            {
                name: "Mountains",
                prefer: true,
            },
            {
                name: "Ocean",
                prefer: true,
            },
            {
                name: "SnowFall",
                prefer: true,
            },
        ]
    });
    getRandomPhoto();
    getWeatherData();
    // create alarm after extension is installed / upgraded
    chrome.alarms.create('refresh', { periodInMinutes: 60 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    getRandomPhoto();
    getWeatherData();
});

async function getRandomPhoto() {
    chrome.storage.sync.get('preferences', data => {
        let w = window.screen.width,
            h = window.screen.height;
        fetch(
            `https://api.unsplash.com/photos/random?` + new URLSearchParams({
                client_id: 'oskH874CdAb025bSk49AX1RfWZTOif2fs_XmfjbZb2E',
                query: `${data.preferences.filter(a => a.prefer === true).map(a => a.name).join()}`,
                w: w,
                h: h,
                content_filter: 'low'
            })
        ).then(res => res.json())
            .then((res) => {
                chrome.storage.sync.set({
                    photoInfo: {
                        userName: res.user.name,
                        link: res.user.links.html,
                        width: res.width,
                        height: res.height

                    }
                })
                return fetch(`${res.urls.regular}`)
                    .then(res => {
                        chrome.storage.sync.set({ nextImage: res.url })
                        return res
                    })
                    .catch(err => console.error(err));
            })
            .catch((err) => console.log(err));
    });
}

async function getWeatherData() {
    chrome.storage.sync.get('location', data => {
        console.log(data);
        let latitude = data.location.latitude,
            longitude = data.location.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherAPIKey}`)
            .then(res => res.json())
            .then(res => {
                chrome.storage.sync.set({ weatherData: res })
            })
            .catch(err => console.error(err))
    })
}

async function nextImage() {
    try {
        let imageURL = await getRandomPhoto();
    } catch (err) {
        console.log(err);
    }
}