const router = require("express").Router();

const crypto = require("crypto");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "videos/");
    },
    filename: (req, file, cb) => {
        const fileName = crypto.randomBytes(20).toString("hex");
        const mimetypeArray = file.mimetype.split("/");
        if (mimetypeArray[0] === "video") {
            const extension = mimetypeArray[mimetypeArray.length - 1];
            cb(null, fileName + "." + extension);
        } else {
            cb("Not a video error. Mimetype: " + file.mimetype);
        }
    }
});
const upload = multer({ storage: storage });

const videos = [];

const videosPerPage = 10;

const Swal = require('sweetalert2')


router.get("/videos", (req, res) => {
    const page = Number(req.query.page) ? Number(req.query.page) : 1;
    const start = (page-1) * videosPerPage;
    const end = start + videosPerPage;

    return res.send({ response: videos.slice(start, end) });
});

router.get("/videos/:videoId", (req, res) => {       
    return res.send({ response: videos.find(video => video.fileName === req.params.videoId) });
});


router.post("/videos", upload.single('video'), (req, res) => {
/*     console.log(req.body);
    console.log(req.file); */

    let errors = [];

    const video = {
        fileName: req.file.filename,
        title: req.body.title || "",
        description: req.body.description || "",
        thumbnail: "", // todo
        // todo below: check if it belongs to one of the accepted categories
        category: req.body.category || "unknown", 
        tags: req.body.tags.split(/\s*[,\s]\s*/),
        uploadDate: new Date()
    };

    if (video.title.length < 8 || video.title.length > 64) {
       Swal.fire({
            title: 'Error!',
            text: 'Title length too short or too long (minimum 8, maximum 64',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
          //errors.push("Title error");

    }

    if (video.description.length > 2048) {
        Swal.fire({
            title: 'Error!',
            text: 'Description is too long',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        //errors.push("The description can't be longer than 2048 chars.");
    }

    if (errors.length > 0) {
        return res.send({ response: errors });
    } else {
        videos.push(video);
        return res.redirect(`/player/${video.fileName}`); // <==== todo
    } 
});

module.exports = router;
