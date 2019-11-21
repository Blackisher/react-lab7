import React, {Component} from 'react';
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: [],
            isLoading: false
        }
    }

    componentDidMount() {
      this.load()
    }

    load() {
      this.setState({isLoading: true})
      //alternative to fetch is 'axios' - benefit - add error handling
      fetch('http://localhost:3004/employees')
          .then(response => response.json())
          .then(data => this.setState({ employee: data }))
          .then(()=>this.setState({isLoading: false}));
    }

    render() {
        return (<div>
            LAB7task1
            Using mockserver from previous excercise print the list of employees along with their age. Indicate (for
            example
            with different colour) those that are not active (parameter ‘active’ is set to false).
            <hr/>
            Active are green, not active red <hr/>
            {this.state.isLoading ? "LOADING" :
                this.state.employee.map(employee =>
                  <li className={`active${employee.isActive}`} key={employee._id}>{employee.name}, {employee.age}</li>
                )}
        </div>)
    };
}


export default App;
