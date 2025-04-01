package teste.matheus.Repository

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import teste.matheus.Dto.TripDTO
import teste.matheus.Model.Trip

interface TripRepository : CrudRepository<Trip, Long> {

    @Query(
        value = """
            SELECT 
                NEW teste.matheus.Dto.TripDTO(t.idTrip,d.nmDriver,p.nmPassanger,t.startAddress,t.endAddresst.tripValue)
            FROM 
                Trip t
            INNER JOIN 
                Driver d ON d.idDriver = t.idDriver
            INNER JOIN 
                Passanger p ON p.idPassanger = t.idPassanger
             WHERE
                (:nmDriver IS NULL OR d.nmDriver LIKE %:nmDriver%) 
            AND (:nmPassanger IS NULL OR p.nmPassanger LIKE %:nmPassanger%)
        """
    )
    fun getTrips(
        @Param("nmDriver") nmDriver: String?,
        @Param("nmPassanger") nmPassanger: String?
    ): List<TripDTO>
}