import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <>
      <Step />
      {/* <Step /> */}
    </>
  );
}

function Step() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handlePrevious = () => {
    if (step > 1) {
      setStep((currVal) => currVal - 1);
      setStep((currVal) => currVal - 1);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      setStep(step + 1);
    }
  };

  return (
    <div>
      <button
        className="close"
        onClick={() => {
          setIsOpen((currVal) => !currVal);
        }}
      >
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button
              textColor="#fff"
              backgroundColor="#7950f2"
              onClickHandler={handlePrevious}
            >
              <span>👈🏼</span> Previous
            </Button>
            <Button
              textColor="#fff"
              backgroundColor="#7950f2"
              onClickHandler={handleNext}
            >
              Next <span>👉🏼</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}:</h3>
      {children}
    </div>
  );
}

function Button({ textColor, backgroundColor, onClickHandler, children }) {
  return (
    <button
      style={{ backgroundColor, color: textColor }}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}
