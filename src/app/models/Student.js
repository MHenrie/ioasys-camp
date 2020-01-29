const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongoosastic = require('mongoosastic');

const Course = require('./Course');

const elasticConnection = require('../../config/elasticConnection.json');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        es_indexed: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
        es_schema: Course,
        es_indexed: true,
    },
    gender: {
        type: String,
        required: true,
    },
    birthdate: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    }
});

StudentSchema.plugin(mongoosastic, elasticConnection);
StudentSchema.plugin(mongoosePaginate);

const Model = mongoose.model('Student', StudentSchema);
Model.synchronize({}, {saveOnSynchronize: true});

module.exports = Model;