import React from "react";
import { useParams, useHistory } from "react-router-dom";

function JobPostingProject(props) {
  let { JPId } = useParams();
  const history = useHistory();

  function goBackHandle() {
    history.goBack();
  }

  return (
    <div>
      <h1>
          Hello
          {JPId}
        </h1>
      <p>This is where the content will go</p>
      <button onClick={goBackHandle}>Go Back</button>
    </div>
  );
}

export default JobPostingProject;
