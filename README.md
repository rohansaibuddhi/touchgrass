# Touch Grass

A cool app for introverts to go outside and touch grass.
This serves as the course project for CS 484.

Please read the

## MVP Functionality

As part of the MVP functionality, the following has been implemented:

- User checks in with their location asking the application to suggest activities for touching grass with the option to collaborate with nearby users.
  - Collect the location information from the browser and send to the backend for further processing
  - ~~Query the Google Places API from the backend to get nearby landmarks as activity spots.~~ Use Google Gemini to suggest nearby landmarks as activity spots.
  - Design system prompts as templates for the LLM (Google Gemini).
  - Pass landmarks and current location to Google Gemini for retrieving an activity suggestion based on the user's past activities.
- Display activity information for the user in the form of steps needed to complete the activity. A sample workflow would look like:
  - Go to the lakefront trail from Adler planetarium
  - Ask someone to take a picture of yourself with the skyline in view.
  - Upload the picture to the app for verification.
- Store details in the database as the user’s past activities.
  - The activity completion is tracked and the final step (in our sample, the image upload) is sent to the backend for verification.
  - Verify activity completion with Google Gemini by uploading the image

## Known Issues

All known issues are issues with respect to the final deliverable but they are not part of the MVP as promised:

- login is using test accounts
- user registration is not implemented
- CSS broken on Firefox (Tailwind)
- User profile is a static image, final deliverable will be pulling profile pic from Google
- User profile data is also static, set in the database, final deliverable will pull it from Google

## MVP Navigation

Login using the following users:

- chris@gmail.com
- khanh@gmail.com

Login to the app, allow location, click on Yes/ Yes Please
Follow the instructions, for the MVP, you can upload any Google image that satisfies the image criteria.
The LLM will verify the image and your task will be complete!
