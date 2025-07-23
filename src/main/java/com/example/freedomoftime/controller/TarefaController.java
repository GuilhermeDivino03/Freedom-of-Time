package com.example.freedomoftime.controller;

import com.example.freedomoftime.entity.Tarefa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.freedomoftime.repository.TarefaRepository;

import java.util.List;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {

    @Autowired
    private final TarefaRepository tarefaRepository;


    public TarefaController(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    @PostMapping
    public Tarefa criarTarefa(@RequestBody Tarefa tarefa){
        return tarefaRepository.save(tarefa);
    }

    @GetMapping
    public List<Tarefa> listarTarefa(){
        return tarefaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Tarefa buscarTarefaPorId(@PathVariable Long id){
        return tarefaRepository.findById(id).orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
    }

    @PutMapping("{id}")
    public Tarefa atualizarTarefa(@PathVariable long id, @RequestBody Tarefa novaTarefa) {
        Tarefa tarefa = tarefaRepository.findById(id).orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
        tarefa.setNome(novaTarefa.getNome());
        tarefa.setData(novaTarefa.getData());
        tarefa.setStatus(novaTarefa.getStatus());
        tarefa.setObservacao(novaTarefa.getObservacao());
        return tarefaRepository.save(tarefa);
    }

    @DeleteMapping("/{id}")
    public void deletarTarefa(@PathVariable Long id){
        tarefaRepository.deleteById(id);
    }


}
