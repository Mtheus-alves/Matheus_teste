package teste.matheus

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class CorsConfig : WebMvcConfigurer {

   override fun addCorsMappings(registry: CorsRegistry) {
       registry.addMapping("/**")
           .allowedOrigins("*")  // Permite qualquer origem
           .allowedMethods("*")  // Permite todos os métodos
           .allowedHeaders("*")  // Permite todos os headers
           .allowCredentials(false) // Desativa credenciais por segurança
           .maxAge(3600) // Cache do preflight por 1 hora
   }
}
