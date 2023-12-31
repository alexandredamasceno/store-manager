const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addNewSale = async (objeto) =>
    connection()
        .then((db) => db.collection('sales').insertOne(objeto))
        .then((re) => ({
            _id: re.insertedId,
            itensSold: re.ops[0].itensSold,
        }));

const getAllSales = async () =>
        connection()
            .then((db) => db.collection('sales').find().toArray())
            .then((re) => ({
                sales: re,
            }));

const getSaleById = async (id) =>
            connection()
                .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));

const updateSale = async (id, array) =>
            connection()
                .then((db) => db.collection('sales')
                    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: array } }))
                    .then((re) => re);

// Aprendi a usar o findOneAndDelete aqui:https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndDelete/
const deleteSale = (id) =>
            connection()
                .then((db) => db.collection('sales').findOneAndDelete({ _id: ObjectId(id) }))
                .then((re) => re.value);

module.exports = {
    addNewSale,
    getAllSales,
    getSaleById,
    updateSale,
    deleteSale,
};
