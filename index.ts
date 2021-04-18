import express from 'express';
import calculateBmi from './bmiCalculator'
const app = express();

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {

      const bmi = calculateBmi(height, weight);

      interface Result {
        weight: number,
        height: number,
        bmi: string
      }

      const result: Result = {weight, height, bmi}
      res.send(result)

    } else {
      throw new Error('Provided values were not numbers!');
    }
  } catch(e) {
    console.log(e)
    res.send({error: 'malformatted parameters'})
  }
  
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});