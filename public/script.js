let submitButton = document.getElementById("submitButton");
let resetButton = document.getElementById("resetButton");
let wrapper = document.getElementById("wrapper");


function setLoading() {
    wrapper.classList.remove("inputs");
    wrapper.classList.remove("result");
    wrapper.classList.add("loading");
}

function setInputs() {
    wrapper.classList.add("inputs");
    wrapper.classList.remove("result");
    wrapper.classList.remove("loading");
}

function setResult() {
    wrapper.classList.remove("inputs");
    wrapper.classList.remove("loading");
    wrapper.classList.add("result");
}

function fillResults(orderData) {
    document.getElementById("phone").innerHTML = orderData.userInfo.phone;
    document.getElementById("fio").innerHTML = orderData.userInfo.fio;
    document.getElementById("address").innerHTML = orderData.officeAddress;
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    setLoading();

    let api = document.getElementById("api");
    let number = document.getElementById("number");

    if (api.value.length < 140 || String(number.value.length) < 3)
    {
        setInputs();
        return;
    }

    axios.post('/get-data', {
        apiKey: api.value,
        orderNumber: number.value
    })
    .then(function (response) {
        fillResults(response.data.result.orders[0]);
        setResult();
    })
    .catch(function (error) {
        setInputs();
    });
    
});

resetButton.addEventListener('click', (e) => {
    e.preventDefault();
    setInputs();
});