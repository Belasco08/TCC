package com.PetPalace.petpalace.domain.model;

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
    @ManyToOne
    @JoinColumn (name = "endereco_id")
    private Endereco endereco;


}
