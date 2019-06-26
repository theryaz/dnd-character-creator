import React, { Component } from "react";

import { Form, Container, Row, Col, Button } from 'react-bootstrap';

const CharacterInput = (props) => {
    return (
        <Form.Group className="character-field">
            <Form.Label>{props.label}:</Form.Label>
            <Form.Control type={props.type} name={props.name} />
        </Form.Group>
    );
}

const CharacterSelect = (props) => {
    return (
        <Form.Group className="character-field">
          <Form.Label>{props.label}:</Form.Label>
          <Form.Control as="select" name={props.name}>
            {props.options.map(o => (
              <option key={o}>{o}</option>
            ))}
          </Form.Control>
        </Form.Group>
    );
}

export default class CharacterForm extends Component {
    constructor(props){
        super(props);
        this.form = React.createRef();
        this.submit = this.submit.bind(this);
    }

    submit(){
        const data = new FormData(this.form.current);
        let object = {};
        data.forEach((value, key) => {object[key] = value});
        object = Object.assign(object, this.getAttributes());
        const json = JSON.stringify(object);
        fetch('https://dnd-character-creator-api.herokuapp.com/characters', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: json,
        }).then(() => {
            window.location.pathname = "/";
        });
    }

    randomAttribute(){
      return ~~(Math.random() * (16 - 8) + 8);
    }
    getAttributes(){
      return {
        str: this.randomAttribute(),
        dex: this.randomAttribute(),
        con: this.randomAttribute(),
        int: this.randomAttribute(),
        wis: this.randomAttribute(),
        cha: this.randomAttribute(),
      };
    }
    render(){
        return (
          <Container>
            <Form className="character-form" ref={this.form}>
              <CharacterInput label="Name" name="name" type="text"/>
              <CharacterInput label="Level" name="level" type="number"/>
              <CharacterSelect label="Race" name="race" options={["Elf","Human","Dwarf"]}/>
              <CharacterSelect label="Class" name="class" options={["Warrior", "Mage"]}/>
              <Button onClick={this.submit}>Save</Button>
            </Form>
          </Container>
        );
    }
}
