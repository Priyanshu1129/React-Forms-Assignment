import {  useState } from "react";
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Button,
  Typography,
  Box,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useForm } from "../hooks/useForm";
import { validateJobApplicationForm } from "../validation/validateJobApplicationForm";
import FormSummary from "./FormSummary";

const positions = ["Developer", "Designer", "Manager"];
const skills = ["JavaScript", "CSS", "Python"];

const Level2 = () => {
  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    relevantExperience: "",
    portfolioUrl: "",
    managementExperience: "",
    additionalSkills: [],
    interviewTime: null,
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleCheckboxChange,
    handleDateChange,
    resetForm
  } = useForm(initialValues, validateJobApplicationForm);

  const [submitted, setSubmitted] = useState(false);

  const submitForm = () => {
    setSubmitted(true);
  };



  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={4}>
        <Typography variant="h4" style={{ fontWeight: 400 }} gutterBottom>
          Job Application Form
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
              <TextField
                label="Phone Number"
                name="phoneNumber"
                type="number"
                size="small"
                value={values.phoneNumber}
                onChange={handleChange}
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel size="small" id="position-label">
                Applying for Position
              </InputLabel>
              <Select
                labelId="position-label"
                name="position"
                size="small"
                value={values.position}
                onChange={handleChange}
                error={Boolean(errors.position)}
              >
                {positions.map((position) => (
                  <MenuItem key={position} value={position}>
                    {position}
                  </MenuItem>
                ))}
              </Select>
              {errors.position && (
                <FormHelperText error>{errors.position}</FormHelperText>
              )}
            </FormControl>
            {(values.position === "Developer" ||
              values.position === "Designer") && (
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Relevant Experience (Years)"
                  name="relevantExperience"
                  type="number"
                  size="small"
                  value={values.relevantExperience}
                  onChange={handleChange}
                  error={Boolean(errors.relevantExperience)}
                  helperText={errors.relevantExperience}
                />
              </FormControl>
            )}
            {values.position === "Designer" && (
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Portfolio URL"
                  name="portfolioUrl"
                  size="small"
                  value={values.portfolioUrl}
                  onChange={handleChange}
                  error={Boolean(errors.portfolioUrl)}
                  helperText={errors.portfolioUrl}
                />
              </FormControl>
            )}
            {values.position === "Manager" && (
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Management Experience"
                  name="managementExperience"
                  size="small"
                  value={values.managementExperience}
                  onChange={handleChange}
                  error={Boolean(errors.managementExperience)}
                  helperText={errors.managementExperience}
                />
              </FormControl>
            )}
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Additional Skills</FormLabel>
              <FormGroup row>
                {skills.map((skill) => (
                  <FormControlLabel
                    key={skill}
                    control={
                      <Checkbox
                        size="small"
                        checked={values.additionalSkills.includes(skill)}
                        onChange={handleCheckboxChange}
                        name="additionalSkills"
                        value={skill}
                      />
                    }
                    label={skill}
                  />
                ))}
              </FormGroup>
              {errors.additionalSkills && (
                <FormHelperText error>{errors.additionalSkills}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth margin="normal">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Preferred Interview Time"
                    value={values.interviewTime}
                    slotProps={{ textField: { size: "small" } }}
                    onChange={(newValue) =>
                      handleDateChange("interviewTime", newValue)
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>
              {errors.interviewTime && (
                <FormHelperText error>{errors.interviewTime}</FormHelperText>
              )}
            </FormControl>

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Next
            </Button>
          </form>
        ) : (
          <FormSummary values={values} setSubmitted={setSubmitted} resetForm={resetForm} />
        )}
      </Box>
    </Container>
  );
};

export default Level2;
