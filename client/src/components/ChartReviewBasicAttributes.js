import React, { useContext } from 'react';
import {openPatientChart} from '../store/activities'
import { useDispatch, useSelector } from 'react-redux';
import HomeContext from './utils/HomeContext';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ThemeContext from './utils/ThemeContext';
import ChartReviewSmallActivityButton from './ChartReviewSmallActivityButton'
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ColorizeIcon from '@material-ui/icons/Colorize';
import VitalsLineGraph from './VitalsLineGraph';

const imageStyle={
    hieght:"34px",
    width:"34px"
  }

const tabStyle = {
'&:hover': {
  background:"grey"
}

}

const metricContainerStyle={
display:"flex",
flexDirection:"row",
fontSize:"18px",
borderRadius:"9px",
margin:"4px",
cursor:"pointer",
fontWeight:"strong",
padding:"4px",
alignItems:"center",
'&:hover': {
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
}
}

const metricTextStyle ={
marginLeft:"6px"
}

const iconStyle = {
    background:"grey",
    borderRadius:"50%",
    color:"white",
    padding:"2px",
    boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    width:"24px",
    height:"24px",
    marginRight:"5px"
}

const chartContainerStyle = {
    display:"flex",
    flexDirection:"row",
    paddingBottom:"0px",
    alignItems:"center",
    justifyContent:"center",
    maxWidth:"500px",
    backgroundColor:"white",
    borderRadius:"8px",
    overflow:"hidden",
    margin:"6px"
}

function ChartReviewBasicAttributes(props) { 
    const context = useContext(HomeContext)
    const dispatch = useDispatch()
    const themeContext = useContext(ThemeContext)
    const openTabs = useSelector(state=>state.activities.open_tabs)

    const openChart=(id)=>{
        if (!openTabs.some(activity=>activity.name === `${props.patient.lastName}, ${props.patient.firstName}`)) dispatch(openPatientChart(id))
        context.setSelectedTab(`${props.patient.lastName}, ${props.patient.firstName}`,props.patient)
    }

    return (
                <div style={{
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"center",
                    flexWrap:"wrap",
                    width:"100%",
                    maxWidth:"520px"
                    }}>
                        <div style={{...chartContainerStyle}}>
                        <ChartReviewSmallActivityButton 
                            title={"Heart Rate"} 
                            value={ <span style={{fontSize:"40px",fontFamily:"-webkit-body"}}>{props.patient.beats_per_minute}<span style={{color:"black",marginLeft:"5px",fontSize:"18px"}}>bpm</span></span>} 
                            icon={<FavoriteIcon style={{...iconStyle,}}/>}
                            />
                            {/* <VitalsLineGraph data={props.chartData.bpmReadings} title={"Heart Rate"}/>  */}
                        </div>
                        <div style={{...chartContainerStyle}}>
                        <ChartReviewSmallActivityButton title={"Weight"} value={<span  style={{fontSize:"40px",fontFamily:"-webkit-body"}}>{props.patient.weight} <span style={{color:"black",fontSize:"18px"}}>lb</span></span>} icon={<FitnessCenterIcon style={{...iconStyle,}}/>}/>
                        {/* <VitalsLineGraph data={props.chartData.weightReadings} title={"Weight"}/>  */}

                        </div>
                        <div style={{...chartContainerStyle}}>
                        <ChartReviewSmallActivityButton title={"Temperature"} value={<span style={{display:"flex",alignItems:"center",flexDirection:"row",fontSize:"40px",fontFamily:"-webkit-body"}}>{props.patient.temperature}<span style={{color:"black",fontSize:"24px",marginRight:"1px"}}>°F</span></span>} icon={<ColorizeIcon style={{...iconStyle}}/>}/>
                        {/* <VitalsLineGraph data={props.chartData.temperatureReadings} title={"Temperature"}/>  */}

                        </div>
                        <div style={{...chartContainerStyle}}>
                        <ChartReviewSmallActivityButton title={"BMI"} value={<span style={{fontSize:"40px",fontFamily:"-webkit-body"}}>{props.patient.bmi}</span>} icon={<TrackChangesIcon style={{...iconStyle,}}/>}/>
                        {/* <VitalsLineGraph data={props.chartData.bmiReadings} title={"Body Mass Index"}/>  */}

                            </div>
                        <div style={{...chartContainerStyle}}>
                            <ChartReviewSmallActivityButton title={"Height"} value={<span style={{fontSize:"40px",fontFamily:"-webkit-body"}}>{props.patient.height}</span>} icon={<AccessibilityIcon style={{...iconStyle,}}/>}/>
                        </div>
                        <div style={{...chartContainerStyle}}>
                            <ChartReviewSmallActivityButton title={"Blood Type"} value={<span style={{fontSize:"40px",fontFamily:"-webkit-body"}}>{props.patient.blood_type}</span>} icon={<InvertColorsIcon style={{...iconStyle,}}/>}/>

                        </div>
                </div>
    );
}

export default ChartReviewBasicAttributes;