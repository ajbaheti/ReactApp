import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import classes from './App.css';
import withClass from "../hoc/withClass";
import Aux from '../hoc/Aux';

class App extends Component {
    constructor(props){
        super(props);
        console.log('App.js Constructor');

        this.state = {
            persons: [
                { id: "ljkgkg", name: "Ashish", age: 27 },
                { id: "ldnf", name: "Siddhant", age: 26 },
                { id: "kjsadfsa", name: "Yash", age: 29 }
            ],
            otherState: "this won't change",
            showPersons: false,
            toggleClicked: 0
        };
    }

    componentWillMount(){
        console.log('App.js componentWillMount');
    }

    componentDidMount(){
        console.log('App.js componentDidMount');
    }

    deletePersonHandler = (personIndex) => {
        // const persons = this.state.persons.slice(); OR spread operator
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    };

    nameChangeHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };  //OR
        // const person = Object.assign({}, this.state.persons[personIndex]);
        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex].name = person.name;

        this.setState({persons: persons});
    };

    togglePersonHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState( (prevState, props) => {
            return {
                showPersons: !doesShow,
                toggleClicked: prevState.toggleClicked + 1
            }
        });
    };

    render() {
        let persons = null;
        console.log('App.js render');
        if (this.state.showPersons) {
            persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangeHandler} />;
        }

        return (
            <Aux>
                <Cockpit
                    appTitle={this.props.title}
                    persons={this.state.persons}
                    showPersons={this.state.showPersons}
                    clicked={this.togglePersonHandler} />
                {persons}
            </Aux>
        );
    }
}

export default withClass(App, classes.App);
