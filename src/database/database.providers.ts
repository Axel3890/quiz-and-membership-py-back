// src/database/database.providers.ts

import { Sequelize } from 'sequelize-typescript';
 // Importa tu modelo aquí

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',  // Cambiamos a PostgreSQL
        host: 'localhost',
        port: 5432,            // Puerto estándar de PostgreSQL
        username: 'postgres',  // Usuario de PostgreSQL
        password: 'password',  // Cambia esto por tu contraseña
        database: 'nestdb',    // Nombre de tu base de datos
      });
      sequelize.addModels([]); // Añade tus modelos aquí
      await sequelize.sync(); // Sincroniza los modelos con la base de datos
      return sequelize;
    },
  },
];
