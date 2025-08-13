package com.PetPalace.petpalace.domain.model;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;

@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "tb_unidade")
public class Unidade {
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    @OneToOne
    @JoinColumn(name = "endereco_id")
    private Endereco endereco;
    @ManyToOne
    @JoinColumn(name = "servico_id")
    private Servico servico;
}
