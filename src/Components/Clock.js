import React from "react";
import Typography from '@material-ui/core/Typography';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleString()
        };
    }
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    tick() {
        this.setState({
            time: new Date().toLocaleString()
        });
    }
    render() {
        return (
            <Typography>
                <p className="App-clock">
                    The current date and time is: {this.state.time}.
                </p>
            </Typography>
        );
    }
}

export default Clock;