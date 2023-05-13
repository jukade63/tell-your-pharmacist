module.exports = (sequelize, DataTypes) => {
  const OpeningTime = sequelize.define(
    'OpeningTime',
    {
      dayStart: {
        type: DataTypes.STRING,
        defaultValue: 'จันทร์'
      },

      dayEnd: {
        type: DataTypes.STRING,
        defaultValue: 'ศุกร์'
      },

      timeStart: {
        type: DataTypes.TIME,
        defaultValue: '08:00:00'
      },

      timeEnd: {
        type: DataTypes.TIME,
        defaultValue: '20:00:00'
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  )

  OpeningTime.associate = (models) => {
    OpeningTime.belongsTo(models.Pharmacy, {
      foreignKey: {
        name: 'pharmacyId',
        allowNull: false,
      },
    })
  }

  return OpeningTime
}
