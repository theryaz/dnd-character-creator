import React, { Component } from "react";
import "./CharacterList.scss";

import { Table } from 'react-bootstrap';

export default class CharacterList extends Component {
    constructor(props){
        super(props);
        this.renderCharacters = this.renderCharacters.bind(this);
    }

    renderCharacters(){
        const chars = this.props.chars || [];
        return chars.map(char => {
            return (
                <tr key={char.uuid} className="character">
                  <td>{char.name}</td>
                  <td>{char.level}</td>
                  <td>{char.race}</td>
                  <td>{char.class}</td>
                </tr>
            );
        });
    }

    render(){
        return (
            <Table className="character-list">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Race</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {this.renderCharacters()}
              </tbody>
            </Table>
        );
    }
}
