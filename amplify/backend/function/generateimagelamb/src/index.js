const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (event, context, callback) => {
    const {prompt} = JSON.parse(event.body);

    const imageSize =  '512x512'
    try {
        const response = await openai.createImage({
            prompt,
            n : 3,
            size : imageSize
        });

        const imageUrls = [response.data.data[0].url, response.data.data[1].url, response.data.data[2].url];

        callback(null, {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({
                success : true,
                data : imageUrls
            })
        });

    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        callback(null, {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({
                success : false,
                error : 'image could not be generated'
            })
        });
    }
};

exports.handler = generateImage;
