module.exports = require('./BaseModel').extend(function() {
  this.mongo = require('mongodb');
  this.mongoose = require('mongoose');
  this.mongooseAuth = require('mongoose-auth');
  this.Schema = this.mongoose.Schema;
  this.ObjectId = this.Schema.ObjectId;
  this.mongoose.connect('mongodb://localhost/BogoTIC');

  this.categorias = ['Tecnología y deuda pública', 'Tecnología e investigación social',
                     'Tecnología y productividad', 'Tecnología y educación',
                     'Tecnología y fomento', 'Tecnología y gobierno', 'Tecnología y cultura',
                     'Tecnología e igualdad', 'Tecnología y derechos', 'Tecnología y pirateria']

  this.localidades = ['Antonio Nariño', 'Barrios Unidos', 'Bosa',
                      'Chapinero', 'Ciudad Bolívar', 'Engativá', 'Fontibón',
                      'Kennedy', 'La Candelaria', 'Los Mártires', 'Puente Aranda',
                      'Rafael Uribe Uribe', 'San Cristóbal', 'Santa Fe', 'Suba',
                      'Sumapaz', 'Teusaquillo', 'Tunjuelito', 'Usaquén', 'Usme']
})
  .methods({
    create: function(resource, callback) {
      var _resource = new this.DBModel(resource);
      _resource.save(function(err) {
        if(err) throw new Error(err);
      })
    },
    show: function(id, callback) {
      return this.DBModel.findById(id, callback)  
    },
    remove: function(id, callback) {
      var _resource = this.DBModel.findById(id);
      _resource.remove(function(err, callback) {
        if(err) throw new Error(err);
        if(callback) callback;
      });        
    },
    modify: function(id, params, callback) {
      var self = this;
      this.DBModel.findById(id, function(resource, callback) {
        resource.update(self.params.id, self.params, callback);
      });
    },
    all: function(callback) {
      this.DBModel.find({}, function(err, items) {
        if(err) throw new Error(err);
        if(callback) callback(items);
      });
    }
  })
