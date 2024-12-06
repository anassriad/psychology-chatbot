let currentStep = "greeting";  // This will track the conversation state

// Function to send the user's message
function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() !== "") {
    // Display the user's message in the chat
    const chatBox = document.getElementById("chat-box");
    const userMessage = document.createElement('p');
    userMessage.classList.add('user-message');
    userMessage.innerText = userInput;
    chatBox.appendChild(userMessage);
    
    // Clear input field
    document.getElementById("user-input").value = '';
    
    // Respond to the user
    processMessage(userInput);
  }
}

// Function to process the user's message and respond accordingly
function processMessage(userInput) {
  const chatBox = document.getElementById("chat-box");
  let botMessage;

  // Basic conversation flow
  if (currentStep === "greeting") {
    botMessage = "How are you feeling today?";
    currentStep = "feeling"; // Move to next step after greeting
  } else if (currentStep === "feeling") {
    if (userInput.toLowerCase().includes("stress")) {
      botMessage = "It sounds like stress is affecting you. Would you like to try a relaxation exercise?";
      currentStep = "stress";
    } else if (userInput.toLowerCase().includes("anxiety")) {
      botMessage = "It sounds like anxiety is affecting you. Would you like some tips to manage it?";
      currentStep = "anxiety";
    } else if (userInput.toLowerCase().includes("depressed")) {
      botMessage = "It seems like you might be feeling depressed. Would you like to talk about it?";
      currentStep = "depression";
    } else {
      botMessage = "It sounds like you’re having a tough time. Would you like to share more?";
      currentStep = "feeling"; // Keep asking for more information
    }
  } else if (currentStep === "stress") {
    botMessage = "Let’s take a deep breath together. Breathe in for 4 seconds, hold for 4 seconds, and breathe out for 6 seconds.";
    currentStep = "end";
  } else if (currentStep === "anxiety") {
    botMessage = "Let’s do a quick mindfulness exercise. Focus on your breath, in and out slowly.";
    currentStep = "end";
  } else if (currentStep === "depression") {
    botMessage = "Taking small steps can help with depression. What small action would you like to take today?";
    currentStep = "end";
  } else {
    botMessage = "I’m here for you, but let’s try to explore your feelings more.";
    currentStep = "feeling";
  }

  // Display the bot's message
  const botResponse = document.createElement('p');
  botResponse.classList.add('bot-message');
  botResponse.innerText = botMessage;
  chatBox.appendChild(botResponse);
  
  // Scroll to the bottom
  chatBox.scrollTop = chatBox.scrollHeight;
}

