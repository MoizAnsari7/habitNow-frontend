import React, { useState } from "react";
import EvaluateProgressPage from "./EvaluateProgressPage";
import CategorySelectionPage from "./CategorySelectionPage";
import DefineTaskPage from "./DefineTaskPage";
import HowOftenPage from "./HowOftenPage";
import WhenToDoItPage from "./WhenToDoItPage";
import MyTaskPage from "../MyTaskPage";

function RecurringTaskPage() {
  const [step, setStep] = useState(0); // State to track the current step


  const [component1Value, setComponent1Value] = useState(null);
  const [component2Value, setComponent2Value] = useState(null);
  const [component3Value, setComponent3Value] = useState(null);
  const [component4Value, setComponent4Value] = useState(null);
  const [component5Value, setComponent5Value] = useState(null);
  const [component6Value, setComponent6Value] = useState(null);

  
  const finalArray = [component1Value, component2Value, component3Value, component4Value, component5Value];



  // Function to navigate between steps
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const previousStep = () => setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0));
  
  return (
    <div>
      {step === 0 && <CategorySelectionPage onNext={nextStep} setValue={setComponent1Value} onPrevious={previousStep} />}
      {step === 1 && <EvaluateProgressPage onNext={nextStep} setValue={setComponent2Value} onPrevious={previousStep} />}
      {step === 2 && <DefineTaskPage onNext={nextStep} setValue={setComponent3Value} onPrevious={previousStep} />}
      {step === 3 && <HowOftenPage onNext={nextStep} setValue={setComponent4Value} onPrevious={previousStep} />}
      {step === 4 && <WhenToDoItPage onNext={nextStep} setValue={setComponent5Value} onPrevious={previousStep} />} 
      {step === 5 && <MyTaskPage finalArray={finalArray}  setValue={(value) =>{console.log("Set value called with:", value), setComponent6Value(value)}} />}      </div>
  );
}

export default RecurringTaskPage;
