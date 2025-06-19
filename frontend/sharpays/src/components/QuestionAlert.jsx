import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

//Completar la pregunta, no hay necesidad de poner el signo de interrogación al final.

const QuestionAlert = (title) => {
  return MySwal.fire({
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
