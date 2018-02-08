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
        console.log(this.state);
        let weatherInfo = "";
        if(this.state.wd) {
            let styles = {
                verticalAlign : 'middle'
            };
            let imgUrl = `https://openweathermap.org/img/w/${this.state.wd.weather[0].icon}.png`;
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
                        <small className={this.state.wd != null && (this.state.isSecured || this.state.wda) ? 'hide': ''}>Finding weather information...</small>
                        {this.state.wd && weatherInfo}
                    </div>
                    <div className={this.state.wda && this.state.wd ? 'hide': ''}>Your browser doesn't support Geolocation APIs</div>
                    <div className={this.state.isSecured ? 'hide' : ''}>Visit to <a href="https://manmeetgupta.com/">https version of site</a> to view weather information</div>
                </section>
                <footer>&copy; 2018 Manmeet Gupta</footer>
            </div>
        );
    }

    componentDidMount() {
        this.getCurrentLocationOfUser();
    }

    getCurrentLocationOfUser() {
        if (location.protocol.indexOf("https") != -1) {
            this.setState(Object.assign({}, this.state, { isSecured: true }));
        }else {
            this.setState(Object.assign({}, this.state, { isSecured: false }));
        }
        if ("geolocation" in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(position => {
                try {
                    this.fetchWeatherInfo(position.coords.latitude, position.coords.longitude)
                        .then(weatherInfo => {
                            console.log(weatherInfo);
                            this.setState(Object.assign({}, this.state, { wd: weatherInfo, isSecured:true, wda: true  }));
                        }, (err) => {
                            console.log(err);
                        });
                } catch (ex) {
                    console.log(ex);
                }
            });
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