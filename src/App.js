import React from 'react';
import './App.css';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddBoxIcon from '@material-ui/icons/AddBox';
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
  return (
    <Router>
    <div className="App">
      <Switch>
          <Route exact path="/">
            <MyPlants/>
          </Route>
          <Route exact path="/editPlant/:plant"
          render={(props) => <Edit {...props} />}>
            {/* <Edit/> */}
          </Route>
          <Route exact path="/calendar">
            <Calendar />
          </Route>
        </Switch>
    </div>
    </Router>
  );
}

function MyPlants() {
  return (
      <div className="list">
        <style>
@import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
</style>
         <h1> My Plants </h1>
      {plantList.map(Plants)}
      <Bottom/>
  </div>
  );
}

function Plants(props, key) {
  return (
    <div className="plant">
      <Link to={"/editPlant/" + key} className="plantLink">
      <div className="plant-type">
        <h1> {props.planttype} </h1>
        <p> {props.name} </p>
        <img src={props.image} width="100"/>  
      </div>
      <div className="plant-description">
        <p> {props.location}</p>
        <p> {props.lighting} </p>
        <p> {props.water}</p>
      </div>
      </Link>
    </div>
  )
}

function Bottom() {
  const [value, setValue] = React.useState(0);
  return (
    <div className= "bottomNavigation">
      <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <Link to = "/editPlant">
        <BottomNavigationAction label="Add Plant" icon={<AddBoxIcon />} />
      </Link>
      <Link to = "/calendar">
        <BottomNavigationAction label="Calendar" icon={<DateRangeIcon />} />
      </Link>
    </BottomNavigation>
    </div>
  )
}

function Edit(props) {
  console.log(props)
  const [frequency, setFrequency] = React.useState('');
  const handleChange = event => {
    setFrequency(event.target.value);
  };

  const plant = plantList[props.match.params.plant];
  console.log(plant);

  return (
      <div className= "edit">
        <Fab aria-label="back" color= "primary" >
          <Link to ="/">  
            <ArrowBackIcon className="editArrowBack"/>
          </Link>
        </Fab>  
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
      <Fab aria-label="check" color= "primary" >
        <Link to ="/">  
          <CheckCircleIcon className="editCheck"/>
        </Link>
      </Fab>  
      {/* two buttons: back and checkmark
      camera/photo upload
       */}
    </div>
  )
}

function Calendar() {
  return (
    <div className="calendar">
      {/* import npm calendar */}
    </div>
  )
}


export default App;
