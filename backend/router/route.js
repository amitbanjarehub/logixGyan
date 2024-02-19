const express = require('express');
const router = express.Router();
const User = require('../controller/userController');
const Message = require('../controller/messageController');
const Attendance = require("../controller/attendanceController");
const Company = require("../controller/companyController");
const Branch = require('../controller/branchController');
const Parcel = require("../controller/parcelController");
const Dashboard = require("../controller/dashboardController");
const Cash = require("../controller/cashController");
const { auth } = require('../middleware/auth');
const upload = require('../middleware/imageHelper');


//user
router.post('/addUser', upload, User.addUser);
router.post('/login', User.login);

router.get('/allUserList', auth, User.allUserList);
router.get('/allUserList1', User.allUserList1);
//user verify by admin -------------------
router.put('/userVerify', auth, User.userVerifyByAdmin);



//user verify by SuperVisor -------------------
router.put('/userVerifySubUser', auth, User.userVerifyBySuperVisor);


router.get('/userDetails/:userId', auth, User.userDetails);
router.delete('/deleteUser/:userId', auth, User.deleteUser);
router.get('/verifyUsersList', auth, User.verifyUsersList);
router.post('/userImage', auth, upload, User.userImage);
router.put('/updateUser/:userId', auth, upload, User.updateUser);
router.get('/userByToken', auth, User.userByToken);
router.put('/blockUser/:userId', auth, User.statusUpdate);


//messageCenter
router.post('/addMessage', auth, Message.addMessage);
router.get('/messageDetails/:id', auth, Message.messageDetails);
router.delete('/deleteMessage/:id', auth, Message.deleteMessage);
router.get('/allMessageList', auth, Message.allMessageList);
router.get('/myMessageList', auth, Message.myMessageList);

//attendance
router.post('/checkIn', auth, upload, Attendance.checkIn);
router.post('/checkOut', auth, upload, Attendance.checkOut);
router.get('/attendanceList', auth, Attendance.attendanceList);
router.get('/monthlyAttandance', auth, Attendance.monthlyAttandance);

//company
router.post('/addCompany', auth, Company.addCompany);
router.get('/companyList', auth, Company.companyList);
router.get('/companyDetails/:id', auth, Company.companyDetails);
router.put('/updateCompany/:id', auth, Company.updateCompany);

//branch
router.post('/addBranch', auth, Branch.addBranch);
router.get('/branchList', auth, Branch.branchList);
router.get('/branchDetails/:id', auth, Branch.branchDetails);
router.put('/updateBranch/:id', auth, Branch.updateBranch);
router.post('/addExpences/', upload, auth, Branch.addBranchExpences);
router.get('/getExpencesList', auth, Branch.getExpencesList);
router.delete('/deleteExpense/:id', auth, Branch.deleteExpences);

router.put('/updateExpenses/:id', auth, upload, Branch.updateExpenses);// upload use kiye for update data


//daily parcel apis 

router.post('/addParcel', auth, Parcel.addParcel);
router.get('/dateByParcel', auth, Parcel.dateByParcel);

//allotment apis
router.post('/parcelAllot', auth, Parcel.parcelAllot);
router.get('/deliveryBoyParcel', auth, Parcel.deliveryBoyParcel);
router.get('/detailsAllotedPrcel/:id', auth, Parcel.detailsAllotedPrcel);
router.put('/updateAllotedParcel/:id', auth, Parcel.updateAllotedParcel);
router.get('/parcelAllotList', auth, Parcel.parcelAllotList);
router.put('/updateParcel/:id', auth, Parcel.updateParcel);

//dashboard count api
router.get('/DashboardCount', auth, Dashboard.DashboardCount);
router.get('/MonthlyCashCount', auth, Dashboard.MonthlyCashCount);
router.get('/dailyCount', auth, Dashboard.dailyCount);


//cash add by branch
router.post('/addCash', auth, upload, Cash.addCash);
router.get('/cashList', auth, Cash.cashList);
router.put('/updateCash/:id', auth, upload, Cash.updateCash);


module.exports = router;