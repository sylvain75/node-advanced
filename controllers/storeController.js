const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
    res.render('index');
};

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add Store' });
};

exports.createStore = async (req, res) => {
    // res.json(req.body);
    const store =  await (new Store(req.body)).save();
    req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
    res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
    // query the DB for a list of all the stores
    const stores = await Store.find();
    res.render('stores', { title: 'Stores', stores });
};

exports.editStore = async (req, res) => {
    //1, find the store given the id
    const store = await Store.findOne({ _id: req.params.id});
    res.render('editStore', { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
    //1, find and upadate the store
    const store = await Store.findOneAndUpdate(
        { _id: req.params.id }, 
        req.body, 
        { 
            new: true, // return the new store instead of the old one
            runValidators: true // run the validators ex: "required"
        } 
    ).exec();
    req.flash("success", `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store ▶️</a>`);
    //2. redirect them to the store and tell them it worked
    res.redirect(`/store/${store._id}/edit`);
}
