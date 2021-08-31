import RalewayWoff2 from './fonts/Niconne-Regular.ttf';
const { createMuiTheme } = require("@material-ui/core");


const raleway = {
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Raleway'),
    local('Raleway-Regular'),
    url(${RalewayWoff2}) format('woff2')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#16222a",
    },
    secondary:{
    main:"#fff",
    },
    text: {
      primary: "#111",
      secondary: "#ddd",
    },
  },
  typography: {
    h1:{
       fontFamily: "Raleway, Arial",
       textTransform: 'capitalize'
    },
    h2:{
       fontFamily: "Raleway, Arial",
       textTransform: 'capitalize'
    },
    h3:{
       fontFamily: "Raleway, Arial",
       textTransform: 'capitalize'
    },
    h4:{
       fontFamily: "Raleway, Arial",
       textTransform: 'capitalize'
    },
    h5:{
       fontFamily: "Raleway, Arial",
       textTransform: 'capitalize',
    },
    h6: {
      fontSize: 14
    }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [raleway],
      },
    },
  },
});

export default theme;
