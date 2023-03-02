import React, { useState, useEffect } from 'react';
import './styles/Home.css';
import thermometer from './images/thermometer.png';

function Home() {
    const [country, setCountry] = useState('us');
    const [state, setState] = useState('ny');
    const [city, setCity] = useState('new york');
    const [unit, setUnit] = useState('imperial');
    const [temp, setTemp] = useState(0);
    const [feelsLike, setFeelsLike] = useState(0);
    const [weather, setWeather] = useState('');
    const [icon, setIcon] = useState('');
    const [displayCity, setDisplayCity] = useState('');
    const [displayCountry, setDisplayCountry] = useState('');
    const [date, setDate] = useState('')
    const [time, setTime] = useState('');
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);

    function changeCountry(e) {
        setCountry(e.target.value);
    }

    function changeCity(e) {
        setCity(e.target.value);
    }

    function changeState(e) {
        setState(e.target.value);
    }

    function changeUnit(e) {
        setUnit(e.target.value);
    }


    const fetchData = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country} + '&appid=313da67cb8075faa593c443321f27673&units=${unit}`);
        const data = await response.json();
        setDisplayCity(data.name);
        setDisplayCountry(data.sys.country);
        setTemp(Math.trunc(data.main.temp));
        setFeelsLike(Math.trunc(data.main.feels_like));
        setWeather(data.weather[0].description);
        setIcon(data.weather[0].icon);
        setLong(data.coord.lon);
        setLat(data.coord.lat);
        return console.log(data);
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchTime = async () => {
            const timeGet = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=fa41720701eb460eb83b40cf66c8a7d1&lat=${lat}&long=${long}`)
            const timeData = await timeGet.json();
            setDate(timeData.date_time_wti.slice(0, 16));
            const newTime = timeData.time_12.slice(0, 5) + ' ' + timeData.time_12.slice(9);
            setTime(newTime);
            if(newTime.charAt(0) === "0") {
                const realNewTime = newTime.slice(1);
                setTime(realNewTime);
            } else {
                setTime(newTime);
            }
    }

    useEffect(() => {
        fetchTime();
    }, [long, lat]);
     


        


    return (
        <div className="home">
            <header>
                <h1>Weather Tracker</h1>
                <h4>Enter a city to see its current weather.</h4>
                <p>(Country and state are optional.)</p>
            </header>
            
            <main>
                <form>
                    <div className='radioDiv'>
                    <label>
                        <input type="radio" name="unit" value="imperial" onChange={changeUnit} defaultChecked />
                        Fahrenheit
                    </label>

                    <label>
                        <input type="radio" name="unit" value="metric" onChange={changeUnit} />
                        Celsius
                    </label>
                    </div>
                    <div className='inputDiv'>
                    <label>
                        Country:
                        <input type="text" value={country} onChange={changeCountry} maxLength="2" className='shortInput' />
                    </label>

                    <label>
                        City:
                        <input type="text" value={city} onChange={changeCity} />
                    </label>

                    <label>
                        State:
                        <input type="text" value={state} onChange={changeState} maxLength="2" className='shortInput' />
                    </label>
                    </div>
                    <button type="button" onClick={fetchData} className="seeWeather" >See Weather</button>
                    

                </form>

                <div class="info">
                    <div class="cityTemp">
                        <h1>{displayCity}, {displayCountry}</h1>
                        <h2>{temp}°</h2>
                        <h2>Feels like {feelsLike}°</h2>
                        <img src={thermometer} alt="thermometer" ></img>
                    </div>
                    <div className="timeDiv">
                        <h3>{date}</h3>
                        <h3>{time}</h3>
                    </div>
                    <div className="weatherIcon">
                        <h2>{weather}</h2>
                        <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="icon" id="icon"></img>
                    </div>
                </div>
            </main>

            <h6 className="api" >Uses openweathermap API and ipgeolocation API.</h6>

            <footer>
                <h6>Photo by Petr Kratochvil on publicdomainpictures.net. Thermometer icon by danipras235 on vecteezy.com.</h6>
            </footer>
        </div>
    );
}

export default Home;