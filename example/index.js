import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginCallback, Login } from './app';

render(
    <Router>
        <Switch>
            <Route path='/login'>
                <LoginCallback />
            </Route>
            <Route path='/'>
                <Login />
            </Route>
        </Switch>
    </Router>,
    document.getElementById('example')
);
