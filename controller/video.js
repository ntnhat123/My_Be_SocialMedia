import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import Video from "../models/video.js";

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/video");
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== ".mp4" || ext !== ".mov") {
            return cb(res.status(400).end("only mp4, mov are allowed"), false);
        }
        cb(null, true);
    },
});

export const uploadVideo = async (req, res) => {
    const videoupload = upload.single("video");
    videoupload(req, res, (err) => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({
            success: true,
            filePath: res.req.file.path,
            fileName: res.req.file.filename,
        });
    });
};


export const getVideo = async (req, res) => {
    try {
        const video = await Video.find().populate("creator");
        res.status(200).json({
            message: "Get video successfully",
            data: video,
            status :true
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getVideoById = async (req, res) => {
    const { id } = req.params;
    try {
        const video = await Video.findById(id).populate("creator");
        res.status(200).json({
            message: "Get video successfully",
            data: video,
            status :true
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    try {
        const video = await Video.findByIdAndDelete(id);
        res.status(200).json({
            message: "Delete video successfully",
            data: video,
            status :true
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateVideo = async (req, res) => {
    const { id } = req.params;
    const { title, description, tags } = req.body;
    try {
        const video = await Video.findByIdAndUpdate(id, { title, description, tags: tags.split(",") });
        res.status(200).json({
            message: "Update video successfully",
            data: video,
            status :true
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getVideoByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const video = await Video.find({ creator: id }).populate("creator");
        res.status(200).json({
            message: "Get video by user successfully",
            data: video,
            status :true
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}