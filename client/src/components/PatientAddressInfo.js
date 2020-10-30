import React, { useContext } from 'react';
import {openPatientChart} from '../store/activities'
import { useDispatch, useSelector } from 'react-redux';
import HomeContext from './utils/HomeContext';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import HomeIcon from '@material-ui/icons/Home';
import StayCurrentPortraitIcon from '@material-ui/icons/StayCurrentPortrait';
import StayPrimaryPortraitTwoToneIcon from '@material-ui/icons/StayPrimaryPortraitTwoTone';
import BusinessTwoToneIcon from '@material-ui/icons/BusinessTwoTone';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactMailTwoToneIcon from '@material-ui/icons/ContactMailTwoTone';


const ColorButton = withStyles((theme) => ({
    root: {
        color: "#ed4959",
        paddingRight: "10px",
        paddingLeft: "10px",
        margin: "4px",
        backgroundColor:"white",
        border:"1px solid #ed4959",
        '&:hover': {
            backgroundColor: "#ed4959 !important",
            color:"white",
            border:"1px solid #ed4959",
        },
    },
    }))(Button);

function PatientAddressInfo(props) { 
    console.log(props)
    const context = useContext(HomeContext)
    const dispatch = useDispatch()
    const openTabs = useSelector(state=>state.activities.open_tabs)
    return (
        <>
                <div style={{display:"flex",flexDirection:"column",borderRadius:"9px",boxShadow: "rgba(0, 0, 0, 0.09) 0px 1px 2px 0px", width:"fit-content",padding:"8px",marginLeft:"9px",marginRight:"9px"}}>
                    <div style={{display:"flex",flexDirection:"row",padding:"4px",backgroundColor:"white", width:"fit-content"}}>
                        <ContactMailTwoToneIcon style={{color:"lightgrey", alignSelf:"center",height:"40px",width:"40px"}}/>
                        <div style={{display:"flex",flexDirection:"column", width:"fit-content", marginLeft:"9px"}}>
                        { props.patient.address_line_one ? <span> <span style={{fontWeight:"bolder",color:"grey"}}>{props.patient.address_line_one}</span> </span> : ""}
                        { props.patient.address_line_two ? <span> <span style={{fontWeight:"bolder",color:"grey"}}>{props.patient.address_line_two}</span> </span> : ""}
                        { props.patient.address_line_three ? <span> <span style={{fontWeight:"bolder",color:"grey"}}>{props.patient.address_line_three}</span> </span> : ""}
                        { props.patient.address_city ? <span><span style={{fontWeight:"bolder",color:"grey"}}>{props.patient.address_city}, {props.patient.address_state}</span> </span> : ""}
                        { props.patient.address_zip ? <span><span style={{fontWeight:"bolder",color:"grey"}}>{props.patient.address_zip}</span> </span> : ""}
                        </div>
                    </div>
                </div>
        </>
    );
}

export default PatientAddressInfo;