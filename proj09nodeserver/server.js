const app = require("./app");

app.listen(app.get('port'), ()=>{
    console.log(`Server runnig on http://localhost:${app.get('port')}`);
});