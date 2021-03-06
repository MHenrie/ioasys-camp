const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const Student = require('./Student');

const elasticConnection = require('../../config/elasticConnection.json');

const RequestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        es_indexed: true,
        es_type: 'nested',
        es_include_in_parent: true,
    },
    helper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        es_indexed: true,
        es_type: 'nested',
        es_include_in_parent: true,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
        es_indexed: true,
        es_type: 'nested',
        es_include_in_parent: true,
    },
    title: {
        type: String,
        required: true,
        es_indexed: true,
    },
    body: {
        type: String,
        required: true,
        es_indexed: true,
    },
    status: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

elasticConnection['populate'] = [
    {
        path: 'requester', model: Student, populate: [
            { path: 'course' }
        ]
    },
    {
        path: 'helper', model: Student, populate: [
            { path: 'course' }
        ]
    },
    { path: 'subject' },
]

RequestSchema.plugin(mongoosastic, elasticConnection);

const Model = mongoose.model('Request', RequestSchema);
Model.synchronize({}, { saveOnSynchronize: true });

module.exports = Model;