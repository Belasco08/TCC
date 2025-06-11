package com.caua.foodta.domain.Service;


import com.caua.foodta.domain.exception.EntidadeEmUsoException;
import com.caua.foodta.domain.exception.EntidadeNaoEncontradaException;
import com.caua.foodta.domain.model.FormaPagamento;
import com.caua.foodta.domain.repository.FormaPagamentoRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

@Service
public class FormaPagamentoService {
    private FormaPagamentoRepository formaPagamentoRepository;

    public FormaPagamento salvar (FormaPagamento formaPagamento){
        return formaPagamentoRepository.save(formaPagamento);
    }

    public void excluir  (Long id){
        try {
            formaPagamentoRepository.deleteById(id);
        }
        catch (DataIntegrityViolationException e){
            throw new EntidadeEmUsoException(String.format("FormaDePagamento ou código  %d não pode ser removida, pois está em uso.", id));
        }
        catch (EmptyResultDataAccessException e){
            throw  new EntidadeNaoEncontradaException(String.format("Não existe cadastro de FormaDePagamento com codigo %d",id));
        }
    }
}
