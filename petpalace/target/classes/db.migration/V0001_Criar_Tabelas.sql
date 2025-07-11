create table usuarios (
    id bigint primary key auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(255) not null,
    telefone varchar(20),
    tipo_usuario enum('cliente', 'anfitriao') not null
);
create table enderecos (
    id bigint not null primary key auto_increment,
    rua varchar(100) not null,
    numero varchar(10) not null,
    complemento varchar(100),
    bairro varchar(100) not null,
    cep varchar(15) not null,
    cidade_id bigint not null
);
create table cidades (
    id bigint primary key auto_increment,
    nome varchar(100) not null,
    estado_id bigint not null
);
create table estados (
    id bigint primary key auto_increment,
    nome varchar(100) not null,
    sigla varchar(2) not null,
    pais_id bigint not null
);
create table paises (
    id bigint primary key auto_increment,
    nome varchar(100) not null
);
create table animais (
    id bigint primary key auto_increment,
    nome varchar(100) not null,
    especie enum('cachorro', 'gato') not null,
    raca varchar(100),
    idade int,
    peso decimal(5,2),
    observacoes text,
    id_usuario bigint not null
);
create table anuncios (
    id bigint primary key auto_increment,
    id_anfitriao bigint not null,
    titulo varchar(100) not null,
    descricao text,
    preco_diaria decimal(10,2) not null,
    aceita_gatos boolean default false,
    aceita_caes boolean default false,
    vagas_disponiveis int not null,
    id_endereco bigint not null,
    data_criacao date
);
create table reservas (
    id bigint primary key auto_increment,
    id_cliente bigint not null,
    id_anuncio bigint not null,
    id_animal bigint not null,
    data_inicio date not null,
    data_fim date not null,
    status enum('pendente', 'confirmada', 'cancelada') not null,
    data_reserva date
);
create table avaliacoes (
    id bigint primary key auto_increment,
    id_reserva bigint not null,
    nota int check (nota >= 1 and nota <= 5),
    comentario text,
    data_avaliacao date
);
create table servico (
    id bigint auto_increment primary key,
    descricao varchar(255),
    nome varchar(100) not null,
    preco decimal(10,2) not null
);

create table agendamento (
    id bigint auto_increment primary key,
    data date not null,
    horario datetime not null,
    observacoes varchar(255),
    usuario_id bigint not null,
    pet_id bigint not null,
    servico_id bigint not null,
);

alter table enderecos add constraint fk_endereco_cidade foreign key (cidade_id) references cidades(id);
alter table cidades add constraint fk_cidade_estado foreign key (estado_id) references estados(id);
alter table estados add constraint fk_estado_pais foreign key (pais_id) references paises(id);
alter table animais add constraint fk_animal_usuario foreign key (id_usuario) references usuarios(id);
alter table anuncios add constraint fk_anuncio_anfitriao foreign key (id_anfitriao) references usuarios(id);
alter table anuncios add constraint fk_anuncio_endereco foreign key (id_endereco) references enderecos(id);
alter table reservas add constraint fk_reserva_cliente foreign key (id_cliente) references usuarios(id);
alter table reservas add constraint fk_reserva_anuncio foreign key (id_anuncio) references anuncios(id);
alter table reservas add constraint fk_reserva_animal foreign key (id_animal) references animais(id);
alter table agendamento add constraint fk_agendamento_usuario foreign key (usuario_id) references usuario(id);
alter table agendamento add constraint fk_agendamento_pet foreign key (pet_id) references pet(id);
alter table agendamento add constraint fk_agendamento_servico foreign key (servico_id) references servico(id);
