import Swal from 'sweetalert2';

const handleBadRequestError = (err) => {
  if (err?.response?.status !== 400) return err;

  Swal.fire({
    title: 'Check your input data',
    icon: 'warning',
    text: err?.response?.data?.message,
  });
};

const handleInternalServerError = (err) => {
  if (err?.response?.status !== 500) return err;

  Swal.fire({
    title: 'Sorry',
    icon: 'error',
    text: 'Something went wrong on our side, please try again later.',
  });
};

export {
  // handleTokenExpiredError,
  handleBadRequestError,
  handleInternalServerError,
};
