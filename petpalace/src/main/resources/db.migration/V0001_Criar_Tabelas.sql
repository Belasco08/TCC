Create table tb_animal(
    id bigint not null primary key auto_increment,
    nome varchar(120),
    especie varchar(100),
    raca varchar(100),
    porte enum ('pequeno, medio, grande') not null,
    idade int,
    peso decimal,
    observacoes varchar(255),

    usuario_id bigint not null);

Create table tb_anuncios(
    id bigint not null primary key auto_increment,
    );