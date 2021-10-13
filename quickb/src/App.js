
import React,{Component} from "react";
import { Container } from "react-bootstrap";
import FormChoices from "./Components/FormChoices";

class App extends Component{

  constructor(props){
    super(props)
    this.state={
        

    }
       
}

  render(){

    return(
      <Container>
        <FormChoices />
      </Container>
    )
  }
}

export default App;