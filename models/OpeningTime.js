module.exports = (sequelize, DataTypes) => {
  const OpeningTime = sequelize.define(
    'OpeningTime',
    {
      dayStart: DataTypes.STRING,

      dayEnd: DataTypes.STRING,

      timeStart: DataTypes.TIME,

      timeEnd: DataTypes.TIME,
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
