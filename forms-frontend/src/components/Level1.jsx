import { useState } from "react";
import {
  Container,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useForm } from "../hooks/useForm";
import { validateEventRegistrationForm } from "../validation/validateEventRegistrationForm.js";
import FormSummary from "./FormSummary";

const Level1 = () => {
  const initialValues = {
    name: "",
    email: "",
    age: "",
    attendingWithGuest: "no",
    guestName: "",
  };

  const { values, errors, handleChange, handleSubmit, resetForm } = useForm(
    initialValues,
    validateEventRegistrationForm
  );

  const [submitted, setSubmitted] = useState(false);

  const submitForm = () => {
    setSubmitted(true);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={4}>
        <Typography variant="h4" style={{ fontWeight: 400 }} gutterBottom>
          Event Registration Form
        </Typography>
        {!submitted ? (
          <form onSubmit={(e) => handleSubmit(e, submitForm)}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Name"
                name="name"
                size="small"
                value={values.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Email"
                name="email"
                size="small"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Age"
                name="age"
                type="number"
                size="small"
                value={values.age}
                onChange={handleChange}
                error={Boolean(errors.age)}
                helperText={errors.age}
              />
            </FormControl>

            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">
                Are you attending with a guest?
              </FormLabel>
              <RadioGroup
                name="attendingWithGuest"
                value={values.attendingWithGuest}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {values.attendingWithGuest === "yes" && (
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Guest Name"
                  name="guestName"
                  value={values.guestName}
                  onChange={handleChange}
                  error={Boolean(errors.guestName)}
                  helperText={errors.guestName}
                />
              </FormControl>
            )}

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

export default Level1;
