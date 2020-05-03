import React, { Component } from 'react';
import { db } from '..';
import { Container, Grid, Typography } from '@material-ui/core';
import firebase from 'firebase';
import QuestionCard from './QuestionCard';
import shuffle from 'shuffle-array';
import { withRouter } from 'react-router-dom';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestion: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.incrementcurrentQuestion = this.incrementCurrentQuestion.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  async componentDidMount() {
    let questions = [];
    const snap = await db.collection('questions').get();
    snap.forEach((doc) => questions.push(doc.data()));
    questions = shuffle(questions);
    this.setState({ questions });
  }

  incrementCurrentQuestion() {
    const prev = this.state.currentQuestion;
    this.setState({ currentQuestion: prev + 1 });
  }

  handleKeyDown(event) {
    console.log('yup');
    if (event.keyCode === 37) {
      this.handleSubmit('pos');
    } else if (event.keyCode === 39) {
      this.handleSubmit('neg');
    }
  }

  handleSubmit(val) {
    const currentQ = this.state.questions[this.state.currentQuestion];
    const newResults = { ...this.props.results };
    newResults[currentQ.category] =
      (val === 'pos' ? 1 : 0) + newResults[currentQ.category];
    this.props.setResults(newResults);
    if (this.state.currentQuestion < this.state.questions.length - 1) {
      this.incrementCurrentQuestion();
    } else {
      this.props.history.push('/taste-profile');
    }
  }

  render() {
    const currentQ = this.state.questions[this.state.currentQuestion];
    return this.state.questions.length ? (
      <div tabIndex={0} onKeyDown={(event) => this.handleKeyDown(event)}>
        <Container>
          <Grid
            container
            direction="row"
            justify="center"
            spacing={5}
            id="quiz"
          >
            <QuestionCard
              value="pos"
              imageUrl={currentQ.posImage}
              handleSubmit={this.handleSubmit}
              food={currentQ.pos}
            />
            <Grid item>
              <QuestionCard
                value="neg"
                imageUrl={currentQ.negImage}
                handleSubmit={this.handleSubmit}
                food={currentQ.neg}
              />
            </Grid>
          </Grid>
          <div id="quiz-footer">
            <Typography variant="h5">
              {this.state.currentQuestion + 1}/21
            </Typography>
          </div>
        </Container>
      </div>
    ) : (
      <div>Loading</div>
    );
  }
}

export default withRouter(Quiz);
