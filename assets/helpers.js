document.getElementById("session-reset").addEventListener("click", reset);
function reset(event) {
  event.preventDefault();
  window.location.reload(false);
  document.getElementById("session-data").textContent = "";
  hide(document.getElementById("validate-code"));
  sessionStorage.removeItem("name");
  sessionStorage.removeItem("identity");
  sessionStorage.removeItem("factorSid");
}

function hide(element) {
  element.style.display = "none";
}

function hideExplainers() {
  Array.from(document.getElementsByClassName("explainer")).forEach(
    (explainer) => {
      hide(explainer);
    }
  );
}

function showExplainer(name) {
  hideExplainers();
  document.getElementById(name).style.display = "block";
}

function clearStatus() {
  hideExplainers();
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
