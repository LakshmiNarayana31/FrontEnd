import { Button } from "antd";
import { useEffect, useState } from "react";

const Learning = () => {
  const [apiResponse, setApiResponse] = useState<string>("Loading...");

  useEffect(() => {
    const controller = new AbortController();

    const callApi = async () => {
      try {
        const bodyExample = {
          CollegeName: "lakshmi",
          CollegePhno: "1234",
          IsActive: false,
        };
        const response = await fetch(
          "http://localhost:5095/api/users/testapi/28/age/lakshmi/name?pageNumber=10&NumOfrecords=100;",
          {
            signal: controller.signal,
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyExample),
          },
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.text();
        setApiResponse(payload);
      } catch (error) {
        if (!controller.signal.aborted) {
          setApiResponse(
            error instanceof Error ? error.message : "Failed to call API",
          );
        }
      }
    };

    void callApi();

    return () => controller.abort();
  }, []);

  return (
    <div>
      <Button>Learning</Button>
      <pre>{apiResponse}</pre>
    </div>
  );
};

export default Learning;
