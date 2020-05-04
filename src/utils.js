export function convertResultsToSentence(results) {
  const resultTerms = {};
  switch (results.oak) {
    case 0:
      resultTerms.oak = 'no';
      break;
    case 1:
      resultTerms.oak = 'minimal';
      break;
    case 2:
      resultTerms.oak = 'some';
      break;
    case 3:
      resultTerms.oak = 'plenty of';
      break;
    default:
  }
  switch (results.body) {
    case 0:
      resultTerms.body = 'light';
      break;
    case 1:
      resultTerms.body = 'light';
      break;
    case 2:
      resultTerms.body = 'medium';
      break;
    case 3:
      resultTerms.body = 'full';
      break;
    default:
  }
  switch (results.acid) {
    case 0:
      resultTerms.acid = 'very low';
      break;
    case 1:
      resultTerms.acid = 'low';
      break;
    case 2:
      resultTerms.acid = 'medium-low';
      break;
    case 3:
      resultTerms.acid = 'medium';
      break;
    case 4:
      resultTerms.acid = 'medium-high';
      break;
    case 5:
      resultTerms.acid = 'high';
      break;
    default:
  }
  switch (results.tannin) {
    case 0:
      resultTerms.tannin = 'very low';
      break;
    case 1:
      resultTerms.tannin = 'low';
      break;
    case 2:
      resultTerms.tannin = 'medium-low';
      break;
    case 3:
      resultTerms.tannin = 'medium';
      break;
    case 4:
      resultTerms.tannin = 'medium-high';
      break;
    case 5:
      resultTerms.tannin = 'high';
      break;
    default:
  }
  resultTerms.flavor = results.fruit > results.earth ? 'fruit' : 'earth';
  return `You like ${resultTerms.flavor}-driven, ${resultTerms.body}-bodied wines with ${resultTerms.acid} acid, ${resultTerms.tannin} tannin, and ${resultTerms.oak} oak influence!`;
}
