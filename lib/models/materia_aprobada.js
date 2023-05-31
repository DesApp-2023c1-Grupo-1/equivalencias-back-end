import { Model, DataTypes } from 'sequelize';

export default class Materia_aprobada extends Model {
  static init(sequelize) {
    return super.init(
      // columnas que va a tener la tabla
      {
        nota: DataTypes.INTEGER,
        carga_horaria: DataTypes.INTEGER,
        año_aprobacion: DataTypes.DATE,
        nombre_materia: DataTypes.STRING,
        certificado: DataTypes.BOOLEAN,
        //Agregado
        archivo: DataTypes.STRING,
      },
      // opciones
      {
        sequelize,
        // nombre de la tabla
        tableName: 'Materia_aprobada',
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Equivalencia, { foreignKey: 'EquivalenciumId' });
    this.belongsTo(models.Universidad_origen, {
      foreignKey: 'UniversidadOrigenId',
    });
  }
}
