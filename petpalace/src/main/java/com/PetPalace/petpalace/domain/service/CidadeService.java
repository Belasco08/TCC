package com.PetPalace.petpalace.domain.service;


import com.PetPalace.petpalace.domain.exception.EntidadeEmUsoException;
import com.PetPalace.petpalace.domain.exception.EntidadeNaoEncontradaException;
import com.PetPalace.petpalace.domain.model.Cidade;
import com.PetPalace.petpalace.domain.repository.CidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

@Service
public class   CidadeService {
        @Autowired
        private CidadeRepository cidadeRepository;

        public Cidade salvar(Cidade cidade){
                return cidadeRepository.save(cidade);
        }

        public void excluir (Long id){
                try {
                        cidadeRepository.deleteById(id);
                }
                catch (DataIntegrityViolationException e){
                        throw  new EntidadeEmUsoException(String.format("Cidade ou codigo %d não pode ser encontrado, pois está em uso", id));
                }
                catch (EmptyResultDataAccessException e){
                        throw new EntidadeNaoEncontradaException(String.format("Não existe cadastro de cidade com codigo %d", id));
                }
        }
}
