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
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Pet } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function PetCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    petType: "",
    description: "",
    city: "",
    state: "",
    email: "",
    image: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [petType, setPetType] = React.useState(initialValues.petType);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [city, setCity] = React.useState(initialValues.city);
  const [state, setState] = React.useState(initialValues.state);
  const [email, setEmail] = React.useState(initialValues.email);
  const [image, setImage] = React.useState(initialValues.image);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setPetType(initialValues.petType);
    setDescription(initialValues.description);
    setCity(initialValues.city);
    setState(initialValues.state);
    setEmail(initialValues.email);
    setImage(initialValues.image);
    setErrors({});
  };
  const validations = {
    name: [{ type: "Required" }],
    petType: [{ type: "Required" }],
    description: [{ type: "Required" }],
    city: [],
    state: [{ type: "Required" }],
    email: [{ type: "Required" }],
    image: [],
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
        let modelFields = {
          name,
          petType,
          description,
          city,
          state,
          email,
          image,
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
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Pet(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "PetCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              petType,
              description,
              city,
              state,
              email,
              image,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <SelectField
        label="Pet type"
        placeholder="Please select an option"
        isDisabled={false}
        value={petType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              petType: value,
              description,
              city,
              state,
              email,
              image,
            };
            const result = onChange(modelFields);
            value = result?.petType ?? value;
          }
          if (errors.petType?.hasError) {
            runValidationTasks("petType", value);
          }
          setPetType(value);
        }}
        onBlur={() => runValidationTasks("petType", petType)}
        errorMessage={errors.petType?.errorMessage}
        hasError={errors.petType?.hasError}
        {...getOverrideProps(overrides, "petType")}
      >
        <option
          children="Dog"
          value="dog"
          {...getOverrideProps(overrides, "petTypeoption0")}
        ></option>
        <option
          children="Cat"
          value="cat"
          {...getOverrideProps(overrides, "petTypeoption1")}
        ></option>
        <option
          children="Rabbit"
          value="rabbit"
          {...getOverrideProps(overrides, "petTypeoption2")}
        ></option>
        <option
          children="Hamster"
          value="hamster"
          {...getOverrideProps(overrides, "petTypeoption3")}
        ></option>
      </SelectField>
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              petType,
              description: value,
              city,
              state,
              email,
              image,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="City"
        isRequired={false}
        isReadOnly={false}
        value={city}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              petType,
              description,
              city: value,
              state,
              email,
              image,
            };
            const result = onChange(modelFields);
            value = result?.city ?? value;
          }
          if (errors.city?.hasError) {
            runValidationTasks("city", value);
          }
          setCity(value);
        }}
        onBlur={() => runValidationTasks("city", city)}
        errorMessage={errors.city?.errorMessage}
        hasError={errors.city?.hasError}
        {...getOverrideProps(overrides, "city")}
      ></TextField>
      <SelectField
        label="State"
        placeholder="Please select an option"
        isDisabled={false}
        value={state}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              petType,
              description,
              city,
              state: value,
              email,
              image,
            };
            const result = onChange(modelFields);
            value = result?.state ?? value;
          }
          if (errors.state?.hasError) {
            runValidationTasks("state", value);
          }
          setState(value);
        }}
        onBlur={() => runValidationTasks("state", state)}
        errorMessage={errors.state?.errorMessage}
        hasError={errors.state?.hasError}
        {...getOverrideProps(overrides, "state")}
      >
        <option
          children="Al"
          value="AL"
          {...getOverrideProps(overrides, "stateoption0")}
        ></option>
        <option
          children="Ak"
          value="AK"
          {...getOverrideProps(overrides, "stateoption1")}
        ></option>
        <option
          children="Az"
          value="AZ"
          {...getOverrideProps(overrides, "stateoption2")}
        ></option>
        <option
          children="Ar"
          value="AR"
          {...getOverrideProps(overrides, "stateoption3")}
        ></option>
        <option
          children="Ca"
          value="CA"
          {...getOverrideProps(overrides, "stateoption4")}
        ></option>
        <option
          children="Co"
          value="CO"
          {...getOverrideProps(overrides, "stateoption5")}
        ></option>
        <option
          children="Ct"
          value="CT"
          {...getOverrideProps(overrides, "stateoption6")}
        ></option>
        <option
          children="De"
          value="DE"
          {...getOverrideProps(overrides, "stateoption7")}
        ></option>
        <option
          children="Dc"
          value="DC"
          {...getOverrideProps(overrides, "stateoption8")}
        ></option>
        <option
          children="Fl"
          value="FL"
          {...getOverrideProps(overrides, "stateoption9")}
        ></option>
        <option
          children="Ga"
          value="GA"
          {...getOverrideProps(overrides, "stateoption10")}
        ></option>
        <option
          children="Hi"
          value="HI"
          {...getOverrideProps(overrides, "stateoption11")}
        ></option>
        <option
          children="Id"
          value="ID"
          {...getOverrideProps(overrides, "stateoption12")}
        ></option>
        <option
          children="Il"
          value="IL"
          {...getOverrideProps(overrides, "stateoption13")}
        ></option>
        <option
          children="In"
          value="IN"
          {...getOverrideProps(overrides, "stateoption14")}
        ></option>
        <option
          children="Ia"
          value="IA"
          {...getOverrideProps(overrides, "stateoption15")}
        ></option>
        <option
          children="Ks"
          value="KS"
          {...getOverrideProps(overrides, "stateoption16")}
        ></option>
        <option
          children="Ky"
          value="KY"
          {...getOverrideProps(overrides, "stateoption17")}
        ></option>
        <option
          children="La"
          value="LA"
          {...getOverrideProps(overrides, "stateoption18")}
        ></option>
        <option
          children="Me"
          value="ME"
          {...getOverrideProps(overrides, "stateoption19")}
        ></option>
        <option
          children="Md"
          value="MD"
          {...getOverrideProps(overrides, "stateoption20")}
        ></option>
        <option
          children="Ma"
          value="MA"
          {...getOverrideProps(overrides, "stateoption21")}
        ></option>
        <option
          children="Mi"
          value="MI"
          {...getOverrideProps(overrides, "stateoption22")}
        ></option>
        <option
          children="Mn"
          value="MN"
          {...getOverrideProps(overrides, "stateoption23")}
        ></option>
        <option
          children="Ms"
          value="MS"
          {...getOverrideProps(overrides, "stateoption24")}
        ></option>
        <option
          children="Mo"
          value="MO"
          {...getOverrideProps(overrides, "stateoption25")}
        ></option>
        <option
          children="Mt"
          value="MT"
          {...getOverrideProps(overrides, "stateoption26")}
        ></option>
        <option
          children="Ne"
          value="NE"
          {...getOverrideProps(overrides, "stateoption27")}
        ></option>
        <option
          children="Nv"
          value="NV"
          {...getOverrideProps(overrides, "stateoption28")}
        ></option>
        <option
          children="Nh"
          value="NH"
          {...getOverrideProps(overrides, "stateoption29")}
        ></option>
        <option
          children="Nj"
          value="NJ"
          {...getOverrideProps(overrides, "stateoption30")}
        ></option>
        <option
          children="Nm"
          value="NM"
          {...getOverrideProps(overrides, "stateoption31")}
        ></option>
        <option
          children="Ny"
          value="NY"
          {...getOverrideProps(overrides, "stateoption32")}
        ></option>
        <option
          children="Nc"
          value="NC"
          {...getOverrideProps(overrides, "stateoption33")}
        ></option>
        <option
          children="Nd"
          value="ND"
          {...getOverrideProps(overrides, "stateoption34")}
        ></option>
        <option
          children="Oh"
          value="OH"
          {...getOverrideProps(overrides, "stateoption35")}
        ></option>
        <option
          children="Ok"
          value="OK"
          {...getOverrideProps(overrides, "stateoption36")}
        ></option>
        <option
          children="Or"
          value="OR"
          {...getOverrideProps(overrides, "stateoption37")}
        ></option>
        <option
          children="Pa"
          value="PA"
          {...getOverrideProps(overrides, "stateoption38")}
        ></option>
        <option
          children="Ri"
          value="RI"
          {...getOverrideProps(overrides, "stateoption39")}
        ></option>
        <option
          children="Sc"
          value="SC"
          {...getOverrideProps(overrides, "stateoption40")}
        ></option>
        <option
          children="Sd"
          value="SD"
          {...getOverrideProps(overrides, "stateoption41")}
        ></option>
        <option
          children="Tn"
          value="TN"
          {...getOverrideProps(overrides, "stateoption42")}
        ></option>
        <option
          children="Tx"
          value="TX"
          {...getOverrideProps(overrides, "stateoption43")}
        ></option>
        <option
          children="Ut"
          value="UT"
          {...getOverrideProps(overrides, "stateoption44")}
        ></option>
        <option
          children="Vt"
          value="VT"
          {...getOverrideProps(overrides, "stateoption45")}
        ></option>
        <option
          children="Va"
          value="VA"
          {...getOverrideProps(overrides, "stateoption46")}
        ></option>
        <option
          children="Wa"
          value="WA"
          {...getOverrideProps(overrides, "stateoption47")}
        ></option>
        <option
          children="Wv"
          value="WV"
          {...getOverrideProps(overrides, "stateoption48")}
        ></option>
        <option
          children="Wi"
          value="WI"
          {...getOverrideProps(overrides, "stateoption49")}
        ></option>
        <option
          children="Wy"
          value="WY"
          {...getOverrideProps(overrides, "stateoption50")}
        ></option>
      </SelectField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              petType,
              description,
              city,
              state,
              email: value,
              image,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              petType,
              description,
              city,
              state,
              email,
              image: value,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
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
