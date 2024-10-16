const express = require('express');
const router = express.Router();

// GET - /user 처리 - 사용자 전체 목록
router.route("/").get(function(req, res) {
    console.log("GET - /user 처리");
    res.end("GET - /user");
});

router.route("/").post(function(req, res) {
    console.log("POST - /user 처리 - 사용자 입력");
    res.end("POST - /user");
});


module.exports = router;