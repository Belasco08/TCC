package com.PetPalace.petpalace.domain.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "tb_pais")
@Data
@EqualsAndHashCode (onlyExplicitlyIncluded = true)
public class Pais {
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String nome;

    private String sigla;

    private String codigoInter;
}
