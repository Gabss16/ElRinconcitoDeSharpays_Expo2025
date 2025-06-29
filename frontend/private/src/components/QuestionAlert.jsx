import Swal from "sweetalert2";

const QuestionAlert = (title) => {
  return Swal.fire({
    title: title,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#ff5ea1",
    confirmButtonText: "Sí",
    cancelButtonColor: "#4d2636",
    cancelButtonText: "No",
  });
};

export default QuestionAlert;
