const reactDOM = require("react-dom") ;
const React = require("react");
class App extends React.Component {
    render(){
        return(
            <div>
                <section id="about">
                    <h1>Manmeet Gupta</h1>
                    <h2>Frontend Engineer, <span className="manu_text">Manchester United</span> Fan, Foodie :)</h2>
                </section>
                <footer>&copy; 2018 Manmeet Gupta</footer>
            </div>
        );
    }
}
reactDOM.render(<App />, document.querySelector("#main"));