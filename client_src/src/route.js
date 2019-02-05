import React from 'react';
import { Route } from 'react-router-dom';
import Signup from './components/Signup';
// import Segments from './segments/Segments';

export default [
    <Route exact path="/signup" component={Signup} />,
];