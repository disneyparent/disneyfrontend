import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, editBuggy, takeBuggy, deleteBuggy } from '../actions/index';
import axiosWithAuth from "../utils/axiosWithAuth";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import disney_castle from "../imgs/disney_castle.png";

        

function BuggieList(props) {

/////////////////////////////////////////////////////////////////////////////////////////////////
    const[buggies, setBuggies] = useState([]);
    const [ buggy2, setBuggy2 ] = useState({});
    const [ user , setUser ] = useState({id:useParams(), username: '', password:''})

    const chooseBuggy = (buggy) => {
        const bugid = buggy.id;
        const data = {available: false}
        props.editBuggy(bugid, data);
        
        setBuggy2({...buggy, available: false});
        console.log('this should be the updated buggy', buggy2);

        
        props.takeBuggy(bugid, user);
        window.location.reload(true);
    }
 

///////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() =>{
        axiosWithAuth().get("https://obscure-scrubland-65975.herokuapp.com/api/buggies")
            .then((response) =>{
                // console.log(response)
                setBuggies(response.data)    
        })
    }, []);

    
    const ifCheck = (item) =>{
        if(item === false){
            return "No"
        } else {
            return "Yes"
        }
    }

    const sizeCheck = (item) =>{
        if(item === true){
            return "Double"
        } else {
            return "Single"
        }
    }

    const ifLocation = (item) =>{
        if(item === "jungleCruise"){
            return "Jungle Cruise"
        } else if(item === "bigThunder"){
            return "Big Thunder"
        } else if(item === "splashMountain"){
            return "Splash Mountain"
        } else if(item === "smugglersRun"){
            return "Smuggler's Run"
        } else if(item === "minniesHouse"){
            return "Minnies House"
        } else if(item === "smallWorld"){
            return "It's A Small World"
        } else if(item === "peterPansFlight"){
            return "Peter Pan's Flight"
        } else if(item === "spaceMountain"){
            return "Space Mountain"
        } else{
            return "Test"
        }
    }


    const infoStyle = {
        textAlign: 'center',
        padding: '2%'
    }

    const buttonStyle = {
        width: '55%',
        borderRadius: '10px',
        padding: '2%',
        margin: '2%'    
    }


    const imgStyle= {
        display: 'grid',
        minHeight: '100%',
        alignItems: 'center',
        backgroundImage: `url(${disney_castle})`,
        backgroundPosition: 'center',
        //backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100%'
    }

    return (


        <div style={imgStyle}>
            {buggies.map(buggy => {
                // const {id, available, is_double, location} = buggy;
                return (
                    <Card key={buggy.id} style={{margin: '0 auto', padding: '2%'}}>
                        <CardBody style={{backgroundColor: "gold", borderRadius: '10px'}}>
                            <CardText style={infoStyle}>Available: {ifCheck(buggy.available)}</CardText>
                            <CardText style={infoStyle}>Size: {sizeCheck(buggy.is_double)}</CardText>
                            <CardText style={infoStyle}>Location: {ifLocation(buggy.location)}</CardText>
                            <CardBody style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Button style={buttonStyle} onClick={() => props.editBuggy(buggy.id, buggy)}>Borrow</Button>
                                <Button style={buttonStyle} onClick={() => props.deleteBuggy(buggy.id)}>Delete</Button>
                            </CardBody>
                        </CardBody>
                    </Card>
                )
            })}

        </div>
    )
}
const mapStateToProps = state => {
	return {
        buggies: state.buggies,
	};
};

export default connect(
	mapStateToProps,
	{ getUser, editBuggy, takeBuggy, deleteBuggy }
)(BuggieList);

