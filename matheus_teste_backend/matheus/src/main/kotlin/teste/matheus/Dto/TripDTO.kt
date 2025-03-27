package teste.matheus.Dto

import java.math.BigDecimal

data class TripDTO(
    var idTrip: Long? = null,
    var nmDriver: String? = null,
    var nmPassanger: String? = null,
    var tripValue: BigDecimal? = null
)
