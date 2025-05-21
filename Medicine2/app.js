let contract;
let web3;

const contractAddress = "0x23dcE0EcF6a87462Dbc2887093966b8827bCA756";
const abi =[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "doctor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "DiagnosisAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "doctor",
				"type": "address"
			}
		],
		"name": "DoctorAuthorized",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "doctor",
				"type": "address"
			}
		],
		"name": "DoctorRevoked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "doctor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "LabTestAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "PatientHealthUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "PatientInfoUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symptoms",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "diagnosis",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "prescriptions",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "notes",
				"type": "string"
			}
		],
		"name": "addDiagnosis",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "testType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "result",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "notes",
				"type": "string"
			}
		],
		"name": "addLabTest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "doctor",
				"type": "address"
			}
		],
		"name": "authorizeDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "authorizedDoctors",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDiagnoses",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "symptoms",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "diagnosis",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "prescriptions",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "notes",
						"type": "string"
					}
				],
				"internalType": "struct MedicalRecord.Diagnosis[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLabTests",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "testType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "result",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "notes",
						"type": "string"
					}
				],
				"internalType": "struct MedicalRecord.LabTest[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPatientHealthData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPatientInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "doctor",
				"type": "address"
			}
		],
		"name": "revokeDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_height",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_weight",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_medicalHistory",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_extraNotes",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_bloodType",
				"type": "string"
			}
		],
		"name": "setPatientHealthData",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_birthDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_nationalID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_phone",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_addressDetail",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_emergencyContact",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_emergencyRelation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_occupation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_education",
				"type": "string"
			}
		],
		"name": "setPatientInfo",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            contract = new web3.eth.Contract(abi, contractAddress);
        } catch (err) {
            alert("請連接錢包才能繼續使用");
            console.error("錢包連線失敗", err);
        }
    } else {
        alert("請安裝 MetaMask");
    }
});

const translations = {
    zh: {
        title: "醫療病歷紀錄系統",
        patient: "病患",
        doctor: "醫生",
        basic_info: "基礎資料",
        health_info: "健康資料",
        add_diagnosis: "新增診斷",
        add_lab: "新增檢驗",
        preview: "預覽",
        upload: "上鏈",
        history_label: "病例歷史",
        query: "查詢",
        p_name: "姓名",
        p_gender: "性別",
        p_birthDate: "出生日期",
        p_nationalID: "身分證字號",
        p_phone: "電話",
        p_address: "地址",
        p_education: "教育程度",
        p_occupation: "職業",
        p_emergency: "緊急聯絡人",
        p_emergencyRelation: "關係",
        p_height: "身高(cm)",
        p_weight: "體重(kg)",
        p_bloodType: "血型",
        p_history: "病史",
        p_notes: "備註",
        d_patient: "病患地址",
        d_date: "日期",
        d_symptoms: "症狀",
        d_diagnosis: "診斷",
        d_prescriptions: "處方",
        d_notes: "備註",
        l_testType: "檢驗類型",
        l_result: "結果",
        l_date: "日期",
        l_notes: "備註",
        history_address: "病患地址"
    },
    en: {
        title: "Medical Record System",
        patient: "Patient",
        doctor: "Doctor",
        basic_info: "Basic Information",
        health_info: "Health Data",
        add_diagnosis: "Add Diagnosis",
        add_lab: "Add Lab Test",
        preview: "Preview",
        upload: "Upload",
        history_label: "Medical History",
        query: "Query",
        p_name: "Name",
        p_gender: "Sex",
        p_birthDate: "Date of Birth",
        p_nationalID: "National ID",
        p_phone: "Phone",
        p_address: "Address",
        p_education: "Education",
        p_occupation: "Occupation",
        p_emergency: "Emergency Contact",
        p_emergencyRelation: "Relation",
        p_height: "Height (cm)",
        p_weight: "Weight (kg)",
        p_bloodType: "Blood Type",
        p_history: "Medical History",
        p_notes: "Notes",
        d_patient: "Patient Address",
        d_date: "Date",
        d_symptoms: "Symptoms",
        d_diagnosis: "Diagnosis",
        d_prescriptions: "Prescriptions",
        d_notes: "Notes",
        l_testType: "Test Type",
        l_result: "Result",
        l_date: "Date",
        l_notes: "Notes",
        history_address: "Patient Address"
    }
};

function setLanguage(lang) {
    const dict = translations[lang];
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) el.innerText = dict[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (dict[key]) el.setAttribute("placeholder", dict[key]);
    });
    localStorage.setItem("lang", lang);
}

function showSection(role) {
    document.getElementById("patient-section").classList.add("hidden");
    document.getElementById("doctor-section").classList.add("hidden");
    if (role === 'patient') {
        document.getElementById("patient-section").classList.remove("hidden");
    } else {
        document.getElementById("doctor-section").classList.remove("hidden");
    }
}

function getValue(id) {
    return document.getElementById(id).value.trim();
}

