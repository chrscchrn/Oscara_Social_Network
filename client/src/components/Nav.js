import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "lightGray",
    borderRadius: 5,
  },
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
      showLabel
      className={classes.root}
    >
      <a href="/"><BottomNavigationAction label="Home" icon={<HomeIcon />} /></a>
      <a href="/profile"><BottomNavigationAction label="Profile" icon={<PersonIcon />} /></a>
      {/* <a href="/"><BottomNavigationAction label="Settings" icon={<SettingsIcon />} /></a> */}
    </BottomNavigation>
  );
}