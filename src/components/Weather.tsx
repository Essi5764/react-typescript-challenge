import React, {Component} from 'react';

type LocationWeatherState = {
        latitude: number;   
        longitude: number;
        ApiUrl: string;
        temperature: number;
        feelsLike: number;
        humidity: number;
        pressure: number;
        windDeg: number;
        windSpeed: number;
        timezone: string    
}

type  AcceptedProps= {

}

class Weather extends Component<AcceptedProps, LocationWeatherState>{
    componentWillMount() {
        console.log('Executing componentWillMount:');
        this.setState({
            temperature: 0,
            feelsLike: 0,
            humidity: 0,
            pressure: 0,
            windDeg: 0,
            windSpeed: 0,
            timezone: ''
        })
        this.getlocation();
    }
    

    getlocation = () => {
    
            if ('geolocation' in navigator) {
                
                console.log('Geolocation is available:')
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log('Position:', position)
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        ApiUrl: `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=ec8289a813b9cef51940fe1f686f5647`
                    })
                })
            } else {
                
                console.log('Geolocation is not available, or not supported by this browser.')
                alert('Geolocation is not available, or not supported by this browser.')
            }
    }
    
    fetchWeatherApi = () => {
        fetch(this.state.ApiUrl)
            .then((response) => {
                return response.json()
            })
            .then((ApiResults) => {
                console.log(ApiResults)
                
                this.setState({
                    temperature: ApiResults.current.temp,
                    feelsLike: ApiResults.current.feels_like,
                    humidity: ApiResults.current.humidity,
                    pressure: ApiResults.current.pressure,
                    windDeg: ApiResults.current.wind_deg,
                    windSpeed: ApiResults.current.wind_speed,
                    timezone: ApiResults.timezone
                })
            })
            
            .catch((error) => console.log('Error:', error))
    }
    render(){
        return (
            <div className="mainDivWeather">
                <h2>Bellow is the  Weather  Summary</h2>
                
                <h4>Current Latitude: {this.state.latitude}</h4>
                <h4>Current Latitude: {this.state.longitude}</h4>
                <br />
                <br />
                <button onClick={() => this.fetchWeatherApi()}>Get Weather </button>
                            <h5>Timezone: {this.state.timezone}</h5>
                            <h5>Temperature: {this.state.temperature} Kelvin, {(this.state.temperature - 273.15).toFixed(2)} Celsius, {(((this.state.temperature - 273.15) * 1.8) + 32).toFixed(2)} Fahrenheit</h5>
                            <h5>Feels Like: {this.state.feelsLike} Kelvin, {(this.state.feelsLike - 273.15).toFixed(2)} Celsius, {(((this.state.feelsLike - 273.15) * 1.8) + 32).toFixed(2)} Fahrenheit</h5>
                            <h5>Humidity: {this.state.humidity} Percent (%)</h5>
                            <h5>Pressure: {this.state.pressure} Atmospheric Pressure (hPa)</h5>
                            <h5>Wind Degree: {this.state.windDeg} Degrees (°)</h5>
                            <h5>Wind Speed: {this.state.windSpeed} Meters/Second, {(this.state.windSpeed * 3.6).toFixed(2)} Kilometers/Hour, {(this.state.windSpeed * 2.2369362920544).toFixed(2)} Miles/Hour</h5>
                
                    
            </div >
        )
    }
    
}

export default  Weather;

