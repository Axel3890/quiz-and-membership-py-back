import { Sequelize } from 'sequelize-typescript';
import { Modulo } from '../modulo/entities/modulo.entity';
import { Tema } from '../tema/entities/tema.entity';   
import { Subtema } from '../subtema/entities/subtema.entity'; 
import { Pago } from 'src/pago/entities/pago.entity';
import { Subscripcion } from 'src/subscripcion/entities/subscripcion.entity';
import { Favorito } from 'src/favorito/entities/favorito.entity';
import { Opcion } from 'src/opcion/entities/opcion.entity';
import { Pregunta } from 'src/pregunta/entities/pregunta.entity';
import { Resultado } from 'src/resultado/entities/resultado.entity';
import { User } from 'src/user/entities/user.entity';
import * as dotenv from 'dotenv';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      //  const sequelize = new Sequelize({
      //    dialect: 'postgres',  
      //    host: 'localhost',
      //    port: 5432,            // Puerto de PostgreSQL
      //    username: 'postgres',  // usuario de PostgreSQL
      //    password: 'admin',     // contraseña
      //    database: 'quiz',      // Nombre de la base de datos
      //  });

       const sequelize = new Sequelize(process.env.DATABASE_URL, {
         dialect: 'postgres',
         dialectOptions: {
           ssl: {
             require: true,
             rejectUnauthorized: false,
           }
         }
       });

      // Agregar los modelos que quieres sincronizar
      sequelize.addModels([Modulo, Tema, Subtema, Pago, Subscripcion, Favorito, Opcion, Pregunta, Resultado, User]);

      // Sincroniza los modelos con la base de datos
      await sequelize.sync({ force: false, alter: true });
      
      return sequelize;
    },
  },
];

