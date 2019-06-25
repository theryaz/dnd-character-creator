import React, { Component } from "react";
import CharacterList from "./CharacterList";
import CharacterForm from "./CharacterForm";
import { Link } from "react-router-dom";

import { Container, Row, Col, Button } from 'react-bootstrap';


const fetchCharactersDummy = () => {
    return Promise.resolve({
        data: [
            {
                uuid: 1,
                name: "test",
                level: 1,
                race: "elf",
                class: "wizard",
                attributes: {
                    str: 11,
                    dex: 12,
                    con: 8,
                    int: 16,
                    wis: 10,
                    cha: 14
                }
            },
            {
                uuid: 2,
                name: "test2",
                level: 1,
                race: "elf",
                class: "wizard",
                attributes: {
                    str: 11,
                    dex: 12,
                    con: 8,
                    wis: 10,
                    int: 16,
                    cha: 14
                }
            }
        ]
    });
}

const fetchCharacters = () => {
    return fetch("http://192.168.168.131:4280/characters").then(res => res.json());
}



export default class CharacterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chars: undefined
        }
    }

    render() {
        if (this.state.chars === undefined) {
            fetchCharacters().then(res => {
                this.setState({ chars: res.data || [] });
            });
            return <div>loading</div>;
        }
        return (
            <Container>
                <Row>
                    <CharacterList chars={this.state.chars} />
                </Row>
                <Row>
                    <Col>
                        <Button as={Link} to="/newcharacter">Create New Character</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}
