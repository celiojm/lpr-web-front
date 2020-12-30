import React, { useContext } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import {AuthContext} from "./Context/AuthContext";
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"/></div>;

const DefaultLayout = Loadable({
    loader: () =>import('./containers/DefaultLayout'),
    loading
});

const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

const App = () => {

    const {isAuthenticated} = useContext(AuthContext);

    return (
        isAuthenticated?
            <HashRouter>
                <Switch>
                    <Route exact path="/login" name="Login Page" component={Login} />
                    <Route exact path="/register" name="Register Page" component={Register} />
                    <Route exact path="/404" name="Page 404" component={Page404} />
                    <Route exact path="/500" name="Page 500" component={Page500} />
                    <Route path="/" name="Dashboard" component={DefaultLayout} />
                </Switch>
            </HashRouter>:
            <Login/>
    );
};

export default App;