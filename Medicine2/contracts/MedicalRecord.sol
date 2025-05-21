// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MedicalRecord {
    struct PatientInfo {
        string name;
        string birthDate;
        string nationalID;
        string phone;
        string addressDetail;
        string emergencyContact;
        string emergencyRelation;
        string gender;
        string occupation;
        string education;
    }

    struct PatientHealthData {
        uint height;
        uint weight;
        string bloodType;
        string medicalHistory;
        string extraNotes;
    }

    struct Diagnosis {
        string date;
        string symptoms;
        string diagnosis;
        string prescriptions;
        string notes;
    }

    struct LabTest {
        string testType;
        string result;
        string date;
        string notes;
    }

    address payable public owner;

    mapping(address => PatientInfo) private patientInfos;
    mapping(address => PatientHealthData) private patientHealths;
    mapping(address => Diagnosis[]) private patientDiagnoses;
    mapping(address => LabTest[]) private patientLabTests;

    mapping(address => bool) public authorizedDoctors;

    event PatientInfoUpdated(address indexed patient, uint timestamp);
    event PatientHealthUpdated(address indexed patient, uint timestamp);
    event DiagnosisAdded(address indexed patient, address indexed doctor, uint timestamp);
    event LabTestAdded(address indexed patient, address indexed doctor, uint timestamp);
    event DoctorAuthorized(address indexed doctor);
    event DoctorRevoked(address indexed doctor);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyDoctor() {
        require(authorizedDoctors[msg.sender], "Not authorized doctor");
        _;
    }

    constructor() {
        owner = payable(msg.sender);
    }

    // 病患基本資料
    function setPatientInfo(
        string memory _name,
        string memory _birthDate,
        string memory _nationalID,
        string memory _phone,
        string memory _addressDetail,
        string memory _emergencyContact,
        string memory _emergencyRelation,
        string memory _gender,
        string memory _occupation,
        string memory _education
    ) public payable {
        require(msg.value >= 0.001 ether, "Minimum fee required");
        patientInfos[msg.sender] = PatientInfo(
            _name,
            _birthDate,
            _nationalID,
            _phone,
            _addressDetail,
            _emergencyContact,
            _emergencyRelation,
            _gender,
            _occupation,
            _education
        );
        emit PatientInfoUpdated(msg.sender, block.timestamp);
    }

    function getPatientInfo() public view returns (
        string memory, string memory, string memory,
        string memory, string memory, string memory,
        string memory, string memory, string memory, string memory
    ) {
        PatientInfo memory info = patientInfos[msg.sender];
        return (
            info.name,
            info.birthDate,
            info.nationalID,
            info.phone,
            info.addressDetail,
            info.emergencyContact,
            info.emergencyRelation,
            info.gender,
            info.occupation,
            info.education
        );
    }

    // 健康資料
    function setPatientHealthData(
        uint _height,
        uint _weight,
        string memory _medicalHistory,
        string memory _extraNotes,
        string memory _bloodType
    ) public payable {
        require(msg.value >= 0.001 ether, "Minimum fee required");
        patientHealths[msg.sender] = PatientHealthData(
            _height,
            _weight,
            _bloodType,
            _medicalHistory,
            _extraNotes
        );
        emit PatientHealthUpdated(msg.sender, block.timestamp);
    }

    function getPatientHealthData() public view returns (
        uint, uint, string memory,
        string memory, string memory
    ) {
        PatientHealthData memory data = patientHealths[msg.sender];
        return (
            data.height,
            data.weight,
            data.bloodType,
            data.medicalHistory,
            data.extraNotes
        );
    }

    // 醫生操作：新增診斷紀錄
    function addDiagnosis(
        address patient,
        string memory date,
        string memory symptoms,
        string memory diagnosis,
        string memory prescriptions,
        string memory notes
    ) public onlyDoctor {
        patientDiagnoses[patient].push(Diagnosis(
            date,
            symptoms,
            diagnosis,
            prescriptions,
            notes
        ));
        emit DiagnosisAdded(patient, msg.sender, block.timestamp);
    }

    function getDiagnoses() public view returns (Diagnosis[] memory) {
        return patientDiagnoses[msg.sender];
    }

    // 醫生操作：新增檢驗紀錄
    function addLabTest(
        address patient,
        string memory testType,
        string memory result,
        string memory date,
        string memory notes
    ) public onlyDoctor {
        patientLabTests[patient].push(LabTest(
            testType,
            result,
            date,
            notes
        ));
        emit LabTestAdded(patient, msg.sender, block.timestamp);
    }

    function getLabTests() public view returns (LabTest[] memory) {
        return patientLabTests[msg.sender];
    }

    // 管理醫生權限
    function authorizeDoctor(address doctor) public onlyOwner {
        authorizedDoctors[doctor] = true;
        emit DoctorAuthorized(doctor);
    }

    function revokeDoctor(address doctor) public onlyOwner {
        authorizedDoctors[doctor] = false;
        emit DoctorRevoked(doctor);
    }

    // 提款
    function withdraw() public onlyOwner {
        owner.transfer(address(this).balance);
    }
}
