const reactDOM = require("react-dom") ;
const React = require("react");
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wda : false,
            wd : null,
            isSecured : false
        };
    }
    render(){
        let weatherInfo = "";
        if(this.state.wd) {
            let styles = {
                verticalAlign : 'middle'
            };
            let imgUrl = `http://openweathermap.org/img/w/${this.state.wd.weather[0].icon}.png`;
            weatherInfo = (
                <div>
                    <p>Your Location : {this.state.wd.name}</p>
                    <p>Temperature : {this.state.wd.main.temp}&nbsp;<sup>0</sup>C</p>
                    <p>Humidity : {this.state.wd.main.humidity}%</p>
                    Weather Forcast : {this.state.wd.weather[0].description}
                    <img style={styles} src={imgUrl} />
                </div>
            );
        }
        return(
            <div>
                <section id="about">
                    <h1>Manmeet Gupta</h1>
                    <h2>Frontend Engineer, <span className="manu_text">Manchester United</span> Fan, Foodie :)</h2>
                </section>
                <section id="weather_widget">
                    <div>
                        <small hidden={this.state.wd != null && this.state.isSecured}>Finding weather information...</small>
                        {this.state.wd &&
                            weatherInfo
                        }
                    </div>
                    <div hidden={this.state.wda == false && this.state.isSecured}>Your browser doesn't support Geolocation API</div>
                    <div hidden={this.state.wda == false && !this.state.isSecured}>Visit to https://manmeetgupta.com/ to view weather information</div>
                </section>
                <footer>&copy; 2018 Manmeet Gupta</footer>
            </div>
        );
    }

    componentDidMount() {
        this.getCurrentLocationOfUser();
    }

    getCurrentLocationOfUser() {
        if ("geolocation" in navigator) {
            /* geolocation is available */
            if (location.protocol.indexOf("https") != -1) {
                navigator.geolocation.getCurrentPosition(position => {
                    try {
                        this.fetchWeatherInfo(position.coords.latitude, position.coords.longitude)
                            .then(weatherInfo => {
                                console.log(weatherInfo);
                                this.setState(Object.assign({}, this.state, { wd: weatherInfo }));
                            }, (err) => {
                                console.log(err);
                            });
                    } catch (ex) {
                        console.log(ex);
                    }
                });
            } else {
                this.setState(Object.assign({}, this.state, { wda: false }));
            }
        }else {
            this.setState(Object.assign({}, this.state, { wda: false }));
        }
    }

    fetchWeatherInfo(lat, long) {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=394b20d5a75352ac127eb2510d4d18bc&units=metric`)
        .then(response => response.json());
    }
}
reactDOM.render(<App />, document.querySelector("#main"));