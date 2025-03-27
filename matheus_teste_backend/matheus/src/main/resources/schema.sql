create table if not exists driver(
                                    id_driver serial primary key,
                                    nm_driver varchar(255),
                                    dt_birth date,
                                    cpf varchar(255),
                                    model_car varchar(255),
                                    status boolean,
                                    gender varchar(255)
                                );

create table if not exists passanger(
                                        id_passanger serial primary key,
                                        nm_passanger varchar(255),
                                        dt_birth date,
                                        cpf varchar(255),
                                        gender varchar(255)
                                     );


create table if not exists trip(
                                id_trip serial primary key,
                                id_driver int,
                                id_passanger int,
                                trip_value numeric,
                                CONSTRAINT fk_id_driver FOREIGN KEY(id_driver) REFERENCES driver(id_driver),
                                CONSTRAINT fk_id_passanger FOREIGN KEY(id_passanger) REFERENCES passanger(id_passanger)
                                );
