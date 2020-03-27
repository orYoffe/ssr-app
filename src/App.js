import React, { useState, useEffect } from "react";
// import logo from './logo.svg';
import { Switch, Route } from "react-router-dom";
import "./App.css";

export const getData = (id = 1) => {
  return fetch("https://jsonplaceholder.typicode.com/todos/" + id)
    .then(j => j.json())
    .then(response => {
      console.log("--¯_(ツ)_/¯-----------response----------", response);
      return response;
    });
};

const TODO = ({ todo }) => (
  <p>
    {todo && todo.title}, ID: {todo.id}
  </p>
);

function App({ todo }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/img/logo.svg" className="App-logo" alt="logo" />
        <Route path="/?:id" component={() => <TODO todo={todo} />} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
