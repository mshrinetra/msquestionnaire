const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
    userId: String,
    userName: String,
    participationList: [
        {
            qsnrId: String,
            qsnrTitle: String,
            qsnrDescription: String,
            qsnrType: String,
            qsnrStatus: String,
            creatorId: String,
            creatorName: String,
            totalMarks: Number,
            scoredMarks: Number
        }
    ],
    questionnaireList: [
        {
            qsnrId: String,
            qsnrTitle: String,
            qsnrDescription: String,
            qsnrType: String,
            qsnrStatus: String,
            noOfQuestions: Number,
            totalMarks: Number,
            noOfParticipations: Number
        }
    ]
});

mongoose.model("profile", profileSchema);