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
    }

    struct PatientHealthData {
        uint height; 
        uint weight; 
        string bloodType;
        string occupation;
        string education;
        string medicalHistory;
        string extraNotes;
    }

    mapping(address => PatientInfo) private patientInfos;
    mapping(address => PatientHealthData) private patientHealths;

    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function setPatientInfo(
        string memory _name,
        string memory _birthDate,
        string memory _nationalID,
        string memory _phone,
        string memory _addressDetail,
        string memory _emergencyContact,
        string memory _emergencyRelation,
        string memory _gender
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
            _gender
        );
    }

    function setPatientHealthData(
        uint _height,
        uint _weight,
        string memory _occupation,
        string memory _education,
        string memory _medicalHistory,
        string memory _extraNotes,
        string memory _bloodType
    ) public payable {
        require(msg.value >= 0.001 ether, "Minimum fee required");
        patientHealths[msg.sender] = PatientHealthData(
            _height,
            _weight,
            _occupation,
            _education,
            _medicalHistory,
            _extraNotes,
            _bloodType
        );
    }

    function getPatientInfo() public view returns (
        string memory, string memory, string memory,
        string memory, string memory, string memory,
        string memory, string memory
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
            info.gender
        );
    }


    function getPatientHealthData() public view returns (
        uint, uint, string memory,
        string memory, string memory,
        string memory, string memory
    ) {
        PatientHealthData memory data = patientHealths[msg.sender];
        return (
            data.height,
            data.weight,
            data.occupation,
            data.education,
            data.medicalHistory,
            data.extraNotes,
            data.bloodType
        );
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        owner.transfer(address(this).balance);
    }
}