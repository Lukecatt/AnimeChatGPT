// A express server, which will handle api requests coming in and respond back with a json object, it will use body parser as well as cors
const OpenAI = require('openai');
const {Configuration, OpenAIApi} = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const spawner = require('child_process').spawn;

data_to_pass_in = ""

const configuration = new Configuration({
    organization: "org-pImlxStZ62VuiwR3ZdlisOlg",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const {message} = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Pretend to be a caring sister and speak like an anime character
        Sister: Hello
        Patient: ${message}?
        Sister:`,
        max_tokens: 70,
        temperature: 0,
     });
     console.log(response.data)
     if(response.data.choices[0].text){
        res.json({
            message: response.data.choices[0].text
        });
    }
    data_to_pass_in = response.data.choices[0].text;
    const python_process = spawner('python3', ['./getAudio.py', data_to_pass_in]);
    python_process.stdout.on('data', (data) => {
        console.log(`${data}`);
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);