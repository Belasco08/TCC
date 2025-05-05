package com.PetPalace.petpalace.domain.model;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class Endereco {

    private Long id;
    private String cep;
    private String rua;
    private String numero;
    private String complemento;
    private String bairro;

    @ManyToOne
    @JoinColumn (name = "cidade_id")
    private Cidade cidade;
    @ManyToOne
    @JoinColumn (name = "estado_id")
    private Estado estado;
    @ManyToOne
    @JoinColumn (name = "pais_id")
    private Pais pais;
}
