import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

//Completar la pregunta, no hay necesidad de poner el signo de interrogación al final.

const QuestionAlert = ({title}) => {
  return MySwal.fire({
    title: {title},
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  });
};

export default QuestionAlert;
