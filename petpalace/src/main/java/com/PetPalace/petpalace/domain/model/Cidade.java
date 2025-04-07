package com.PetPalace.petpalace.domain.model;

import jakarta.persistence.*;


@Entity
@Table(name = "tb_cidade")
public class Cidade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cep;


    @ManyToOne
    @JoinColumn( name = "estado_id")
    private Estado estado;


}
