const mongoose = require("mongoose");
const { Schema } = mongoose;

const responseSchema = new Schema(
    {
        qsnrId: String,
        qsnrType: String,
        totalMarks: Number,
        noOfParticipations: Number,
        selectChart: [
            new Schema(
                {
                    qId: Number,
                    aCount: Number,
                    bCount: Number,
                    cCount: Number,
                    dCount: Number,
                },
                { _id: false }
            )
        ],
        markChart: [
            new Schema(
                {
                    participantId: String,
                    participantName: String,
                    marks: Number
                },
                { _id: false }
            )
        ]
    }
);

mongoose.model("responses", responseSchema);