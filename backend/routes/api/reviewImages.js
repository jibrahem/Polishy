const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Polish, Review, ReviewImage } = require('../../db/models');
const router = express.Router();
// backend/routes/api/images.js

const { multipleFilesUpload, multipleMulterUpload, retrievePrivateFile } = require("../../awsS3");

// backend/routes/api/images.js

router.get(
    '/:userId',
    async (req, res) => {
        const images = await ReviewImage.findAll({ where: { userId: req.params["userId"] } });
        const imageUrls = images.map(image => retrievePrivateFile(image.key));
        return res.json(imageUrls);
    }
);

// backend/routes/api/images.js

router.post(
    '/:userId',
    multipleMulterUpload("images"),
    async (req, res) => {
        const { userId } = req.params;
        const keys = await multipleFilesUpload({ files: req.files });
        const images = await Promise.all(
            keys.map(key => ReviewImage.create({ key, userId }))
        );
        const imageUrls = images.map(image => retrievePrivateFile(image.key));
        return res.json(imageUrls);
    }
);


module.exports = router
