import React, { useState } from "react";
import EvaluateProgressPage from "./EvaluateProgressPage";
import CategorySelectionPage from "./CategorySelectionPage";
import DefineTaskPage from "./DefineTaskPage";
import HowOftenPage from "./HowOftenPage";
import WhenToDoItPage from "./WhenToDoItPage";

function RecurringTaskPage() {
  const [step, setStep] = useState(0); // State to track the current step

  // Function to navigate between steps
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const previousStep = () => setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0));
  
  return (
    <div>
      {step === 0 && <CategorySelectionPage onNext={nextStep} onPrevious={previousStep} />}
      {step === 1 && <EvaluateProgressPage onNext={nextStep} onPrevious={previousStep} />}
      {step === 2 && <DefineTaskPage onNext={nextStep} onPrevious={previousStep} />}
      {step === 3 && <HowOftenPage onNext={nextStep} onPrevious={previousStep} />}
      {step === 4 && <WhenToDoItPage onNext={nextStep} onPrevious={previousStep} />}  
    </div>
  );
}

export default RecurringTaskPage;
