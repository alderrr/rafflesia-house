import { useEffect } from "react";
import api from "./api/api";

function App() {
  useEffect(() => {
    api
      .get("/health")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  return <div>Backend connected</div>;
}

export default App;
