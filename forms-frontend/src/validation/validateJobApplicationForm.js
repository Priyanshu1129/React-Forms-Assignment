export const validateJobApplicationForm = (values) => {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = 'Full Name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone Number is required';
  } else if (!/^\d{10}$/.test(values.phoneNumber)) {
    errors.phoneNumber = 'Phone Number must be a valid 10-digit number';
  }

  if (!values.position) {
    errors.position = 'Position is required';
  }

  if ((values.position === 'Developer' || values.position === 'Designer') && !values.relevantExperience) {
    errors.relevantExperience = 'Relevant Experience is required';
  } else if ((values.position === 'Developer' || values.position === 'Designer') && (isNaN(values.relevantExperience) || values.relevantExperience <= 0)) {
    errors.relevantExperience = 'Relevant Experience must be a number greater than 0';
  }

  if (values.position === 'Designer' && !values.portfolioUrl) {
    errors.portfolioUrl = 'Portfolio URL is required';
  } else if (values.position === 'Designer' && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(values.portfolioUrl)) {
    errors.portfolioUrl = 'Portfolio URL must be a valid URL';
  }

  if (values.position === 'Manager' && !values.managementExperience) {
    errors.managementExperience = 'Management Experience is required';
  }

  if (values.additionalSkills.length === 0) {
    errors.additionalSkills = 'At least one skill must be selected';
  }

  if (!values.interviewTime) {
    errors.interviewTime = 'Preferred Interview Time is required';
  }

  return errors;
};
