import React, { Component } from "react";
import "./CharacterList.scss";

export default class CharacterList extends Component {
    constructor(props){
        super(props);
        this.renderCharacters = this.renderCharacters.bind(this);
    }

    renderCharacters(){
        const chars = this.props.chars || [];
        return chars.map(char => {
            return (
                <div key={char.uuid} className="character">{char.name} - lvl {char.level}</div>
            );
        });
    }

    render(){
        return (
            <div className="character-list">
                {this.renderCharacters()}
            </div>
        );
    }
}