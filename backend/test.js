const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sopanavdhutwar2022_db_user:StageFlow2026@stageflowcluster.i4bejt1.mongodb.net/?appName=StageFlowCluster")
.then(() => {
    console.log("✅ Connected");
    process.exit(0);
})
.catch((err) => {
    console.log(err);
    process.exit(1);
});