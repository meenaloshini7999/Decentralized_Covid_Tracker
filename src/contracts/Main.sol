pragma solidity ^0.5.0;

contract Main
{
    address public admin;
    struct localAdmin
    {
        address ladminadd;
        uint aadhaar;
        uint pincode;
    }
    struct Reporter
    {
        string repId;
        string Name;
        uint assigned_pincode;
        string family;
    }
    struct Doctor
    {
        address docAdd;
        string id;
        string name;
        string workPlace;
        string family;
    }
    struct HealthRecord
    {
        string temperature;
        string id;
        string date;
        string description;
        string doc;
    }
    struct Family
    {
        string name;
        string id;
        uint count;
        string homeFlat;
        string currentFlat;
        bool infection;
    }
    struct flat
    {
        string id;
        uint total;
        uint active;
        string coords;
    }
    mapping(uint=>string[]) public flatsByPincode;
    mapping(string=>string[]) public HealthRecordsByFlat;
    mapping(string=>HealthRecord) public healthRecords;
    mapping(string=>Family) public families;
    mapping(string=>flat) public flats;
    mapping(string=>Doctor) public doctors;
    mapping(string=>Reporter) public reporters;
    mapping(uint=>localAdmin) public lAdmins;
    mapping(address=>uint) public lAdminPincodes;
    mapping(string=>string[]) public familyHealthRecords;
    constructor()
    {
        admin=msg.sender;
    }
    function string_check(string memory str1, string memory str2) pure internal returns (bool)
    {
        return (keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2)));
    }
    function createLocalAdmin(address _address,uint _aadhaar,uint _pincode)
    {
        require(admin==msg.sender,"Access Denied!");
        require(lAdmins[_pincode].ladminadd==address(0),"Local Admin ID already exist!");
        lAdmins[_pincode]=localAdmin(_address,_aadhaar,_pincode);
        lAdminPincodes[_address]=_pincode;
    }
    function createReporter(string memory _id,string memory _name,uint _pincode,string memory _famid)
    {
        require(lAdmins[_pincode].ladminadd==msg.sender,"Access Denied");
        reporters[_id]=Reporter(_id,_name,_pincode,_famid);
    }
    function createDoctor(uint _pincode,address _address,string memory _id,string memory _name,string memory _workarea,string memory _famid)
    {
        require(lAdmins[_pincode].ladminadd==msg.sender,"Access Denied");
        doctors[_id]=Doctor(_address,_id,_name,_workarea,_famid);
    }
    function createFamily(uint _pincode,string memory _name,string memory _id,uint _count,string memory _home,string memory _curr,bool _flag)
    {
        require(lAdmins[_pincode].ladminadd==msg.sender,"Access Denied");
        families[_id]=Family(_name,_id,_count,_home,_curr,_flag);
    }
    function createFlat(uint _pincode,string memory _id,uint _total,uint _active,string memory _coords)
    {
        require(lAdmins[_pincode].ladminadd==msg.sender,"Access Denied");
        flats[_id]=Flat(_id,_total,_active,_coords);
        flatsByPincode[_pincode].push(_id)
    }
    function getFlatsByPin(uint _pincode)
    {
        return(flatsByPincode[_pincode]);
    }
    function getHealthRecordsByFlat(string memory _flat)
    {
        return(HealthRecordsByFlat[_flat]);
    }
    function createHealthRecord(string memory _flat,string memory _family,string memory _id,string memory _temp,string memory _date,string memory _desc)
    {
        healthRecords[_id]=HealthRecord(_temp,_id,_date,_desc,'');
        familyHealthRecords[_family].push(_id);
        HealthRecordsByFlat[_flat].push(_id);
    }
    function flagCovidStatus(string memory _docId,string _hId,string memory _flat,string memory _family,string memory _hRec,bool _stat)
    {
        require(doctors[_docId].docAdd==msg.sender,"Access denied");
        healthRecords[_hId].doc=doctors[_id].name;
        families[_family].infection=_stat;
        if(_stat==true){
            flats[_flat].active+=families[_family].count;
        }
        else
        {
            flats[_flat].active-=families[_family].count;
        }
    }
    function relocation(uint _pincode,string memory _newLocation,string memory _id)
    {
         require(lAdmins[_pincode].ladminadd==msg.sender,"Access Denied");
         families[_id].currentFlat=_newLocation;
    }

}
