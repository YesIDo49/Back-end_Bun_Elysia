import { Document, Schema, model } from 'mongoose';

export interface IKirby extends Document {
    name: string;
    image: string;
}

const schema = new Schema<IKirby>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model<IKirby>('kirby', schema);