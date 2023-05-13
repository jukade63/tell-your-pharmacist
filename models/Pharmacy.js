const haversine = require('haversine-distance')

module.exports = (sequelize, DataTypes) => {
  const Pharmacy = sequelize.define(
    'Pharmacy',
    {
      id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      storeName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      isOpen: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      profilePic: DataTypes.STRING,
      coverPhoto: DataTypes.STRING,
      latitude: DataTypes.FLOAT(10, 6),
      longitude: DataTypes.FLOAT(10, 6),
      distance: DataTypes.VIRTUAL,
    },
    {
      underscored: true,
      timestamps: false,
    }
  )

  Pharmacy.associate = (models) => {
    Pharmacy.hasOne(models.OpeningTime, {
      foreignKey: {
        name: 'pharmacyId',
        allowNull: false,
      },
    })
    Pharmacy.hasMany(models.Product, {
      foreignKey: {
        name: 'pharmacyId',
        allowNull: false,
      },
    })
    Pharmacy.hasMany(models.Contact, {
      foreignKey: {
        name: 'pharmacyId',
        allowNull: false,
      },
    })
    Pharmacy.hasMany(models.Order, {
      foreignKey: {
        name: 'pharmacyId',
        allowNull: false,
      },
    })
 
    Pharmacy.hasMany(models.Review, {
      foreignKey: {
        name: 'pharmacyId',
        allowNull: false,
      },
    })
  }

  return Pharmacy
}
