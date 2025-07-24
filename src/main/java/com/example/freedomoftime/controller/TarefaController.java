package com.example.freedomoftime.controller;

import com.example.freedomoftime.entity.Tarefa;
import com.example.freedomoftime.service.TarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.freedomoftime.repository.TarefaRepository;

import java.util.List;

@RestController
@RequestMapping("/tarefas")
@CrossOrigin(origins = "*") // Acesso ao frontend
public class TarefaController {

    @Autowired
    private TarefaService tarefaService;


    @PostMapping
    public Tarefa criarTarefa(@RequestBody Tarefa tarefa){
        return tarefaService.criarTarefa(tarefa);
    }

    @PostMapping("/lote")
    public List<Tarefa> criarVariasTarefas(@RequestBody List<Tarefa> tarefa){
        return tarefaService.criarTarefaEmLote(tarefa);
    }

    @GetMapping
    public List<Tarefa> listarTarefa(){
        return tarefaService.listarTarefas();
    }

    @GetMapping("/{id}")
    public Tarefa buscarTarefaPorId(@PathVariable Long id){
        return tarefaService.buscarTarefaPorId(id);
    }

    @PutMapping("{id}")
    public Tarefa atualizarTarefa(@PathVariable long id, @RequestBody Tarefa novaTarefa) {
        return tarefaService.atualizarTarefa(id, novaTarefa);
    }

    @DeleteMapping("/{id}")
    public void deletarTarefa(@PathVariable Long id){
        tarefaService.deletarTarefa(id);
    }


}
