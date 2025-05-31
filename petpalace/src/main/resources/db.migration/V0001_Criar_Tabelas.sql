CREATE TABLE usuarios (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    tipo_usuario ENUM('cliente', 'anfitriao') NOT NULL
);
CREATE TABLE enderecos (
    id bigint not null PRIMARY KEY AUTO_INCREMENT,
    rua VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(100),
    bairro VARCHAR(100) NOT NULL,
    cep VARCHAR(15) NOT NULL,
    cidade_id bigint NOT NULL
);
CREATE TABLE cidades (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    estado_id bigint NOT NULL
);
CREATE TABLE estados (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sigla VARCHAR(2) NOT NULL,
    pais_id bigint NOT NULL
);
CREATE TABLE paises (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);
CREATE TABLE animais (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    especie ENUM('cachorro', 'gato') NOT NULL,
    raca VARCHAR(100),
    idade INT,
    peso DECIMAL(5,2),
    observacoes TEXT,
    id_usuario bigint NOT NULL
);
CREATE TABLE anuncios (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    id_anfitriao bigint NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco_diaria DECIMAL(10,2) NOT NULL,
    aceita_gatos BOOLEAN DEFAULT FALSE,
    aceita_caes BOOLEAN DEFAULT FALSE,
    vagas_disponiveis INT NOT NULL,
    id_endereco bigint NOT NULL,
    data_criacao DATE
);
CREATE TABLE reservas (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    id_cliente bigint NOT NULL,
    id_anuncio bigint NOT NULL,
    id_animal bigint NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    status ENUM('pendente', 'confirmada', 'cancelada') NOT NULL,
    data_reserva DATE
);
CREATE TABLE avaliacoes (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    id_reserva bigint NOT NULL,
    nota INT CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    data_avaliacao DATE
);
CREATE TABLE servico (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    preco DECIMAL(10,2) NOT NULL
);

CREATE TABLE agendamento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    data DATE NOT NULL,
    horario TIME NOT NULL,
    observacoes VARCHAR(255),

    usuario_id BIGINT NOT NULL,
    pet_id BIGINT NOT NULL,
    servico_id BIGINT NOT NULL,
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

ALTER TABLE agendamento ADD CONSTRAINT fk_agendamento_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id);
ALTER TABLE agendamento ADD CONSTRAINT fk_agendamento_pet FOREIGN KEY (pet_id) REFERENCES pet(id);
ALTER TABLE agendamento ADD CONSTRAINT fk_agendamento_servico FOREIGN KEY (servico_id) REFERENCES servico(id);
