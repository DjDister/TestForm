import { DishFormData } from "../components/DishesForm/DishesForm";
export const validate = (values: DishFormData) => {
  const errors = {} as DishFormData;

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 5) {
    errors.name = "Must be 5 characters or more";
  }

  if (!values.preparation_time) {
    errors.preparation_time = "Required";
  }

  if (!values.type) {
    errors.type = "Required";
  }

  if (!values.no_of_slices) {
    errors.no_of_slices = "Required";
  }

  if (!values.diameter) {
    errors.diameter = "Required";
  }

  if (!values.spiciness_scale) {
    errors.spiciness_scale = "Required";
  }

  if (!values.slices_of_bread || values.slices_of_bread === "") {
    errors.slices_of_bread = "Required";
  }

  if (values.spiciness_scale !== undefined) {
    const spicinessScale = parseInt(values.spiciness_scale);
    if (
      isNaN(spicinessScale) ||
      spicinessScale < 1 ||
      spicinessScale > 10 ||
      spicinessScale % 1 !== 0
    ) {
      errors.spiciness_scale = "Must be number between 1 and 10";
    }
  }

  if (values.slices_of_bread !== undefined) {
    const slicesOfBread = parseInt(values.slices_of_bread);
    if (isNaN(slicesOfBread) || slicesOfBread < 1) {
      errors.slices_of_bread =
        "Number of slices of bread required must be a positive integer";
    }
  }

  if (
    values.diameter !== undefined &&
    (isNaN(parseFloat(values.diameter)) || parseFloat(values.diameter) <= 0)
  ) {
    errors.diameter = "Diameter must be a positive number";
  }

  if (
    values.no_of_slices !== undefined &&
    (isNaN(parseFloat(values.no_of_slices)) ||
      parseFloat(values.no_of_slices) < 0)
  ) {
    errors.no_of_slices = "Number of slices must be a positive integer";
  }

  return errors;
};
