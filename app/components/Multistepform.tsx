"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";

interface FormData {
  // Form 1
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date | undefined;

  // Form 2
  email: string;
  phone: string;

  // Form 3
  feedback: string;
  acceptTerms: boolean;
}

const Multistepform = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: undefined,
    email: "",
    phone: "",
    feedback: "",
    acceptTerms: false,
  });

  const totalSteps = 3;

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Complete Form Data:", formData);
    alert("Form submitted! Check the console for the complete data.");
  };

  const renderCurrentForm = () => {
    switch (currentStep) {
      case 1:
        return <Form1 formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Form2 formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Form3 formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-2xl mx-auto my-10">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Current Form */}
      {renderCurrentForm()}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-5">
        {currentStep > 1 ? (
          <Button variant="outline" onClick={prevStep}>
            Previous
          </Button>
        ) : (
          <Link href="/">
            <Button variant="outline">Cancel</Button>
          </Link>
        )}
        {currentStep < totalSteps ? (
          <Button onClick={nextStep}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </div>
  );
};

export default Multistepform;
