module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
      profilePic: DataTypes.STRING,
      address: DataTypes.STRING,
    },

    {
      underscored: true,
      timestamps: false,
    }
  );

  Customer.associate = (models) => {
    Customer.hasOne(models.HealthInfo, {
      foreignKey: {
        name: "customerId",
        allowNull: false,
      },
    });
    Customer.hasMany(models.Contact, {
      foreignKey: {
        name: "customerId",
        allowNull: false,
      },
    });
    Customer.hasMany(models.Order, {
      foreignKey: {
        name: "customerId",
        allowNull: false,
      },
    });

    Customer.hasMany(models.Review, {
      foreignKey: {
        name: "customerId",
        allowNull: false,
      },
    });
  };

  return Customer;
};
