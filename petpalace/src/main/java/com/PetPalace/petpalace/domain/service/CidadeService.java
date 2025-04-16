package com.PetPalace.petpalace.domain.service;


import com.PetPalace.petpalace.domain.model.Cidade;
import com.PetPalace.petpalace.domain.repository.CidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CidadeService {
        @Autowired
        private CidadeRepository cidadeRepository;

        public Cidade salvar(Cidade cidade){
                return cidadeRepository.salvar(cidade);
        }
}
