module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
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
      profilePic: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  )

  Customer.associate = (models) => {
    Customer.hasOne(models.HealthInfo, {
      foreignKey: {
        name: 'customerId',
        allowNull: false,
      },
    })
    Customer.hasMany(models.Contact, {
      foreignKey: {
        name: 'customerId',
        allowNull: false,
      },
    })
    Customer.hasMany(models.Address, {
      foreignKey: {
        name: 'customerId',
        allowNull: false,
      },
    })
    Customer.hasMany(models.Order, {
      foreignKey: {
        name: 'customerId',
        allowNull: false,
      },
    })
    Customer.hasMany(models.History, {
      foreignKey: {
        name: 'customerId',
        allowNull: false,
      },
    })
    Customer.hasMany(models.Review, {
      foreignKey: {
        name: 'customerId',
        allowNull: false,
      },
    })
  }

  return Customer
}
