package teste.matheus.Model

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.math.BigDecimal

@Entity
data class Trip (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_trip")
    var idTrip: Long? = null,

    @field:NotNull
    @Column(name = "id_driver")
    var idDriver: Long? = null,

    @field:NotNull
    @Column(name = "id_passanger")
    var idPassanger: Long? = null,

    @field:NotNull
    @Column(name = "start_address")
    var startAddress: String? = null,

    @field:NotNull
    @Column(name = "end_address")
    var endAddress: String? = null
)
