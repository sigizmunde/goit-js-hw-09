const refs = {};

window.addEventListener('DOMContentLoaded', onLoadedContent);

function onLoadedContent() {
  refs.form = document.querySelector('.feedback-form');
  refs.form.addEventListener('input', e => storeTempData(e.currentTarget));
  refs.form.addEventListener('submit', clearTempData);
  restoreTempData(refs.form);
}

function storeTempData(form) {
  const tempData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  try {
    const tempDataJSON = JSON.stringify(tempData);
    window.localStorage.setItem('feedback-form-state', tempDataJSON);
  } catch (error) {
    console.log(error);
  }
}

function restoreTempData(form) {
  const tempData = JSON.parse(window.localStorage.getItem('feedback-form-state'));
  if (!tempData) return;
  form.elements.email.value = tempData.email;
  form.elements.message.value = tempData.message;
}

function clearTempData() {
  window.localStorage.removeItem('feedback-form-state');
}
