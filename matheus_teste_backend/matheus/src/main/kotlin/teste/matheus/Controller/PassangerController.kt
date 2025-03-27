package teste.matheus.Controller

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import teste.matheus.Model.Driver
import teste.matheus.Model.Passanger
import teste.matheus.Repository.PassangerRepository

@RestController
@RequestMapping("/passanger")
@Api(tags = ["Passageiros"])
class PassangerController(@Autowired private val passangerRepository: PassangerRepository) {

    @PostMapping("")
    @ApiOperation(value = "Cria um novo passageiro.")
    fun createPassanger(@RequestBody passanger: Passanger): ResponseEntity<Passanger> {
        val savedPassanger = passangerRepository.save(passanger)

        return ResponseEntity(savedPassanger, HttpStatus.CREATED)
    }

    @GetMapping("")
    @ApiOperation(value = "Lista todos os passageiros.")
    fun getPassangers() = passangerRepository.findAll()

    @DeleteMapping("/{id}")
    @ApiOperation(value = "Deleta um passageiro a partir do seu ID.")
    fun deletePassangerById(@PathVariable id: Long): ResponseEntity<Passanger> {
        if (!passangerRepository.existsById(id))
            return ResponseEntity(HttpStatus.NOT_FOUND)

        passangerRepository.deleteById(id)
        return ResponseEntity(HttpStatus.NO_CONTENT)
    }
}