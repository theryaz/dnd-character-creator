import React, { Component } from "react";


const CharacterInput = (props) => {
    return (
        <div className="character-field">
            <label>{props.label}:</label>
            <input type="text" name={props.name} />
        </div>
    );
}

const CharacterSelect = (props) => {
    return (
        <div className="character-field">
            <input type="text" name={props.name} />
        </div>
    );
}

export default class CharacterForm extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="character-form">
                <CharacterInput label="Name" name="name"/>
                <button>Save</button>
            </div>
        );
    }
}