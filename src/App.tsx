import { useState } from "react";
import "./App.css";
import { DishesFormConnected } from "./components/DishesForm/DishesForm";

function App() {
  const [errors, setErrors] = useState();
  const [success, setSuccess] = useState(false);
  const onSubmit = async (values: any) => {
    setSuccess(false);
    try {
      const response = await fetch(
        "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.errors) {
        setErrors(data.errors);
        return;
      }
      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="app">
      <DishesFormConnected onSubmit={onSubmit} errors={errors} />
      {success && <div style={{ color: "green" }}>Success</div>}
    </div>
  );
}

export default App;
