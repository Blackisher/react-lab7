import React, {Component} from 'react';
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: [],
            age: 0,
            email: 'example@email.com',
            emailValid: true,
            phone: 123456789,
            phoneValid: true,
            isLoading: false
        }
        this.handleOnChangeAge = this.handleOnChangeAge.bind(this)
        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this)
        this.handleOnChangePhone = this.handleOnChangePhone.bind(this)
        this.handleClickOnSubmit = this.handleClickOnSubmit.bind(this)
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


    handleOnChangeEmail(ev) {
         const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
         this.setState({
            email: ev.target.value,
            emailValid: re.test(ev.target.value)
        })
        console.log("Value changed age: " + ev.target.value)
    }

    handleOnChangePhone(ev) {
        const re = /^([0-9\b]{9})$/;
        this.setState({
            phone: ev.target.value,
            phoneValid: re.test(ev.target.value)
        })
        console.log("Value changed age: " + ev.target.value)
    }

    handleClickOnSubmit(ev) {
        //no need for validation
    }

    emailValidWarning(){
        return <>{this.state.emailValid ? "" : "Email is not valid!"}</>
    }

    grownup() {
        return <>
                Name <input/><br/>
                Email <input type="text" onChange={this.handleOnChangeEmail} value={this.state.email}/> {this.emailValidWarning()}
                {/*and  If validation fails there should be a text with explanation under or next to the validated field.*/}
            </>
    }

    phoneValidWarning(){
        return <>{this.state.phoneValid ? "" : "Phone is not valid! (can only contain digits and it has to be exactly 9 digits)"}</>
    }

    underage() {
        return <>
            Parent Name <input/><br/>
            Parent Phone No <input type="phone" onChange={this.handleOnChangePhone} value={this.state.phone}/> {this.phoneValidWarning()}
            {/*and  If validation fails there should be a text with explanation under or next to the validated field.*/}
        </>
    }

    handleOnChangeAge(ev) {
        const re = /^([0-9\b]|[1-9\b][0-9\b]+)$/;
        if (re.test(ev.target.value)) {
            this.setState({
                age: ev.target.value
            })
            console.log("Value changed age: " + ev.target.value)
        }
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
            <hr/>
            LAB7task2
            Create React form as displayed on screen two and three. If age is &lt 18 then labels should read ‘Parent
            Name’ and Parent Phone No. If Age >= 18 then they should read Name and Email.
            <hr/>
            Age<input type="number" onChange={this.handleOnChangeAge} value={this.state.age}/><br/>
            {this.state.age > 18 ? this.grownup() : this.underage()}<br/>
            <input type="button" onClick={this.handleClickOnSubmit} value="submit"
                   disabled={
                       ((this.state.age > 18) && !this.state.emailValid) ||
                       ((!(this.state.age > 18)) && !this.state.phoneValid)}/>
        </div>)
    };
}


export default App;
