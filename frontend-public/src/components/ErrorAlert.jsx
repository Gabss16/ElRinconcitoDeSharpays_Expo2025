import Swal from "sweetalert2";

const ErrorAlert = (title) => {

    return Swal.fire({
    icon: "error",
    title: title,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  }); 

};

export default ErrorAlert;