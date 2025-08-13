package com.PetPalace.petpalace.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "tb_agendamento")
public class Agendamento {
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String quantidade_animal;
    @Column(name = "dataCheckin", columnDefinition = "datetime")
    private Date data_checkin;
    @Column(name = "dataCheckout", columnDefinition = "datetime")
    private Date data_checkout;
    @Column(name = "data", columnDefinition = "datetime")
    private LocalDate data;
    @Column(name = "horario", columnDefinition = "datetime")
    private LocalDateTime horario;
    @ManyToOne
    @JoinColumn(name = "unidade_id")
    private Unidade unidade;
    @ManyToOne
    @JoinColumn(name = "animal_id")
    private Animal animal;
    @OneToOne
    @JoinColumn(name = "servico_id")
    private Servico servico;
    @ManyToOne
    @JoinColumn(name = "Usuario_id")
    private Usuario usuario;
}
