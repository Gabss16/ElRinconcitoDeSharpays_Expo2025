import Swal from "sweetalert2";

const QuestionAlert = (title) => {
  return Swal.fire({
        title: title,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
        customClass: {
          confirmButton: 'swal-confirm-button',
          cancelButton: 'swal-cancel-button'
        },
        buttonsStyling: false
      });
};

export default QuestionAlert;
