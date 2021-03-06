import React, { useContext, useEffect, useState } from 'react'
import { Calendar, momentLocalizer,Views } from 'react-big-calendar' 
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/DepartmentScheduler.css'
import { createNewEncounter } from '../store/encounters';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import OrderList from '../components/OrderList'
import { List } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import LocalHospitalTwoToneIcon from '@material-ui/icons/LocalHospitalTwoTone';
import SelectedOrderPreviewCard from '../components/SelectedOrderPreviewCard';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import ThemeContext from '../components/utils/ThemeContext';

const BootstrapInput = withStyles((theme) => ({
  rootList: {
    width: '100%',
    maxWidth: 360,
  },
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const ColorButton = withStyles((theme) => ({
  root: {
      color: "white",
      paddingRight: "10px",
      paddingLeft: "10px",
      margin: "4px",
      backgroundColor:"grey",
      '&:hover': {
          backgroundColor: "#b1f3b1 !important",
      },
  },
  }))(Button);
  const DepartmentColorButton = withStyles((theme) => ({
    root: {
        color: "Black",
        paddingRight: "10px",
        paddingLeft: "10px",
        fontStyle:"bold",
        fontSize:"20px",
        textTransform:"none",
        borderRadius:"4px",
        '&:hover': {
            backgroundColor: "lightgrey !important",
        },
    },
    }))(Button);

    const SmallColorButton = withStyles((theme) => ({
      root: {
          color: "Black",
          paddingRight: "10px",
          paddingLeft: "10px",
          paddingTop:"0",
          paddingBottom:"0",
          fontSize:"12px",
          marginLeft:"5px",
          textTransform:"none",
          borderRadius:"4px",
          border:"1px solid white",
          '&:hover': {
              backgroundColor: "#b1f3b1 !important",
          },
      },
      }))(Button);


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const now = new Date()
const es = [
    {
       id: 15,
       title: 'Point in Time Event',
       start: now,
       end: now,
    }
]
const localizer = momentLocalizer(moment) // or globalizeLocalizer
const DndCalendar = withDragAndDrop(Calendar)
const DepartmentScheduler = props => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [selectedOrder,setSelectedOrder] = useState({})

  const handleListItemClick = (event, index,order) => {
    setSelectedIndex(index);
    setSelectedOrder(order)
  };
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    const dispatch = useDispatch()
    const encounters = useSelector(state=>state.encounters.my_encounters)
    const appointmentOrders = useSelector(state=>state.orders.appointment_requests)
    // const orders = Object.values(appointmentOrders).map((order,index)=>{
    // })

    const [events,setEvents] = useState([])
    const [loading,setLoading] = useState(true)
    const [orders,setOrders] = useState({})
    const [displayDragItemInCell,setDisplayDragItemInCell] =useState(true)
    const [draggedEvent,setDraggedEvent] = useState({order:{}})
    const [calendarLoading,setCalendarLoading] = useState(true)
    const [departmentIndex, setDepartmentIndex] = React.useState();
    const [departments,setDepartments] = useState({})
    const [slideIn,setSlideIn] = useState(false)
    const [resourceMap,setResourceMap] = useState([])
    const themeContext = useContext(ThemeContext)

    const handleChange = (event) => {
      console.log(event.target.value)
      setDepartmentIndex(event.target.value);
    };
    // const [dragFromOutsideItem,setDragFromOutsideItem] = useState(null)
    // useEffect(()=>{
    //   if (encounters || appointmentOrders) {
    //     setLoading(false)
    //   }
    // },[encounters,appointmentOrders])

    useEffect(()=>{
      const getDepartments = async () => {
        const response = await fetch('/api/departments/')
        const data = await response.json()
        setDepartments(data.departments)
        setLoading(false)
        console.log(data)
      }
      getDepartments()
    },[])

    const selectDepartment = (e) => {
      e.preventDefault()
      handleClose()
      const dept = departments[departmentIndex]
      const encs = Object.values(dept.encounters).map((encounter,index)=>{
        const eventEnd = encounter.end + "-400"
        const eventStart = encounter.start + "-400"
        return {
          id: encounter.id,
          title: encounter.patient.fullName,
          end: new Date(eventEnd),
          start: new Date(eventStart),
          resourceId: encounter.resource_id,
        }
      })
      console.log(encs)
      const ordObj = {}
      dept.orders.forEach(order=>{
        ordObj[order.id] = order
      })
      setOrders(ordObj)
      console.log("orders: ",dept.orders)
      setEvents(encs)
      console.log("EVENTS",encs)
      const resMap = dept.resources.map(resource=>{
        return { resourceId: resource.id, resourceTitle: resource.name }
      })
      setResourceMap(resMap)
      setCalendarLoading(false)
    }
    useEffect(()=>{
      if (calendarLoading === false) {
        setSlideIn(true)
      }
    },[calendarLoading])

    const dragFromOutsideItem = () => {
        return draggedEvent
    }

    const handleDragStart = (evt,event,index,order) => {
        setDraggedEvent(event)
        setSelectedIndex(index);
        setSelectedOrder(order)
        // Now setup our dataTransfer object properly
// First we'll allow a move action — this is used for the cursor
        evt.dataTransfer.effectAllowed = 'move';
// Setup some dummy drag-data to ensure dragging
        evt.dataTransfer.setData('text/plain', 'some_dummy_data');
// Now we'll create a dummy image for our dragImage
        var dragImage = document.createElement('div');
        dragImage.setAttribute('style', 'border-radius:4px;position: absolute; left: 0px; top: 0px; width: 140px;cursor:grabbing; padding:6px; color:white; height: 58px; background: rgb(66, 133, 244); z-index: -1');
        document.body.appendChild(dragImage);
        dragImage.innerHTML=`${event.title}`
// And finally we assign the dragImage and center it on cursor
        evt.dataTransfer.setDragImage(dragImage, 20, 20);
    }

    const resizeEvent = ({ event, start, end }) => {
    
        const nextEvents = events.map(existingEvent => {
          return existingEvent.id == event.id
            ? { ...existingEvent, start, end }
            : existingEvent
        })
    
        setEvents(nextEvents)
        //alert(`${event.title} was resized to ${start}-${end}`)
      }

    const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
        // const { events } = this.state
    
        // let allDay = event.allDay
    
        // if (!event.allDay && droppedOnAllDaySlot) {
        //   allDay = true
        // } else if (event.allDay && !droppedOnAllDaySlot) {
        //   allDay = false
        // }
    
        const nextEvents = events.map(existingEvent => {
          return existingEvent.id == event.id
            ? { ...existingEvent, start, end }
            : existingEvent
        })
    
        setEvents(nextEvents)
    
        // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
      }


      const onDropFromOutside = ({ start, end, allDay,resource }) => {
        if (!draggedEvent) return;
        const event = {
          id: draggedEvent.id,
          title: draggedEvent.title,
          start,
          end,
          allDay: allDay,
          resource
        }

        removeOrderFromList(draggedEvent.order.id)
        console.log("EVENT TO CREATE",event)
        dispatch(createNewEncounter({...event,order:draggedEvent.order}))
        setDraggedEvent({order:{}})
        newEvent(event)
      }

      const removeOrderFromList = (order) => {
        console.log(orders)
        const prevOrders = {...orders}
        delete prevOrders[order]
        console.log(prevOrders)
        setOrders(prevOrders)
      }

      const newEvent = event => {
        let idList = events.map(a => a.id)
        let newId = Math.max(...idList) + 1
        let hour = {
          id: newId,
          title: event.title,
          allDay: event.isAllDay,
          start: event.start,
          end: event.end,
          resourceId: event.resource
        }
        setEvents([...events,hour])
      }
      
    if (loading) {
      return (
      <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center",alignContent:"center",justifyContent:"center"}}>
        <img style={{width:"230px",height:"230px",alignSelf:"center",justifySelf:"center",marginTop:"200px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/25ef280441ad6d3a5ccf89960b4e95eb.gif"/>
      </div>
      )
    }
    
    return (
        <>
        <div style={{display:"flex",flexDirection:"row",width:"100%", margin:"0",marginRight:"0",backgroundColor: themeContext.themes === "dark" ? "#444444" : "aliceblue",padding:"10px"}}>
          <div  style={{display:"flex",flexDirection:"column",width:"100%"}}>
          <div style={{display: calendarLoading ? "none": "flex",flexDirection:"column",margin:"10px",borderRadius:"4px",backgroundColor: themeContext.themes === "dark" ? "#999999" : "white",boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"}}>
          <Slide direction="up" in={slideIn} timeout={350}>
          <div style={{display: calendarLoading ? "none": "flex",flexDirection:"row",margin:"10px",alignItems:"center",background: themeContext.themes === "dark" ? "#666666" : "#fafafa",color:themeContext.themes === "dark" ? "white" : "black",justifyContent:"space-between",padding:"2px",paddingRight:"13px", borderRadius:"4px",boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"}}>
          {calendarLoading ? "" : 
          <>
          <DepartmentColorButton style={{width:"fit-content",margin:"5px",color:themeContext.themes === "dark" ? "white" : "black"}} onClick={handleOpen}> <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><span>{departments[departmentIndex].name}</span></div></DepartmentColorButton>
          <SmallColorButton style={{color: themeContext.themes === "dark" ? "white" : "black"}}>switch departments</SmallColorButton>
          </>
          }
          </div>
          </Slide>
          <Slide direction="up" in={slideIn} timeout={350}>
        <div style={{marginRight:"15px",display:"flex",flexDirection:"column",overflow:"scroll",borderRadius:"4px",backgroundColor: themeContext.themes === "dark" ? "#999999" : "white",padding:"10px"}}>
          <div className={classes.rootList} style={{maxHeight:"300px",overflow:"scroll",backgroundColor: themeContext.themes === "dark" ? "#666666" : "white"}}>
          {Object.values(orders).length === 0 ? <div style={{display:"flex",color:"black", backgroundColor: themeContext.themes === "dark" ? "#343434" : "white",margin:"20px",padding:"30px", height:"100%", justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <div style={{display:"flex",flexDirection:"column",color:"black", boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",backgroundColor: themeContext.themes === "dark" ? "#999999" : "white",padding:"10px",borderRadius:"4px", marginBottom:"20px"}}>
              <span style={{color: themeContext.themes === "dark" ? "white" : "#999999"}}>No remaining unscheduled orders. With the right security, you can place orders from the Orders tab of a patient's chart.</span>
              {/* <ColorButton>Place Orders<ExitToAppTwoToneIcon style={{marginLeft:"3px"}}/></ColorButton> */}
              </div>
            </div> : 
            <List style={{marginBottom:"20px",color:themeContext.themes === "dark" ? "white" : "black",backgroundColor:themeContext.themes === "dark" ? "#999999" : "white"}} component="nav" aria-label="main mailbox folders">
            {Object.values(orders).map((order,index)=> {
            return (
            <ListItem
              className={'order-list-item'}
              button
              style={{color: selectedIndex === index ? themeContext.themes === "dark" ? "black" : "black" : themeContext.themes === "dark" ? "white" : "black"}}
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index, order)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={`${order.type}`} />
              <div
                    className={`draggable ${draggedEvent.order.id === order.id ? "dragging" : ""}`}
                    onDragEnd={()=>{setDraggedEvent({order:{}})}}
                    style={{
                      margin:"4px",
                      borderRadius: '4px',
                      padding:"4px",
                      color: themeContext.themes === "dark" ? "white" : "rgb(66, 133, 244)",
                      border: themeContext.themes === "dark" ? "1px solid white" : "1px solid rgb(66, 133, 244)",
                      backgroundColor: themeContext.themes === "dark" ? "rgb(66, 133, 244)" : "white",
                      cursor: draggedEvent.order.id === order.id ? "grabbing" : "grab",
                      width:"fit-content",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                    }}
                    draggable="true"
                    onDragStart={(e) =>
                      handleDragStart(e,{ title: order.patient.fullName, order:order },index,order)
                    }
                  >
                    {order.patient.fullName}
                </div>
            </ListItem>
                  )})}
                  </List>
          }
              </div>
        </div>
        </Slide>
        </div>
        <Slide direction="up" in={selectedOrder.patient}>
        <div>
        {selectedOrder.patient ?
          <SelectedOrderPreviewCard patient={selectedOrder.patient} order={selectedOrder}/> 
          : ""}
        </div>
        </Slide>
        </div>
        <div style={{display:"flex",flexDirection:"row",width:"100%", margin:"10px"}}>
        <Slide direction="up" in={slideIn} timeout={350}>
            <div style={{marginRight:"20px",borderRadius:"4px",backgroundColor: themeContext.themes === "dark" ? "#999999" : "white"}}>
                <DndCalendar
                    style={{ backgroundColor: themeContext.themes === "dark" ? "#999999" : "white",color: themeContext.themes === "dark" ? "white" : "black", height: 680,width:700,boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",padding:"10px",borderRadius:"4px" }}
                    localizer={localizer}
                    startAccessor="start"
                    selectable
                    popup={true}
                    step={60}
                    min={new Date(1970, 1, 1, 8)}
                    max={new Date(1970, 1, 1, 17)}
                    scrollToTime={new Date(1970, 1, 1, 3)}
                    onEventDrop={moveEvent}
                    endAccessor="end"
                    onEventResize={resizeEvent}
                    defaultView={'day'}
                    views={['day','month']}
                    dragFromOutsideItem = {dragFromOutsideItem}
                    onDropFromOutside={onDropFromOutside}
                    defaultDate={moment().toDate()}
                    resources={resourceMap}
                    resourceIdAccessor="resourceId"
                    resourceTitleAccessor="resourceTitle"
                    // displayDragItemInCell={true}
                    handleDragStart={handleDragStart}
                    events={events}
                    eventPropGetter={
                      (event, start, end, isSelected) => {
                        let newStyle = {
                          backgroundColor: "rgb(66, 133, 244)",
                          color: 'white',
                          borderRadius: "4px",
                          border: "1px solid white",
                        };
                  
                        return {
                          className: "",
                          style: newStyle
                        };
                      }
                    }
                  />


            </div>
            </Slide>
        </div>
        </div>
        <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction="up" in={open}>
          <div className={classes.paper} style={{display:"flex",flexDirection:"column",outline:"none",borderRadius:"4px",backgroundColor: themeContext.themes === "dark" ? "#444444" : "white",color: themeContext.themes === "dark" ? "white" : "#444444"}}>
            <h3>Select a department to continue</h3>
            <form onSubmit={selectDepartment} style={{display:"flex",flexDirection:"column"}}>
            <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native">Department</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={departmentIndex}
          onChange={handleChange}
          input={<BootstrapInput style={{color:themeContext.themes === "dark" ? "white" : "black", backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}/>}
        > 
        <option aria-label="None" value="" />
        {
          departments.map((dept,index)=>{
            return <option value={index}>{dept.name}</option>
          })
        }
          </NativeSelect>
          </FormControl>
          <ColorButton style={{marginTop:"10px"}} type="submit">Let's go!</ColorButton>
          </form>
          </div>
        </Slide>
      </Modal>
    </div>
        </>
        )
}

export default DepartmentScheduler