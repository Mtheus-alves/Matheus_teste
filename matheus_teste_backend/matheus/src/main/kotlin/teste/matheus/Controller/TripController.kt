package teste.matheus.Controller

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import teste.matheus.Dto.TripDTO
import teste.matheus.Model.Driver
import teste.matheus.Model.Trip
import teste.matheus.Repository.TripRepository

@RestController
@RequestMapping("/trip")
@Api(tags = ["Corridas"])
class TripController(
    @Autowired private val tripRepository: TripRepository,
) {

    @PostMapping("")
    @ApiOperation(value = "Cria uma nova corrida.")
    fun createTrip(@RequestBody trip: Trip): ResponseEntity<Trip> {
        val savedTrip = tripRepository.save(trip)

        return ResponseEntity(savedTrip, HttpStatus.CREATED)
    }

    @GetMapping("")
    @ApiOperation(value = "Lista as corridas, associando ao motorista e passageiro e com filtros por ambos.")
    fun getTrips(
        @RequestParam(required = false) nmDriver: String?,
        @RequestParam(required = false) nmPassanger: String?
    ): List<TripDTO> {
        val driver = if (nmDriver.isNullOrBlank()) null else nmDriver
        val passanger = if (nmPassanger.isNullOrBlank()) null else nmPassanger

        return tripRepository.getTrips(driver, passanger)
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "Deleta uma corrida a partir do ID")
    fun deleteTrip(@PathVariable id: Long): ResponseEntity<Trip> {
        if (!tripRepository.existsById(id))
            return ResponseEntity(HttpStatus.NOT_FOUND)

        tripRepository.deleteById(id)
        return ResponseEntity(HttpStatus.NO_CONTENT)
    }
}