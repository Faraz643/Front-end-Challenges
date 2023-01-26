let formStepNum = 0;
let activeStep = document.querySelectorAll(".step-number");
let formStepAll = document.querySelectorAll(".fs-gnrl");
let nextButton1 = document.getElementById("nextButtonS1");
let nextButton = document.querySelectorAll(".next-button");
let backButton = document.querySelectorAll(".previous-button");
let formStep1 = document.getElementById("formStep1");
let formStep2 = document.getElementById("formStep2");
let formStep3 = document.getElementById("formStep3");
let formStep4 = document.getElementById("formStep4");
// step 1 inputs
let inputName = document.getElementById("name");
let inputEmail = document.getElementById("email");
let inputNumber = document.getElementById("phoneNumber");
let invalidMessageName = document.querySelector('[data-invalid="name"]');
let invalidMessageMail = document.querySelector('[data-invalid="mail"]');
let invalidMessageNumber = document.querySelector('[data-invalid="number"]');
// Regular Expressions for Email, Name, and Number validation
let regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let regName = /^[a-zA-Z]+$/;
regNumber = /^\d{10}$/;
// step 2 inputs
let planOption = document.querySelectorAll("input[name='subsPlan']");
let switchPlanBtn = document.querySelector(".toggle-switch");
let switchBtn = document.querySelector(".switch-btn");
let planTerm = document.querySelectorAll(".term");
let planTermContainer = document.querySelectorAll(".term-plan");
let step2PlanTerm = document.querySelectorAll("#planSubscrptn[data-plan-term]");
// step 3 inputs
let selectedTerm = document.getElementById("selectedTerm");
let selectedPlan = document.querySelector("#selectedPlan");
let selectedPlanPrice = document.querySelector("#selectedPlanPrice");
let selectedPlanPriceTerm = document.querySelector("#selectedPriceTerm");
let selectedPriceTerm;
let progessStep = document.querySelectorAll(".step-number");
let addOnsInput = document.querySelectorAll("#addons");
let step2PlanDetail = document.querySelectorAll("#planSubscrptn");
let referenceChild = document.getElementById("testCodeId");
// to store retrieved values
let addOnsInputList = [];
let st2PlanName;
let st2PlanPrice;
let st2PlanTerm;

inputName.addEventListener("input", function () {
  invalidMessageName.style.visibility = "hidden";
});
inputEmail.addEventListener("input", function () {
  invalidMessageMail.style.visibility = "hidden";
});
inputNumber.addEventListener("input", function () {
  invalidMessageNumber.style.visibility = "hidden";
});

function formStepFirst() {
  let validTrue = true;
  //   validation for PHONE NUMBER

  if (inputNumber.value === "") {
    invalidMessageNumber.style.visibility = "visible";
    inputNumber.focus();
    validTrue = false;
  } else if (!regNumber.test(inputNumber.value)) {
    invalidMessageNumber.style.visibility = "visible";
    invalidMessageNumber.innerHTML =
      "Please enter a valid phone <br> number, exactly 10 digits.";
    inputNumber.focus();
    validTrue = false;
  }
  //   validation for EMAIL

  if (inputEmail.value === "") {
    invalidMessageMail.style.visibility = "visible";
    inputEmail.focus();
    validTrue = false;
  }
  if (!regEmail.test(inputEmail.value)) {
    invalidMessageMail.style.visibility = "visible";
    invalidMessageMail.innerText = "Enter a valid email";
    inputEmail.focus();
    validTrue = false;
  }
  //   validation for NAME
  if (inputName.value === "") {
    invalidMessageName.style.visibility = "visible";
    inputName.focus();
    validTrue = false;
  } else if (inputName.value.length === 1) {
    invalidMessageName.style.visibility = "visible";
    invalidMessageName.innerHTML = "Name length must be <br> more than 1";
    inputName.focus();
    validTrue = false;
  } else if (!regName.test(inputName.value)) {
    invalidMessageName.style.visibility = "visible";
    invalidMessageName.innerHTML =
      "Name must contain only <br> alphabets and not digits";
    inputName.focus();
    validTrue = false;
  }
  return validTrue;
}

planOption.forEach((option) => {
  option.addEventListener("click", validateInput);
});

