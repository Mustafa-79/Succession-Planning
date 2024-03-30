const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
    test,
    registerUser,
    loginUser,
    getProfile,
    retrieveName,
    resetPassword,
    retrieveSecurityQuestion,
    setPassword,
    resetSecurityImage,
    verifySecurityAnswer,
    submitFeedback,
    returnProfile,
    uploadImage,
    changePassword,
    changeSecurityImg,
    updateProfile
} = require("../controllers/authControllers");
const {
    dashboardEmployees,
    positionIDtoName,
    addEmployeeFromAdminDashboard,
    deleteEmployeefromAdminDashboard,
    returnAdminProfile
} = require("../controllers/dashboardAdmin");

//middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);

// router.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
// router.use(bodyParser());

router.get("/", loginUser);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.post("/registerUser", retrieveName);
router.post("/resetPassword", resetPassword);
router.post("/retrieveSecurityQuestion", retrieveSecurityQuestion);
router.post("/resetPasswordFinalStep", setPassword);
router.post("/resetSecurityImage", resetSecurityImage);
router.post("/verifySecurityAnswer", verifySecurityAnswer);
router.get("/dashboard-employees", dashboardEmployees);
router.get("/dashboard-position-titles", positionIDtoName);
router.post("/addEmployeeFromAdminDashboard", addEmployeeFromAdminDashboard);
router.post("/submitFeedback", submitFeedback);
router.post('/getProfile', returnProfile)
router.post('/uploadImage', uploadImage)
router.post('/changePassword', changePassword)
router.post('/changeSecurityImage', changeSecurityImg)
router.post('/updateProfile', updateProfile)
router.post('/getAdminProfile', returnAdminProfile)

// create a route for axios.post(`/deleteEmployee/${employeeID}`);
router.post("/deleteEmployee/:id", deleteEmployeefromAdminDashboard);

module.exports = router;
