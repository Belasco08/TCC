package com.PetPalace.petpalace.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table (name = "tb_anuncios")
public class Anuncios {
     @EqualsAndHashCode.Include
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;

     // private id_anfitriao - perguntar para o bidu como fzr isso

     private String titulo;
     private String Descricao;
     private BigDecimal preco_diaria;
     private String fotos;
     private Boolean aceita_gatos;
     private Boolean aceita_caes;
     private int vagas_disponiveis;
     @OneToOne(cascade = CascadeType.ALL)
     @JoinColumn(name = "mapa_id")
     private Mapa mapa;
     private LocalDateTime data_criacao;
     @ManyToOne
     @JoinColumn(name = "unidade_id")
     private Unidade unidade;

}