function validateInput(option) {
  let i = 0;
  for (i; i < planOption.length; i++) {
    if (planOption[i].checked === true) {
      planOption[i].checked = false;
    }
  }
  resetAddOns();
  // check the clicked element(option)
  option.target.checked = true;

  // check which plan term ( yr/mo) is selected to change add ons option to mo/yr
  if (
    option.target.checked === true &&
    option.target.getAttribute("data-plan-term") === "yearly"
  ) {
    document
      .querySelector(".add-ons-plan-yearly")
      .classList.remove("term-plan-hidden");
    document
      .querySelector(".add-ons-plan-monthly")
      .classList.add("term-plan-hidden");
  } else {
    document
      .querySelector(".add-ons-plan-yearly")
      .classList.add("term-plan-hidden");
    document
      .querySelector(".add-ons-plan-monthly")
      .classList.remove("term-plan-hidden");
  }
}
function resetAddOns() {
  addOnsInput.forEach((e) => {
    if (e.checked === true) {
      e.checked = false;
    }
  });
}
switchPlanBtn.addEventListener("click", function (e) {
  switchBtn.classList.toggle("right");
  planTerm.forEach((e) => {
    e.classList.toggle("term-active");
  });
  planTermContainer.forEach((e) => {
    e.classList.toggle("term-plan-hidden");
  });
  let choosenTermName = document
    .querySelector(".term-active")
    .getAttribute("data-plan-name");
});

nextButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (formStepNum === 0) {
      if (formStepFirst()) {
        formStepNum++;
        updateFormSteps();
        updateProgress();
      }
    } else {
      formStepNum++;
      updateFormSteps();
      updateProgress();
      getValues();
      finalSummary();
    }
  });
});

backButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepNum--;
    updateFormSteps();
    updateProgress();
  });
});
document
  .getElementById("confirmButton")
  .addEventListener("click", formSuccessMessage);
function updateFormSteps() {
  formStepAll.forEach((formStep) => {
    !formStep.classList.contains("form-step-hidden") &&
      formStep.classList.add("form-step-hidden");
  });
  formStepAll[formStepNum].classList.remove("form-step-hidden");
}
function updateProgress() {
  progessStep.forEach((e, idx) => {
    if (idx < formStepNum + 1) {
      e.classList.add("active-step");
    } else {
      e.classList.remove("active-step");
    }
  });
}

function formSuccessMessage() {
  formStepAll.forEach((formStep) => {
    !formStep.classList.contains("form-step-hidden") &&
      formStep.classList.add("form-step-hidden");
  });
  document.getElementById("tyMsg").classList.remove("form-step-hidden");
}


function getValues() {
  step2PlanDetail.forEach((e) => {
    if (e.checked === true) {
      st2PlanName = e.getAttribute("value");
      st2PlanPrice = e.getAttribute("data-price");
      st2PlanTerm = e.getAttribute("data-plan-term");
    }
  });
}

function finalSummary() {
  if (st2PlanTerm === "yearly") {
    selectedPriceTerm = "yr";
  } else {
    selectedPriceTerm = "mo";
  }
  selectedPlan.firstChild.nodeValue = st2PlanName;
  selectedTerm.textContent = ` (${st2PlanTerm})`;
  selectedPlanPrice.textContent = st2PlanPrice;
  selectedPlanPriceTerm.textContent = selectedPriceTerm;
  getAddOns();
}

addOnsInput.forEach((e) => {
  addOnsInputList.push(e);
});
let testCode;
function getAddOns() {
  let AddOnTerm;
  let AddOnName;
  let AddOnPrice;
  testCode = addOnsInputList
    .map(function (x) {
      if (x.checked === true) {
        AddOnName = x.getAttribute("value");
        AddOnPrice = x.getAttribute("data-price");
        AddOnTerm = x.getAttribute("data-plan-term");
        return `<div class="amt-details-wrap" id="amountDetails">
        <p class="plan-details">
          <span id="selectedAddOns">${AddOnName}</span>
        </p>
        <p class="plan-amt">
          +$<span id="selectedAddOnsPrice">${AddOnPrice}</span>/<span
            id="selectedPriceTerm"
            >${AddOnTerm}</span
          >
        </p>
      </div>`;
      }
    })
    .join("");
  document.querySelectorAll("#amountDetails").forEach((e) => {
    e.remove();
  });

  referenceChild.insertAdjacentHTML("afterend", testCode);
  let totalAmount = [];

  planOption.forEach((e) => {
    e.checked === true && totalAmount.push(e.getAttribute("data-price"));
  });

  addOnsInputList.forEach(function (x) {
    x.checked === true && totalAmount.push(x.getAttribute("data-price"));
  });

  let totalAmountList = totalAmount.map(function (x) {
    return parseInt(x);
  });
  totalAmountList = totalAmountList.reduce((a, b) => {
    return a + b;
  });
  document.getElementById("totalAmount").textContent = totalAmountList;
  document.getElementById("selectedPriceTerm").textContent = AddOnTerm;
}
