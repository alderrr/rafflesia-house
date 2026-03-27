const supabaseAdmin = require("../utils/supabaseAdmin");
const AppError = require("../utils/AppError");

class UploadController {
  static async uploadRoomImage(req, res, next) {
    try {
      if (!req.file) {
        throw new AppError("Image file is required", 400);
      }

      const bucket = process.env.SUPABASE_STORAGE_BUCKET;
      const fileExt = req.file.originalname.split(".").pop();
      const fileName = `rooms/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${fileExt}`;

      const { error } = await supabaseAdmin.storage
        .from(bucket)
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false,
        });

      if (error) {
        throw new AppError(error.message, 500);
      }

      const { data } = supabaseAdmin.storage
        .from(bucket)
        .getPublicUrl(fileName);

      return res.status(201).json({
        status: "success",
        data: {
          url: data.publicUrl,
          path: fileName,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UploadController;
