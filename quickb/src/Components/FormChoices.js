import React from "react";
import { Form, Container, Button, Row, Col, Dropdown, FloatingLabel, ThemeProvider, ListGroup } from 'react-bootstrap';
import FieldService from "../Services/MockService";
import SubmitButton from "./SubmitButton";

// import FieldService from '../Services/MockService'


class FormChoices extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            label: "",
            required: false,
            choices: [],
            displayAlpha: false,
            default: '',
            newchoice: "",
            delchoice: "",
            bgc: "white",
            originalorder: [],
            order: "Select Order",
            textColor: 'black'
        }
    }

    componentDidMount() {

        var data = FieldService.getField(10)
        this.setState({
            label: data.label,
            required: data.required,
            displayAlpha: data.displayAlpha,
            default: data.default,
        })
        this.setState({ choices: data.choices })
        this.setState({ originalorder: [...data.choices] })
    }

    handleChange(e) {
        e.preventDefault()
        const { newval } = e.target;
        this.setState({ newchoice: newval })
        console.log(newval)
    }




    render() {
        return (
            // <Container>
            <div class="row" style={{ padding: '70px' }}>
                <div class="col-lg-12 col-centered">
                    <Form className="justify-content-center">

                        <Form.Group>
                            <Row className="justify-content-md-center">
                                <Col xs={0} md={3}>
                                    <div style={{ visibility: "hidden" }}></div>
                                </Col>
                                <Col xs={12} md={3}>
                                    <Form.Label>
                                        Label
                                    </Form.Label>
                                </Col>
                                <Col xs={12} md={4}>
                                    <Form.Control type="text" value={this.state.label} required onChange={(e) => { this.setState({ label: e.target.value }) }} />
                                </Col>
                                <Col>
                                    <div style={{ visibility: "hidden" }}></div></Col>
                                <br /><br />
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <div style={{ visibility: "hidden" }}></div>
                                </Col>
                                <Col xs={3}>
                                    <Form.Label>
                                        Type
                                    </Form.Label>

                                </Col>
                                <Col xs={2}>
                                    <Form.Text>
                                        Multi-select
                                    </Form.Text>
                                </Col>
                                <Col xs={4}>
                                    <Form.Check

                                        type='checkbox'
                                        label='A Value is required'
                                        id={`default-checkbox`}
                                    />

                                </Col>
                                <br /><br />
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <div style={{ visibility: "hidden" }}></div>
                                </Col>
                                <Col xs={3}>
                                    <Form.Label>
                                        Default Value
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="text" value={this.state.default} onClick={(e) => e.target.value = ''} onChange={(e) => this.setState({ default: e.target.value })} />

                                </Col>
                                <Col>
                                    <div style={{ visibility: "hidden" }}></div></Col>
                                <br /><br />
                            </Row>
                        </Form.Group>

                        <Form.Group>
                            <Row>
                                <Col>
                                    <div style={{ visibility: "hidden" }}></div>
                                </Col>
                                <Col xs={3}>
                                    <Form.Label>
                                        Choices
                                    </Form.Label>

                                </Col>

                                <Col>
                                    <Form.Control style={{ color: this.state.textColor }} type="addchoice" placeholder="Add Choices" value={this.state.newchoice} onChange={(e) => {
                                        if (e.target.value.length > 40) {
                                            this.setState({ textColor: 'red' })
                                        }
                                        else {
                                            this.setState({ textColor: 'black' })
                                        }
                                        this.setState({ newchoice: e.target.value })
                                    }} />
                                    <br></br>
                                    {/* {console.log(this.state.newchoice)} */}
                                    <ListGroup>

                                        {this.state.choices.map(
                                            (val) => {
                                                var bgg = 'white'
                                                if (val === this.state.delchoice) {
                                                    bgg = 'gray'
                                                }
                                                return <ListGroup.Item
                                                    key={val} 
                                                    style={{ backgroundColor: bgg }}
                                                    onClick={() => {
                                                        this.state.delchoice === ""
                                                            ? this.setState({ delchoice: val })
                                                            : this.setState({ delchoice: "" })
                                                    }
                                                    }
                                                >
                                                    {val}
                                                </ListGroup.Item>
                                            }
                                        )}
                                    </ListGroup>
                                    <br />
                                    {
                                        this.state.delchoice === ""
                                            ? <Button disabled
                                                variant="primary"
                                            > Delete </Button>
                                            : <Button
                                                onClick={() => {
                                                    var newli = []
                                                    for (var i of this.state.choices) {
                                                        if (i !== this.state.delchoice) {
                                                            newli.push(i)
                                                        }
                                                    }
                                                    this.setState({ choices: newli, delchoice: "" })
                                                }}
                                                variant="primary"> Delete </Button>
                                    }
                                    <br /><br />


                                </Col>

                                <Col>
                                    <Button variant="primary" onClick={() => {
                                        console.log(this.state.newchoice)
                                        var cc = [...this.state.choices]
                                        if (cc.length === 50) {
                                            alert("Maximum choice limit reached(50)")
                                            this.setState({ newchoice: "" })
                                            return
                                        }
                                        var cc1 = [...this.state.originalorder]
                                        cc1.push(this.state.newchoice)
                                        if (cc.includes(this.state.newchoice)) {
                                            alert("Duplicate Value")
                                            this.setState({ newchoice: "" })
                                            return
                                        }
                                        if (this.state.newchoice.trim() === "") {
                                            alert("Empty Value")
                                            return
                                        }
                                        cc.push(this.state.newchoice)
                                        if (this.state.order === "Alphabetical Order") {
                                            cc = cc.sort()
                                        }
                                        else if (this.state.order === "Reverse Alphabetical Order") {
                                            cc = cc.sort().reverse()
                                        }
                                        else {
                                            cc = [...cc1]
                                        }



                                        this.setState({ choices: cc, newchoice: "", originalorder: cc1 })
                                        // this.setState(this.setState({ newchoice: "" }))

                                    }}>
                                        Add to List
                                    </Button>
                                </Col>
                                <br /><br />
                            </Row>
                            <Row>
                                <Col xs={3}>
                                    <div style={{ visibility: "hidden" }}></div>
                                </Col>
                                <Col xs={3}>
                                    <Form.Label>
                                        Order
                                    </Form.Label>
                                </Col>


                                <Col >
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-order">
                                            {this.state.order}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                onClick={() => {
                                                    var teli = this.state.choices
                                                    teli.sort()
                                                    this.setState({ choices: teli, order: "Alphabetical Order" })
                                                }
                                                }>Display choices in alphabetical order</Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() => {
                                                    // var teli=this.state.originalorder
                                                    this.setState({ choices: this.state.originalorder, order: "Original Order" })
                                                }}
                                            >Display choices in the order they were added</Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() => {
                                                    var teli = this.state.choices
                                                    teli.sort().reverse()
                                                    this.setState({ choices: teli, order: "Reverse Alphabetical Order" })
                                                }
                                                }
                                            >Display choices in descending order</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <br /><br />
                            </Row>

                        </Form.Group>
                        <Row>
                            <Col>
                                <div style={{ visibility: "hidden" }}></div>
                            </Col>
                            <Col className="d-flex justify-content-end">
                                <SubmitButton
                                    label={this.state.label}
                                    required={this.state.required}
                                    choices={this.state.choices}
                                    displayAlpha={this.state.displayAlpha}
                                    default={this.state.default}
                                />
                            </Col>

                            <Col >
                                <Button variant="primary"
                                    onClick={
                                        () => {
                                            this.setState({
                                                label: "",
                                                required: false,
                                                choices: [],
                                                displayAlpha: false,
                                                default: '',
                                                newchoice: "",
                                                delchoice: "",
                                                bgc: "white",
                                                originalorder: [],
                                                order: "Select Order",
                                            })
                                        }
                                    }
                                >
                                    Cancel
                                </Button>

                            </Col>


                        </Row>

                    </Form>
                </div>
            </div>
            /* </Container> */

        )
    }
}
export default FormChoices;