import { Router } from 'express';
var router = Router();
import bodyParser from 'body-parser';
router.use(bodyParser.json());
import admin_functions from "../controllers/admin.js"
import { google } from 'googleapis';

router.use((req, res, next) => {
    console.log(req.session.user.type);
    if (req.session.user !== undefined && req.session.user.type == 'admin') {
        next();
    } else {
        res.render('err', { err: 'You are not an Admin', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});


const credentials = {
    client_id: '318984115104-34d891k9354omicok72aekmltv26algb.apps.googleusercontent.com',
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: ["http://boomy.store","http://boomy.store/signup","http://boomy.store/admin-user-management","http://boomy.store/ordertrack"]
  };
  // Create the OAuth2 client and set credentials
  const oAuth2Client = new google.auth.OAuth2(
    credentials.client_id,
    credentials.client_secret,
    credentials.redirect_uris[0]
  );

  // Set the credentials on the client
  oAuth2Client.setCredentials(credentials);


  const analyticsreporting = google.analyticsreporting({
    version: 'v4',
    auth: oAuth2Client
  });

  app.get('/adminhome', async (req, res) => {
    try {
      // Fetch number of visitors from Google Analytics
      const analyticsData = await analyticsreporting.reports.batchGet({
        requestBody: {
          reportRequests: [
            {
              viewId: '291694088',
              dateRanges: [
                {
                  startDate: '30daysAgo',
                  endDate: 'yesterday'
                }
              ],
              metrics: [
                {
                  expression: 'ga:sessions'
                }
              ]
            }
          ]
        }
      });
  
      // Extract the number of visitors from the API response
      const numberOfvisitors = analyticsData.data.reports[0].data.totals[0].values[0];
  
      // Render your dashboard view and pass the number of visitors
      res.render('adminhome.ejs', { numberOfvisitors });
    } catch (error) {
      console.error('Error fetching number of visitors:', error);
      res.status(500).send('An error occurred.');
    }
  });
  

router.get('/', admin_functions.get_admin_home_page);

export default router;