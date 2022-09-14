const haversine = require('haversine-distance')

module.exports = (sequelize, DataTypes) => {
  const Pharmacy = sequelize.define(
    'Pharmacy',
    {
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
        validate: {
          isEmail: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
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
    Pharmacy.hasMany(models.History, {
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
