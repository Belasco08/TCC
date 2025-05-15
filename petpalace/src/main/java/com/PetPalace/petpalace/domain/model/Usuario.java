package com.PetPalace.petpalace.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Date;

public class Usuario {
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
