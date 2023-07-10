const express = require("express");
const router = express.Router();

const {localFileUpload,cloudfileupload,allimages,deleteFile,submitform,allsubmitfoam} = require("../controllers/fileUpload");

//api route
router.post("/localFileUpload",localFileUpload );
router.post("/cloudfileupload",cloudfileupload );
router.get("/allimages",allimages );
router.post("/deleteFile",deleteFile);
router.post("/submitform",submitform);
router.get("/allsubmitfoam",allsubmitfoam);






module.exports = router;