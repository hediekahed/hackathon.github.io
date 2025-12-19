let builds = [];
let editIndex = -1;

function getProcessor(budget) {
    switch (budget) {
        case "5000000": return "Ryzen AM4";
        case "10000000": return "Ryzen 5 7500F";
        case "15000000": return "Ryzen 7 7700X";
        case "20000000": return "Ryzen 7 7800X3D";
        default: return "Unknown";
    }
}

document.getElementById("addBtn").addEventListener("click", () => {
    const budget = document.getElementById("budget").value;
    const gpu = parseInt(document.getElementById("gpu").value);
    const ram = parseInt(document.getElementById("ram").value);
    const ssd = parseInt(document.getElementById("ssd").value);
    const psu = parseInt(document.getElementById("psu").value);

    const processor = getProcessor(budget);
    const total = parseInt(budget) + gpu + ram + ssd + psu;

    const data = { budget, processor, gpu, ram, ssd, psu, total };

    if (editIndex === -1) {
        builds.push(data);
    } else {
        builds[editIndex] = data;
        editIndex = -1;
    }

    renderTable();
});

function renderTable() {
    const tbody = document.getElementById("table-body");
    tbody.innerHTML = "";

    builds.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>Rp ${parseInt(item.budget).toLocaleString()}</td>
                <td>${item.processor}</td>
                <td>Rp ${item.gpu.toLocaleString()}</td>
                <td>Rp ${item.ram.toLocaleString()}</td>
                <td>Rp ${item.ssd.toLocaleString()}</td>
                <td>Rp ${item.psu.toLocaleString()}</td>
                <td><b>Rp ${item.total.toLocaleString()}</b></td>
                <td>
                    <button class="btn-edit" onclick="editBuild(${index})">Edit</button>
                    <button class="btn-delete" onclick="deleteBuild(${index})">Delete</button>
                    <button class="btn-pay" onclick="payNow(${index})">Cus Rakit & Bayar</button>
                </td>
            </tr>
        `;
    });
}

function editBuild(index) {
    editIndex = index;
    const item = builds[index];

    document.getElementById("budget").value = item.budget;
    document.getElementById("gpu").value = item.gpu;
    document.getElementById("ram").value = item.ram;
    document.getElementById("ssd").value = item.ssd;
    document.getElementById("psu").value = item.psu;
}

function deleteBuild(index) {
    builds.splice(index, 1);
    renderTable();
}

function payNow(index) {
    const item = builds[index];

    document.getElementById("payTotal").innerText =
        "Rp " + item.total.toLocaleString();

    const barcode = "PG-" + Math.floor(Math.random() * 999999999);
    document.getElementById("barcodeBox").innerText = barcode;

    document.getElementById("paymentModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("paymentModal").style.display = "none";
}