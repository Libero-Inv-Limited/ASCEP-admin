import { useState } from "react";
import AllAPIs from "./AllAPIs";
import NewApi from "./NewApi";

export default function ApiIntegrationSteps() {
  const [activeIntegrationStep, setActiveIntegrationStep] =
    useState<APIIntegrationOption>("API Integration");
  return (
    <div>
      {activeIntegrationStep === "API Integration" && (
        <AllAPIs setActiveIntegrationStep={setActiveIntegrationStep} />
      )}
      {activeIntegrationStep === "New API" && (
        <NewApi setActiveIntegrationStep={setActiveIntegrationStep} />
      )}
    </div>
  );
}
