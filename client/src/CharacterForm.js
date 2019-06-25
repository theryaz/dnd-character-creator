import React, { Component } from "react";

import { Form, Container, Row, Col, Button } from 'react-bootstrap';

const CharacterInput = (props) => {
    return (
        <Form.Group className="character-field">
            <Form.Label>{props.label}:</Form.Label>
            <Form.Control type="text" name={props.name} />
        </Form.Group>
    );
}

const CharacterSelect = (props) => {
    return (
        <Form.Group className="character-field">
            <Form.Control type="text" name={props.name} />
        </Form.Group>
    );
}

export default class CharacterForm extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
          <Container>
            <Form className="character-form">
              <CharacterInput label="Name" name="name"/>
              <Button>Save</Button>
            </Form>
          </Container>
        );
    }
}