function previewPatient() {
    const preview = `
【基礎資料】
姓名：${getValue("p_name")}
出生日期：${getValue("p_birthDate")}
身分證字號：${getValue("p_nationalID")}
電話：${getValue("p_phone")}
地址：${getValue("p_addressDetail")}
緊急聯絡人：${getValue("p_emergencyContact")}（${getValue("p_emergencyRelation")}）
性別：${getValue("p_gender")}

【健康資料】
身高：${getValue("p_height")} cm
體重：${getValue("p_weight")} kg
血型：${getValue("p_bloodType")}
職業：${getValue("p_occupation")}
教育程度：${getValue("p_education")}
病史：${getValue("p_medicalHistory")}
備註：${getValue("p_extraNotes")}
    `.trim();
    document.getElementById("previewPatientData").textContent = preview;
}

function previewDoctor() {
    const preview = `
【診斷紀錄】
病患地址：${getValue("d_patient")}
日期：${getValue("d_date")}
症狀：${getValue("d_symptoms")}
診斷結果：${getValue("d_diagnosis")}
處方內容：${getValue("d_prescriptions")}
備註：${getValue("d_notes")}

【檢驗紀錄】
檢驗類型：${getValue("l_testType")}
結果：${getValue("l_result")}
日期：${getValue("l_date")}
備註：${getValue("l_notes")}
    `.trim();
    document.getElementById("previewDoctorData").textContent = preview;
}

async function uploadPatient() {
    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];

    try {
        await contract.methods.setPatientInfo(
            getValue("p_name"),
            getValue("p_birthDate"),
            getValue("p_nationalID"),
            getValue("p_phone"),
            getValue("p_addressDetail"),
            getValue("p_emergencyContact"),
            getValue("p_emergencyRelation"),
            getValue("p_gender"),
            getValue("p_occupation"),
            getValue("p_education")
        ).send({ from, value: web3.utils.toWei("0.001", "ether") });

        await contract.methods.setPatientHealthData(
            parseInt(getValue("p_height")),
            parseInt(getValue("p_weight")),
            getValue("p_medicalHistory"),
            getValue("p_extraNotes"),
            getValue("p_bloodType")
        ).send({ from, value: web3.utils.toWei("0.001", "ether") });

        alert("病患資料已成功上鏈！");
    } catch (error) {
        console.error("病患資料上鏈失敗", error);
        alert("❌ 發生錯誤，請確認錢包是否連線、資料格式是否正確、以及是否有足夠 ETH");
    }
}

async function uploadDoctor() {
    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];

    try {
        await contract.methods.addDiagnosis(
            getValue("d_patient"),
            getValue("d_date"),
            getValue("d_symptoms"),
            getValue("d_diagnosis"),
            getValue("d_prescriptions"),
            getValue("d_notes")
        ).send({ from });

        await contract.methods.addLabTest(
            getValue("d_patient"),
            getValue("l_testType"),
            getValue("l_result"),
            getValue("l_date"),
            getValue("l_notes")
        ).send({ from });

        alert("診斷與檢驗資料已成功上鏈！");
    } catch (error) {
        console.error("醫生資料上鏈失敗", error);
        alert("❌ 發生錯誤，請確認你是否為授權醫生，以及資料是否填寫完整");
    }
}

async function authorizeDoctor(doctorAddress) {
    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];

    try {
        await contract.methods.authorizeDoctor(doctorAddress).send({ from });
        alert(`✅ 已成功授權醫生: ${doctorAddress}`);
    } catch (error) {
        console.error("授權失敗", error);
        alert("❌ 醫生授權失敗，請檢查你是否為合約擁有者");
    }
}

function previewDoctor() {
    const preview = `
【診斷紀錄】
病患地址：${getValue("d_patient")}
日期：${getValue("d_date")}
症狀：${getValue("d_symptoms")}
診斷結果：${getValue("d_diagnosis")}
處方內容：${getValue("d_prescriptions")}
備註：${getValue("d_notes")}

【檢驗紀錄】
檢驗類型：${getValue("l_testType")}
結果：${getValue("l_result")}
日期：${getValue("l_date")}
備註：${getValue("l_notes")}
    `.trim();
    document.getElementById("previewDoctorData").textContent = preview;
}

async function queryHistory() {
    const patientAddress = getValue("history_patient_address");
    if (!web3.utils.isAddress(patientAddress)) {
        alert("❌ 無效的地址格式");
        return;
    }

    try {
        const diagnoses = await contract.methods.getDiagnoses().call({ from: patientAddress });
        const labTests = await contract.methods.getLabTests().call({ from: patientAddress });

        let result = `📄 病患地址：${patientAddress}\n`;

        result += `\n🔍 診斷紀錄:\n`;
        if (diagnoses.length === 0) {
            result += "（無診斷紀錄）\n";
        } else {
            diagnoses.forEach((d, i) => {
                result += `
【第 ${i + 1} 筆】
日期：${d.date}
症狀：${d.symptoms}
診斷結果：${d.diagnosis}
處方內容：${d.prescriptions}
備註：${d.notes}
----------------------\n`;
            });
        }

        result += `\n🧪 檢驗紀錄:\n`;
        if (labTests.length === 0) {
            result += "（無檢驗紀錄）\n";
        } else {
            labTests.forEach((t, i) => {
                result += `
【第 ${i + 1} 筆】
檢驗類型：${t.testType}
結果：${t.result}
日期：${t.date}
備註：${t.notes}
----------------------\n`;
            });
        }

        document.getElementById("historyResult").textContent = result;

    } catch (error) {
        console.error("查詢歷史紀錄失敗", error);
        alert("❌ 查詢失敗，請確認地址是否正確");
    }
}
