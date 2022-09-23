module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      quantity: {
        type: DataTypes.INTEGER,
        dafaultValue: 0,
      },

      price: {
        type: DataTypes.FLOAT,
        dafaultValue: 0,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  )

  Product.associate = (models) => {
    Product.hasMany(models.OrderDetail, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
    })
    Product.belongsTo(models.Pharmacy, {
      foreignKey: {
        name: 'pharmacyId',
        allowNull: false,
      },
    })
  }

  return Product
}
