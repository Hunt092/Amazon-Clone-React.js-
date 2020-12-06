import React,{useEffect} from 'react';
import './App.css';
import Header from './Header';
import Home from './Home'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './Firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


function App() {
  const promise = loadStripe("pk_test_51HuteEJrNEDuRzF9fQbcXZJIUM98vxnjFEbaaSM4nd5WtVm6bK6tWzxamXwF0oWotoNQjLGuZ3RAJyTr6T1WZcXC00qXx5wtJq")
  const [{},dispatch] = useStateValue();
  useEffect(()=>{
    auth.onAuthStateChanged(authUser =>{
      console.log(`The user is `,authUser)
      
      if (authUser){
        dispatch({
          type: 'SET_USER',
          user:authUser,
        })
      }else{
        dispatch({
          type: 'SET_USER',
          user:null,
        })
      }
      

    })
  },[])
  return (
    <Router>
    <div className="app">
    
      <Switch>
        <Route path="/login"> 
          <Login/>
        </Route>
        <Route path="/payment">
        <Header/>
        <Elements stripe={promise}>
          <Payment/>
        </Elements>
        </Route>
        <Route path="/checkout"> 
        <Header/>
          <Checkout/>
        </Route>
        <Route path="/">
          <Header/>
          <Home/>
        </Route>
        
      </Switch>
    </div>
    </Router>
  );
}

export default App;
