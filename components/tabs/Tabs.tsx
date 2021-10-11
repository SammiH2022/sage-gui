import React from 'react'
import withStyles from '@mui/styles/withStyles'
import MuiTabs from '@mui/material/Tabs'
import MuiTab from '@mui/material/Tab'


function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  }
}


export const Tabs = withStyles((theme) => ({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: theme.palette.primary.main
  },
}))(MuiTabs)


export const Tab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    '&:hover': {
      color: '#222',
      opacity: 1,
    },
  },
  selected: {},
}))(({idx, ...rest}) => <MuiTab disableRipple {...a11yProps(idx)} {...rest} />)


