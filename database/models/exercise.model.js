import mongoose from 'mongoose';
import exercise from '../schema/exercise.schema';

const Exercise = mongoose.model('Exercise', exercise)

export default Exercise;
