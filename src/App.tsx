import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './config/routes';
import './App.css';

const App: React.FunctionComponent = props =>  {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <route.component
                      name={route.name}
                      {...route.props}
                  />
              }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
