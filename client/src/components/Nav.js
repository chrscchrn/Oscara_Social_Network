import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles({
  bar: {
    width: "60vw",
    backgroundColor: "#c8c1c199",
    borderRadius: 5,
    position: "fixed",
    bottom: 20,
    left: "19.5vw",
    paddingBottom: 10,
    justifyContent: "center",
  },
  icon: {
    width: 40,
    height: 40,
    marginLeft: 20,
    marginRight: 20,
  }
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showlabel="true"
      className={classes.bar}
    >
      <a href="/"><BottomNavigationAction label="Home" icon={<HomeIcon className={classes.icon} />} /></a>
      <a href="/profile"><BottomNavigationAction label="Profile" icon={<PersonIcon className={classes.icon} />} /></a>
      {/* <a href="/"><BottomNavigationAction label="Settings" icon={<SettingsIcon />} /></a> */}
    </BottomNavigation>
  );
}