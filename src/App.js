import AppContext from "./AppContext";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import store from "./store";
import history from "./@history";
import AppRoute from "./navigation/AppRoute";
import routesConfig from "./navigation/RoutesConfig";
import "./App.less";
import { ThemeProvider } from "@material-ui/styles";
import theme from './theme'
import { CssBaseline } from "@material-ui/core";
function App() {
  return (
    <AppContext.Provider value={routesConfig}>
      <Provider store={store}>
        <Router history={history}>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
          <AppRoute routes={routesConfig}/>
          </ThemeProvider>
        </Router>
      </Provider>
    </AppContext.Provider>
  );
}

export default App;
