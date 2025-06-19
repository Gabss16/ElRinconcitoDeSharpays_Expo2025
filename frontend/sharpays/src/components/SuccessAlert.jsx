import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const SuccessAlert = ({ title }) => {
  return MySwal.fire({
    icon: "success",
    title: { title },
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

export default SuccessAlert;
