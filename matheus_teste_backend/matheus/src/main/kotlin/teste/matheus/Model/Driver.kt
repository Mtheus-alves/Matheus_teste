package teste.matheus.Model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.time.LocalDate

@Entity
data class Driver(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_driver")
    var idDriver: Long? = null,

    @field:NotBlank
    @Column(name = "nm_driver")
    var nmDriver: String? = null,

    @field:NotNull
    @Column(name = "dt_birth")
    var dtBirth: LocalDate? = null,

    @field:NotBlank
    var cpf: String? = null,

    @field:NotBlank
    @Column(name = "model_car")
    var modelCar: String? = null,

    @field:NotNull
    var status: Boolean = false,

    @field:NotBlank
    var gender: String? = null
)
