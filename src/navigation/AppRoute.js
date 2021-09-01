import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { generateRoutesFromConfigs } from "./RoutesUtils";
import PropTypes from 'prop-types'
export default function AppRoute(props) {
  const isAuthenticated = useSelector(({ Auth }) =>Auth?.isAuthenticated 
  );
  const auth = useSelector(({ Auth }) =>
    isAuthenticated ? Auth.role : "guest"
  );
  const [config,setConfig]=useState([...generateRoutesFromConfigs(props.routes, auth)])
  useEffect(()=> {
    setConfig([...generateRoutesFromConfigs(props.routes, auth)])
  },[auth, props.routes])
  return (
    <Switch>
      {config.map((value, index) => (
        <Route
          key={index}
          exact={value.exact || false}
          path={value.path}
          component={value.component}
        />
      ))}
      <Route 
      key={"default"}
      exact
      path="/"
      component={()=> <Redirect to={"/home"}/>}/>
      <Route 
      key ={"routes404"}
      component={()=><Redirect to="/login"/>}/>
    </Switch>
  );
}

AppRoute.propTypes={
  routes: PropTypes.array.isRequired
}