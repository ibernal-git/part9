import React from 'react';
import { Field } from "formik";
import { NumberField, TextField } from '../AddPatientModal/FormField';

const EntryTypeForm = (type: { type: string }) => {
  switch (type.type) {
    case "HealthCheck":
      return (
        <Field
          label="Health Check Rating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      );
    case "Hospital":
      return (
        <>
          <Field
            label="Discharge Date"
            placeholder="Date"
            name="dischargeDate"
            component={TextField}
          />
          <Field
            label="Discharge Criteria"
            placeholder="Criteria"
            name="dischargeCriteria"
            component={TextField}
          />
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sick Leave Start Date"
            placeholder="Date"
            name="sickLeaveStartDate"
            component={TextField}
          />
          <Field
            label="Sick Leave End Date"
            placeholder="Date"
            name="sickLeaveEndDate"
            component={TextField}
          />
        </>
      );
    default:
      return <p>`invalid:  ${type}`</p>;
  }
};
export default EntryTypeForm;