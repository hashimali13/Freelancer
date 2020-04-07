import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

function DeletePost(props) {
  // //some things here

  // const handleNo = () => {
  //   //close the dialog box?
  // }

  // const handleYes = (props) => {
  //   //call useEffect
  //   useEffect(() => {
  //     axios
  //     .post("http://localhost:3001/deletepost", {
  //       jobid:
  //     })
  //     .then(res => {
  //       console.log(res.status);
  //       props.history.push({
  //         pathname: `/myposts/${uid}`,
  //         state:{
  //           user: props.location.state.user,
  //           jobid: props.location.state.jobid,
  //           uid: props.location.state.uid
  //         }
  //       })
  //     }) .catch(error => {
  //       console.log("error 12345678")
  //     })
  //   })
  // }

  return (
    <Dialog
      header="Delete Post?"
      body="Deleting this post is permanent and cannot be reversed"
    >
      <DialogActions>
        <Button
        //  onClick={handleNo} color="primary"
        >
          Cancel
        </Button>
        <Button
        //  onClick={handleYes} color="primary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeletePost;
