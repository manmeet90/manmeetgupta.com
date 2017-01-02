const reactDOM = require("react-dom") ;
const React = require("react");

class App extends React.Component {
    render(){
        return(
            <div>
                Hello World!
            </div>
        );
    }
}

reactDOM.render(<App />, document.getElementById("main"));