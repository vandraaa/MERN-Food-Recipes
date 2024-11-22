import Swal from "sweetalert2";

export default function showLoadingAlert(text: string) {
  Swal.fire({
    title: "Loading...",
    text,
    icon: "info",
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};
