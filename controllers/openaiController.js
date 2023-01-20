const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
    const {prompt} = req.body;

    const imageSize =  '512x512'
    try {
        const response = await openai.createImage({
            prompt,
            n : 3,
            size : imageSize
        });

        const imageUrls = [response.data.data[0].url, response.data.data[1].url, response.data.data[2].url];

        res.status(200).json({
            success : true,
            data : imageUrls
        });

    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        res.status(400).json({
            success : false,
            error :  'image could not be generated'
        });
    }
};

module.exports = { generateImage };
