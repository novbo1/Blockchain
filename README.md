# Blockchain Medical Records System

A decentralized application (DApp) built on Ethereum to securely manage and store patient medical records, including personal information, health data, diagnosis history, and lab test results. Doctors can be authorized to add medical records, while patients retain control over their own data.

---

## Features

- Store and update **patient basic information**
- Record **health data** such as height, weight, blood type, and medical history
- Add and view **diagnosis history**
- Add and view **lab test results**
- **Doctor authorization system** managed by the contract owner
- Ether-based payment system for data submission
- Frontend integration with **Web3.js**

---

## Tech Stack

- **Solidity** (`^0.8.17`) – Smart contract language
- **Ethereum / Hardhat** – Blockchain environment
- **Web3.js** – Frontend-to-blockchain communication
- **HTML/CSS/JavaScript** – UI for interacting with the smart contract

---

## Project Structure

```bash
├── contracts/
│   └── MedicalRecord.sol       # Smart contract
├── frontend/
│   ├── index.html              # Main web interface
│   ├── app.js                  # Web3 integration logic
│   └── style.css               # Styles
├── test/                       # (Optional) Hardhat/JS test scripts
├── README.md
└── hardhat.config.js           # (If using Hardhat)
⚙️ Getting Started
Prerequisites
Node.js v16+

MetaMask wallet extension

Hardhat for local development

1. Clone the repo
  bash
  複製
  編輯
  git clone https://github.com/yourusername/blockchain-medical-records.git
  cd blockchain-medical-records
2. Install dependencies (if using Hardhat)
  bash
  複製
  編輯
  npm install
3. Compile the contract
  bash
  複製
  編輯
  npx hardhat compile
4. Deploy the contract
  bash
  複製
  編輯
  npx hardhat run scripts/deploy.js --network localhost
5. Launch frontend
Open frontend/index.html in a browser. Ensure MetaMask is connected to the same network.


Security & Access Control
Only authorized doctors can write diagnosis/lab records

Only owner can manage doctor access

Data is associated with patient Ethereum addresses

License
This project is licensed under the MIT License.

Contributions
Pull requests are welcome! For major changes, open an issue first to discuss what you'd like to change.
