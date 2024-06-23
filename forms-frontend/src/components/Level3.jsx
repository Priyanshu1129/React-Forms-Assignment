import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  FormHelperText,
} from "@mui/material";
import { useForm } from "../hooks/useForm";
import { validateSurveyForm } from "../validation/validateSurveyForm";
import FormSummary from "./FormSummary";

const surveyTopics = ["Technology", "Health", "Education"];
const programmingLanguages = ["JavaScript", "Python", "Java", "C#"];
const exerciseFrequencies = ["Daily", "Weekly", "Monthly", "Rarely"];
const dietPreferences = ["Vegetarian", "Vegan", "Non-Vegetarian"];
const qualifications = ["High School", "Bachelor's", "Master's", "PhD"];

const Level3 = () => {
  const initialValues = {
    fullName: "",
    email: "",
    surveyTopic: "",
    favoriteProgrammingLanguage: "",
    yearsOfExperience: "",
    exerciseFrequency: "",
    dietPreference: "",
    highestQualification: "",
    fieldOfStudy: "",
    feedback: "",
  };

  const { values, errors, handleChange, handleSubmit, resetForm } = useForm(
    initialValues,
    validateSurveyForm
  );

  const [submitted, setSubmitted] = useState(false);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  useEffect(() => {
    if (values.surveyTopic) {
      fetch(`http://localhost:5000/questions?topic=${values.surveyTopic}`)
        .then((response) => response.json())
        .then((data) => setAdditionalQuestions(data))
        .catch((error) => console.error("Error fetching questions:", error));
    }
  }, [values.surveyTopic]);

  const submitForm = () => {
    setSubmitted(true);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={4}>
        <Typography variant="h4" style={{ fontWeight: 400 }}  gutterBottom>
          Survey Form
        </Typography>
        {!submitted ? (
          <form onSubmit={(e) => handleSubmit(e, submitForm)}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Full Name"
                size="small"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                error={Boolean(errors.fullName)}
                helperText={errors.fullName}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Email"
                name="email"
                type="email"
                size="small"
                value={values.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel size="small" id="survey-topic-label">
                Survey Topic
              </InputLabel>
              <Select
                labelId="survey-topic-label"
                name="surveyTopic"
                value={values.surveyTopic}
                size="small"
                onChange={handleChange}
                error={Boolean(errors.surveyTopic)}
              >
                {surveyTopics.map((topic) => (
                  <MenuItem key={topic} value={topic}>
                    {topic}
                  </MenuItem>
                ))}
              </Select>
              {errors.surveyTopic && (
                <FormHelperText error>{errors.surveyTopic}</FormHelperText>
              )}
            </FormControl>

            {values.surveyTopic === "Technology" && (
              <>
                <FormControl fullWidth margin="normal">
                  <InputLabel
                    size="small"
                    id="favorite-programming-language-label"
                  >
                    Favorite Programming Language
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="favorite-programming-language-label"
                    name="favoriteProgrammingLanguage"
                    value={values.favoriteProgrammingLanguage}
                    onChange={handleChange}
                    error={Boolean(errors.favoriteProgrammingLanguage)}
                  >
                    {programmingLanguages.map((language) => (
                      <MenuItem key={language} value={language}>
                        {language}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.favoriteProgrammingLanguage && (
                    <FormHelperText error>
                      {errors.favoriteProgrammingLanguage}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Years of Experience"
                    name="yearsOfExperience"
                    size="small"
                    type="number"
                    value={values.yearsOfExperience}
                    onChange={handleChange}
                    error={Boolean(errors.yearsOfExperience)}
                    helperText={errors.yearsOfExperience}
                  />
                </FormControl>
              </>
            )}

            {values.surveyTopic === "Health" && (
              <>
                <FormControl fullWidth margin="normal">
                  <InputLabel size="small" id="exercise-frequency-label">
                    Exercise Frequency
                  </InputLabel>
                  <Select
                    labelId="exercise-frequency-label"
                    size="small"
                    name="exerciseFrequency"
                    value={values.exerciseFrequency}
                    onChange={handleChange}
                    error={Boolean(errors.exerciseFrequency)}
                  >
                    {exerciseFrequencies.map((frequency) => (
                      <MenuItem key={frequency} value={frequency}>
                        {frequency}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.exerciseFrequency && (
                    <FormHelperText error>
                      {errors.exerciseFrequency}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <InputLabel size="small" id="diet-preference-label">
                    Diet Preference
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="diet-preference-label"
                    name="dietPreference"
                    value={values.dietPreference}
                    onChange={handleChange}
                    error={Boolean(errors.dietPreference)}
                  >
                    {dietPreferences.map((preference) => (
                      <MenuItem key={preference} value={preference}>
                        {preference}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.dietPreference && (
                    <FormHelperText error>
                      {errors.dietPreference}
                    </FormHelperText>
                  )}
                </FormControl>
              </>
            )}

            {values.surveyTopic === "Education" && (
              <>
                <FormControl fullWidth margin="normal">
                  <InputLabel size="small" id="highest-qualification-label">
                    Highest Qualification
                  </InputLabel>
                  <Select
                    labelId="highest-qualification-label"
                    size="small"
                    name="highestQualification"
                    value={values.highestQualification}
                    onChange={handleChange}
                    error={Boolean(errors.highestQualification)}
                  >
                    {qualifications.map((qualification) => (
                      <MenuItem key={qualification} value={qualification}>
                        {qualification}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.highestQualification && (
                    <FormHelperText error>
                      {errors.highestQualification}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Field of Study"
                    size="small"
                    name="fieldOfStudy"
                    value={values.fieldOfStudy}
                    onChange={handleChange}
                    error={Boolean(errors.fieldOfStudy)}
                    helperText={errors.fieldOfStudy}
                  />
                </FormControl>
              </>
            )}

            <FormControl fullWidth margin="normal">
              <TextField
                label="Feedback"
                size="small"
                name="feedback"
                value={values.feedback}
                onChange={handleChange}
                multiline
                minRows={4}
                error={Boolean(errors.feedback)}
                helperText={errors.feedback}
                variant="outlined"
              />
            </FormControl>

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Next
            </Button>
          </form>
        ) : (
          <FormSummary
            values={values}
            setSubmitted={setSubmitted}
            resetForm={resetForm}
            additionalQuestions={additionalQuestions}
          />
        )}
      </Box>
    </Container>
  );
};

export default Level3;
