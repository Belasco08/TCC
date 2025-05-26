package com.PetPalace.petpalace.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "tb_animal")
public class Animal {
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String especie;
    private String raca;
    public String porte; // perguntar para o Bidu uma maneira de deixar como escolha, pique o Enum//
    private int idade;
    private boolean peso;
    private String observacoes;

    @OneToMany
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

}
