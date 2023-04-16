/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, HeadingProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PetInputValues = {
    input?: {
        name?: string;
        petType?: string;
        description?: string;
        city?: string;
        state?: string;
        email?: string;
        image?: string;
    };
};
export declare type PetValidationValues = {
    input?: {
        name?: ValidationFunction<string>;
        petType?: ValidationFunction<string>;
        description?: ValidationFunction<string>;
        city?: ValidationFunction<string>;
        state?: ValidationFunction<string>;
        email?: ValidationFunction<string>;
        image?: ValidationFunction<string>;
    };
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PetOverridesProps = {
    PetGrid?: PrimitiveOverrideProps<GridProps>;
    input?: PrimitiveOverrideProps<HeadingProps>;
    "input.name"?: PrimitiveOverrideProps<TextFieldProps>;
    "input.petType"?: PrimitiveOverrideProps<TextFieldProps>;
    "input.description"?: PrimitiveOverrideProps<TextAreaFieldProps>;
    "input.city"?: PrimitiveOverrideProps<TextFieldProps>;
    "input.state"?: PrimitiveOverrideProps<SelectFieldProps>;
    "input.email"?: PrimitiveOverrideProps<TextFieldProps>;
    "input.image"?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PetProps = React.PropsWithChildren<{
    overrides?: PetOverridesProps | undefined | null;
} & {
    onSubmit: (fields: PetInputValues) => void;
    onChange?: (fields: PetInputValues) => PetInputValues;
    onValidate?: PetValidationValues;
} & React.CSSProperties>;
export default function Pet(props: PetProps): React.ReactElement;
