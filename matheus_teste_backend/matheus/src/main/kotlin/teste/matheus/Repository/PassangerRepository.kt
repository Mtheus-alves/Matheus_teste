package teste.matheus.Repository

import org.springframework.data.repository.CrudRepository
import teste.matheus.Model.Passanger

interface PassangerRepository: CrudRepository<Passanger, Long> {
}