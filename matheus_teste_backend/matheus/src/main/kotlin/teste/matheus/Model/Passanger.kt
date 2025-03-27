package teste.matheus.Model

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.time.LocalDate

@Entity
data class Passanger (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_passanger")
    var idPassanger: Long? = null,

    @field:NotBlank
    @Column(name = "nm_passanger")
    var nmPassanger: String? = null,

    @field:NotBlank
    var cpf: String? = null,

    @field:NotNull
    @Column(name = "dt_birth")
    var dtBirth: LocalDate? = null,

    @field:NotNull
    var gender: String? = null
)