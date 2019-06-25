import React, { Component } from "react";
import CharacterList from "./CharacterList";
import CharacterForm from "./CharacterForm";

import { Container, Row, Col, Button } from 'react-bootstrap';


const fetchCharacters = () => {
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

export default class CharacterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "list",
            chars: undefined
        }
        this.createNewHandler = this.createNewHandler.bind(this);
    }

    createNewHandler() {
        this.setState({
            page: "createnew"
        });
    }

    render() {
        if (this.state.page === "list") {
            if (this.state.chars === undefined) {
                fetchCharacters().then(res => this.setState({ chars: res.data || [] }));
                return <div>loading</div>;
            }
            return (
                <div>
                    <CharacterList chars={this.state.chars} />
                    <Button onClick={this.createNewHandler}>Create New Character</Button>
                </div>
            )
        }

        if(this.state.page === "createnew") {
            return <CharacterForm />;
        }

        return (
            <div>fail</div>
        );
    }
}
