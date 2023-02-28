import React, { useState, useEffect } from 'react';
import './styles/Home.css';

function Home() {
    const [country, setCountry] = useState('us');
    const [state, setState] = useState('ny');
    const [city, setCity] = useState('new york');
    const [unit, setUnit] = useState('imperial');
    const [temp, setTemp] = useState(0);
    const [displayCity, setDisplayCity] = useState('');
    const [displayCountry, setDisplayCountry] = useState('');

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
        return console.log(data);}

        useEffect(() => {
            fetchData();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);


    return (
        <div className="home">
            <header>
                <h4>Enter a city to see its current weather.</h4>
            </header>
            
            <main>
                <form>
                    <label>
                        Country:
                        <input type="text" value={country} onChange={changeCountry} />
                    </label>

                    <label>
                        City:
                        <input type="text" value={city} onChange={changeCity} />
                    </label>

                    <label>
                        State(optional):
                        <input type="text" value={state} onChange={changeState} maxLength="2" />
                    </label>

                    <label>
                        <input type="radio" name="unit" value="imperial" onChange={changeUnit} defaultChecked />
                        Fahrenheit
                    </label>

                    <label>
                        <input type="radio" name="unit" value="metric" onChange={changeUnit} />
                        Celsius
                    </label>

                    <button type="button" onClick={fetchData}>See Weather</button>

                </form>

                <div class="info">
                    <h1>{displayCity}, {displayCountry}</h1>
                    <h2>{temp} degrees</h2>
                </div>
            </main>

            <footer>

            </footer>
        </div>
    );
}

export default Home;