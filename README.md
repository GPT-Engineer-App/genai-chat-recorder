# genai-chat-recorder

Develop a chat application leveraging Google GenAI APIs to record and upload video and audio files. The app will use the spacebar to record video and the 'A' key to record audio, sending the recordings to the model for processing and queries. The app will feature a console screen for verbose output and status updates, which can be hidden for a clean user interface.

Functional Requirements:

Video and Audio Recording:

Pressing the spacebar initiates video recording.
Releasing the spacebar stops the recording and uploads the file to the model.
Pressing 'A' initiates audio-only recording, following the same upload process.
Context Awareness:

The model must maintain context across multiple inputs.
The application should exploit multimodal capabilities, especially focusing on qualities perceptible through audio that cannot be captured textually.
Console Screen:

Display a scrollable output showing the connection progress to the API, file uploads, URL exposure of the uploads, and overall status.
Allow the console screen to be rolled away for an elegant and simple interface.
Example Code:

python
Copy code
import os
import time
import google.generativeai as genai

# Configuration
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Upload function
def upload_to_gemini(path, mime_type=None):
    """Uploads the given file to Gemini."""
    file = genai.upload_file(path, mime_type=mime_type)
    print(f"Uploaded file '{file.display_name}' as: {file.uri}")
    return file

# Wait for files to be active
def wait_for_files_active(*files):
    """Waits for the given files to be active."""
    print("Waiting for file processing...")
    for name in (file.name for file in files):
        file = genai.get_file(name)
        while file.state.name == "PROCESSING":
            print(".", end="", flush=True)
            time.sleep(10)
            file = genai.get_file(name)
        if file.state.name != "ACTIVE":
            raise Exception(f"File {file.name} failed to process")
    print("...all files ready")
    print()

# Model configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
]

model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    safety_settings=safety_settings,
    generation_config=generation_config,
)

# Upload video file
video_AMHN_10min = upload_to_gemini("American Museum of Natural History Tour - 10 Min", mime_type="video/mp4")

# Wait for file processing
wait_for_files_active(video_AMHN_10min)

# Start chat session
chat_session = model.start_chat(
    history=[
        {"role": "user", "parts": [video_AMHN_10min]},
    ]
)

# Send message and get response
response = chat_session.send_message("Tell me about this video.")
print(response.text)
print(chat_session.history)

# Set your Google API key
GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY"
Note: Ensure the file paths and API keys are correctly set and the required dependencies are installed.

Installation Guide:

bash
Copy code
$ pip install google-generativeai
GOOGLE_API_KEY=AIzaSyCBRCcgTs3ynXMFUxoQY9izflwz8wqJ4KA

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/genai-chat-recorder.git
cd genai-chat-recorder
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
