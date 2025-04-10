package com.PetPalace.petpalace.domain.model;

import jakarta.persistence.*;


@Entity
@Table (name = "tb_estado")
public class Estado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;

    private String uf;

    @ManyToOne
    @JoinColumn (name = "pais_id")
    private Pais pais;

}
