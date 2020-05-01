import React, { Component } from 'react';
import { db } from '..';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestion: {},
      results: {
        acid: 0,
        tannin: 0,
        body: 0,
        oak: 0,
        flavor: 0,
      },
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
    console.log(event.target.value);
    const newResults = { ...this.state.results };
    newResults[this.state.currentQuestion.category] = event.target.value;
    this.setState({ results: newResults });
    this.setCurrentQuestion();
  }

  render() {
    return (
      <div>
        <div
          value="pos"
          category={this.state.currentQuestion.category}
          onClick={this.handleSubmit}
        >
          {this.state.currentQuestion.pos}
        </div>
        <div
          value="neg"
          category={this.state.currentQuestion.category}
          onClick={this.handleSubmit}
        >
          {this.state.currentQuestion.neg}
        </div>
      </div>
    );
  }
}

export default Quiz;
