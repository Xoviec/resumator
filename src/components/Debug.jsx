import React, { useState } from "react";
import { Button } from "rebass";

const Debug = ({ val, loading, error }) => {
  const [devToolsEnabled, setDevToolsEnabled] = useState(false);

  const toggleDevTools = () => setDevToolsEnabled(!devToolsEnabled);

  return (
    <div
      style={{
        overflow: "overlay",
      }}
    >
      <Button variant="outline" onClick={toggleDevTools}>
        {devToolsEnabled ? "- Close debug" : "+ Open debug"}
      </Button>
      {devToolsEnabled && (
        <code style={{ color: "hotpink", fontSize: "1.25rem" }}>
          <div>{loading ? "Is loading..." : "Done"}</div>
          <div>Error: {error}</div>
          {val ? <pre>{JSON.stringify(val, null, 2)}</pre> : "nothing here"}
        </code>
      )}
    </div>
  );
};

export default Debug;
