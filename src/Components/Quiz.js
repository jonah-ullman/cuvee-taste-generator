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
    this.currentQuestion = this.incrementCurrentQuestion.bind(this);
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

  handleSubmit(event) {
    const val = event.currentTarget.value;
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
      <Container>
        <Typography variant="h1">Cuvee Wine Taste Generator</Typography>
        <Grid container direction="row" justify="center" spacing={3}>
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
        <Typography>
          {this.state.currentQuestion}/21 questions completed!
        </Typography>
      </Container>
    ) : (
      <div>Loading</div>
    );
  }
}

export default withRouter(Quiz);
