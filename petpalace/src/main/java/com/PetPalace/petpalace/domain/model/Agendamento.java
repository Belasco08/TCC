package com.PetPalace.petpalace.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "tb_agendamento")
public class Agendamento {
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate data;
    private LocalTime horario;


    @JoinColumn(name = "animal_id")
    private Animal animal;
    @JoinColumn(name = "servico_id")
    private Servico servico;
    @JoinColumn(name = "Usuario_id")
    private Usuario usuario;
}
