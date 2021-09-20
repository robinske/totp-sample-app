document
  .getElementById("session-reset")
  .addEventListener("click", resetSession);
function resetSession(event) {
  event.preventDefault();
  sessionStorage.removeItem("name");
  sessionStorage.removeItem("identity");
  sessionStorage.removeItem("totpFactorSid");
  window.location.reload(false);
}

function clearPage() {
  clearStatus();
  hideAll("dynamic-render");
  hideAll("otp-form");
}

function hide(element) {
  element.style.display = "none";
}

function hideAll(className) {
  Array.from(document.getElementsByClassName(className)).forEach((elem) =>
    hide(elem)
  );
}

function showExplainer(name) {
  hideAll("explainer");
  document.getElementById(name).style.display = "block";
}

function clearStatus() {
  hideAll("explainer");
  document.getElementById("status").textContent = "";
}

function showStatus(message, color = "gray") {
  clearStatus();
  let status = document.getElementById("status");
  status.style.color = color;
  status.textContent = message;
}

function showError(error) {
  console.error(error);
  showStatus(error, (color = "#a94442"));
}

function resetCodeInput() {
  document.getElementById("verify-new-factor-code").value = "";
  document.getElementById("create-challenge-totp-code").value = "";
}

function showSessionData() {
  const identity = sessionStorage.getItem("identity");
  const friendlyName = sessionStorage.getItem("name");

  if (identity !== null) {
    document.getElementById(
      "session-data"
    ).textContent = `Demo is running for username '${friendlyName}' with identity '${identity}'.`;
    document.getElementById("validate-code").style.display = "inline";
  } else {
    hide(document.getElementById("validate-code"));
  }
}

showSessionData();
