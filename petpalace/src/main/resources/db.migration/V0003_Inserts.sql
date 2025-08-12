-- Paises
insert into paises (nome) values
('Brasil'),
('Chile'),
('Uruguai'),
('Paraguai')
('Argentina');

-- Estados
insert into estados (nome, sigla, pais_id) values
('São Paulo', 'SP', 1),
('Minas Gerais', 'MG', 1),
('Santa Catarina', 'SC', 1),
('Montevideo', 'MO', 4)
('Rio de Janeiro', 'RJ', 1),
('Buenos Aires', 'BA', 2);

-- Cidades
insert into cidades (nome, estado_id) values
('São Paulo', 1),
('Rio de Janeiro', 2),
('Buenos Aires', 3)
('Belo Horizonte', 4),
('Florianópolis', 5),
('Montevideo', 6);

-- Usuarios
insert into usuarios (nome, email, senha, telefone, tipo_usuario) values
('João Silva', 'joao@email.com', 'senha123', '11999999999', 'cliente'),
('Maria Oliveira', 'maria@email.com', 'senha456', '21988888888', 'anfitriao'),
('Carlos Pereira', 'carlos@email.com', 'senha789', '11333333333', 'anfitriao')
('Ana Lima', 'ana@email.com', 'senha321', '31999998888', 'cliente'),
('Bruno Rocha', 'bruno@email.com', 'senha654', '47988887777', 'anfitriao'),
('Fernanda Torres', 'fernanda@email.com', 'senha987', '51977776666', 'cliente'),
('Ricardo Mendes', 'ricardo@email.com', 'senha000', '21912341234', 'anfitriao');

-- Enderecos
insert into enderecos (rua, numero, complemento, bairro, cep, cidade_id) values
('Rua das Flores', '100', 'Apto 101', 'Centro', '01001-000', 1),
('Av. Atlântica', '500', NULL, 'Copacabana', '22001-000', 2),
('Calle Florida', '123', '3º andar', 'Microcentro', '1000', 3)
('Rua Afonso Pena', '200', NULL, 'Savassi', '30130-000', 4),
('Rua das Palmeiras', '50', 'Casa 2', 'Centro', '88010-000', 5),
('Av. Principal', '800', 'Apto 201', 'Centro', '11000', 6);

-- Animais
insert into animais (nome, especie, raca, idade, peso, observacoes, id_usuario) values
('Rex', 'cachorro', 'Golden Retriever', 3, 30.5, 'Muito amigável', 1),
('Mia', 'gato', 'Siamês', 2, 4.2, 'Gosta de brincar', 1)
('Thor', 'cachorro', 'Bulldog', 4, 25.0, 'Muito calmo', 4),
('Luna', 'gato', 'Persa', 1, 3.5, 'Gosta de dormir', 5),
('Bento', 'cachorro', 'Beagle', 6, 12.0, 'Late bastante', 3),
('Nina', 'gato', 'Vira-lata', 2, 4.0, 'Muito carinhosa', 6);

-- Anuncios
insert into anuncios (id_anfitriao, titulo, descricao, preco_diaria, aceita_gatos, aceita_caes, vagas_disponiveis, id_endereco, data_criacao) values
(2, 'Hospedagem para cães em SP', 'Espaço grande e confortável', 80.00, false, true, 3, 1, '2025-01-10'),
(3, 'Hospedagem para gatos no RJ', 'Ambiente calmo e seguro', 60.00, true, false, 2, 2, '2025-01-12')
(4, 'Pousada para pets em BH', 'Espaço amplo e arborizado', 90.00, true, true, 5, 4, '2025-01-20'),
(5, 'Hospedagem aconchegante em Floripa', 'Perto da praia e seguro', 100.00, false, true, 2, 5, '2025-01-22'),
(6, 'Hotel para gatos em Montevideo', 'Ambiente climatizado e tranquilo', 70.00, true, false, 4, 6, '2025-01-25');

-- Reservas
insert into reservas (id_cliente, id_anuncio, id_animal, data_inicio, data_fim, status, data_reserva) values
(1, 1, 1, '2025-02-01', '2025-02-05', 'confirmada', '2025-01-15'),
(1, 2, 2, '2025-03-01', '2025-03-03', 'pendente', '2025-02-10')
(4, 3, 8, '2025-04-01', '2025-04-05', 'pendente', '2025-03-10'),
(5, 4, 7, '2025-02-15', '2025-02-18', 'confirmada', '2025-02-01'),
(6, 5, 9, '2025-03-05', '2025-03-07', 'cancelada', '2025-02-20');

-- Avaliações
insert into avaliacoes (id_reserva, nota, comentario, data_avaliacao) values
(1, 5, 'Excelente serviço, muito atenciosos!', '2025-02-06'),
(2, 4, 'Bom atendimento, mas poderia melhorar no espaço', '2025-03-04')
(3, 5, 'Atendimento excelente, voltarei!', '2025-04-06'),
(4, 3, 'Bom, mas poderia ser mais limpo', '2025-02-19'),
(5, 4, 'Ótimo cuidado com os animais', '2025-03-08');

-- Serviços
insert into servico (descricao, nome, preco) values
('Banho completo para cães', 'Banho', 50.00),
('Tosa higiênica para cães', 'Tosa', 70.00),
('Banho e escovação para gatos', 'Banho Gatos', 40.00)
('Passeio diário de 30 minutos', 'Passeio Curto', 25.00),
('Passeio diário de 1 hora', 'Passeio Longo', 40.00),
('Hospedagem com banho incluso', 'Pacote Completo', 150.00);

-- Agendamentos
insert into agendamento (data, horario, observacoes, usuario_id, animais_id, servico_id) values
('2025-02-15', '2025-02-15 10:00:00', 'Banho semanal', 1, 1, 1),
('2025-02-20', '2025-02-20 14:00:00', 'Tosa completa', 1, 1, 2),
('2025-03-01', '2025-03-01 09:30:00', 'Banho especial para gato', 1, 2, 3)
('2025-03-15', '2025-03-15 08:00:00', 'Passeio matinal', 4, 7, 4),
('2025-03-20', '2025-03-20 16:00:00', 'Passeio longo à tarde', 5, 8, 5),
('2025-04-01', '2025-04-01 11:00:00', 'Pacote completo', 6, 9, 6);
