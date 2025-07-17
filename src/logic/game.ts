import jsonData_human from '../../data/daniel_clean_final.json';
import jsonData_robot from '../../data/model_clean_final.json';

export function fetch_random_qna(): Array<[string, string, string]> {
  // Generate a random number from 1 to 305
  const totalQuestions = 305;
  const numToSelect = 10;
  const margin = 3;
  const selectedIndices: number[] = [];

  while (selectedIndices.length < numToSelect) {
    const randomNumber = Math.floor(Math.random() * totalQuestions);

    // Ensure margin of 3 between numbers
    if (
      selectedIndices.every(
        (idx) => Math.abs(idx - randomNumber) > margin
      )
    ) {
      selectedIndices.push(randomNumber);
    }
  }

  const result: Array<[string, string, string]> = [];
  for (const idx of selectedIndices) {
    const human_data = jsonData_human[idx];
    const robot_data = jsonData_robot[idx];
    result.push([human_data["input"], human_data["output"], robot_data["output"]]);
  }

  return result;
}