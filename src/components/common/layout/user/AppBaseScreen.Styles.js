import { alpha, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: 'transparent',
      alignSelf: 'right',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(5),
        width: '30%',
  
      },
      [theme.breakpoints.down('md')]: {
        marginRight: theme.spacing(1),
        width: 'auto',
  
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Grow: {
      flexGrow: 1,
    },
    inputRoot: {
      color: theme.palette.primary.main,
  
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
  
      borderRadius: 10,
  
      width: '100%',
      [theme.breakpoints.up('md')]: {
        backgroundColor: alpha(theme.palette.common.white, 0.95),
        border: '1px solid #ddd',
      },
      [theme.breakpoints.down('md')]: {
        width: '0ch',
        '&:focus': {
          border: '1px solid #ddd',
          borderRadius: 10,
          width: '17ch',
          backgroundColor: alpha(theme.palette.common.white, 0.95)
        },
      },
    },
    flex: {
      display: 'flex',
      flexFlow: 'row',
      width: 350,
      justifyContent: 'space-between',
      alignItems: 'center',
      [theme.breakpoints.down("md")]: {
        width: 'auto'
      }
    },
    app: {
      backgroundColor: theme.palette.secondary.main,
    },
    nav: {
      backgroundColor: theme.palette.primary.main,
    },
    navTool: {
      minHeight: 'unset',
      padding: 5
    },
    search2: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon2: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot2: {
      color: 'inherit',
    },
    inputInput2: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '85vw',
      },
    },
  }));