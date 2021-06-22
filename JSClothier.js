// JavaScript Document
//--------------------------Executed function--------------------------------:
chatFunc(); //Runs the chat function on any submitted message (not blank)

//--------------------------main variables--------------------------------:
let count = 0; //Tells the main function which msg to call;
let brand = 0; //Registers which brand has the user selected;
let chat = $("#chat"); //Defines the DOM node to which append the msgs using Jquery;

//--------------------------Bot Messages----------------------------------:

const iterationMsgs = { //All the messages that will be used by clothier
	msg1: "Great! Please tell me the brand of a pair of pants that you own and are happy with how they fit :)",
	msg2: "Ok, have a nice day! Remember, if you ever want to try again just type in the word Yes",
	msg3: "Sorry, I did not understand, answer Yes if you want to continue with the Clothier Smart Assistant",
	msg4: "Nice! Now all I need is the waist size of those pants, with this I can tell you your perfect fit with our other partner brands!",
	msg5: "Sorry, we currently support Levis, H&M or Forever21, do you wish to continue?",
	msg6: ["Your pant size for "," is "," and your pant size in "," is ",". Do you wish to start over?"],
	msg7: "Sorry, I did not understand, Want to start over with the Clothier Smart Assistant?",
};

//--------------------------Functions-------------------------------------:

//--------------------------Main Function:
function chatFunc() {
$("form").on("submit", function(event){ //User's input event
			event.preventDefault();
			let $valForm = $(this).find('input[name="msn"]');
			let valForm =  $valForm.val(); // User's input
			let date = new Date();
			let time = date.toLocaleString(); //Timestamp
		if(valForm === ""){return} //Empty form check
		else{ //Users msgBubble creation using Jquery:
			let msgUser = UserwriteMsg("msgUser", time, valForm);
			setTimeout(function(){msgUser.appendTo(chat)},300);
			//MsgBubble appended to main through Jquery
	
	// First Iteration: intro (user has said yes or no)
		if (count == 0){
			if(valForm.toLowerCase() === "yes")
				{return iterate(1,"$msg1", time, iterationMsgs.msg1);}
				//iterate function set the counter, clears the message box, creates the bots msg and appends it to chat through Jquery
			else if (valForm.toLowerCase() === "no") 
				{return iterate(0,"$msg2", time, iterationMsgs.msg2);}
			else
				{return iterate(0,"$msg3", time, iterationMsgs.msg3);}
			
	//Second Iteration:	 brand selector (user has selected levis, H&M or Forever 21)
		} else if (count == 1){
			if(valForm.toLowerCase() === "levis" || valForm.toLowerCase() === "h&m" || valForm.toLowerCase() === "forever21"){ 
				brandDef(valForm);// brand gets defined
				return iterate(2,"$msg4", time, iterationMsgs.msg4);}
			else
				{return iterate(0,"$msg5", time, iterationMsgs.msg5);}
			
	//Third Iteration: size translator (user has given their size)
		} else if (count == 2){
			let size = parseInt(valForm);
			if(Number.isNaN(size)) {brand = 0;}
			if(brand !== 0){
				let msg6Str = brandSizeDef(brand, size);
				return iterate(0,"$msg6", time, msg6Str);
				}
			else{
				return iterate(0,"$msg7", time, iterationMsgs.msg7);
			}
		}
	}
});}

//---------------------------Sub Functions:

//-----Creates the msgBuble for the user using JQuery
function UserwriteMsg($msg, time, value) {
	$msg = $("<p>");
	$msg.addClass("Talkbubble-input");
	$msg.append($("<h1>").addClass("name").text("You"));
	$msg.append($("<h1>").addClass("time").text(time));
	$msg.append($("<h1>").addClass("msg").text(value));
	return $msg
}

//-----Erases input box & sets count
function countNdelete(numCount) {
	count = numCount;
	$("input").val("");
}

//-----Creates the msgBuble for the bot using JQuery
function writeMsg($msg, time, value) {
	$msg = $("<p>");
	$msg.addClass("Talkbubble");
	$msg.append($("<h1>").addClass("name").text("Clothier"));
	$msg.append($("<h1>").addClass("time").text(time));
	$msg.append($("<h1>").addClass("msg").text(value));
	return $msg 
}

//-----Executes all tasks for each bot iteration:
function iterate(counter,$msg, time, value) {
	countNdelete(counter);  
	$msg = writeMsg($msg, time, value);
	return setTimeout(function(){$msg.appendTo(chat)},1000);}

//---Brand definer: defines brand value at 2nd iteration:
function brandDef (valForm){
valForm.toLowerCase() == "levis" ? brand=1 : valForm.toLowerCase() == "h&m" ? brand=2 : brand=3;
}

//-----Calculates the size and msg for third iteration
function brandSizeDef(brandVal, sizeVal){
	let brand1 = "";
	let brand2 = "";
	let size1 = 0;
	let size2 = 0;
if (brandVal === 2){ //if brand selected is H&M
	brand1 = "Levis";
	brand2 = "Forever21";
	size1 = sizeVal+1;
	size2 = sizeVal-1;}
else if (brandVal === 1){ //if brand selected is Levis
	brand1 = "H&M";
	brand2 = "Forever21";
	size1 = sizeVal-1;
	size2 = sizeVal-2;}
else { //if brand selected is Forever21
	brand1 = "H&M";
	brand2 = "Levis";
	size1 = sizeVal+1;
	size2 = sizeVal+2;}
	
let value = iterationMsgs.msg6[0] + brand1 + iterationMsgs.msg6[1] + size1 + iterationMsgs.msg6[2] + brand2 + iterationMsgs.msg6[3] + size2 + iterationMsgs.msg6[4];

return value;
}
	
