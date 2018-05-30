const mongoose = require("mongoose");
const { Schema } = mongoose;

const qsnrSchema = new Schema(
    {
        about: new Schema(
            {
                qsnrTitle: String,
                qsnrDescription: String,
                qsnrType: String,
                qsnrStatus: String,
                creatorId: String,
                creatorName: String,
                noOfQuestions: Number
            },
            { _id: false }
        ),
        questionnaire: [
            new Schema(
                {
                    qId: Number,
                    qText: String,
                    options: new Schema(
                        {
                            opA: String,
                            opB: String,
                            opC: String,
                            opD: String
                        },
                        { _id: false }
                    )
                },
                { _id: false }
            )
        ],
        stats: new Schema(
            {
                totalMarks: Number,
                correctOps: [
                    new Schema(
                        {
                            qId: Number,
                            correctOp: String
                        },
                        { _id: false }
                    )
                ]
            },
            { _id: false }
        )
    }
);

mongoose.model("questionnaires", qsnrSchema);