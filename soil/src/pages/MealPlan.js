import { getMealAccordPreference, getUserProfile } from "../data/repository";
import { useEffect, useState } from "react";
import { ACTIVITYFACTORS, GOALFACTORS } from "../utils/constants";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { shuffleArray } from "../utils/helper";

function MealPlan(props) {
  const [userDetails, setUserDetails] = useState(null);
  const [mealPlan, setMealPlan] = useState([]);
  // Calculated Calories
  const [calories, setCalories] = useState([]);
  // Generates meal plan according to this default is daily
  const [planDuration, setPlanDuration] = useState("daily");

  // Fetching user profile data
  useEffect(() => {
    setUserDetails(getUserProfile(props.username));
  }, [props.username]);

  useEffect(() => {
    if (userDetails) {
      // User details
      const { gender, age, weight, height, activityLevel, healthGoal } =
        userDetails;

      // Calories calculation
      setCalories(
        caloriesCalc(gender, age, weight, height, activityLevel, healthGoal)
      );

      // Tailors calories allording to daily or weekly
      const dailyCalories = planDuration === "daily" ? calories : calories * 7;

      // Generates meal plan
      const plans = generatedMealPlan(dailyCalories, planDuration);

      // Sets current meal plan
      setMealPlan(plans);
    }
  }, [userDetails, planDuration, calories]);

  /**
   * Calories calculator concept/code taken from -
   * https://codepen.io/team/HMPD/pen/eLgQRX
   */
  function caloriesCalc(
    gender,
    age,
    weight,
    height,
    activityLevel,
    healthGoal
  ) {
    let bmr = 0;

    if (gender === "female") {
      bmr = 655.09 + 9.56 * weight + 1.84 * height - 4.67 * age;
    } else {
      bmr = 66.47 + 13.75 * weight + 5 * height - 6.75 * age;
    }

    /**
     * Goal and activity calculation concept taken from
     * https://www.musclehacking.com/calorie-calculator/#activity-level
     * */

    // Adjust BMR based on the activity level
    let tdee = bmr * (ACTIVITYFACTORS[activityLevel] || 1.2);

    // Apply the goal adjustment
    tdee *= GOALFACTORS[healthGoal] || 1.0;

    // Rounds the number
    return Math.round(tdee);
  }

  // Generates meal plan according to calories
  function generatedMealPlan(calories, duration) {
    if (!userDetails) return null;

    const { dietaryPreference } = userDetails;

    // Retrives meals from local storage
    let meals = getMealAccordPreference(dietaryPreference);

    // Shuffles meals so we have diffrent meals
    shuffleArray(meals);

    // Generates plan for a single day
    const generateDailyPlan = (caloriesTarget) => {
      let dayPlan = [];
      let currentCalories = 0;
      let attempts = 0;

      while (currentCalories < caloriesTarget) {
        for (let i = 0; i < meals.length; i++) {
          let meal = meals[i];
          if (currentCalories + meal.calories <= caloriesTarget) {
            dayPlan.push(meal);
            currentCalories += meal.calories;
          }
          if (currentCalories >= caloriesTarget) break;
        }
        shuffleArray(meals);
        attempts++;
        // Break if not possible to add more meals without exceeding target after many full loops
        if (attempts > 3) break;
      }

      return dayPlan;
    };

    if (duration === "weekly") {
      let weeklyPlan = [];
      for (let i = 0; i < 7; i++) {
        // Distribute calories evenly across the week
        const dailyCalories = calories / 7;
        weeklyPlan.push(generateDailyPlan(dailyCalories));
      }
      return weeklyPlan;
    } else {
      return [generateDailyPlan(calories)];
    }
  }

  return (
    // Alligns content in center of page
    <Container
      fluid
      className="d-flex justify-content-center align-items-center bottomPadding10"
    >
      {/* Border, 3 width and rounded*/}
      <Row className="border border-dark-subtle border-3 rounded-5 p-5 mealPlanSizing">
        {/* Centers content */}
        <div className="w-100 d-flex flex-column align-items-center">
          {/* Displays Plan Type/calories */}
          <div className="mb-3 text-center">
            Plan Type: {planDuration}
            <br />
            Calories: {calories}
          </div>

          {/* Button for toggling b/w Weekly/Daily plan */}
          <Button
            variant="outline-success"
            onClick={() =>
              setPlanDuration(planDuration === "daily" ? "weekly" : "daily")
            }
            className="w-100"
          >
            Switch to {planDuration === "daily" ? "Weekly" : "Daily"} Plan
          </Button>

          <br></br>

          {/* Meal's display */}
          <div className="align-items-left">
            {planDuration === "daily" && mealPlan.length > 0 && (
              <ul className="mealList">
                {mealPlan[0].map((meal, index) => (
                  <li key={index}>
                    {meal.name} - {meal.calories} calories
                  </li>
                ))}
              </ul>
            )}
            {planDuration === "weekly" &&
              mealPlan.map((dayPlan, dayIndex) => (
                <div key={dayIndex} className="dayMeals">
                  <h3>Day {dayIndex + 1}</h3>
                  <ul className="mealList">
                    {Array.isArray(dayPlan) ? (
                      dayPlan.map((meal, mealIndex) => (
                        <li key={mealIndex}>
                          {meal.name} - {meal.calories} calories
                        </li>
                      ))
                    ) : (
                      <li>
                        {dayPlan.name} - {dayPlan.calories} calories
                      </li>
                    )}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default MealPlan;
