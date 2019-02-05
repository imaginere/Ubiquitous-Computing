/*
 * Ubiquitous Computing - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Uses a PubNub function to query the Wolfram Conversation API
 * 
 *  
 */

// server variables

var dataServer;
var pubKey = 'pub-c-8b1ade26-32f0-4da1-9e2d-5d4141d2d63f';
var subKey = 'sub-c-fb800a20-e6a6-11e8-b3e4-b6494454df27';

//input variables
var sendText;
var sendButton;
var counts

//size of the active area
var cSizeX = 900;
var cSizeY = 600;

var returnedAnswer = [];

//This must match the channel you set up in your function
var channelName = "wolfram";

function setup() 
{
  getAudioContext().resume();
  createCanvas(cSizeX, cSizeY);
  background(51, 10, 0);
  


   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });
  
  //attach callbacks to the pubnub object to handle messages and connections
  dataServer.addListener({ message: readIncoming})
  dataServer.subscribe({channels: [channelName]});

  //create the text fields for the message to be sent
  sendText = createInput();
  sendText.position(5,height);

  sendButton = createButton('Ask a Question');
  sendButton.position(sendText.x + sendText.width,height);
  sendButton.mousePressed(sendTheMessage);

}

function draw() 
{


}


///uses built in mouseClicked function to send the data to the pubnub server
function sendTheMessage() {
 

  // Send Data to the server to draw it in all other canvases
  dataServer.publish(
    {
      channel: channelName,
      message: 
      {
        text: sendText.value()       //text: is the message parameter the function is expecting   
      }
    });

}

function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  

console.log(inMessage);  //log the entire response
                          //the message parameter to look for is answer


    background(255);
    noStroke();
    fill(0);  //read the color values from the message
    //textSize(20);
    //text(inMessage.message.answer, 5, height/2);
    //returnedAnswer=inMessage.message.answer.split(" ");

    // In this one I'm making a Tag cloud instead of words
  
  
    //join the lines so we have a sting
    returnedAnswer = RiTa.concordance(lines.join(" "));
    for (var k in returnedAnswer) {
      if (returnedAnswer.hasOwnProperty(k)) {
      fill(random(255));
      textSize(counts[k]);
      text(k, random(width), random(height));
    }
  }
    

}

