import mongoose from "mongoose";
import {nanoid} from "nanoid";

// tslint:disable-next-line:interface-name
export interface TodoDocument extends mongoose.Document {
    todoId: string;
    description: string;
    deadline: Date;
    completed: boolean;
    filename: string;
}

const TodoSchema = new mongoose.Schema({
    todoId: {type: String, required: true, unique: true, default: () => nanoid(10)},
    // tslint:disable-next-line:object-literal-sort-keys
    description: {type: String, required: true},
    deadline: {type: Date, required: true},
    completed: {type: Boolean, default: false},
    filepath: {type: String},
});

export default mongoose.model<TodoDocument>("Todo", TodoSchema);
