# Touch Grass

A cool app for introverts to go outside and touch grass.
This serves as the course project for CS 484

## App Functionality

As part of the application functionality, the following has been implemented:

1. Build an SSO integration to allow users to sign up using Google and complete profile registration to use the application.
   a. Sign up and login will be powered by Auth0 (SSO Provider)
   b. Store any information not present in a user’s Google/ Facebook profile (like profile picture) in the database.
2. logged in user checks in with their location asking the application to suggest activities for touching grass with the option to collaborate with nearby users.
   a. Collect the location information from the browser and send to the backend for further processing
   b. Use Google Gemini to suggest nearby landmarks as activity spots.
   c. Design system prompts as templates for the LLM (Google Gemini).
   d. Pass landmarks and current location to Google Gemini for retrieving an activity suggestion based on the user's past activities.
3. Display activity information for the user in the form of steps needed to complete the activity. A sample workflow would look like:
   a. Go to the lakefront trail from Adler planetarium
   b. Ask someone to take a picture of yourself with the skyline in view.
   c. Upload the picture to the app for verification.
4. Store details in the database as the user’s past activities.
   a. The activity completion is tracked and the final step (in our sample, the image upload) is sent to the backend for verification.
   b. Verify activity completion with Google Gemini by uploading the image.
   c. Award points to the user on successful completion of activity.
   d. The points are added to the user’s total score in a database.
5. Create a leaderboard that will display the user’s rankings - the user’s total score/ points are compared with the points of other users. This would be an incentive for the user to partake in more activities going forward.

## Known Issues

The only known issue:

-   CSS broken on Firefox (Tailwind is broken on Firefox)

## Navigation

1. Login using your Google accounts.
2. Click on Yes/ Yes Please
3. Allow location
4. Follow the instructions
5. You can upload any Google image that satisfies the image criteria.
6. The LLM will verify the image and your task will be complete!
7. You can view your score on the leaderboard.
8. You can also look at your past activities in activity history.
