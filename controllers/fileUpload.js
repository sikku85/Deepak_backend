const File = require("../models/File");
const cloudinary = require('cloudinary').v2;
const submitFile=require("../models/SubmitMoel")
const sharp = require('sharp');



//localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
    try {

        //fetch filefrom request
        const file = req.files.file;
        console.log("FILE AAGYI JEE -> ",file);


        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path)

        //add path to the move fucntion
        file.mv(path , (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message:'Local File Uploaded Successfully',
        });

    }
    catch(error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

exports.cloudfileupload = async (req, res) => {
    try {
        // Access the uploaded file
        const file = req.files.image;
        const {name,tags}=req.body;
        console.log(file);
    
        // Check if the file is an image
        if (!file.mimetype.startsWith('image')) {
          return res.status(400).json({ message: 'File is not an image' });
        }
    
        // Specify the folder in Cloudinary
        const uploadOptions = {
          folder: "sikkuclouds", // Replace with your desired folder name
        };
        const optimizedImage = await sharp(file.tempFilePath)
        .jpeg({quality:80})
        .png({quality:80}) // Set the desired width of the imagz
         // Set the desired JPEG compression quality
        .toBuffer();
    
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(optimizedImage, {... uploadOptions,resource_type:'auto',});
        await File.create({
            name,
            imageUrl: result.secure_url,
            tags,

        })
    
        // Return the Cloudinary URL of the uploaded image
        res.json({ imageUrl: result.secure_url });
      } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Error uploading image' });
      }    

}

exports.allimages = async (req, res) => {
    try {
        const images = await File.find({}); // Assuming 'url' is the field containing the image URLs
        res.json(images);
      } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Error fetching images' });
      }
    };


    exports.deleteFile = async (req, res) => {
      try {
        const {_id}=req.body;
    
        // Find the file document by ID and delete it
        const deletedFile = await File.findByIdAndDelete(_id);
    
        if (!deletedFile) {
          return res.status(404).json({ error: "File not found" });
        }
    
        return res.status(200).json({
          success: true,
          message: "File deleted successfully",
          data: deletedFile,
        });
      } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).json({ error: "Error deleting file" });
      }
    };


    exports.submitform=async(req,res)=>{
      try {
        const { name, email } = req.body;
    
        // Create a new file document
        const newFile = new submitFile({
          name,
          email,
        });
        await submitFile.create({
          name,
          email,
      })
  
      // Return the Cloudinary URL of the uploaded image
      res.json({ name: name, email: email});


    }
    catch (error) {
      console.error("Error submiting file:", error);
      res.status(500).json({ error: "Error submiting file" });

    }
  };


  
exports.allsubmitfoam = async (req, res) => {
  try {
      const data = await submitFile.find({}); // Assuming 'url' is the field containing the image URLs
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  };