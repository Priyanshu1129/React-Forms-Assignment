import { useState } from "react";
import { Typography, Box, Button, TextField } from "@mui/material";

const FormSummary = ({
  values,
  additionalQuestions = [],
  setSubmitted,
  resetForm,
}) => {
  const [additionalErrors, setAdditionalErrors] = useState({});

  const renderDetail = (label, value, index) => (
    <Typography key={index}>
      <strong>{label}:</strong> {value}
    </Typography>
  );

  const handleConfirm = () => {
    let errors = {};
    additionalQuestions.forEach((question, index) => {
      if (!question.answer || question.answer.trim() === "") {
        errors[index] = "This field is required";
      }
    });

    if (Object.keys(errors).length > 0) {
      setAdditionalErrors(errors);
    } else {
      setAdditionalErrors({});
      resetForm();
      setSubmitted(false);
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" component="h2" gutterBottom>
        Please Confirm Details
      </Typography>
      {Object.entries(values).map(([key, value], index) => {
        if (!value) return null;
        if (key === "additionalQuestions") return null;
        switch (key) {
          case "attendingWithGuest":
            return renderDetail(
              "Attending With Guest",
              value === "yes" ? "Yes" : "No"
            );
          case "guestName":
            return values.attendingWithGuest === "yes"
              ? renderDetail("Guest Name", value)
              : null;
          case "additionalSkills":
            return renderDetail("Additional Skills", value.join(", "));
          case "interviewTime":
            return renderDetail(
              "Preferred Interview Time",
              value?.toLocaleString()
            );
          default:
            return renderDetail(key.split(/(?=[A-Z])/).join(" "), value, index);
        }
      })}
      {additionalQuestions.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" component="h3" gutterBottom>
            Additional Questions
          </Typography>
          <ul>
            {additionalQuestions.map((question, index) => (
              <li key={index}>
                <Typography>{question.question}</Typography>
                <TextField
                  size="small"
                  fullWidth
                  multiline
                  variant="outlined"
                  value={question.answer || ""}
                  onChange={(e) => {
                    question.answer = e.target.value;
                    setAdditionalErrors((prev) => ({
                      ...prev,
                      [index]: "",
                    }));
                  }}
                  error={Boolean(additionalErrors[index])}
                  helperText={additionalErrors[index]}
                />
              </li>
            ))}
          </ul>
        </Box>
      )}
      <Button
        style={{ marginTop: "16px" }}
        variant="contained"
        color="primary"
        onClick={() => setSubmitted(false)}
        fullWidth
      >
        Edit
      </Button>
      <Button
        style={{ marginTop: "16px" }}
        variant="contained"
        color="primary"
        onClick={handleConfirm}
        fullWidth
      >
        Confirm
      </Button>
    </Box>
  );
};

export default FormSummary;
