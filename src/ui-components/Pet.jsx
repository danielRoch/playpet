/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  Heading,
  SelectField,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
export default function Pet(props) {
  const { onSubmit, onValidate, onChange, overrides, ...rest } = props;
  const initialValues = {
    input: {},
  };
  const [input, setInput] = React.useState(initialValues.input);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setInput(initialValues.input);
    setErrors({});
  };
  const validations = {
    "input.name": [{ type: "Required" }],
    "input.petType": [{ type: "Required" }],
    "input.description": [{ type: "Required" }],
    "input.city": [],
    "input.state": [{ type: "Required" }],
    "input.email": [{ type: "Required" }, { type: "Email" }],
    "input.image": [{ type: "URL" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        const modelFields = {
          input,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        await onSubmit(modelFields);
      }}
      {...getOverrideProps(overrides, "Pet")}
      {...rest}
    >
      <Heading
        level={3}
        children="Input"
        {...getOverrideProps(overrides, "input")}
      ></Heading>
      <TextField
        label="Post Name"
        isRequired={true}
        value={input["name"]}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              input: { ...input, name: value },
            };
            const result = onChange(modelFields);
            value = result?.input?.name ?? value;
          }
          if (errors["input.name"]?.hasError) {
            runValidationTasks("input.name", value);
          }
          setInput({ ...input, name: value });
        }}
        onBlur={() => runValidationTasks("input.name", input["name"])}
        errorMessage={errors["input.name"]?.errorMessage}
        hasError={errors["input.name"]?.hasError}
        {...getOverrideProps(overrides, "input.name")}
      ></TextField>
      <TextField
        label="Pet Type"
        isRequired={true}
        value={input["petType"]}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              input: { ...input, petType: value },
            };
            const result = onChange(modelFields);
            value = result?.input?.petType ?? value;
          }
          if (errors["input.petType"]?.hasError) {
            runValidationTasks("input.petType", value);
          }
          setInput({ ...input, petType: value });
        }}
        onBlur={() => runValidationTasks("input.petType", input["petType"])}
        errorMessage={errors["input.petType"]?.errorMessage}
        hasError={errors["input.petType"]?.hasError}
        {...getOverrideProps(overrides, "input.petType")}
      ></TextField>
      <TextAreaField
        label="Description"
        isRequired={true}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              input: { ...input, description: value },
            };
            const result = onChange(modelFields);
            value = result?.input?.description ?? value;
          }
          if (errors["input.description"]?.hasError) {
            runValidationTasks("input.description", value);
          }
          setInput({ ...input, description: value });
        }}
        onBlur={() =>
          runValidationTasks("input.description", input["description"])
        }
        errorMessage={errors["input.description"]?.errorMessage}
        hasError={errors["input.description"]?.hasError}
        {...getOverrideProps(overrides, "input.description")}
      ></TextAreaField>
      <TextField
        label="City"
        value={input["city"]}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              input: { ...input, city: value },
            };
            const result = onChange(modelFields);
            value = result?.input?.city ?? value;
          }
          if (errors["input.city"]?.hasError) {
            runValidationTasks("input.city", value);
          }
          setInput({ ...input, city: value });
        }}
        onBlur={() => runValidationTasks("input.city", input["city"])}
        errorMessage={errors["input.city"]?.errorMessage}
        hasError={errors["input.city"]?.hasError}
        {...getOverrideProps(overrides, "input.city")}
      ></TextField>
      <SelectField
        label="State"
        descriptiveText=""
        placeholder="Please select a state"
        value={input}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              input: { ...input, state: value },
            };
            const result = onChange(modelFields);
            value = result?.input?.state ?? value;
          }
          if (errors["input.state"]?.hasError) {
            runValidationTasks("input.state", value);
          }
          setInput({ ...input, state: value });
        }}
        onBlur={() => runValidationTasks("input.state", input["state"])}
        errorMessage={errors["input.state"]?.errorMessage}
        hasError={errors["input.state"]?.hasError}
        {...getOverrideProps(overrides, "input.state")}
      >
        <option
          children="['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']"
          value="['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']"
          {...getOverrideProps(overrides, "input.stateoption0")}
        ></option>
      </SelectField>
      <TextField
        label="Email"
        isRequired={true}
        value={input["email"]}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              input: { ...input, email: value },
            };
            const result = onChange(modelFields);
            value = result?.input?.email ?? value;
          }
          if (errors["input.email"]?.hasError) {
            runValidationTasks("input.email", value);
          }
          setInput({ ...input, email: value });
        }}
        onBlur={() => runValidationTasks("input.email", input["email"])}
        errorMessage={errors["input.email"]?.errorMessage}
        hasError={errors["input.email"]?.hasError}
        {...getOverrideProps(overrides, "input.email")}
      ></TextField>
      <TextField
        label="Image"
        value={input["image"]}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              input: { ...input, image: value },
            };
            const result = onChange(modelFields);
            value = result?.input?.image ?? value;
          }
          if (errors["input.image"]?.hasError) {
            runValidationTasks("input.image", value);
          }
          setInput({ ...input, image: value });
        }}
        onBlur={() => runValidationTasks("input.image", input["image"])}
        errorMessage={errors["input.image"]?.errorMessage}
        hasError={errors["input.image"]?.hasError}
        {...getOverrideProps(overrides, "input.image")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
