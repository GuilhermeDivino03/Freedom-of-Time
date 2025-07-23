package com.example.freedomoftime.service;

import com.example.freedomoftime.entity.Tarefa;
import com.example.freedomoftime.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class TarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;

    public List<Tarefa> listarTarefas(){
        return tarefaRepository.findAll();
    }

    public Tarefa buscarTarefaPorId(@PathVariable Long id){
        return tarefaRepository.findById(id).orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
    }

    public Tarefa criarTarefa(@RequestBody Tarefa tarefa){
        return tarefaRepository.save(tarefa);
    }

    public Tarefa atualizarTarefa(Long id, Tarefa novaTarefa){
        Tarefa tarefa = tarefaRepository.findById(id).orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
        tarefa.setNome(novaTarefa.getNome());
        tarefa.setData(novaTarefa.getData());
        tarefa.setStatus(novaTarefa.getStatus());
        tarefa.setObservacao(novaTarefa.getObservacao());
        return tarefaRepository.save(tarefa);
    }

    public void deletarTarefa(Long id){
        tarefaRepository.deleteById(id);
    }

}
