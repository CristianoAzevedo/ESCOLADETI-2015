
package br.unicesumar.restserver.disciplina;

import java.util.List;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/disciplinas")
@Transactional
public class DisciplinaController {
    @Autowired
    private EntityManager em;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<Disciplina> getDisciplinas(){
        return em.createQuery("from Disciplina d").getResultList();
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public void criarDisciplina(@RequestBody Disciplina d){
        em.merge(d);
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deletarDisciplina(@PathVariable Long id){
        em.createQuery("delete from Disciplina d where d.id = :id").setParameter("id", id).executeUpdate();
    }
    
    @RequestMapping(method = RequestMethod.PUT)
    public void alterarCor(@RequestBody Disciplina d){
        em.merge(d);
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Disciplina getById(@PathVariable Long id){
        Disciplina d = em.find(Disciplina.class, id);
        return d;
    }
}
