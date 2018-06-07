const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
    userId: String,
    userName: String,
    participationList: [
        new Schema(
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
            },
            { _id: false }
        )
    ],
    questionnaireList: [
        new Schema(
            {
                // tournament: { type: Schema.Types.ObjectId, ref: 'Tournament' },
                qsnrId: String,
                qsnrTitle: String,
                qsnrDescription: String,
                qsnrType: String,
                qsnrStatus: String,
                noOfQuestions: Number,
                totalMarks: Number,
                noOfParticipations: Number
            },
            { _id: false }
        )
    ]
});

mongoose.model("profile", profileSchema);