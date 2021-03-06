import { Avatar, Button, CircularProgress, Grid,IconButton } from '@material-ui/core'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../store/auth'
import DashboardComponent from '../components/DashboardComponent'
import ThemeContext from '../components/utils/ThemeContext';
import Brightness4TwoToneIcon from '@material-ui/icons/Brightness4TwoTone';
import json2mq from 'json2mq';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Breakpoint} from 'react-socks'
import { openEditor, openPatientCheckin, openPatientRegistration } from '../store/activities'
import HomeContext from '../components/utils/HomeContext'
import DashboardActivityButton from '../components/DashboardActivityButton'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { setCurrentRecord } from '../store/current_record'
import UserCard from '../components/UserCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMd } from '@fortawesome/free-solid-svg-icons'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import CloseIcon from '@material-ui/icons/Close';
import UserSearchResults from '../components/UserSearchResults'
import {openDepartmentSchedule} from '../store/activities'
import DepartmentSearchResults from '../components/DepartmentSearchResults'
import DepartmentScheduleSearchResults from '../components/DepartmentScheduleSearchResults'
import VitalsLineGraph from '../components/VitalsLineGraph'
import DashboardUserHeader from '../components/DashboardUserHeader'
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    outline:"none",
    borderRadius:"4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

const Dashboard=(props)=>{

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleDepartmentOpen = () => {
      setDepartmentOpen(true);
    };

    const handleDepartmentClose = () => {
      setDepartmentOpen(false);
    };

    const [loading,setLoading] = useState(true)
    const [activities,setActivities] =useState([])
    const [selectedActivity,setSelectedActivity] =useState([])
    const [getUserRecordsFromDB,setGetUserRecordsFromDB] =useState(false)
    const [getDepartmentRecordsFromDB,setGetDepartmentRecordsFromDB] =useState(false)
    const [modalLoading,setModalLoading]=useState(false)
    const [users,setUsers]=useState([])
    const [departments,setDepartments]=useState([])
    const openTabs = useSelector(state=>state.activities.open_tabs)
    const dispatch = useDispatch()
    const themeContext = useContext(ThemeContext)
    const homeContext = useContext(HomeContext)
    const [departmentModalLoading,setDepartmentModalLoading] = useState(false)
    const [departmentOpen,setDepartmentOpen] =useState(false)
    const [departmentScheduleOpen,setDepartmentScheduleOpen] =useState(false)
    const [getDepartmentRecords,setGetDepartmentRecords]=useState(false)
    const [departmentScheduleModalLoading,setDepartmentScheduleModalLoading]=useState(false)
    const current_user = useSelector(state=>state.auth.user)
    const handleLogOut = ()=> {
        dispatch(logout())
    }

    const handleUserEditorClick=(user)=>{
      setOpen(false)
      if (!openTabs.some(activity=>activity.name === `${user.first_name} ${user.last_name}`)) dispatch(openEditor({type:"user",user}))
      homeContext.setSelectedTab(`${user.first_name} ${user.last_name}`,null,{type:"user",user})
    }

    const handleDepartmentEditorClick=(department)=>{
      setDepartmentOpen(false)
      if (!openTabs.some(activity=>activity.name === `${department.name} Settings`)) dispatch(openEditor({type:"department",department}))
      homeContext.setSelectedTab(`${department.name} Settings`,null,{type:"department",department})
    }

    const openDepSchedule=(department)=>{
      if (!openTabs.some(activity=>activity.name === `${department.name}`)) dispatch(openDepartmentSchedule(department))
      homeContext.setSelectedTab(`${department.name}`)
    }

    const handleActivityClick=(name)=>{
      console.log(name)
      if (name==="Patient Registration") {
        dispatch(openPatientRegistration())
        homeContext.setSelectedTab("Patient Registration")
      } else if (name==="Patient Check-in") {
        dispatch(openPatientCheckin())
      } else if (name==="User Editor") {
        setModalLoading(true)
        setOpen(true)
        setSelectedActivity("users")
        setGetUserRecordsFromDB(!getUserRecordsFromDB)
        // setSelectedActivity("users")
        // dispatch(openEditor({type:"user"}))
      } else if (name==="Department Editor") {
        setDepartmentModalLoading(true)
        setDepartmentOpen(true)
        setSelectedActivity("departments")
        setGetDepartmentRecords(!getDepartmentRecords)
        // dispatch(openEditor({type:"department"}))
      } else if (name==="Dep. Schedule") {
        setDepartmentModalLoading(true)
        setDepartmentScheduleOpen(true)
        setSelectedActivity("departments")
        setGetDepartmentRecords(!getDepartmentRecords)
        // dispatch(openEditor({type:"department"}))
      } 
    }

    useEffect(()=>{
      const getUserRecords = async () => {
        const res = await fetch(`/api/users/`)
        const data = await res.json()
        setUsers(data.users)
        setModalLoading(false)
      }
      const getDeptRecords = async () => {
        const res = await fetch(`/api/departments/`)
        const data = await res.json()
        console.log(data)
        setDepartments(data.departments)
        setDepartmentModalLoading(false)
      }
      if ((allActivities.role_activities || allActivities.user_activities) && selectedActivity === "users") {
        getUserRecords()
      } else if ((allActivities.role_activities || allActivities.user_activities ) && selectedActivity === "departments") {
        getDeptRecords()
      }
    },[getDepartmentRecords,getUserRecordsFromDB])

    function JavaScriptMedia() {
    const matches = useMediaQuery(
    json2mq({
      minWidth: 600,
    }),
  );

  return <span>{`{ minWidth: 600 } matches: ${matches}`}</span>;
    }

    const changeThemes = () =>{
        if (themeContext.themes === "light") {
          themeContext.setThemes("dark")
        } else if (themeContext.themes === "dark") {
          themeContext.setThemes("light")
        }
      }

    const allActivities = useSelector(state=>state.activities)
    useEffect(()=>{
        if (allActivities.role_activities || allActivities.user_activities){
            setActivities([...Object.values(allActivities.role_activities),...Object.values(allActivities.user_activities)])
            setLoading(false)
        }
    },[allActivities])
    if (loading) {
        return (
            <p></p>
        )
    }

    return (
        <>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
          <div style={{display:"flex", flexDirection:"column",borderRadius:"8px",paddingRight:"24px",paddingLeft:"24px",paddingTop:"16px",paddingBottom:"16px",width:"100%"}}>
            {/* <div style={{fontFamily:"Google Sans,Roboto,Arial,sans-serif",fontWeight:"400",fontSize:"22px",alignSelf:"center"}}>
              My Activities
            </div> */}
            <DashboardUserHeader user={current_user}/>
            <div style={{width:"100%",display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}} >
            {activities.some(activity=> activity.name === "Patient Registration") ? 
                                <div style={{maxWidth:"300px",width:"100%",margin:"8px"}} onClick={(e)=>handleActivityClick("Patient Registration")}>
                  <DashboardActivityButton onClick={(e)=>handleActivityClick("Patient Registration")} style={{cursor:"pointer"}} color={"coral"} title="Patient Registration"></DashboardActivityButton>
                  </div>
                  : ""}
            {activities.some(activity=> activity.name === "Patient Check-in") ? 
                <div style={{maxWidth:"300px",width:"100%",margin:"8px"}} onClick={(e)=>handleActivityClick("Patient Registration")}>
                  <DashboardActivityButton onClick={(e)=>handleActivityClick("Patient Check-in")} style={{cursor:"pointer"}} color={"coral"} title="Patient Check-in"></DashboardActivityButton>
                </div>
                   : ""}
            {activities.some(activity=> activity.name === "User Editor") ? 
                <div style={{maxWidth:"300px",width:"100%",margin:"8px"}} onClick={(e)=>handleActivityClick("User Editor")}>
                  <DashboardActivityButton 
                    onClick={(e)=>handleActivityClick("User Editor")} 
                    style={{cursor:"pointer"}} 
                    color={"transparent"} 
                    title="User Editor"
                    mainText={"Every setting on one screen"}
                    secondaryText={"Create users, update users' basic information, or manage user security with user roles and security points"}
                    >
                    </DashboardActivityButton>
                  </div>
                  : ""}
            {activities.some(activity=> activity.name === "Record Editor") ?
                <div style={{maxWidth:"300px",width:"100%",margin:"8px"}} onClick={(e)=>handleActivityClick("Department Editor")}>
                  <DashboardActivityButton 
                    onClick={(e)=>handleActivityClick("Department Editor")} 
                    style={{cursor:"pointer"}} 
                    color={"coral"} 
                    mainText={"Manage your care facilities"}
                    secondaryText={"Add and remove rooms, configure department schedules, update location and specialty information"}
                    title="Department Editor" 
                    onClick={(e)=>handleActivityClick("Department Editor")}>
                  </DashboardActivityButton>
                  </div>
                  : ""
                  }
            {activities.some(activity=> activity.name === "Dep. Schedule") ?
                <div style={{maxWidth:"300px",width:"100%",margin:"8px"}} onClick={(e)=>handleActivityClick("Dep. Schedule")}>
                  <DashboardActivityButton 
                    onClick={(e)=>handleActivityClick("Department Schedules")} 
                    style={{cursor:"pointer"}} 
                    color={"coral"} 
                    title="Department Schedules" 
                    onClick={(e)=>handleActivityClick("Dep. Schedule")}
                    mainText={"Timing is everything"}
                    secondaryText={"Create encounters from your departments' unscheduled orders queue with drag and drop! View a daily or monthly breakdown of your department's past and upcoming encoutners"}>
                    </DashboardActivityButton>
                  </div>
                  : ""
                  }


            </div>
            </div>
            {/* <SecureChat user={current_user}/> */}
        </div>
        {/* <div>
            {themeContext.themes === "light" ? <Button onClick={changeThemes} size="small" style={{outline:"none",backgroundColor: "#7f53ac",backgroundImage: "linear-gradient(315deg, #7f53ac 0%, #647dee 74%)",marginRight:"30px",color:"white",textTransform:"none",fontWeight:"bolder"}}><Brightness4TwoToneIcon style={{cursor:"pointer",color:"#3badfb"}}/></Button>
            :
            <Button onClick={changeThemes} size="small" style={{outline:"none",background:"linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",marginRight:"30px",color:"white",textTransform:"none",fontWeight:"bolder"}}><Brightness4TwoToneIcon style={{cursor:"pointer",color:"#f7b732"}}/></Button>}
        </div> */}
        <UserSearchResults 
        modalLoading={modalLoading} 
        themeContext={themeContext}
        users={users} 
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        Backdrop={Backdrop}
        handleUserEditorClick={handleUserEditorClick}/>
        <DepartmentSearchResults 
        modalLoading={departmentModalLoading} 
        themeContext={themeContext}
        departments={departments} 
        open={departmentOpen}
        handleClose={handleDepartmentClose}
        handleOpen={handleDepartmentOpen}
        setOpen={setDepartmentOpen}
        Backdrop={Backdrop}
        handleDepartmentEditorClick={handleDepartmentEditorClick}/>
        <DepartmentScheduleSearchResults
        modalLoading={departmentModalLoading} 
        themeContext={themeContext}
        departments={departments} 
        open={departmentScheduleOpen}
        handleClose={handleDepartmentClose}
        handleOpen={handleDepartmentOpen}
        setOpen={setDepartmentOpen}
        Backdrop={Backdrop}
        openDepartmentSchedule={openDepSchedule}
        >
          
        </DepartmentScheduleSearchResults>
        {/* <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200,
        }}
      >
        <Fade in={modalLoading === false && open}>
          <div className={classes.paper} style={{maxWidth:"600px",width:"100%",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white",display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",justifyContent:"space-between",paddingLeft:"16px",paddingRight:"10px"}}>
              <div style={{fontWeight:"400",fontSize:"24px"}}>
                Users
              </div>
              <div style={{display:"flex",flexDirection:"column",margin:"10px",marginTop:"16px"}}>
              <div style={{display:"flex",flexDirection:"row", marginTop:"4px",alignItems:"center"}}>
                <FontAwesomeIcon icon={faUserMd} style={{width:"20px",height:"20px",color:"yellowgreen"}}/>
                <div style={{marginLeft:"5px",fontWeight:"300",fontSize:"18px"}}>
                  - Provider
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"row", marginTop:"4px",alignItems:"center"}}>
                <FontAwesomeIcon icon={faUserCog} style={{width:"20px",height:"20px",color:"dodgerblue"}}/>
                <div style={{marginLeft:"5px",fontWeight:"300",fontSize:"18px"}}>
                  - Administrator
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"row", marginTop:"4px",alignItems:"center"}}>
                <FontAwesomeIcon icon={faCalendarAlt} style={{width:"20px",height:"20px",color:"lightcoral"}}/>
                <div style={{marginLeft:"5px",fontWeight:"300",fontSize:"18px"}}>
                  - Scheduler
                </div>
              </div>
            </div>
            <IconButton onClick={(e)=>setOpen(false)} size="large" style={{alignSelf:"baseline",marginRight:"-30px"}}>
                <CloseIcon/>
              </IconButton>
            </div>
            {modalLoading ? <CircularProgress/> :
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",maxWidth:"600px",width:"100%",overFlow:"scroll",maxHeight:"600px"}}>
              {users.map(user=>{
                {console.log(user)}
                return(
                  <div onClick={(e)=>handleUserEditorClick(user)} style={{display:"flex",flexDirection:"column",alignItems:"center",marginLeft:"14px",marginBottom:"5px",marginRight:"14px",borderRadius:"8px",width:"100%"}}>
                    <UserCard user={user}/>
                  </div>
                )
              })}
            </div>
            }
          </div>
        </Fade>
      </Modal>
    </div> */}
    </>
  )
}

export default Dashboard