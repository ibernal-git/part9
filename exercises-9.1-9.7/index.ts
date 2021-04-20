import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import { Request, Response } from 'express';
const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

/** 
 * WebBMI
*/

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

      const result: Result = {weight, height, bmi};
      res.send(result);

    } else {
      throw new Error('Provided values were not numbers!');
    }
  } catch(e) {
    console.log(e);
    res.send({error: 'malformatted parameters'});
  }
  
});

/**
 * Exercises
 */
 interface Exercises {
  daily_exercises: Array<number>,
  target: number
}
interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

app.post('/exercises', (req: Request<never, never, Exercises>, res: Response) => {
  try {
    if (!req.body.daily_exercises || !req.body.target) {
      throw new Error('parameters missing');
    }
  } catch {
    return res.send({error: 'parameters missing'});
  }
  try {
    
    const workoutHours:Array<number> = req.body.daily_exercises;
    const target:number = req.body.target;

    if (workoutHours.every( (e) => !isNaN(Number(e))) && !isNaN(Number(target))) {

      const result:Result = calculateExercises(workoutHours, target);
      return res.json(result);

    } else {
      throw new Error('Provided values were not numbers!');
    }
  }  catch {
    return res.send({error: 'malformatted parameters'});
  }

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});