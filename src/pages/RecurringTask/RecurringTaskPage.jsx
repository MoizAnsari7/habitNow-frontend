import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import EvaluateProgressPage from "./EvaluateProgressPage";
import CategorySelectionPage from "./CategorySelectionPage";
import DefineTaskPage from "./DefineTaskPage";
import HowOftenPage from "./HowOftenPage";
import WhenToDoItPage from "./WhenToDoItPage";
import axiosInstance from "../../services/axiosInstance";

function RecurringTaskPage() {
  const [step, setStep] = useState(0); // State to track the current step

  const [component1Value, setComponent1Value] = useState(null);
  const [component2Value, setComponent2Value] = useState(null);
  const [component3Value, setComponent3Value] = useState(null);
  const [component4Value, setComponent4Value] = useState(null);
  const [component5Value, setComponent5Value] = useState(null);

  const finalArray = [
    component1Value,
    component2Value,
    component3Value,
    component4Value,
    component5Value,
  ];

  const navigate = useNavigate(); // Initialize navigate for redirection

  // Function to navigate between steps
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const previousStep = () =>
    setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0));

  const handleSave = async (savedData) => {
    try {
      const response = await axiosInstance.post(
        "/recurringTask/recurring-task",
        savedData
      );
      console.log("Saved form data:", response);

      // Success: Show alert and navigate to homepage
      alert("Task saved successfully!"); // Replace with a toast library if needed
      navigate("/"); // Redirect to homepage
    } catch (err) {
      console.error("Error saving task", err);
      alert("Failed to save the task. Please try again."); // Error feedback
    }
  };

  return (
    <div>
      {step === 0 && (
        <CategorySelectionPage
          onNext={nextStep}
          setValue={setComponent1Value}
          onPrevious={previousStep}
        />
      )}
      {step === 1 && (
        <EvaluateProgressPage
          onNext={nextStep}
          setValue={setComponent2Value}
          onPrevious={previousStep}
        />
      )}
      {step === 2 && (
        <DefineTaskPage
          onNext={nextStep}
          setValue={setComponent3Value}
          onPrevious={previousStep}
        />
      )}
      {step === 3 && (
        <HowOftenPage
          onNext={nextStep}
          setValue={setComponent4Value}
          onPrevious={previousStep}
        />
      )}
      {step === 4 && (
        <WhenToDoItPage
          onSave={handleSave}
          onNext={nextStep}
          setValue={setComponent5Value}
          onPrevious={previousStep}
        />
      )}
    </div>
  );
}

export default RecurringTaskPage;
