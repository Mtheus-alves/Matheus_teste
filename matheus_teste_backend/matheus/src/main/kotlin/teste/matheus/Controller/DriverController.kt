package teste.matheus.Controller

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import teste.matheus.Model.Driver
import teste.matheus.Repository.DriverRepository

@RestController
@RequestMapping("/driver")
@Api(tags = ["Motoristas"])
class DriverController(@Autowired private val driverRepository: DriverRepository) {

    @PostMapping("")
    @ApiOperation(value = "Cria um novo motorista.")
    fun createDriver(@RequestBody driver: Driver): ResponseEntity<Driver> {
        val savedDriver = driverRepository.save(driver)

        return ResponseEntity(savedDriver, HttpStatus.CREATED)
    }

    @GetMapping("")
    @ApiOperation(value = "Lista todos os motoristas.")
    fun getDrivers() = driverRepository.findAll()

    @PutMapping("/{id}/{status}")
    @ApiOperation(value = "Atualiza o status de um motorista a partir do seu ID.")
    fun UpdateStatusById(@PathVariable id: Long, @PathVariable status: String): ResponseEntity<String> {
        if (!driverRepository.existsById(id))
            return ResponseEntity(HttpStatus.NOT_FOUND)

        driverRepository.updateStatusByIdDriver(id, if (status == "false") false else true)
        return ResponseEntity.ok("Status atualizado com sucesso.")
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "Deleta um motorista a partir do seu ID.")
    fun deleteDriverById(@PathVariable id: Long): ResponseEntity<Driver> {
        if (!driverRepository.existsById(id))
            return ResponseEntity(HttpStatus.NOT_FOUND)

        driverRepository.deleteById(id)
        return ResponseEntity(HttpStatus.NO_CONTENT)
    }


}