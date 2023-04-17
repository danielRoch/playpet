import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Description } from './components/Description';
import { Checklist } from './components/Checklist';
import { About } from './components/About';
import { Pet } from './components/Pet';
import { Map } from './components/Map';
import { RequireAuth } from './RequireAuth';
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";


function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/description" element={<Description />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/pet" element={<RequireAuth><Pet /></RequireAuth>} />
          <Route path="/map" element={<RequireAuth><Map /></RequireAuth>} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function App() {

  return (
    <Authenticator.Provider>
      <ThemeProvider>
        <MyRoutes />
      </ThemeProvider>
    </Authenticator.Provider>
  );
}

export default App;
