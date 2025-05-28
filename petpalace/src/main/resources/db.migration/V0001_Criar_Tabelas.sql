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
    estado_id INT NOT NULL
);
CREATE TABLE estados (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sigla VARCHAR(2) NOT NULL,
    pais_id INT NOT NULL
);
CREATE TABLE paises (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);
CREATE TABLE animais (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    especie ENUM('cachorro', 'gato') NOT NULL,
    raca VARCHAR(100),
    idade INT,
    peso DECIMAL(5,2),
    observacoes TEXT,
    id_usuario INT NOT NULL
);
CREATE TABLE anuncios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_anfitriao INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco_diaria DECIMAL(10,2) NOT NULL,
    aceita_gatos BOOLEAN DEFAULT FALSE,
    aceita_caes BOOLEAN DEFAULT FALSE,
    vagas_disponiveis INT NOT NULL,
    id_endereco INT NOT NULL,
    data_criacao DATE
);
CREATE TABLE reservas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    id_anuncio INT NOT NULL,
    id_animal INT NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    status ENUM('pendente', 'confirmada', 'cancelada') NOT NULL,
    data_reserva DATE
);
CREATE TABLE avaliacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_reserva INT NOT NULL,
    nota INT CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    data_avaliacao DATE
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

TODOS OS INTS TEM QUE SUBSTITUIR POR BIGINT