import React from 'react';
import './App.css';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EcoIcon from '@material-ui/icons/Eco';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Calendar from 'react-calendar'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';

let plantList = [
  {
    planttype: 'Primrose',
    name: 'Lucy',
    image: 'https://images-na.ssl-images-amazon.com/images/I/81%2BssnxTfhL._SX425_.jpg',
    location: 'Outdoor',
    water: 'Every week',
    lighting: 'Part shade',
    // lastwater: 'Last watered: Nov. 15',
    // nextwater: 'Next water: Nov. 25'
  },
  {
    planttype: 'Echinopsis',
    name: 'Chad',
    image: 'https://cdn11.bigcommerce.com/s-oqm1pc/images/stencil/1280x1280/products/2828/7012/spachiana__76320.1540314925.jpg?c=2',
    location: 'Indoor',
    water: 'Every month',
    lighting: 'Full sun',
    // lastwater: 'Last watered: Nov. 6',
    // nextwater: 'Next water: Nov. 26'
  },
]

function App() {

  function handleChange(data, key){
      if (key === "name"){
      }
  }
  return (
    <Router>
    <div className="App">
      <Switch>
          <Route exact path="/">
            <MyPlants/>
          </Route>
          <Route exact path="/editPlant"
          render={(props) => <Edit createMode="true" {...props} />}>
            {/* <Edit/> */}
          </Route>
          <Route exact path="/editPlant/:plant"
          render={(props) => <Edit {...props} />}>
            {/* <Edit/> */}
          </Route>
          <Route exact path="/calendar">
            <CalendarPage />
          </Route>
          <Route exact path="/waterPlants">
            <WaterPlants/>
          </Route>
        </Switch>
    </div>
    </Router>
  );
}

function MyPlants() {
  return (
      <div className="list">
         <h1> My Plants </h1>
         <h3>Hi Janice, your plants are waiting for your care. </h3>
      {plantList.map(Plants)}
      <CenteredTabs/>
  </div>
  );
}

function CenteredTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Link to = "/waterPlants" className="plantLink1"><Tab label="Water" icon={<EcoIcon/>} /></Link>
        <Link to ="/editPlant" className="plantLink2"><Tab label="Add Plant" icon={<AddBoxIcon/>} /></Link>
        <Link to ="/calendar" className="plantLink3"><Tab label="Calendar" icon={<DateRangeIcon/>} /></Link>
      </Tabs>
    </Paper>
  );
}

function Plants(props, key) {
  return (
   <Card className="Card">
      <CardContent>
    <div className="plant">
      <Link to={"/editPlant/" + key} className="plantLink">
      <div className="plantType">
        <h2> {props.planttype} </h2>
      </div>
      <div className= "plantName">
        <p> {props.name} </p>
      </div>
      <div className= "descriptionAlign">
      <div className= "plantImage">
        <img src={props.image} width="110"/>  
      </div>
      <div className="plantDescription">
        <p> {props.location}</p>
        <p> {props.lighting} </p>
        <p> {props.water}</p>
      </div>
      </div>
      </Link>
    </div>
    </CardContent>
    </Card>
  )
}

function WaterPlants(props) {

const [date, setDate] = React.useState(new Date('11/10/2019'));
const handleDateChange = function() {
  setDate(new Date())
}
  return(
    <div>
    <div className= "arrowBack">
    <Fab aria-label="back" color= "primary" >
    <Link to ="/">  
      <ArrowBackIcon className="editArrowBack"/>
    </Link>
  </Fab>  
  </div>
  <h4>Plants need water</h4>
  <Card className="Card">
      <CardContent>
      <div className="plantType">
        <h2> Echinopsis </h2>
      </div>
      <div className= "plantName">
        <p> Chad </p>
      </div>
      <div className= "descriptionAlign">
      <div className= "plantImage">
        <img src='https://cdn11.bigcommerce.com/s-oqm1pc/images/stencil/1280x1280/products/2828/7012/spachiana__76320.1540314925.jpg?c=2' width="110"/>  
      </div>
      <div className="plantDescription">
        <p> Indoor </p>
        <p> Full Sun </p>
        <p> Last watered: {date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear()}</p>
      </div>
      </div>
      </CardContent>
      <CardActions>
        <Button onClick={handleDateChange} size="medium" color="primary">Water me!</Button>
      </CardActions>
  </Card>
  </div>
  )    
}

function Edit(props) {
  console.log(props)
  const [frequency, setFrequency] = React.useState('');
  const handleChange = event => {
    setFrequency(event.target.value);
  };
  const plant = props.createMode ? {} : plantList[props.match.params.plant];
  console.log(props.createMode);
  console.log(plant);
  

  return (
      <div className= "edit">
          <Fab aria-label="back" color= 'primary' >
            <Link to ="/">  
              <ArrowBackIcon className="editArrowBack"/>
            </Link>
          </Fab>
        <h4> Add a Plant To Your Family! </h4>
        <div className="Card1" >
        <Card>
        <TextField
          label="Plant Type"
          defaultValue={plant.planttype}
          helperText="What is your plant type?"
          margin="normal"
        />
        <TextField
          label="Plant Name"
          defaultValue={plant.name}
          helperText="What would you like to name your plant?"
          margin="normal"
        />
        <TextField
          label="Plant Location"
          defaultValue= {plant.location}
          helperText="Where will your plant live?"
          margin="normal"
        />
      <FormControl>
        <InputLabel>Water Frequency</InputLabel>
      <Select
          value={plant.water}
          onChange={handleChange}
        >
          <MenuItem value={"Everyday"}>Everyday</MenuItem>
          <MenuItem value={"Every 2 days"}>Every 2 days</MenuItem>
          <MenuItem value={"Every week"}>Every week</MenuItem>
          <MenuItem value={"Every 2 weeks"}>Every 2 weeks </MenuItem>
          <MenuItem value={"Every month"}>Every month</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Lighting Type</InputLabel>
      <Select
          value={plant.lighting}
          onChange={handleChange}
        >
          <MenuItem value={"Full sun"}>Full Sun</MenuItem>
          <MenuItem value={"Part sun"}>Part Sun</MenuItem>
          <MenuItem value={"Part shade"}>Part Shade</MenuItem>
          <MenuItem value={"Shade"}>Shade</MenuItem>
        </Select>
      </FormControl>
        <TextField
          label="Notes"
          multiline
          rows="6"
          margin="normal"
          variant="outlined"
        />
    </Card>
    </div> 
      <Link to ="/">  
        <div className="editCheck2">
          <Fab aria-label="check" color= "primary" >
            <CheckCircleIcon className= "editCheck"/>
          </Fab>  
         </div>
      </Link>
    </div>
  )
}

function CalendarPage() {
  return (
    <div className="Calendar">
      <div  className="editArrowBack2">
       <Fab aria-label="back" color= "primary">
          <Link to ="/">  
            <ArrowBackIcon className="editArrowBack"/>
          </Link>
        </Fab>  
        </div>
      <div className="calendarHeading">
      <style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
</style>
        <h1> Your Plant Calendar </h1>
        <h3>Here is your water schedule in a nutshell.</h3>
      </div>
      <Calendar tileClassName={({ activeStartDate, date, view }) => view === 'month' && date.getDay() === 3 ? 'wednesday' : null}/>
    </div>
  )
}


export default App;
