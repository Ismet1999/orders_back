const Router = require("express");
const router = new Router();
const ordersController = require("./../controllers/ordersController.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/images/");
  },
  filename: function (req, file, cb) {
    console.log("file", file);
    let fileName = file.originalname.split(".");

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const name =
      file.fieldname + "-" + uniqueSuffix + "." + fileName[fileName.length - 1];

    cb(null, name);
  },
});
const upload = multer({ storage: storage });

router.get("/", ordersController.getAll);
router.post("/", upload.single("photo"), ordersController.create);
router.get("/:id", ordersController.getOne);
router.put("/:id", upload.single("photo"), ordersController.edit);
router.delete("/:id", ordersController.delete);

module.exports = router;
