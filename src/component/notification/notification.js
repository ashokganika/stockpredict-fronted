import { toast } from "react-toastify";

function showSuccess(msg) {
  toast.success(msg);
}

function showError(msg) {
  toast.error(msg);
}

function showInfo(msg) {
  toast.info(msg);
}

function showWarning(msg) {
  toast.warn(msg);
}

function errorHandler(err) {
  let error = err.response || err || err.response.data || err.data;
  let msg;
  if (error && error.response && error.response.msg) {
    msg = error.response.msg;
  } else if (error.msg) {
    msg = error.msg;
  } else {
    msg = err && err.response && err.response.data.msg && err.response.data.msg;
  }
  showError(msg || "something went wrong");
}

const notifications = {
  showSuccess,
  showWarning,
  showInfo,
  errorHandler,
};

export default notifications;
