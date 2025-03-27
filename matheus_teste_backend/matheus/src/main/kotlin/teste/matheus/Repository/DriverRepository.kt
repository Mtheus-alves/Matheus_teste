package teste.matheus.Repository

import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import teste.matheus.Model.Driver

interface DriverRepository : CrudRepository<Driver, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE Driver d SET d.status = :status WHERE d.idDriver = :idDriver")
    fun updateStatusByIdDriver(@Param("idDriver") idDriver: Long, @Param("status") status: Boolean): Int
}