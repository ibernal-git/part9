import React from 'react';
import { AddEntryProps, EntryType, EntryForm } from '../types';
import { Field, Formik, Form } from "formik";
import { DiagnosisSelection, TextField, SelectField } from '../AddPatientModal/FormField';
import { Button, Grid } from 'semantic-ui-react';
import { useStateValue } from '../state';
import EntryTypeForm from './EntryTypeForm';

export type EntryFormValues = EntryForm;

const AddEntryForm: React.FC<AddEntryProps> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  type Options = {
    value: EntryType;
    label: string;
  };

  const typeOptions: Options[] = [
    { value: EntryType.HealthCheck, label: EntryType.HealthCheck },
    { value: EntryType.Hospital, label: EntryType.Hospital },
    { value: EntryType.OccupationalHealthcare, label: EntryType.OccupationalHealthcare, },
  ];

  return (
    <Formik
      initialValues={{
        id: "",
        date: "",
        type: "HealthCheck",
        specialist: "",
        diagnosisCodes: [""],
        description: "",
        healthCheckRating: 0,
        dischargeDate: "",
        dischargeCriteria: "",
        employerName: "",
        sickLeaveStartDate: "",
        sickLeaveEndDate: ""
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const invalidInput = "Invalid input";
        const errors: { [field: string]: string } = {};
        if (!isDate(values.date)) {
          errors.date = invalidInput;
        } else if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (values.type === "HealthCheck") {
          if ((values.healthCheckRating !== 0 && !values.healthCheckRating) || values.healthCheckRating < 0 || values.healthCheckRating > 3) {
            errors.healthCheckRating = requiredError;
          }
        }
        if (values.type === "Hospital") {
          if (!values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          }
          if (!values.dischargeDate) {
            errors.dischargeDate = requiredError;
          } else if (!isDate(values.dischargeDate)) {
            errors.dischargeDate = invalidInput;
          }
        }
        if (values.type === "OccupationalHealthcare") {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (!values.sickLeaveStartDate) {
            errors.sickLeaveStartDate = requiredError;
          } else if (!isDate(values.sickLeaveStartDate)) {
            errors.sickLeaveStartDate = invalidInput;
          }
          if (!values.sickLeaveEndDate) {
            errors.sickLeaveEndDate = requiredError;
          } else if (!isDate(values.sickLeaveEndDate)) {
            errors.sickLeaveEndDate = invalidInput;
          }
        }
        return errors;
      }}
    >

      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              options={typeOptions}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <EntryTypeForm type={values.type} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;