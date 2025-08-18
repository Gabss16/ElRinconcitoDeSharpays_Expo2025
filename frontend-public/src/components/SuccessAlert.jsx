import Swal from "sweetalert2";

const SuccessAlert = (title) => {
  return Swal.fire({
    icon: "success",
    title: title,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

export default SuccessAlert;
