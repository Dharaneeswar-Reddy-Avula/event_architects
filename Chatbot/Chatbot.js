const responses = {
    "hello": "Hi! How can I assist you?",
    "event details": "We have multiple events happening. Can you specify which event?",
    "location of sac auditorium": "The SAC Auditorium is near the main entrance of RGUKT Nuzvid.",
    "location of ab-1": "AB-1 is near the central campus area.",
    "location of ab-2": "AB-2 is located beside AB-1.",
    "location of ab-3": "AB-3 is located near the administration block.",
    "location of food court": "The Food Court is in the center of the campus near the SAC Auditorium.",
    "location of i3 administration block": "The I3 Administration Block is near the college main gate.",
    "accommodation for outside students": "Accommodation is available at SAC Ground for boys and K4 for girls.",
    "registration fee": "The registration fee depends on the event. Can you specify the event name?",
    "how to reach college": "You can reach RGUKT Nuzvid via bus from Vijayawada or by train to Nuzvid Railway Station.",
    "default": "I'm not sure about that. Please ask something related to events, locations, or accommodation."
};

function sendMessage() {
    const userInput = document.getElementById("user-input").value.toLowerCase();
    document.getElementById("user-input").value = "";

    const chatBox = document.getElementById("chat-box");

    // Add user message
    const userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.innerText = userInput;
    chatBox.appendChild(userMessage);

    // Bot response
    setTimeout(() => {
        const botMessage = document.createElement("div");
        botMessage.classList.add("bot-message");
        botMessage.innerText = responses[userInput] || responses["default"];
        chatBox.appendChild(botMessage);
        
        // Auto-scroll to the latest message
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
}
