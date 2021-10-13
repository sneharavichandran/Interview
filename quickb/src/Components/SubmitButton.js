import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import FieldService from "../Services/MockService";

class SubmitButton extends Component {

    render() {
        
        return (
            <Button onClick={() => {
                var defaultVal = this.props.default
                var choices = this.props.choices

                if (defaultVal.trim() === "") {
                    alert("default value is empty")
                    return
                }
                if (!choices.includes(defaultVal)) {
                    choices.push(defaultVal)
                }
                const data = {
                    label: this.props.label,
                    required: this.props.required,
                    choices: choices,
                    displayAlpha: this.props.displayAlpha,
                    default: defaultVal
                }
                console.log(data)
                FieldService.saveField(data)
            }}>
                Submit
            </Button>
        )
    }
}

export default SubmitButton