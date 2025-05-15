const contractAddress = "0x8F74fe4FA003f8A9882ed726033e6cB1DFBfa293"; // 更新為你的
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
				"name": "_occupation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_education",
				"type": "string"
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

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractABI, signer);

// 獲取表單資料 function
function collectFormData() {
  return {
    name: document.getElementById("name").value,
    birthDate: document.getElementById("birthDate").value,
    nationalID: document.getElementById("id").value,
    phone: document.getElementById("phone").value,
    addressDetail: document.getElementById("address").value,
    emergencyContact: document.getElementById("emergencyContact").value,
    relation: document.getElementById("relation").value,
    gender: document.getElementById("gender").value,
    height: parseInt(document.getElementById("height").value),
    weight: parseInt(document.getElementById("weight").value),
    occupation: document.getElementById("job").value,
    education: document.getElementById("education").value,
    history: document.getElementById("history").value,
    extra: document.getElementById("extra").value,
    bloodType: document.getElementById("bloodType").value,
  };
}

// 建立預覽表格
document.getElementById("previewBtn").addEventListener("click", () => {
  const data = collectFormData();
  const previewTable = document.getElementById("previewTable");
  previewTable.innerHTML = `
    <tr><th colspan="2">基本資料</th></tr>
    <tr><td>姓名</td><td>${data.name}</td></tr>
    <tr><td>出生日期</td><td>${data.birthDate}</td></tr>
    <tr><td>身分證字號</td><td>${data.nationalID}</td></tr>
    <tr><td>電話</td><td>${data.phone}</td></tr>
    <tr><td>地址</td><td>${data.addressDetail}</td></tr>
    <tr><td>緊急聯絡人</td><td>${data.emergencyContact}</td></tr>
    <tr><td>關係</td><td>${data.relation}</td></tr>
    <tr><td>性別</td><td>${data.gender}</td></tr>

    <tr><th colspan="2">健康資料</th></tr>
    <tr><td>身高</td><td>${data.height} cm</td></tr>
    <tr><td>體重</td><td>${data.weight} kg</td></tr>
    <tr><td>職業</td><td>${data.occupation}</td></tr>
    <tr><td>教育程度</td><td>${data.education}</td></tr>
    <tr><td>病史</td><td>${data.history}</td></tr>
    <tr><td>額外資訊</td><td>${data.extra}</td></tr>
    <tr><td>血型</td><td>${data.bloodType}</td></tr>
  `;
  document.getElementById("previewSection").style.display = "block";
});

document.getElementById("previewBtn").addEventListener("click", function () {
  const fields = [
    { id: "name", label: "姓名" },
    { id: "birthDate", label: "出生日期" },
    { id: "id", label: "身分證字號" },
    { id: "phone", label: "電話" },
    { id: "address", label: "地址" },
    { id: "emergencyContact", label: "緊急聯絡人" },
    { id: "relation", label: "關係" },
    { id: "gender", label: "性別" },

    { id: "height", label: "身高" },
    { id: "weight", label: "體重" },
    { id: "job", label: "職業" },
    { id: "education", label: "教育程度" },
    { id: "history", label: "過去病史" },
    { id: "extra", label: "額外資訊" },
    { id: "bloodType", label: "血型" }
  ];

  let tableHTML = "";
  let allFilled = true;

  fields.forEach(field => {
    const value = document.getElementById(field.id).value.trim();
    if (value === "") {
      allFilled = false;
    }
    tableHTML += `<tr><th>${field.label}</th><td>${value || "（未填寫）"}</td></tr>`;
  });

  document.getElementById("previewTable").innerHTML = tableHTML;
  document.getElementById("previewSection").style.display = "block";

  if (!allFilled) {
    alert("⚠️ 有些欄位尚未填寫，請確認！");
  }
});

// 上鏈提交表單
document.getElementById("recordForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const d = collectFormData();

  try {
    await contract.setPatientInfo(
      d.name, d.birthDate, d.nationalID, d.phone, d.addressDetail,
      d.emergencyContact, d.relation, d.gender,
      { value: ethers.utils.parseEther("0.001") }
    );

    await contract.setPatientHealthData(
      d.height, d.weight, d.occupation, d.education,
      d.history, d.extra, d.bloodType,
      { value: ethers.utils.parseEther("0.001") }
    );

    alert("上鏈成功！");
  } catch (err) {
    console.error(err);
    alert("寫入失敗：" + (err.message || "請檢查 console"));
  }
});
