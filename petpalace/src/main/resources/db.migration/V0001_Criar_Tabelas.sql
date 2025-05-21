Create table tb_animal(
    id bigint not null primary key auto_increment,
    nome varchar(120),
    especie varchar(100),
    raca varchar(100),
    porte enum ('pequeno, medio, grande') not null,
    idade int,
    peso decimal(3,3),
    observacoes varchar(255),

    usuario_id bigint not null);

Create table tb_anuncios(
    id bigint not null primary key auto_increment,
    titulo varchar(50),
    descricao varchar(255),
    preco_diaria decimal(6,2),


);
CREATE TABLE enderecos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cep VARCHAR(10) NOT NULL,
    rua VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(50),
    bairro VARCHAR(100) NOT NULL,
    id_cidade INT NOT NULL,
    id_estado INT NOT NULL,
    id_pais INT NOT NULL,
    FOREIGN KEY (id_cidade) REFERENCES cidade(id),
    FOREIGN KEY (id_estado) REFERENCES estado(id),
    FOREIGN KEY (id_pais) REFERENCES pais(id)
);


CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    tipo_usuario ENUM('cliente', 'anfitriao') NOT NULL,
    data_cadastro DATE,
    foto_perfil VARCHAR(255),
    id_endereco INT,
    FOREIGN KEY (id_endereco) REFERENCES enderecos(id)
);

CREATE TABLE reservas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    id_anfitriao INT NOT NULL,
    id_animal INT NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    observacoes TEXT,

    FOREIGN KEY (id_cliente) REFERENCES usuarios(id),
    FOREIGN KEY (id_anfitriao) REFERENCES usuarios(id),
    FOREIGN KEY (id_animal) REFERENCES animais(id)
);


CREATE TABLE anuncios (
     id INT PRIMARY KEY AUTO_INCREMENT,
     id_anfitriao INT NOT NULL,
     titulo VARCHAR(100) NOT NULL,
     descricao TEXT,
     preco_diaria DECIMAL(6,2) NOT NULL,
     aceita_gatos BOOLEAN DEFAULT FALSE,
     aceita_caes BOOLEAN DEFAULT TRUE,
     vagas_disponiveis INT NOT NULL,
     id_endereco INT NOT NULL,
     data_criacao date,
     FOREIGN KEY (id_anfitriao) REFERENCES usuarios(id),
     FOREIGN KEY (id_endereco) REFERENCES enderecos(id)
    );
