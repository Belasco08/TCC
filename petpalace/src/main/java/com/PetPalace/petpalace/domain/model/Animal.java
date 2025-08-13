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
    private int idade;
    private boolean peso;
    private String observacoes;
    @OneToOne
    @JoinColumn(name = "porte_id")
    private Porte porte;
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

}
