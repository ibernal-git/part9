// calculateExercises
/*
{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 }
  */
/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (workoutHours: Array<number>, targetHours:number): Result => {
  const periodLength = workoutHours.length;
  const trainingDays = workoutHours.filter(Boolean).length;
  const average = workoutHours.reduce((a, b) => a + b)/periodLength;
  const success = (average>targetHours) ? true : false;
  const target = targetHours;
   
  enum ratingStrings {
    'very bad performance' = 1,
    'not too bad but could be better',
    'you are doing great'
  }
  
  let rating = 2;
  let ratingDescription: string = ratingStrings[2];
   
  if (average<targetHours-0.5) {
    rating = 1;
    ratingDescription = ratingStrings[1].toString();
  }
  
  if (average>targetHours+0.5) {
    rating = 3;
    ratingDescription = ratingStrings[3].toString();
  }


  const result = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
  return result;
};

interface providedArguments {
  workoutHours: Array<number>;
  targetHours: number;
}

const parseargs = (args: Array<string>): providedArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const [_path, _file, ...rest] = args;
  const result = rest.every( (e) => !isNaN(Number(e)));
  if (result) {
    return {
      targetHours: Number(rest.shift()),
      workoutHours: rest.map(Number)
      
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { workoutHours, targetHours } = parseargs(process.argv);
  console.log(calculateExercises(workoutHours, targetHours));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

export default calculateExercises
