package com.PetPalace.petpalace.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;


@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "tb_usuario")
public class Usuario {

    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private String telefone;
    private String quantidade_animal;
    private Date data_checkin;
    private Date data_checkout;
    private String foto_perfil;

    @Column(name = "tipo_usuario")
    private String tipoUsuario;

    @ManyToOne
    @JoinColumn (name = "endereco_id")
    private Endereco endereco;


}
