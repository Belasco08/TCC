package com.PetPalace.petpalace.domain.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table (name = "tb_anuncios")
public class Anuncios {
     private Long id;

     // private id_anfitriao - perguntar para o bidu como fzr isso

     private String titulo;
     private String Descricao;
     private BigDecimal preco_diaria;
     private Boolean aceita_gatos;
     private Boolean aceita_caes;
     private int vagas_disponiveis;
     private int id_endereco;
     private LocalDateTime data_criacao;
}
