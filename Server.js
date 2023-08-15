// Import required modules
const express = require('express'); 
const bodyParser = require('body-parser'); 

// Mailgun API key and domain
const apiKey = 'a868cec06c4d9e6fcfc3067d443421b1-ee16bf1a-591289dd';
const domain = 'sandbox57c3b3e0a855442b8045c93c4ace21f1.mailgun.org';

// Initialize Mailgun with API key and domain
const mailgun = require('mailgun-js'); 
const mailgunMsg = mailgun({ apiKey: apiKey, domain: domain }); 

// Create an instance of Express app
const myApp = express();

// Use body-parser middleware to parse incoming request bodies
myApp.use(bodyParser.urlencoded({ extended: true })); 

// Serve static CSS files from the 'public/css' directory
myApp.use(express.static('public/css')); 

// Handle GET requests to the root URL
myApp.get('/', (req, res) => {
    // Send the 'index.html' file as the response
    res.sendFile(__dirname + '/index.html'); 
});

// Handle POST requests to the root URL
myApp.post('/', (req, res) => {
    // Extract the email from the request body
    const email = req.body.email; 
    console.log(email);

    // Prepare email data to be sent
    const data = {
        from: 'AsmiGarg <asmi4770.be22@chitkara.edu.in>', 
        to: email, 
        subject: 'Our Newsletter', 
        text: 'Welcome to our newsletter.', 
    };

    // Send the email using Mailgun's messages API
    mailgunMsg.messages().send(data, (error, body) => {
        if (error) {
            // If there's an error, log it and send a 500 response
            console.log(error); 
            return res.status(500).send('Error Detected.'); 
        }
        // Log success message if email is sent successfully
        console.log('Email sent successfully:', body); 
    });
});

// Start the server and listen on port 8888
myApp.listen(8888, () => {
    console.log('Server is running at port 8888.');
}); 
