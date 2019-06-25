import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CharacterPage from "./CharacterPage";
import CharacterForm from "./CharacterForm";


export default class App extends Component {
    render(){
        return (
            <Router>
                <div>
                    <Route path="/" exact component={CharacterPage} />
                    <Route path="/newcharacter" exact component={CharacterForm} />
                </div>
            </Router> 
        );  
    }
}