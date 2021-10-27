import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AddEvents from "./components/AddEvents/AddEvents";
import DevSlipping from "./components/DevSlipping/DevSlipping";
import Events from "./components/Events/Events";
import EventTask from "./components/EventTask/EventTask";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AuthProvider from "./Context/AuthProvider/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <PrivateRoute path="/events">
              <Events />
            </PrivateRoute>
            <PrivateRoute path="/eventTask/:id">
              <EventTask />
            </PrivateRoute>
            <PrivateRoute path="/addevents">
              <AddEvents />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/donation">
              <DevSlipping />
            </Route>
            <Route path="/blog">
              <DevSlipping />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
