import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center w-full h-full">
      <div className="p-6 rounded-3xl m-5 w-fit">
        <div className="w-full">
          <img className="w-96 mx-auto " src="images/solutionlenslogoblack.png" alt="SolutionLens Logo" />
        </div>
        <h3 className="text-primary">404 Error - Page Not Found</h3>
        <p>This page does not exist or you do not have permission to access this page.</p>
        <div className="flex justify-center">
          <Button className="mt-4 " onClick={() => { navigate("/main") }}>Return to Dashboard</Button>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;