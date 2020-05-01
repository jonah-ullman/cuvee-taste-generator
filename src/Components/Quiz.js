import React, { Component } from 'react';
import { db } from '..';
import { Container, Grid, Card, CardMedia, Button } from '@material-ui/core';
import firebase from 'firebase';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestion: {},
      completedQuestions: 0,
      results: {
        acid: 0,
        tannin: 0,
        body: 0,
        oak: 0,
        flavor: 0,
      },
      image: '',
    };
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    const questions = [];
    await db
      .collection('questions')
      .get()
      .then((snap) => {
        snap.forEach((doc) => questions.push(doc.data()));
      });
    this.setState({ questions });
    this.setCurrentQuestion();
  }

  setCurrentQuestion() {
    const oldQs = this.state.questions;
    const currentQuestion = oldQs.splice(
      Math.floor(Math.random() * oldQs.length),
      1
    )[0];
    this.setState({ questions: oldQs, currentQuestion });
  }

  handleSubmit(event) {
    const val = event.currentTarget.value;
    const newResults = { ...this.state.results };
    newResults[this.state.currentQuestion.category] =
      (val === 'pos' ? 1 : 0) + newResults[this.state.currentQuestion.category];
    this.setState({ results: newResults });
    this.setCurrentQuestion();
  }

  render() {
    return (
      <Grid container direction="row" justify="center" spacing={3}>
        <Grid item>
          <Card>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <div className="image-container">
                <img
                  className="question-image"
                  alt="food"
                  src={process.env.PUBLIC_URL + '/raspberry.jpg'}
                />
              </div>
              <Button
                variant="contained"
                color="secondary"
                fullWidth={true}
                value="pos"
                onClick={this.handleSubmit}
              >
                {this.state.currentQuestion.pos}
              </Button>
            </Grid>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <div className="image-container">
                <img
                  className="question-image"
                  alt="food"
                  src={process.env.PUBLIC_URL + '/raspberry.jpg'}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                fullWidth={true}
                value="neg"
                onClick={this.handleSubmit}
              >
                {this.state.currentQuestion.neg}
              </Button>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      // {/* <div
      //   value="pos"
      //   category={this.state.currentQuestion.category}
      //   onClick={this.handleSubmit}
      // >
      //   {this.state.currentQuestion.pos}
      // </div>
      // <div
      //   value="neg"
      //   category={this.state.currentQuestion.category}
      //   onClick={this.handleSubmit}
      // >
      //   {this.state.currentQuestion.neg}
      // </div> */}
    );
  }
}

export default Quiz;
