import React from 'react';
import { Grid, Card, Button } from '@material-ui/core';

const QuestionCard = (props) => {
  return (
    <Grid item>
      <Card>
        <Grid container direction="column" justify="center" alignItems="center">
          <div className="image-container">
            <img
              className="question-image"
              alt="a food that corresponds to the current question"
              src={process.env.PUBLIC_URL + '/' + props.imageUrl}
            />
          </div>
          <Button
            variant="contained"
            fullWidth={true}
            value={props.value}
            onClick={props.handleSubmit}
          >
            {props.food}
          </Button>
        </Grid>
      </Card>
    </Grid>
  );
};

export default QuestionCard;
