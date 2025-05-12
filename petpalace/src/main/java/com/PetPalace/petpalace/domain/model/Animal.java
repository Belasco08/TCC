package com.PetPalace.petpalace.domain.model;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

public class Animal {
    private Long id;
    private String nome;
    private String especie;
    private String raca;
    private String porte; // perguntar para o Bidu uma maneira de deixar como escolha, pique o Enum//
    private int idade;
    private boolean peso;
    private String observacoes;

    @OneToMany
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

}
