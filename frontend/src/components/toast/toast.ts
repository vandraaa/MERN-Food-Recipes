import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export const showSuccessToast = (message: string) => {
  Toast.fire({
    icon: 'success',
    title: message,
  });
};

export const showErrorToast = (message: string) => {
  Toast.fire({
    icon: 'error',
    title: message,
  });
};

export const showInfoToast = (message: string) => {
  Toast.fire({
    icon: 'info',
    title: message,
  });
};

export const showWarningToast = (message: string) => {
  Toast.fire({
    icon: 'warning',
    title: message,
  });
};
