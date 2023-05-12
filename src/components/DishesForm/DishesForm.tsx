import { FC, useEffect, useState, useCallback } from "react";
import { reduxForm, InjectedFormProps, Field } from "redux-form";
import Input from "../Input/Input";
import styles from "./DishesForm.module.css";
import { validate } from "../../utils/dishesFormValidate";

interface DishFormProps {
  initialValues?: {
    name: string;
    preparation_time: string;
    type: string;
    no_of_slices: string;
    diameter: string;
    spiciness_scale: string;
    slices_of_bread: string;
  };
  errors?: string;
}

export interface DishFormData {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices: string;
  diameter: string;
  spiciness_scale: string;
  slices_of_bread: string;
}

type Props = DishFormProps & InjectedFormProps<DishFormData, DishFormProps>;

const DishForm: FC<Props> = (props) => {
  const { handleSubmit } = props;

  const [selectedType, setSelectedType] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    preparation_time: "",
    type: "",
    no_of_slices: "",
    diameter: "",
    spiciness_scale: "",
    slices_of_bread: "",
  });

  useEffect(() => {
    if (props.initialValues !== undefined) {
      setFormData(props.initialValues);
      setSelectedType(props.initialValues.type);
    }
  }, [props.initialValues]);

  const handleTypeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedType(event.target.value);
      setFormData({ ...formData, type: event.target.value });
    },
    [formData]
  );

  const handleFormDataChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    },
    [formData]
  );

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <Field
        label="Dish Name"
        inputName="name"
        type={"text"}
        value={formData.name}
        onChange={handleFormDataChange}
        name="name"
        component={Input}
      />
      <Field
        label="Preparation Time"
        inputName="preparation_time"
        value={formData.name}
        onChange={handleFormDataChange}
        name="preparation_time"
        customType="time"
        step={1}
        component={Input}
      />
      <Field
        label="Dish Type"
        inputName="type"
        value={formData.type}
        customType="select"
        onChange={handleTypeChange}
        name="type"
        component={Input}
        selectOptions={
          <>
            <option />
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="sandwich">Sandwich</option>
          </>
        }
      />

      {selectedType === "pizza" && (
        <>
          <Field
            name="no_of_slices"
            inputName="no_of_slices"
            customType="number"
            disableDecimals
            label="Number of Slices"
            value={formData.no_of_slices}
            onChange={handleFormDataChange}
            component={Input}
          />
          <Field
            name="diameter"
            inputName="diameter"
            customType="number"
            label="Diameter"
            value={formData.diameter}
            onChange={handleFormDataChange}
            component={Input}
          />
        </>
      )}
      {selectedType === "soup" && (
        <>
          <Field
            name="spiciness_scale"
            inputName="spiciness_scale"
            customType="number"
            disableDecimals
            label="Spiciness Scale"
            value={formData.spiciness_scale}
            onChange={handleFormDataChange}
            component={Input}
          />
        </>
      )}
      {selectedType === "sandwich" && (
        <>
          <Field
            name="slices_of_bread"
            inputName="slices_of_bread"
            customType="number"
            label="Slices of Bread"
            disableDecimals
            value={formData.slices_of_bread}
            onChange={handleFormDataChange}
            component={Input}
          />
        </>
      )}
      {props.errors && (
        <div>
          We found some errors: Try again with correct data after some time
        </div>
      )}
      <button className={styles.submitBttn} type="submit">
        Submit
      </button>
    </form>
  );
};

export const DishesFormConnected = reduxForm<DishFormData, DishFormProps>({
  form: "dishes",
  validate,
})(DishForm);
