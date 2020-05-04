import React from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  Typography,
  Zoom,
} from '@material-ui/core';

const QuestionCard = (props) => {
  return (
    <Zoom in={true} timeout={700}>
      <Grid item onClick={() => props.handleSubmit(props.value)}>
        <Card>
          <CardActionArea>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <div className="image-container">
                <img
                  className="question-image"
                  alt="a food that corresponds to the current question"
                  src={process.env.PUBLIC_URL + '/' + props.imageUrl}
                />
              </div>
              <Typography className="card-title" variant="h4">
                {props.food}
              </Typography>
            </Grid>
          </CardActionArea>
        </Card>
      </Grid>
    </Zoom>
  );
};

export default QuestionCard;
