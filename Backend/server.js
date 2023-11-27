const express = require('express');
require('dotenv').config();
const port = process.env.PORT;
const dbConnect = require('./config/db-connect.js');
const errorHandler = require('./middlewares/error-handler.js');


dbConnect();

const app = express();

app.use(express.json());   


app.use('/api/users', require('./routes/user-routes.js'));
app.use('/api', require('./routes/other-routes.js'));
app.use('/api/leaves-remain', require('./routes/leave-remain-routes.js'));

app.use('/api/access-request', require('./routes/access-routes.js'))

app.use('/api/transport-request', require('./routes/transport-routes.js'))

app.use('/api/leave-request', require('./routes/leave-request-routes.js'))

app.use('/api/tech-survey', require('./routes/tech-survey-routes.js'))

app.use('/api/company-survey', require('./routes/company-survey-routes.js'))

app.use('/api/feedback', require('./routes/feedback-routes.js'))

app.use('/api/payslip', require('./routes/payslip-routes.js'))

app.use(errorHandler);

app.listen(port, ()=> {
    console.log(`Server is listening at http://localhost:${port}`);
})