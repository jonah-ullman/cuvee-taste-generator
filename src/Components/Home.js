import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Home = (props) => {
  return (
    <div id="home">
      <h1 id="home-header">Welcome to Cuvee!</h1>
      <p id="home-content">
        Let's face it: Unless you're a sommelier, ordering wine in a restaurant
        can be daunting. That's where Cuvee comes in. Our short, simple quiz
        will give you a custom taste profile so you'll know exactly what kind of
        wine you like, and how to order it!
      </p>
      <Button
        id="quiz-button"
        variant="contained"
        color="primary"
        onClick={() => props.history.push('/quiz')}
        fullWidth={false}
      >
        Take the Quiz!
      </Button>
    </div>
  );
};

export default withRouter(Home);
